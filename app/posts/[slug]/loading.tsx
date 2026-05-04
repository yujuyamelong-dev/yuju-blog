import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-12 space-y-6">
          {/* 카테고리 배지 */}
          <Skeleton className="h-6 w-20 rounded-full" />

          {/* 제목 */}
          <Skeleton className="h-10 w-3/4" />

          {/* 태그들 */}
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          {/* 메타 정보 */}
          <Skeleton className="h-px w-full" />

          {/* 콘텐츠 스켈레톤 */}
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`h-4 ${i % 4 === 3 ? "w-3/4" : "w-full"}`}
            />
          ))}
        </article>
      </main>

      <Footer />
    </div>
  );
}
