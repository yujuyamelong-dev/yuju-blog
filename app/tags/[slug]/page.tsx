import type { Metadata } from "next";
import { ServerHeader } from "@/components/layout/server-header";
import { Footer } from "@/components/layout/footer";
import { PostCard } from "@/components/blog/post-card";
import { getTags, getPostsByTag } from "@/lib/notion";

interface TagSlugPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: TagSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getTags();
  const tag = tags.find((t) => t.slug === slug);

  return {
    title: tag ? `#${tag.name}` : "태그 없음",
    description: tag
      ? `${tag.name} 태그의 글 목록`
      : "해당 태그를 찾을 수 없습니다.",
  };
}

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export default async function TagSlugPage({ params }: TagSlugPageProps) {
  const { slug } = await params;
  const [posts, tags] = await Promise.all([getPostsByTag(slug), getTags()]);

  const currentTag = tags.find((t) => t.slug === slug);
  const displayName = currentTag?.name || "알 수 없는 태그";

  return (
    <div className="flex min-h-screen flex-col">
      <ServerHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="mb-6 text-3xl font-black tracking-tight">#{displayName}</h1>

          {/* 글 그리드 */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {displayName} 태그의 글이 없습니다.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
