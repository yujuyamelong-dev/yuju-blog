"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HomeSlide } from "./home-slide";
import { PostListView } from "./post-list-view";
import type { Post } from "@/lib/types";

interface BlogSlideshowProps {
  posts: Post[];
  postCount?: number;
  initialSlide?: number;
}

export function BlogSlideshow({ posts, postCount, initialSlide = 0 }: BlogSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const totalSlides = 2; // 1 (home) + 1 (post list)

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 슬라이드 컨테이너 */}
      <div className="relative w-full h-full">
        {/* Home Slide */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentIndex === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <HomeSlide postCount={postCount} onViewPosts={() => setCurrentIndex(1)} />
        </div>

        {/* Post List Slide */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentIndex === 1 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <PostListView posts={posts} />
        </div>
      </div>

      {/* 좌측 화살표 버튼 */}
      <button
        onClick={goToPrev}
        aria-label="이전 슬라이드"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors duration-200 backdrop-blur-sm min-h-11 min-w-11 flex items-center justify-center"
      >
        <ChevronLeft className="h-5 sm:h-6 w-5 sm:w-6" />
      </button>

      {/* 우측 화살표 버튼 */}
      <button
        onClick={goToNext}
        aria-label="다음 슬라이드"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors duration-200 backdrop-blur-sm min-h-11 min-w-11 flex items-center justify-center"
      >
        <ChevronRight className="h-5 sm:h-6 w-5 sm:w-6" />
      </button>

      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`슬라이드 ${index + 1}로 이동`}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-8 bg-primary"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* 현재 슬라이드 표시 */}
      <div className="absolute top-8 right-8 z-20 text-white text-sm font-medium bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
        {currentIndex + 1} / {totalSlides}
      </div>
    </div>
  );
}
