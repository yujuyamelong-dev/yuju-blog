import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { PostCardSkeleton } from "@/components/blog/post-card";

export default function CategoryLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-12 space-y-6">
          {/* 카테고리 제목 */}
          <Skeleton className="h-9 w-40" />

          {/* 카테고리 탭들 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>

          {/* 포스트 카드 그리드 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
