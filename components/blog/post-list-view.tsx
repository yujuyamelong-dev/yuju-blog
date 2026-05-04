"use client";

import { PostCard } from "./post-card";
import type { Post } from "@/lib/types";

interface PostListViewProps {
  posts: Post[];
}

export function PostListView({ posts }: PostListViewProps) {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* 헤더 */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            블로그 글 목록
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-muted-foreground">
            총 {posts.length}개의 글
          </p>
        </div>

        {/* 포스트 그리드 - 반응형 레이아웃 */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-96 items-center justify-center">
            <p className="text-sm sm:text-base text-muted-foreground">발행된 글이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
