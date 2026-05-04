/**
 * @file lib/notion.ts
 * @description Notion API 클라이언트 및 데이터 페칭 레이어
 *
 * 이 모듈은 서버 컴포넌트에서만 임포트해야 합니다.
 * 클라이언트 컴포넌트('use client')에서 임포트하면 API 키가 노출됩니다.
 *
 * ISR 캐시 전략:
 *   - revalidate: 86400 (24시간)
 *   - Notion API Rate Limit: 3 req/s 고려하여 캐싱 우선
 */

import { unstable_cache } from "next/cache";
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
  DatabaseObjectResponse,
  PartialDatabaseObjectResponse,
  ListBlockChildrenResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type {
  Post,
  PostSlideData,
  PostFilterParams,
  PostStatus,
  ColorTheme,
  Category,
  Tag,
  NotionBlock,
} from "@/lib/types";
import { NOTION_PROPERTY } from "@/lib/types";

// -----------------------------------------------
// Notion 클라이언트 싱글턴
// -----------------------------------------------

function getNotionDatabaseId(): string | null {
  return process.env.NOTION_DATABASE_ID || null;
}

// -----------------------------------------------
// ISR 캐시 상수
// -----------------------------------------------

export const REVALIDATE_SECONDS = 86400;

// -----------------------------------------------
// 타입 정의 및 타입 가드
// -----------------------------------------------

export type NotionPage =
  | PageObjectResponse
  | PartialPageObjectResponse
  | DatabaseObjectResponse
  | PartialDatabaseObjectResponse;

export type NotionBlocksResponse = ListBlockChildrenResponse;

// Notion 페이지가 실제 객체인지 확인 (properties 포함)
function isPageObjectResponse(
  page: PageObjectResponse | PartialPageObjectResponse
): page is PageObjectResponse {
  return "properties" in page;
}

// -----------------------------------------------
// 헬퍼 함수들
// -----------------------------------------------

/**
 * RichText 배열에서 순수 텍스트 추출
 */
export function extractRichText(richText: RichTextItemResponse[]): string {
  return richText.map((item) => item.plain_text).join("");
}

/**
 * 카테고리/인덱스에 따라 색상 테마 결정
 */
function getColorTheme(category: string | null, index: number): ColorTheme {
  const themes: ColorTheme[] = [
    "blue",
    "purple",
    "green",
    "orange",
    "rose",
    "cyan",
    "yellow",
  ];
  const seed = category
    ? category.charCodeAt(0) + index
    : index;
  return themes[seed % themes.length];
}

/**
 * 날짜를 YYYY.MM.DD 형식으로 변환
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/\./g, ".");
}


// -----------------------------------------------
// Notion 페이지 → Post 변환
// -----------------------------------------------

/**
 * 문자열을 kebab-case로 변환
 */
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Notion 페이지 객체를 Post 타입으로 변환
 */
export function mapNotionPageToPost(page: PageObjectResponse): Post {
  // 속성 키 앞뒤 공백 제거하여 정규화
  const props = Object.fromEntries(
    Object.entries(page.properties).map(([k, v]) => [k.trim(), v])
  ) as PageObjectResponse["properties"];

  // 제목 추출
  const titleProp = props[NOTION_PROPERTY.TITLE];
  const title =
    titleProp?.type === "title"
      ? extractRichText(titleProp.title)
      : "제목 없음";

  // 설명 추출
  const descProp = props[NOTION_PROPERTY.DESCRIPTION];
  const description =
    descProp?.type === "rich_text"
      ? extractRichText(descProp.rich_text) || null
      : null;

  // 태그 추출
  const tagsProp = props[NOTION_PROPERTY.TAGS];
  const tags: Tag[] =
    tagsProp?.type === "multi_select"
      ? tagsProp.multi_select.map((tag) => ({
          id: tag.id,
          name: tag.name,
          slug: toKebabCase(tag.name),
          color: tag.color,
          count: 0,
        }))
      : [];

  // 발행일 추출
  const pubDateProp = props[NOTION_PROPERTY.PUBLISHED_DATE];
  const publishedDate: string | null =
    pubDateProp?.type === "date" && pubDateProp.date?.start
      ? pubDateProp.date.start
      : null;

  // 상태 추출
  const statusProp = props[NOTION_PROPERTY.STATUS];
  const status: PostStatus =
    statusProp?.type === "status" && statusProp.status?.name
      ? (statusProp.status.name as PostStatus)
      : "초안";

  // Featured 추출
  const featuredProp = props[NOTION_PROPERTY.FEATURED];
  const featured =
    featuredProp?.type === "checkbox"
      ? featuredProp.checkbox
      : false;

  // 커버 이미지 추출
  const coverImage =
    page.cover?.type === "external"
      ? page.cover.external.url
      : page.cover?.type === "file"
        ? page.cover.file.url
        : null;

  return {
    id: page.id,
    slug: page.id,
    notionPageId: page.id,
    title,
    description,
    tags,
    publishedDate,
    modifiedDate: page.last_edited_time,
    status,
    featured,
    coverImage,
    // category는 현재 구현되지 않음
  };
}

