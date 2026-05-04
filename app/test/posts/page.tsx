import { ServerHeader } from "@/components/layout/server-header";
import { PostCard } from "@/components/blog/post-card";
import { mockPosts } from "@/lib/mock-posts";

export const dynamic = 'force-dynamic';

export default function TestPostsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ServerHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold">PostCard 테스트</h1>
        <p className="mb-8 text-muted-foreground">
          mockPosts 더미 데이터로 PostCard 컴포넌트 렌더링 테스트
        </p>

        <div className="grid auto-rows-max gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
