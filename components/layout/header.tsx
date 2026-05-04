"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import Link from "next/link";
import { Moon, Sun, Code2 } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const SearchBox = lazy(() => import("@/components/search/search-box").then((mod) => ({ default: mod.SearchBox })));

/* ─────────────────────────────────────────
   미니멀 고정 헤더 컴포넌트
   - 블로그 로고/타이틀 (좌측)
   - 다크/라이트 모드 토글 (우측)
   - 반투명 블러 배경으로 슬라이드 위에 표시
───────────────────────────────────────── */
interface HeaderProps {
  isAuthenticated?: boolean;
}

export function Header({ isAuthenticated = false }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className="relative z-50 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border/60 bg-background/80 px-6 backdrop-blur-md sm:px-10 md:px-16"
      aria-label="사이트 헤더"
    >
      {/* 블로그 로고 */}
      <Link
        href="/"
        className="group flex shrink-0 items-center gap-2.5 font-bold text-foreground transition-opacity hover:opacity-80"
        aria-label="블로그 홈으로 이동"
      >
        {/* 오렌지 아이콘 박스 */}
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary transition-shadow duration-200 group-hover:shadow-lg"
          style={{ boxShadow: "0 0 12px oklch(0.68 0.21 48 / 0.4)" }}
        >
          <Code2 className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="hidden text-sm font-semibold tracking-tight sm:inline">
          유주&apos;s Blog
        </span>
      </Link>

      {/* 검색 박스 */}
      <Suspense fallback={<div className="h-10 w-32 rounded bg-muted/50" />}>
        <SearchBox />
      </Suspense>

      {/* 관리자 상태 표시 */}
      <Link href={isAuthenticated ? "/admin" : "/admin/login"} className="shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="min-h-11"
          aria-label={isAuthenticated ? "관리자 페이지" : "관리자 로그인"}
        >
          {isAuthenticated ? "관리자" : "로그인"}
        </Button>
      </Link>

      {/* 다크/라이트 모드 토글 버튼 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="shrink-0 rounded-full text-foreground transition-all hover:bg-primary/10 hover:text-primary min-h-11 min-w-11"
        aria-label="다크/라이트 모드 전환"
      >
        {mounted && theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : mounted ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </header>
  );
}
