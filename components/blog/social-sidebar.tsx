"use client";

import { Github, Mail } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/* 소셜 링크 타입 정의 */
interface SocialLink {
  href: string;
  label: string;
  icon: React.ElementType;
  external?: boolean;
}

/* 소셜 미디어 링크 목록 - TODO: 실제 URL로 교체 */
const socialLinks: SocialLink[] = [
  {
    href: "https://github.com",
    label: "GitHub",
    icon: Github,
    external: true,
  },
  {
    href: "mailto:yujuyamelong@gmail.com",
    label: "이메일",
    icon: Mail,
  }
];

/* ─────────────────────────────────────────
   왼쪽 고정 소셜 사이드바 컴포넌트
   세로 중앙에 아이콘 스택으로 배치
───────────────────────────────────────── */
export function SocialSidebar() {
  return (
    /* 왼쪽 고정 사이드바 - 세로 중앙 정렬 */
    <aside
      className="fixed left-0 top-0 z-40 hidden h-full w-14 flex-col items-center justify-center gap-1 lg:flex"
      aria-label="소셜 미디어 링크"
    >
      {/* 상단 세로 라인 장식 */}
      <div className="mb-4 h-16 w-px bg-gradient-to-b from-transparent to-border" />

      {/* 소셜 아이콘 목록 */}
      <div className="flex flex-col items-center gap-1">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Tooltip key={link.href} delayDuration={200}>
              <TooltipTrigger asChild>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  aria-label={link.label}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:text-primary"
                >
                  {/* 호버 시 오렌지 배경 글로우 */}
                  <span className="absolute inset-0 rounded-lg bg-primary/0 transition-all duration-200 group-hover:bg-primary/10" />
                  <Icon className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                <p className="text-xs">{link.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* 하단 세로 라인 장식 */}
      <div className="mt-4 h-16 w-px bg-gradient-to-b from-border to-transparent" />
    </aside>
  );
}
