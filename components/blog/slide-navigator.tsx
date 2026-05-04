"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HomeSlide } from "@/components/blog/home-slide";
import { PostSlide } from "@/components/blog/post-slide";
import type { PostSlideData } from "@/lib/types";

/* 슬라이드 네비게이터 Props */
interface SlideNavigatorProps {
  posts: PostSlideData[];
}

/* 슬라이드 전환 방향 타입 */
type Direction = "left" | "right" | null;

/* ─────────────────────────────────────────
   슬라이드 네비게이터 메인 컴포넌트
   - 좌/우 화살표 버튼으로 슬라이드 전환
   - 키보드 방향키 지원
   - 부드러운 슬라이드 애니메이션
   - 현재 페이지 인디케이터 표시
───────────────────────────────────────── */
export function SlideNavigator({ posts }: SlideNavigatorProps) {
  /* 현재 슬라이드 인덱스 (0 = 홈/소개) */
  const [currentIndex, setCurrentIndex] = useState(0);
  /* 전환 방향 (애니메이션 방향 결정) */
  const [direction, setDirection] = useState<Direction>(null);
  /* 애니메이션 진행 중 여부 (중복 클릭 방지) */
  const [isAnimating, setIsAnimating] = useState(false);

  /* 전체 슬라이드 수: 홈(1) + 포스트 수 */
  const totalSlides = posts.length + 1;

  /* 다음 슬라이드로 이동 */
  const goNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= totalSlides - 1) return prev;
      setDirection("right");
      setIsAnimating(true);
      return prev + 1;
    });
  }, [totalSlides]);

  /* 이전 슬라이드로 이동 */
  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return prev;
      setDirection("left");
      setIsAnimating(true);
      return prev - 1;
    });
  }, []);

  /* 특정 인덱스로 직접 이동 (인디케이터 클릭) */
  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex((prev) => {
        if (index === prev) return prev;
        setDirection(index > prev ? "right" : "left");
        setIsAnimating(true);
        return index;
      });
    },
    []
  );

  /* 애니메이션 완료 후 플래그 리셋 */
  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 450);
    return () => clearTimeout(timer);
  }, [isAnimating, currentIndex]);

  /* 키보드 방향키 이벤트 등록 */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  /* 터치 스와이프 지원 */
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = touchStartX - e.changedTouches[0].clientX;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      /* 수평 스와이프가 더 클 때만 처리 */
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) goNext();
        else goPrev();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  /* 현재 표시할 슬라이드 컨텐츠 렌더링 */
  const renderSlide = () => {
    /* 인덱스 0 = 홈 슬라이드 */
    if (currentIndex === 0) return <HomeSlide />;
    /* 인덱스 1~N = 포스트 슬라이드 */
    const post = posts[currentIndex - 1];
    if (!post) return null;
    return <PostSlide post={post} />;
  };

  /* 슬라이드 진입 방향에 따른 초기 위치 클래스 */
  const getSlideClass = () => {
    if (direction === "right") {
      return "animate-slide-in-from-right";
    }
    if (direction === "left") {
      return "animate-slide-in-from-left";
    }
    return "";
  };

  return (
    /* 전체 화면 래퍼 */
    <div className="relative flex h-full w-full flex-col overflow-hidden">

      {/* ─── 슬라이드 콘텐츠 영역 ─── */}
      <div className="relative flex-1 overflow-hidden">
        <div
          key={currentIndex}
          className={`h-full w-full ${getSlideClass()}`}
          style={{
            animation: direction
              ? `slideIn${direction === "right" ? "Right" : "Left"} 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards`
              : undefined,
          }}
        >
          {renderSlide()}
        </div>
      </div>

      {/* ─── 하단 네비게이션 바 ─── */}
      <nav
        className="relative z-20 flex h-16 shrink-0 items-center justify-between border-t border-border/60 bg-background/80 px-6 backdrop-blur-md sm:px-10 md:px-16"
        aria-label="슬라이드 네비게이션"
      >
        {/* 이전 버튼 */}
        <button
          onClick={goPrev}
          disabled={currentIndex === 0 || isAnimating}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="이전 슬라이드"
        >
          <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5 group-disabled:transform-none" />
        </button>

        {/* 중앙: 페이지 인디케이터 */}
        <div className="flex items-center gap-4">
          {/* 도트 인디케이터 */}
          <div className="flex items-center gap-2" role="tablist" aria-label="슬라이드 목록">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`슬라이드 ${i + 1}${i === 0 ? " (홈)" : ""}`}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "h-2 w-6 bg-primary"
                    : "h-2 w-2 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>

          {/* 텍스트 카운터 */}
          <span className="min-w-[3rem] text-center text-xs tabular-nums text-muted-foreground">
            <span className="font-semibold text-foreground">{currentIndex + 1}</span>
            <span className="mx-1">/</span>
            {totalSlides}
          </span>
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={goNext}
          disabled={currentIndex === totalSlides - 1 || isAnimating}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="다음 슬라이드"
        >
          <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-disabled:transform-none" />
        </button>
      </nav>

      {/* 슬라이드 인/아웃 키프레임 애니메이션 인라인 스타일 */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(60px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-60px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
