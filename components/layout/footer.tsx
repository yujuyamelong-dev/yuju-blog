import Link from "next/link";
import { PenSquare, Github, Twitter, Rss } from "lucide-react";
import { Separator } from "@/components/ui/separator";

/* 블로그 탐색 링크 */
const exploreLinks = [
  { href: "/", label: "홈" },
  { href: "/posts", label: "모든 글" },
  { href: "/categories", label: "카테고리" },
  { href: "/search", label: "검색" },
];

/* 외부 리소스 링크 */
const resourceLinks = [
  { href: "https://nextjs.org", label: "Next.js", external: true },
  { href: "https://ui.shadcn.com", label: "shadcn/ui", external: true },
  { href: "https://tailwindcss.com", label: "Tailwind CSS", external: true },
  { href: "https://www.notion.so", label: "Notion", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">

        {/* 상단 컨텐츠 영역 */}
        <div className="grid gap-10 sm:grid-cols-3">

          {/* 블로그 소개 */}
          <div className="sm:col-span-1">
            <Link
              href="/"
              className="mb-4 flex items-center gap-2 font-bold text-foreground transition-opacity hover:opacity-80"
              aria-label="블로그 홈"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <PenSquare className="h-4 w-4 text-primary-foreground" />
              </div>
              <span>개발 블로그</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              개발하면서 배우고 경험한 것들을 기록하는 기술 블로그입니다.
              Notion CMS로 관리됩니다.
            </p>

            {/* 소셜 링크 */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub 프로필"
                /* TODO: 실제 GitHub URL로 변경 */
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter 프로필"
                /* TODO: 실제 Twitter URL로 변경 */
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="/rss.xml"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="RSS 피드 구독"
                /* TODO: RSS 피드 파일 생성 */
              >
                <Rss className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* 탐색 링크 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">탐색</h3>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 기술 스택 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">기술 스택</h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* 하단 저작권 영역 */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 개발 블로그. All rights reserved.</p>
          <p className="text-xs">
            {/* TODO: 배포 날짜 또는 마지막 업데이트 날짜를 동적으로 표시 */}
            Next.js 15 + Tailwind CSS v4 + Notion CMS
          </p>
        </div>
      </div>
    </footer>
  );
}
