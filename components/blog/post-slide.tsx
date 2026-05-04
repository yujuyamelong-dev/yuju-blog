"use client";

import { Clock, ArrowRight, Tag, Calendar } from "lucide-react";
import Link from "next/link";
import type { PostSlideData } from "@/lib/types";

/* 카테고리별 테마 색상 매핑 */
const colorMap: Record<PostSlideData["colorTheme"], {
  badge: string;
  number: string;
  dot: string;
  border: string;
  glow: string;
}> = {
  blue: {
    badge: "border-blue-500/40 text-blue-400 bg-blue-500/10",
    number: "text-blue-400/30",
    dot: "bg-blue-400",
    border: "border-blue-500/20",
    glow: "oklch(0.6 0.2 230 / 0.15)",
  },
  purple: {
    badge: "border-purple-500/40 text-purple-400 bg-purple-500/10",
    number: "text-purple-400/30",
    dot: "bg-purple-400",
    border: "border-purple-500/20",
    glow: "oklch(0.55 0.25 300 / 0.15)",
  },
  green: {
    badge: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    number: "text-emerald-400/30",
    dot: "bg-emerald-400",
    border: "border-emerald-500/20",
    glow: "oklch(0.65 0.18 160 / 0.15)",
  },
  orange: {
    badge: "border-orange-500/40 text-orange-400 bg-orange-500/10",
    number: "text-orange-400/30",
    dot: "bg-orange-400",
    border: "border-orange-500/20",
    glow: "oklch(0.68 0.21 48 / 0.2)",
  },
  rose: {
    badge: "border-rose-500/40 text-rose-400 bg-rose-500/10",
    number: "text-rose-400/30",
    dot: "bg-rose-400",
    border: "border-rose-500/20",
    glow: "oklch(0.6 0.25 10 / 0.15)",
  },
  cyan: {
    badge: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
    number: "text-cyan-400/30",
    dot: "bg-cyan-400",
    border: "border-cyan-500/20",
    glow: "oklch(0.7 0.15 200 / 0.15)",
  },
  yellow: {
    badge: "border-yellow-500/40 text-yellow-400 bg-yellow-500/10",
    number: "text-yellow-400/30",
    dot: "bg-yellow-400",
    border: "border-yellow-500/20",
    glow: "oklch(0.85 0.2 90 / 0.15)",
  },
};

/* ─────────────────────────────────────────
   단일 포스트 슬라이드 컴포넌트
   한 화면에 포스트 1개를 크게 보여주는 뷰
───────────────────────────────────────── */
export function PostSlide({ post }: { post: PostSlideData }) {
  const colors = colorMap[post.colorTheme];

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">

      {/* 격자 배경 패턴 */}
      <div className="grid-pattern absolute inset-0" />

      {/* 카테고리별 배경 글로우 */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
        }}
      />

      {/* 포스트 카드 - 메인 콘텐츠 */}
      <article className="relative z-10 mx-auto w-full max-w-3xl px-8 md:px-16">

        {/* 큰 번호 장식 - 배경에 반투명 */}
        <div
          className={`pointer-events-none absolute -right-4 -top-8 select-none text-[10rem] font-black leading-none md:text-[14rem] ${colors.number}`}
          aria-hidden="true"
        >
          {String(post.index).padStart(2, "0")}
        </div>

        {/* 상단: 카테고리 뱃지 + 메타 정보 */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {/* 카테고리 뱃지 */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${colors.badge}`}
          >
            <Tag className="h-3 w-3" />
            {post.category}
          </span>

          {/* 구분점 */}
          <span className="h-1 w-1 rounded-full bg-border" />

          {/* 날짜 */}
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {post.publishedAt}
          </span>

          {/* 구분점 */}
          <span className="h-1 w-1 rounded-full bg-border" />

          {/* 읽기 시간 */}
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} 읽기
          </span>
        </div>

        {/* 포스트 제목 */}
        <h2 className="mb-6 text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {post.title}
        </h2>

        {/* 구분선 */}
        <div className={`mb-6 h-px w-16 bg-gradient-to-r from-primary to-transparent`} />

        {/* 포스트 설명 */}
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {post.description}
        </p>

        {/* 읽기 버튼 */}
        <Link
          href={`/posts/${post.slug}`}
          className="group inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90"
          style={{ boxShadow: "0 0 20px oklch(0.68 0.21 48 / 0.3)" }}
        >
          읽기
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>

        {/* 하단 장식 도트 패턴 */}
        <div className="mt-12 flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === 0
                  ? `h-2 w-2 ${colors.dot}`
                  : "h-1 w-1 bg-border"
              }`}
            />
          ))}
        </div>
      </article>
    </div>
  );
}
