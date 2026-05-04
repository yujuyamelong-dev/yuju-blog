import type { Metadata } from "next";
import { ServerHeader } from "@/components/layout/server-header";
import { Footer } from "@/components/layout/footer";
import { PostCard } from "@/components/blog/post-card";
import { getCategories, getPostsByCategorySlug } from "@/lib/notion";

interface CategorySlugPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: CategorySlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  return {
    title: category ? `${category.name} 카테고리` : "카테고리 없음",
    description: category
      ? `${category.name} 카테고리의 글 목록`
      : "해당 카테고리를 찾을 수 없습니다.",
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategorySlugPage({
  params,
}: CategorySlugPageProps) {
  const { slug } = await params;
  const [posts, categories] = await Promise.all([
    getPostsByCategorySlug(slug),
    getCategories(),
  ]);

  const currentCategory = categories.find((c) => c.slug === slug);
  const displayName = currentCategory?.name || "알 수 없는 카테고리";

  return (
    <div className="flex min-h-screen flex-col">
      <ServerHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="mb-6 text-3xl font-black tracking-tight">
            {displayName}
          </h1>

          {/* 글 그리드 */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {displayName} 카테고리에 글이 없습니다.
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
