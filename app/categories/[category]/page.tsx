import type { Metadata } from "next";
import { ServerHeader } from "@/components/layout/server-header";
import { Footer } from "@/components/layout/footer";
import { CategoryFilter } from "@/components/blog/category-filter";
import { PostCard } from "@/components/blog/post-card";
import {
  getCategories,
  getPostsByCategory,
} from "@/lib/notion";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const displayName = decodeURIComponent(category);

  return {
    title: `${displayName} 카테고리`,
    description: `${displayName} 카테고리의 글 목록`,
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    category: encodeURIComponent(cat.name),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const displayName = decodeURIComponent(category);

  const [posts, categories] = await Promise.all([
    getPostsByCategory(displayName),
    getCategories(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <ServerHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="mb-6 text-3xl font-black tracking-tight">
            {displayName}
          </h1>

          {/* 카테고리 탭 필터 */}
          <CategoryFilter categories={categories} currentCategory={displayName} />

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
