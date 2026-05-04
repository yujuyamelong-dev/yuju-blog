"use client";

import { Github, ArrowRight, Code2, Cpu, Globe, FileText } from "lucide-react";

/* 기술 스택 배지 타입 */
interface SkillBadge {
  label: string;
  color: string;
}

/* 주요 기술 스택 목록 */
const skills: SkillBadge[] = [
  { label: "TypeScript", color: "border-blue-500/40 text-blue-400 bg-blue-500/10" },
  { label: "Next.js", color: "border-white/20 text-white/80 bg-white/5" },
  { label: "React", color: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10" },
  { label: "Tailwind CSS", color: "border-teal-500/40 text-teal-400 bg-teal-500/10" },
  { label: "Node.js", color: "border-green-500/40 text-green-400 bg-green-500/10" },
  { label: "Java", color: "border-orange-500/40 text-orange-400 bg-orange-500/10" },
  { label: "Vue.js", color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" },
];

interface HomeSlideProp {
  postCount?: number;
  onViewPosts?: () => void;
}

/* ─────────────────────────────────────────
   홈/자기소개 슬라이드 컴포넌트
   첫 번째 슬라이드로 표시되는 히어로 화면
───────────────────────────────────────── */
export function HomeSlide({ postCount, onViewPosts }: HomeSlideProp) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white">

      {/* 격자 배경 패턴 */}
      <div className="grid-pattern absolute inset-0" />

      {/* 배경 이미지 - 다크 모드에만 표시 */}
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block opacity-70"
        style={{
          backgroundImage: "url('/dev-hero.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* 배경 오버레이 - 다크 모드에만 */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block bg-gradient-to-r from-background/80 via-background/60 to-background/40" />

      {/* 배경 오렌지 글로우 효과 - 우측 상단 */}
      <div
        className="pointer-events-none absolute right-1/4 top-1/4 h-80 w-80 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.21 48 / 0.12) 0%, transparent 70%)",
        }}
      />

      {/* 배경 오렌지 글로우 효과 - 좌측 하단 */}
      <div
        className="pointer-events-none absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.21 48 / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* 3D 큐브 장식 요소 - 우측 */}
      <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 xl:block">
        <CubeDecoration size={120} />
      </div>

      {/* 3D 큐브 장식 요소 - 좌측 하단 */}
      <div className="pointer-events-none absolute bottom-16 left-20 hidden opacity-40 xl:block">
        <CubeDecoration size={60} />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-start px-4 sm:px-6 md:px-16 lg:px-20 xl:px-24">

        {/* 인사말 태그 */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 sm:px-4 whitespace-nowrap">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-xs font-medium text-primary">안녕하세요, 반갑습니다!</span>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          <span className="block">저는</span>
          {/* 오렌지 강조 이름 */}
          <span
            className="block text-primary"
            style={{ textShadow: "0 0 40px oklch(0.68 0.21 48 / 0.4)" }}
          >
            유주
          </span>
          <span className="block text-foreground/80">입니다.</span>
        </h1>

        {/* 서브 타이틀 */}
        <p className="mb-2 text-lg font-medium text-muted-foreground sm:text-xl">
          <Code2 className="mr-2 inline h-5 w-5 text-primary" />
          풀스텍 개발자
        </p>

        <p className="mb-2 text-lg font-medium text-muted-foreground sm:text-xl">
          <Code2 className="mr-2 inline h-5 w-5 text-primary" />
          AI 네이티브 개발자
        </p>

        {/* 소개 문장 */}
        <p className="mb-8 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          개발하면서 배우고 경험한 것들을 기록합니다.
          <br />
          다양한 프로그래밍 언어를 배우는 것과 좋은 UI/UX를 만드는 것에 <br />관심이 많습니다.
        </p>

        {/* 기술 스택 배지들 */}
        <div className="mb-10 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.label}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${skill.color}`}
            >
              {skill.label}
            </span>
          ))}
        </div>

        {/* CTA 버튼 그룹 */}
        <div className="flex flex-wrap items-center gap-3">
          {/* 블로그 글 보기 버튼 */}
          <button
            onClick={onViewPosts}
            className="group inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg"
            style={{ boxShadow: "0 0 20px oklch(0.68 0.21 48 / 0.3)" }}
            aria-label="다음 포스트로 이동"
          >
            블로그 글 보기
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* GitHub 링크 버튼 */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>

          {/* 이력서 링크 버튼 */}
          <a
            href="https://yujuyamelong-dev.github.io/my-web-profile/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary"
          >
            <FileText className="h-4 w-4" />
            이력서 보러가기
          </a>
        </div>

        {/* 하단 스탯 카드 그룹 */}
        <div className="mt-12 flex flex-wrap gap-6">
          <StatCard icon={<Code2 className="h-4 w-4" />} value={String(postCount ?? 0)} label="포스트" />
          <StatCard icon={<Globe className="h-4 w-4" />} value="3+" label="프로젝트" />
          <StatCard icon={<Cpu className="h-4 w-4" />} value="5+" label="기술 스택" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   통계 카드 서브 컴포넌트
───────────────────────────────────────── */
interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-border bg-card/50 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm">
      <span className="text-primary text-sm sm:text-base">{icon}</span>
      <div>
        <div className="text-base sm:text-lg font-bold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   3D 큐브 장식 SVG 컴포넌트
   CSS border로 큐브 투영 효과 구현
───────────────────────────────────────── */
interface CubeDecorationProps {
  size: number;
}

function CubeDecoration({ size }: CubeDecorationProps) {
  const half = size / 2;
  const quarter = size / 4;
  /* 오렌지 색상으로 큐브 라인 렌더링 */
  const strokeColor = "oklch(0.68 0.21 48 / 0.5)";
  const fillTop = "oklch(0.68 0.21 48 / 0.08)";
  const fillRight = "oklch(0.68 0.21 48 / 0.05)";
  const fillLeft = "oklch(0.68 0.21 48 / 0.04)";

  return (
    <svg
      width={size * 1.5}
      height={size * 1.5}
      viewBox={`0 0 ${size * 1.5} ${size * 1.5}`}
      fill="none"
      aria-hidden="true"
    >
      {/* 큐브 윗면 */}
      <polygon
        points={`${half * 1.5},${quarter} ${size * 1.5 - quarter},${half} ${half * 1.5},${size - quarter} ${quarter},${half}`}
        fill={fillTop}
        stroke={strokeColor}
        strokeWidth="1"
      />
      {/* 큐브 오른쪽 면 */}
      <polygon
        points={`${size * 1.5 - quarter},${half} ${size * 1.5 - quarter},${size + quarter} ${half * 1.5},${size * 1.5 - quarter} ${half * 1.5},${size - quarter}`}
        fill={fillRight}
        stroke={strokeColor}
        strokeWidth="1"
      />
      {/* 큐브 왼쪽 면 */}
      <polygon
        points={`${quarter},${half} ${quarter},${size + quarter} ${half * 1.5},${size * 1.5 - quarter} ${half * 1.5},${size - quarter}`}
        fill={fillLeft}
        stroke={strokeColor}
        strokeWidth="1"
      />
    </svg>
  );
}
