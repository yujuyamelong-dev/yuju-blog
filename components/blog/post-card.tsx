"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Tag } from "lucide-react";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  className?: string;
}

// 카테고리 색상에 따른 배지 스타일 매핑
const CATEGORY_COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-600 border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/30",
  purple:
    "bg-purple-500/10 text-purple-600 border-purple-500/30 dark:bg-purple-500/15 dark:text-purple-400 dark:border-purple-500/30",
  green:
    "bg-green-500/10 text-green-600 border-green-500/30 dark:bg-green-500/15 dark:text-green-400 dark:border-green-500/30",
  orange:
    "bg-orange-500/10 text-orange-600 border-orange-500/30 dark:bg-orange-500/15 dark:text-orange-400 dark:border-orange-500/30",
  rose: "bg-rose-500/10 text-rose-600 border-rose-500/30 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30",
  cyan: "bg-cyan-500/10 text-cyan-600 border-cyan-500/30 dark:bg-cyan-500/15 dark:text-cyan-400 dark:border-cyan-500/30",
  yellow:
    "bg-yellow-500/10 text-yellow-600 border-yellow-500/30 dark:bg-yellow-500/15 dark:text-yellow-400 dark:border-yellow-500/30",
  default:
    "bg-primary/10 text-primary border-primary/30 dark:bg-primary/15 dark:text-primary dark:border-primary/30",
};

// 카테고리 색상에 따른 커버 이미지 플레이스홀더 그라디언트 매핑
const COVER_GRADIENT_MAP: Record<string, string> = {
  blue: "from-blue-900/60 via-blue-800/40 to-slate-900/80",
  purple: "from-purple-900/60 via-purple-800/40 to-slate-900/80",
  green: "from-green-900/60 via-emerald-800/40 to-slate-900/80",
  orange: "from-orange-900/60 via-amber-800/40 to-stone-900/80",
  rose: "from-rose-900/60 via-pink-800/40 to-slate-900/80",
  cyan: "from-cyan-900/60 via-teal-800/40 to-slate-900/80",
  yellow: "from-yellow-900/60 via-amber-800/40 to-stone-900/80",
  default: "from-orange-950/70 via-orange-900/50 to-stone-950/80",
};

export function PostCard({ post, className }: PostCardProps) {
  const router = useRouter();

  // 카테고리 색상 결정 (없으면 default)
  const categoryColor = post.category?.color ?? "default";
  const categoryBadgeStyle =
    CATEGORY_COLOR_MAP[categoryColor] ?? CATEGORY_COLOR_MAP.default;
  const coverGradient =
    COVER_GRADIENT_MAP[categoryColor] ?? COVER_GRADIENT_MAP.default;

  // 발행일 포맷
  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div
      className={cn("group block h-full cursor-pointer", className)}
      onClick={() => router.push(`/posts/${post.slug}`)}
    >
      <Card
        data-testid="post-card"
        className={cn(
          // 기본 카드 스타일
          "relative h-full overflow-hidden border transition-all duration-300",
          // 라이트 모드: 흰 배경 + 오렌지 보더
          "border-orange-200/60 bg-white shadow-sm",
          // 다크 모드: 딥 다크 배경 + 오렌지 보더
          "dark:border-orange-500/20 dark:bg-card dark:shadow-none",
          // 호버: 보더 강조 + 오렌지 글로우
          "hover:border-orange-400/80 hover:shadow-[0_4px_24px_oklch(0.65_0.19_48_/_0.15)]",
          "dark:hover:border-orange-500/50 dark:hover:shadow-[0_4px_32px_oklch(0.68_0.21_48_/_0.18)]",
          // 호버 시 카드 살짝 위로
          "hover:-translate-y-0.5"
        )}
      >
        {/* 커버 이미지 영역 */}
        <div className="relative h-44 w-full overflow-hidden bg-muted sm:h-48">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className={cn(
                "grid-pattern h-full w-full bg-gradient-to-br",
                coverGradient
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-16 rounded-full border border-orange-500/20 bg-orange-500/5 backdrop-blur-sm" />
                <div className="absolute size-8 rounded-full bg-orange-500/10" />
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/80 to-transparent dark:from-card/90" />

          {post.category && (
            <Link
              href={`/categories/${encodeURIComponent(post.category.name)}`}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-3 top-3"
            >
              <span
                className={cn(
                  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium backdrop-blur-sm",
                  categoryBadgeStyle
                )}
                data-testid="category-link"
                data-category={post.category.slug}
              >
                {post.category.name}
              </span>
            </Link>
          )}
        </div>

        {/* 콘텐츠 영역 */}
        <div className="flex flex-col gap-3 p-4 pt-3">
          {/* 제목 */}
          <Link
            href={`/posts/${post.slug}`}
            onClick={(e) => e.stopPropagation()}
            data-testid="post-link"
          >
            <h3
              className={cn(
                "line-clamp-2 text-base font-bold leading-snug tracking-tight",
                "text-foreground transition-colors duration-200",
                "group-hover:text-primary"
              )}
            >
              {post.title}
            </h3>
          </Link>

          {/* 설명 */}
          {post.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          )}

          {/* 태그 */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <Tag className="size-3 shrink-0 text-muted-foreground/60" />
              {post.tags.slice(0, 3).map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tags/${tag.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  data-testid="tag-link"
                  data-tag={tag.slug}
                  className="rounded-sm bg-muted px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground dark:bg-muted/50"
                >
                  {tag.name}
                </Link>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-muted-foreground/60">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* 하단: 발행일 + 오렌지 라인 */}
          <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3 dark:border-border/30">
            {formattedDate ? (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="size-3 shrink-0" />
                <time dateTime={post.publishedDate ?? ""}>{formattedDate}</time>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground/40">미발행</span>
            )}

            <span
              className={cn(
                "text-xs font-medium text-primary/0 transition-all duration-200",
                "group-hover:text-primary/80 group-hover:translate-x-0.5"
              )}
              aria-hidden="true"
            >
              읽기 →
            </span>
          </div>
        </div>

        {/* 호버 시 좌측 오렌지 액센트 바 */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-0.5 bg-primary/0 transition-all duration-300",
            "group-hover:bg-primary/80"
          )}
          aria-hidden="true"
        />
      </Card>
    </div>
  );
}

// 로딩 스켈레톤 컴포넌트
export function PostCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden border border-orange-200/40 dark:border-orange-500/10">
      {/* 커버 이미지 스켈레톤 */}
      <Skeleton className="h-44 w-full rounded-none sm:h-48" />

      <div className="flex flex-col gap-3 p-4 pt-3">
        {/* 제목 스켈레톤 */}
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>

        {/* 설명 스켈레톤 */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* 태그 스켈레톤 */}
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14 rounded-sm" />
          <Skeleton className="h-5 w-16 rounded-sm" />
          <Skeleton className="h-5 w-12 rounded-sm" />
        </div>

        {/* 발행일 스켈레톤 */}
        <div className="mt-auto border-t border-border/50 pt-3 dark:border-border/30">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </Card>
  );
}
