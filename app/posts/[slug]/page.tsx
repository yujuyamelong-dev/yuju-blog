import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServerHeader } from "@/components/layout/server-header";
import { PostContent } from "@/components/blog/post-content";
import { Toc } from "@/components/blog/toc";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  getAllPosts,
  getPostBySlug,
  getPostBlocks,
} from "@/lib/notion";
import type { NotionBlock } from "@/lib/types";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "글을 찾을 수 없습니다",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://my-blog-yujuyamelong.vercel.app';
  const postUrl = `${siteUrl}/posts/${post.slug}`;
  const imageUrl = post.coverImage || `${siteUrl}/og-default.png`;

  return {
    title: post.title,
    description: post.description ?? undefined,
    keywords: post.tags.map(tag => tag.name).join(', '),
    authors: [{ name: '유주' }],
    creator: '유주',
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description ?? undefined,
      url: postUrl,
      publishedTime: post.publishedDate ? new Date(post.publishedDate).toISOString() : undefined,
      modifiedTime: new Date(post.modifiedDate).toISOString(),
      authors: ['유주'],
      tags: post.tags.map(tag => tag.name),
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: `${siteUrl}/og-default.png`,
              width: 1200,
              height: 630,
              alt: "유주's Blog",
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description ?? undefined,
      images: [imageUrl],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export async function generateStaticParams() {
  const { items } = await getAllPosts();
  return items.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  let blocks: NotionBlock[] = [];
  let blocksError: string | null = null;

  try {
    blocks = await getPostBlocks(post.notionPageId);
  } catch (error) {
    console.error("[PostPage] 블록 조회 실패:", error);
    blocksError = error instanceof Error ? error.message : "알 수 없는 오류";
  }

  const [{ items: allPosts }] = await Promise.all([
    getAllPosts(),
  ]);

  const postIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = postIndex > 0 ? allPosts[postIndex - 1] : null;
  const nextPost = postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;

  // JSON-LD 스키마 생성
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://my-blog-yujuyamelong.vercel.app';
  const postUrl = `${siteUrl}/posts/${post.slug}`;
  const imageUrl = post.coverImage || `${siteUrl}/og-default.png`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || '',
    image: imageUrl,
    datePublished: post.publishedDate ? new Date(post.publishedDate).toISOString() : undefined,
    dateModified: new Date(post.modifiedDate).toISOString(),
    author: {
      '@type': 'Person',
      name: '유주',
      url: siteUrl,
    },
    keywords: post.tags.map(tag => tag.name).join(', '),
    url: postUrl,
    inLanguage: 'ko-KR',
    isPartOf: {
      '@type': 'Blog',
      name: "유주's Blog",
      url: siteUrl,
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="post-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <ServerHeader />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 sm:py-12 flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
          <div className="flex-1 min-w-0 lg:max-w-3xl">
            {/* 글 메타 영역 */}
            <header className="mb-8 sm:mb-10 space-y-3 sm:space-y-4">
            {post.category && (
              <div>
                <Link
                  href={`/category/${post.category.slug}`}
                  data-testid="category-link"
                  data-category={post.category.slug}
                >
                  <Badge variant="secondary">{post.category.name}</Badge>
                </Link>
              </div>
            )}

            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight"
              data-testid="post-title"
            >
              {post.title}
            </h1>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    data-testid="tag-link"
                    data-tag={tag.slug}
                  >
                    <Badge variant="outline">#{tag.name}</Badge>
                  </Link>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
              {post.publishedDate && (
                <span>
                  발행: {new Date(post.publishedDate).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              <span>
                수정: {new Date(post.modifiedDate).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <Separator />
          </header>

          {/* 본문 블록 렌더러 */}
          {blocksError ? (
            <div
              className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center"
              data-testid="blocks-error"
            >
              <p className="text-sm font-medium text-destructive">
                콘텐츠를 불러오지 못했습니다
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{blocksError}</p>
            </div>
          ) : blocks.length === 0 ? (
            // 블록이 없으면 Description 필드 표시
            post.description ? (
              <div
                className="prose prose-neutral dark:prose-invert max-w-none space-y-4"
                data-testid="post-description-content"
              >
                <p className="leading-relaxed">{post.description}</p>
              </div>
            ) : (
              <div
                className="py-12 text-center"
                data-testid="blocks-empty"
              >
                <p className="text-muted-foreground">아직 콘텐츠가 없습니다.</p>
              </div>
            )
          ) : (
            <PostContent blocks={blocks} />
          )}

          {/* 이전/다음 네비게이션 */}
          {(prevPost || nextPost) && (
            <nav
              className="mt-12 pt-8 border-t"
              data-testid="post-navigation"
            >
              <div className="grid grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    href={`/posts/${prevPost.slug}`}
                    className="group p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                    data-testid="prev-post-link"
                  >
                    <span className="text-xs text-muted-foreground block mb-1">
                      ← 이전 글
                    </span>
                    <span className="font-semibold group-hover:underline line-clamp-2">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost ? (
                  <Link
                    href={`/posts/${nextPost.slug}`}
                    className="group p-4 rounded-lg border bg-card hover:bg-accent transition-colors text-right"
                    data-testid="next-post-link"
                  >
                    <span className="text-xs text-muted-foreground block mb-1">
                      다음 글 →
                    </span>
                    <span className="font-semibold group-hover:underline line-clamp-2">
                      {nextPost.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </nav>
          )}

          {/* 글 목록으로 이동 버튼 */}
          <div className="mt-12 pt-8 border-t">
            <Link
              href="/?slide=1"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border bg-card hover:bg-accent transition-colors font-semibold"
              data-testid="back-to-list-link"
            >
              ← 목록으로 돌아가기
            </Link>
          </div>
          </div>

          <Toc blocks={blocks} />
        </article>
      </main>
    </div>
  );
}
