import { Suspense } from "react";
import type { Metadata } from "next";
import { ServerHeader } from "@/components/layout/server-header";
import { Footer } from "@/components/layout/footer";
import { PostCard } from "@/components/blog/post-card";
import { getAllPosts } from "@/lib/notion";
import { mockPosts } from "@/lib/mock-posts";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "검색",
  description: "블로그 글을 검색합니다",
};

export const revalidate = 86400; // ISR: 24시간

async function SearchResults({ query }: { query: string }) {
  const { items } = await getAllPosts();
  const posts = items.length > 0 ? items : mockPosts;

  // 검색 필터링: 제목, 설명, 태그로 검색
  const filteredPosts = posts.filter((post) => {
    const searchQuery = query.toLowerCase();
    const titleMatch = post.title.toLowerCase().includes(searchQuery);
    const descriptionMatch = post.description
      ?.toLowerCase()
      .includes(searchQuery);
    const tagMatch = post.tags.some((tag) =>
      tag.name.toLowerCase().includes(searchQuery)
    );

    return titleMatch || descriptionMatch || tagMatch;
  });

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">검색 결과</h1>
          <p className="text-muted-foreground">
            &quot;<span className="font-semibold text-foreground">{query}</span>
            &quot; 에 대한 {filteredPosts.length}개의 결과
          </p>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-4xl">🔍</div>
            <h2 className="text-2xl font-bold mb-2">검색 결과가 없습니다</h2>
            <p className="text-muted-foreground max-w-md">
              다른 검색어를 시도하거나 카테고리를 둘러보세요.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;
  const query = q ?? "";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ServerHeader />
      <Suspense
        fallback={
          <main className="flex-1 flex items-center justify-center">
            <div className="text-muted-foreground">검색 중...</div>
          </main>
        }
      >
        <SearchResults query={query} />
      </Suspense>
      <Footer />
    </div>
  );
}
