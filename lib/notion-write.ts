/**
 * @file lib/notion-write.ts
 * @description Notion API를 통한 글 생성/수정/삭제 레이어
 * 서버 컴포넌트 또는 Server Actions에서만 사용
 */

import type { PostCreateInput, PostUpdateInput } from '@/lib/types';
import { NOTION_PROPERTY } from '@/lib/types';
import { revalidateTag } from 'next/cache';

interface NotionProperties {
  [key: string]: unknown;
}

interface NotionParagraphBlockOld {
  object: string;
  type: string;
  paragraph: {
    rich_text: Array<{
      type: string;
      text: {
        content: string;
        link: null;
      };
    }>;
  };
}

interface CreatePageBody {
  parent: { database_id: string };
  properties: NotionProperties;
  children?: NotionParagraphBlockOld[];
}

const notionApiKey = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

if (!notionApiKey || !notionDatabaseId) {
  console.warn('[notion-write] ⚠️ Notion API 설정 불완전');
}

/**
 * Notion API 상태 정규화
 */
function normalizeStatus(status: string): '초안' | '작성중' | '발행됨' {
  const s = status.trim();
  if (s === '초안') return '초안';
  if (s === '작성중') return '작성중';
  return '발행됨';
}

/**
 * 텍스트를 Notion paragraph 블록 배열로 변환
 */
export function textToNotionBlocks(text: string): NotionParagraphBlockOld[] {
  if (!text?.trim()) return [];

  return text
    .split('\n')
    .filter(line => line.trim())
    .map(line => ({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: line,
              link: null,
            },
          },
        ],
      },
    }));
}

/**
 * 새 글을 Notion 데이터베이스에 생성
 */
export async function createPost(data: PostCreateInput): Promise<string> {
  if (!notionApiKey || !notionDatabaseId) {
    throw new Error('Notion API가 설정되지 않았습니다.');
  }

  const formattedDbId = notionDatabaseId.replace(
    /([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})/i,
    '$1-$2-$3-$4-$5'
  );

  try {
    const properties: NotionProperties = {
      [NOTION_PROPERTY.TITLE]: {
        title: [
          {
            type: 'text',
            text: {
              content: data.title,
            },
          },
        ],
      },
    };

    // 설명 추가
    if (data.description) {
      properties[NOTION_PROPERTY.DESCRIPTION] = {
        rich_text: [
          {
            type: 'text',
            text: {
              content: data.description,
            },
          },
        ],
      };
    }

    // 태그 추가
    if (data.tags && data.tags.length > 0) {
      properties[NOTION_PROPERTY.TAGS] = {
        multi_select: data.tags.map(tag => ({
          name: tag,
        })),
      };
    }

    // 발행일 추가
    if (data.publishedDate) {
      properties[NOTION_PROPERTY.PUBLISHED_DATE] = {
        date: {
          start: data.publishedDate,
        },
      };
    }

    // 상태 추가
    properties[NOTION_PROPERTY.STATUS] = {
      status: {
        name: normalizeStatus(data.status),
      },
    };

    const body: CreatePageBody = {
      parent: {
        database_id: formattedDbId,
      },
      properties,
    };

    // 본문 콘텐츠가 있으면 블록으로 추가
    if (data.content?.trim()) {
      body.children = textToNotionBlocks(data.content);
    }

    console.log('[createPost] Notion API 호출:', body);

    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionApiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[createPost] Notion API 에러:', response.status, errorData);
      throw new Error(`Notion API 에러: ${response.status} - ${errorData.message}`);
    }

    const result = await response.json();
    const pageId = result.id;

    console.log('[createPost] ✅ 글 생성 성공:', pageId);

    // 캐시 무효화
    revalidateTag('posts');

    return pageId;
  } catch (error) {
    console.error('[createPost] ❌ 글 생성 실패:', error);
    throw error;
  }
}

/**
 * 페이지의 기존 블록들을 삭제
 */
async function deletePageBlocks(pageId: string): Promise<void> {
  if (!notionApiKey) {
    throw new Error('Notion API 키가 설정되지 않았습니다.');
  }

  try {
    // 페이지 ID 정규화
    const formattedPageId = pageId.replace(
      /([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})/i,
      '$1-$2-$3-$4-$5'
    );

    // 페이지의 자식 블록 조회
    const blocksResponse = await fetch(`https://api.notion.com/v1/blocks/${formattedPageId}/children`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${notionApiKey}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (!blocksResponse.ok) {
      const errorData = await blocksResponse.json();
      console.error('[deletePageBlocks] 블록 조회 실패:', blocksResponse.status, errorData);
      return;
    }

    const blocksList = await blocksResponse.json() as { results: Array<{ id: string }> };

    // 각 블록 삭제
    for (const block of blocksList.results) {
      const deleteResponse = await fetch(`https://api.notion.com/v1/blocks/${block.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${notionApiKey}`,
          'Notion-Version': '2022-06-28',
        },
      });

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json();
        console.warn('[deletePageBlocks] 블록 삭제 실패:', block.id, errorData);
      }
    }

    console.log('[deletePageBlocks] ✅ 기존 블록 삭제 완료:', pageId);
  } catch (error) {
    console.error('[deletePageBlocks] ❌ 블록 삭제 실패:', error);
    throw error;
  }
}

