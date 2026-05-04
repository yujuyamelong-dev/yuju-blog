import type { Metadata } from "next";
import { ServerHeader } from "@/components/layout/server-header";
import { BlogSlideshow } from "@/components/blog/blog-slideshow";
import { getAllPosts } from "@/lib/notion";
import { mockPosts } from "@/lib/mock-posts";

export const metadata: Metadata = {
  title: "홈",
  description: "개발하면서 배우고 경험한 것들을 기록하는 나만의 블로그",
};

// 동적 렌더링: 매 요청마다 최신 데이터 조회
export const revalidate = 0;

interface HomePageProps {
  searchParams: Promise<{
    slide?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { items } = await getAllPosts();
  console.log("[HOME PAGE] Notion 글 수:", items.length);
  const posts = items.length > 0 ? items : mockPosts.slice(0, 10);
  console.log("[HOME PAGE] 표시될 글 수:", posts.length);
  console.log("[HOME PAGE] 테스트 글 사용?", items.length === 0);
  const { slide } = await searchParams;
  const initialSlide = slide === "1" ? 1 : 0;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ServerHeader />

      <main className="flex-1 overflow-hidden">
        <BlogSlideshow posts={posts} postCount={items.length} initialSlide={initialSlide} />
      </main>
    </div>
  );
}