// -----------------------------------------------
// Post → PostSlideData 변환
// -----------------------------------------------

export function toPostSlideData(posts: Post[]): PostSlideData[] {
  return posts.map((post, index) => ({
    id: post.id,
    title: post.title,
    description: post.description || "설명이 없습니다",
    category: "기타",
    readingTime: "5분",
    publishedAt: post.publishedDate
      ? formatDate(post.publishedDate)
      : formatDate(post.modifiedDate),
    slug: post.slug,
    colorTheme: getColorTheme(null, index),
    index: index + 1,
  }));
}

// -----------------------------------------------
// 공개 API (Notion 데이터 페칭)
// -----------------------------------------------

/**
 * 모든 발행된 글 조회 (필터링 및 정렬 적용)
 * Rate Limit 관리: Promise.all 최대 3개 동시 요청
 */
async function getAllPostsCore(filter?: Partial<PostFilterParams>) {
  try {
    const apiKey = process.env.NOTION_API_KEY;
    const dbId = getNotionDatabaseId();

    console.log("[getAllPosts] API Key 상태:", !!apiKey, "DB ID 상태:", !!dbId);

    if (!apiKey || !dbId) {
      console.warn("❌ Notion API가 설정되지 않았습니다.");
      return {
        items: [],
        total: 0,
      };
    }

    // 데이터베이스 ID를 UUID 형식으로 변환 (하이픈 추가)
    const formattedDbId = dbId.replace(
      /([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})/i,
      "$1-$2-$3-$4-$5"
    );

    console.log("[getAllPosts] 원본 DB ID:", dbId);
    console.log("[getAllPosts] 형식화된 DB ID:", formattedDbId);
    console.log("[getAllPosts] Notion 데이터베이스 조회 시작...");
    console.log("[getAllPosts] /databases/{id}/query 엔드포인트를 사용하여 페이지 조회...");

    const allPages: PageObjectResponse[] = [];
    let cursor: string | undefined;

    do {
      // Notion REST API의 /databases/{id}/query 엔드포인트 사용
      // /search보다 더 빠르고 신뢰성 있음
      const queryUrl = `https://api.notion.com/v1/databases/${formattedDbId}/query`;

      console.log("[getAllPosts] 데이터베이스 쿼리 요청 시작...");

      const response = await fetch(queryUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sorts: [
            {
              timestamp: "last_edited_time",
              direction: "descending",
            },
          ],
          page_size: 100,
          ...(cursor && { start_cursor: cursor }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("[getAllPosts] Notion API 에러:", response.status, errorData);
        throw new Error(`Notion API 에러: ${response.status} - ${errorData.message}`);
      }

      const data = (await response.json()) as {
        results: Array<PageObjectResponse | PartialPageObjectResponse>;
        has_more: boolean;
        next_cursor: string | null;
      };

      console.log("[getAllPosts] 쿼리 결과 수:", data.results.length);

      // 이미 데이터베이스에서 조회했으므로 모두 해당 데이터베이스의 페이지
      const pageResults = data.results.filter(isPageObjectResponse) as PageObjectResponse[];

      console.log("[getAllPosts] 필터링 후 페이지 수:", pageResults.length);

      allPages.push(...pageResults);
      cursor = data.has_more && data.next_cursor ? data.next_cursor : undefined;
    } while (cursor !== undefined);

    console.log("[getAllPosts] 전체 페이지 수:", allPages.length);

    let posts = allPages.map(mapNotionPageToPost);
    console.log("[getAllPosts] 변환된 포스트 수 (필터 전):", posts.length);

    // 상태별 포스트 수 로깅
    const statusCount = posts.reduce((acc, post) => {
      acc[post.status] = (acc[post.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    console.log("[getAllPosts] 상태별 포스트:", statusCount);

    // 발행됨 상태로 필터링
    posts = posts.filter((post) => post.status === "발행됨");
    console.log("[getAllPosts] 발행됨 필터 후 포스트 수:", posts.length);

    if (filter?.category) {
      posts = posts.filter((post) => post.category?.name === filter.category);
    }

    console.log("[getAllPosts] ✅ 최종 반환 포스트 수:", posts.length);
    return {
      items: posts,
      total: posts.length,
    };
  } catch (error) {
    console.error("❌ Notion API 쿼리 실패:", error);
    if (error instanceof Error) {
      console.error("에러 메시지:", error.message);
      console.error("에러 스택:", error.stack);
    }
    return {
      items: [],
      total: 0,
    };
  }
}

// 개발 환경: 캐싱 비활성화, 프로덕션: 캐싱 활성화
export const getAllPosts = process.env.NODE_ENV === "production"
  ? unstable_cache(
      getAllPostsCore,
      ["all-posts"],
      {
        revalidate: REVALIDATE_SECONDS,
        tags: ["posts"],
      }
    )
  : getAllPostsCore;

/**
 * 특정 slug의 글 조회
 */
export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    try {
      console.log(`[getPostBySlug] 요청: ${slug}`);
      const { items } = await getAllPosts();
      console.log(`[getPostBySlug] 전체 글 수: ${items.length}`);
      const post = items.find((p) => p.slug === slug);

      if (!post) {
        console.log(`[getPostBySlug] slug="${slug}"와 일치하는 글 없음`);
        console.log(
          `[getPostBySlug] 사용 가능한 slug:`,
          items.map((p) => p.slug).slice(0, 5)
        );
        return null;
      }

      if (post.status !== "발행됨") {
        console.log(`[getPostBySlug] 글 상태: ${post.status} (발행되지 않음)`);
        return null;
      }

      console.log(`[getPostBySlug] 글 조회 성공: ${post.title}`);
      return post;
    } catch (error) {
      console.error(`글 조회 실패 (${slug}):`, error);
      return null;
    }
  },
  ["post-by-slug"],
  {
    revalidate: REVALIDATE_SECONDS,
    tags: ["posts"],
  }
);

/**
 * 특정 페이지의 모든 블록 조회 (페이지네이션 처리)
 * REST API 직접 호출로 전환하고, pageId를 캐시 키에 명시 포함
 */
async function getPostBlocksCore(pageId: string): Promise<NotionBlock[]> {
  const apiKey = process.env.NOTION_API_KEY;

  if (!apiKey) {
    console.warn("[getPostBlocks] NOTION_API_KEY가 설정되지 않았습니다.");
    return [];
  }

  const allBlocks: NotionBlock[] = [];
  let cursor: string | undefined;

  try {
    do {
      const url = new URL(`https://api.notion.com/v1/blocks/${pageId}/children`);
      url.searchParams.set("page_size", "100");
      if (cursor) {
        url.searchParams.set("start_cursor", cursor);
      }

      console.log(`[getPostBlocks] 요청: ${pageId}, cursor: ${cursor || "none"}`);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "알 수 없는 오류";
        console.error(
          `[getPostBlocks] Notion API 에러: ${response.status}`,
          errorData
        );
        throw new Error(`Notion 블록 조회 실패: ${response.status} - ${errorMessage}`);
      }

      const data = await response.json() as {
        results: NotionBlock[];
        has_more: boolean;
        next_cursor: string | null;
      };

      console.log(
        `[getPostBlocks] 블록 수신: ${data.results.length}개 (has_more: ${data.has_more})`
      );

      allBlocks.push(...data.results);
      cursor = data.has_more && data.next_cursor ? data.next_cursor : undefined;
    } while (cursor !== undefined);

    console.log(
      `[getPostBlocks] ✅ 전체 블록 수: ${allBlocks.length} (pageId: ${pageId})`
    );
    return allBlocks;
  } catch (error) {
    console.error(`[getPostBlocks] ❌ 블록 조회 실패 (${pageId}):`, error);
    throw error;
  }
}

// 팩토리 패턴: pageId를 캐시 키에 명시 포함
export function getPostBlocks(pageId: string): Promise<NotionBlock[]> {
  return unstable_cache(
    () => getPostBlocksCore(pageId),
    ["post-blocks", pageId],
    {
      revalidate: REVALIDATE_SECONDS,
      tags: ["posts", `post-${pageId}`],
    }
  )();
}

/**
 * 모든 카테고리 조회 (발행된 글 기준)
 */
export const getCategories = unstable_cache(
  async (): Promise<Category[]> => {
    try {
      const { items } = await getAllPosts();
      const categoryMap = new Map<string, Category>();

      for (const post of items) {
        if (post.category) {
          if (categoryMap.has(post.category.id)) {
            // 기존 카테고리의 count 증가
            const existing = categoryMap.get(post.category.id)!;
            existing.count += 1;
          } else {
            // 새 카테고리 추가
            categoryMap.set(post.category.id, {
              ...post.category,
              count: 1,
            });
          }
        }
      }

      return Array.from(categoryMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } catch (error) {
      console.error("카테고리 조회 실패:", error);
      return [];
    }
  },
  ["categories"],
  {
    revalidate: REVALIDATE_SECONDS,
    tags: ["posts"],
  }
);

/**
 * 특정 카테고리의 글 조회 (카테고리 이름 기준)
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  try {
    const { items } = await getAllPosts({ category });
    return items;
  } catch (error) {
    console.error(`카테고리별 글 조회 실패 (${category}):`, error);
    return [];
  }
}

/**
 * 특정 카테고리의 글 조회 (카테고리 slug 기준)
 */
export async function getPostsByCategorySlug(slug: string): Promise<Post[]> {
  try {
    const { items } = await getAllPosts();
    return items.filter(
      (post) => post.category && post.category.slug === slug
    );
  } catch (error) {
    console.error(`카테고리별 글 조회 실패 (${slug}):`, error);
    return [];
  }
}

/**
 * 모든 태그 조회 (발행된 글 기준, 각 태그의 글 개수 포함)
 */
export const getTags = unstable_cache(
  async (): Promise<Tag[]> => {
    try {
      const { items } = await getAllPosts();
      const tagMap = new Map<string, Tag>();

      for (const post of items) {
        for (const tag of post.tags) {
          if (tagMap.has(tag.id)) {
            const existing = tagMap.get(tag.id)!;
            existing.count += 1;
          } else {
            tagMap.set(tag.id, {
              ...tag,
              count: 1,
            });
          }
        }
      }

      return Array.from(tagMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } catch (error) {
      console.error("태그 조회 실패:", error);
      return [];
    }
  },
  ["tags-all"],
  {
    revalidate: REVALIDATE_SECONDS,
    tags: ["posts"],
  }
);

/**
 * 특정 태그의 글 조회
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  try {
    const { items } = await getAllPosts();
    return items.filter((post) => post.tags.some((t) => t.slug === tag));
  } catch (error) {
    console.error(`태그별 글 조회 실패 (${tag}):`, error);
    return [];
  }
}

/**
 * 어드민용: 모든 글 조회 (발행됨 + 초안)
 * 상태 필터 없이 모든 글 반환
 */
async function getAllPostsAdminCore(): Promise<Post[]> {
  try {
    const apiKey = process.env.NOTION_API_KEY;
    const dbId = getNotionDatabaseId();

    if (!apiKey || !dbId) {
      console.warn("❌ Notion API가 설정되지 않았습니다.");
      return [];
    }

    const formattedDbId = dbId.replace(
      /([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})/i,
      "$1-$2-$3-$4-$5"
    );

    const allPages: PageObjectResponse[] = [];
    let cursor: string | undefined;

    do {
      const queryUrl = `https://api.notion.com/v1/databases/${formattedDbId}/query`;

      const response = await fetch(queryUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sorts: [
            {
              timestamp: "last_edited_time",
              direction: "descending",
            },
          ],
          page_size: 100,
          ...(cursor && { start_cursor: cursor }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("[getAllPostsAdmin] Notion API 에러:", response.status, errorData);
        throw new Error(`Notion API 에러: ${response.status} - ${errorData.message}`);
      }

      const data = (await response.json()) as {
        results: Array<PageObjectResponse | PartialPageObjectResponse>;
        has_more: boolean;
        next_cursor: string | null;
      };

      const pageResults = data.results.filter(isPageObjectResponse) as PageObjectResponse[];

      allPages.push(...pageResults);
      cursor = data.has_more && data.next_cursor ? data.next_cursor : undefined;
    } while (cursor !== undefined);

    const posts = allPages.map(mapNotionPageToPost);
    console.log("[getAllPostsAdmin] ✅ 어드민용 글 조회 성공:", posts.length);

    return posts;
  } catch (error) {
    console.error("❌ 어드민용 글 조회 실패:", error);
    return [];
  }
}

// 개발 환경: 캐싱 비활성화, 프로덕션: 캐싱 활성화
export const getAllPostsAdmin = process.env.NODE_ENV === "production"
  ? unstable_cache(
      getAllPostsAdminCore,
      ["all-posts-admin"],
      {
        revalidate: REVALIDATE_SECONDS,
        tags: ["admin-posts"],
      }
    )
  : getAllPostsAdminCore;