/**
 * 페이지에 블록 추가
 */
async function addPageBlocks(pageId: string, blocks: NotionParagraphBlockOld[]): Promise<void> {
  if (!notionApiKey || blocks.length === 0) {
    return;
  }

  try {
    // 페이지 ID 정규화
    const formattedPageId = pageId.replace(
      /([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})/i,
      '$1-$2-$3-$4-$5'
    );

    const response = await fetch(`https://api.notion.com/v1/blocks/${formattedPageId}/children`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${notionApiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        children: blocks,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[addPageBlocks] Notion API 에러:', response.status, errorData);
      throw new Error(`Notion API 에러: ${response.status} - ${errorData.message}`);
    }

    console.log('[addPageBlocks] ✅ 블록 추가 완료:', pageId);
  } catch (error) {
    console.error('[addPageBlocks] ❌ 블록 추가 실패:', error);
    throw error;
  }
}

/**
 * 기존 글의 메타데이터 및 본문 업데이트
 */
export async function updatePost(pageId: string, data: PostUpdateInput): Promise<void> {
  if (!notionApiKey) {
    throw new Error('Notion API 키가 설정되지 않았습니다.');
  }

  try {
    const properties: NotionProperties = {};

    // 제목 업데이트
    if (data.title !== undefined) {
      properties[NOTION_PROPERTY.TITLE] = {
        title: [
          {
            type: 'text',
            text: {
              content: data.title,
            },
          },
        ],
      };
    }

    // 설명 업데이트
    if (data.description !== undefined) {
      properties[NOTION_PROPERTY.DESCRIPTION] = {
        rich_text: data.description
          ? [
              {
                type: 'text',
                text: {
                  content: data.description,
                },
              },
            ]
          : [],
      };
    }

    // 태그 업데이트
    if (data.tags !== undefined) {
      properties[NOTION_PROPERTY.TAGS] = {
        multi_select: (data.tags || []).map(tag => ({
          name: tag,
        })),
      };
    }

    // 발행일 업데이트
    if (data.publishedDate !== undefined) {
      properties[NOTION_PROPERTY.PUBLISHED_DATE] = data.publishedDate
        ? {
            date: {
              start: data.publishedDate,
            },
          }
        : {
            date: null,
          };
    }

    // 상태 업데이트
    if (data.status !== undefined) {
      properties[NOTION_PROPERTY.STATUS] = {
        status: {
          name: normalizeStatus(data.status),
        },
      };
    }

    // 페이지 ID 정규화 (하이픈 추가)
    const formattedPageId = pageId.replace(
      /([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})/i,
      '$1-$2-$3-$4-$5'
    );

    const response = await fetch(`https://api.notion.com/v1/pages/${formattedPageId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${notionApiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[updatePost] Notion API 에러:', response.status, errorData);
      throw new Error(`Notion API 에러: ${response.status} - ${errorData.message}`);
    }

    // 본문 콘텐츠 업데이트
    if (data.content !== undefined) {
      await deletePageBlocks(pageId);
      if (data.content?.trim()) {
        const newBlocks = textToNotionBlocks(data.content);
        await addPageBlocks(pageId, newBlocks);
      }
    }

    console.log('[updatePost] ✅ 글 업데이트 성공:', pageId);

    // 캐시 무효화
    revalidateTag('posts');
  } catch (error) {
    console.error('[updatePost] ❌ 글 업데이트 실패:', error);
    throw error;
  }
}

/**
 * 글 삭제 (아카이브)
 * Notion은 실제 삭제 대신 archived: true로 처리
 */
export async function deletePost(pageId: string): Promise<void> {
  if (!notionApiKey) {
    throw new Error('Notion API 키가 설정되지 않았습니다.');
  }

  try {
    // 페이지 ID 정규화
    const formattedPageId = pageId.replace(
      /([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})/i,
      '$1-$2-$3-$4-$5'
    );

    const response = await fetch(`https://api.notion.com/v1/pages/${formattedPageId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${notionApiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        archived: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      // 이미 아카이브된 페이지인 경우 무시하고 성공 처리
      // Notion은 아카이브된 블록 수정 시 "Can't edit block that is archived" 에러 반환
      if (errorData.message?.includes('archived')) {
        console.log('[deletePost] ℹ️ 이미 아카이브된 페이지:', pageId);
        revalidateTag('posts');
        return;
      }

      console.error('[deletePost] Notion API 에러:', response.status, errorData);
      throw new Error(`Notion API 에러: ${response.status} - ${errorData.message}`);
    }

    console.log('[deletePost] ✅ 글 삭제(아카이브) 성공:', pageId);

    // 캐시 무효화
    revalidateTag('posts');
  } catch (error) {
    console.error('[deletePost] ❌ 글 삭제 실패:', error);
    throw error;
  }
}
