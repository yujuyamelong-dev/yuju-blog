# 개발 가이드 (AI 에이전트용)

## 프로젝트 개요

**프로젝트명**: Notion CMS 기반 개인 개발 블로그 플랫폼

**목적**: Notion에서 작성한 글이 자동으로 블로그에 반영되는 빠르고 깔끔한 개인 기술 블로그 구축

**기술 스택**:
- **프레임워크**: Next.js 15 (App Router), React 19
- **언어**: TypeScript (strict 모드, any 금지)
- **스타일링**: Tailwind CSS v4 (설정 파일 없음, globals.css에서만 커스터마이징)
- **UI 라이브러리**: shadcn/ui (Radix UI 기반)
- **외부 API**: Notion API (@notionhq/client)
- **다크모드**: next-themes
- **배포**: Vercel
- **테스트**: Playwright MCP

---

## 프로젝트 아키텍처

### 디렉토리 구조

```
my-blog/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (Geist 폰트, ThemeProvider)
│   ├── page.tsx                # 홈 페이지 (글 목록)
│   ├── globals.css             # Tailwind v4 + 색상 토큰
│   ├── providers.tsx           # next-themes ThemeProvider (use client)
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx        # 글 상세 페이지
│   ├── categories/
│   │   └── [category]/
│   │       └── page.tsx        # 카테고리 필터 페이지
│   └── search/
│       └── page.tsx            # 검색 결과 페이지
├── components/
│   ├── layout/
│   │   ├── header.tsx          # 검색창, 테마 토글, 메뉴
│   │   └── footer.tsx          # 푸터 링크
│   ├── blog/
│   │   ├── post-card.tsx       # 글 카드 컴포넌트
│   │   ├── post-content.tsx    # Notion 블록 렌더러
│   │   ├── toc.tsx             # 목차(Table of Contents)
│   │   └── category-filter.tsx # 카테고리 필터 UI
│   ├── search/
│   │   └── search-box.tsx      # 검색 입력 필드
│   └── ui/                     # shadcn/ui 컴포넌트들
├── lib/
│   ├── notion.ts               # Notion API 클라이언트
│   ├── types.ts                # TypeScript 타입 정의
│   ├── mock-posts.ts           # 더미 데이터 (Phase 2)
│   └── utils.ts                # cn() 유틸함수
├── tasks/                      # Task 파일 저장소
│   ├── 000-sample.md           # Task 템플릿
│   └── XXX-description.md      # 구체적인 Task 파일들
├── docs/
│   ├── ROADMAP.md              # 개발 계획 및 진행 상황
│   └── PRD.md                  # 제품 요구사항 상세
├── public/                     # 정적 자산 (favicon, og-image 등)
├── .env.local                  # 환경 변수 (git 무시)
├── .env.example                # 환경 변수 가이드
├── .gitignore                  # Git 무시 파일 목록
├── tsconfig.json               # TypeScript 설정
├── next.config.ts              # Next.js 설정
├── tailwind.config.ts          # (없음) - Tailwind v4는 설정파일 불필요
└── shrimp-rules.md             # 이 파일 (AI 에이전트용 규칙)
```

### 핵심 파일 및 역할

| 파일 | 역할 | 수정 규칙 |
|------|------|---------|
| `docs/ROADMAP.md` | 개발 계획, Phase별 Task, 진행 상황 추적 | **필수**: Task 완료 시마다 상태 업데이트 (✅, 🔵, ⚠️ 등) |
| `lib/types.ts` | Post, Category, Tag, NotionBlock 등 타입 정의 | 새 기능 추가 시 반드시 먼저 타입 정의 후 구현 |
| `lib/notion.ts` | Notion API 클라이언트 (getAllPosts, getPostBySlug, getPostBlocks 등) | ISR 캐싱 정책 유지 (revalidate: 86400) |
| `app/globals.css` | Tailwind CSS v4 설정, 색상 토큰 (@theme inline) | 다크모드 색상 수정 시 :root와 .dark 모두 수정 |
| `tasks/XXX-description.md` | 개별 Task 명세서 | 구현 중 단계 진행 상황 업데이트 필수 |

---

## 개발 워크플로우 표준

### Phase별 진행 순서

프로젝트는 **5가지 Phase**로 나뉘어 진행됩니다:

1. **Phase 1 (M1)**: 환경 설정 및 골격 구축 (Task 001~004)
2. **Phase 2 (M2)**: MVP 기능 구현 (Task 005~009)
3. **Phase 3 (M3)**: 추가 기능 구현 (Task 010~013)
4. **Phase 4 (M4)**: 디자인 & 최적화 (Task 014~017)
5. **Phase 5 (M5)**: 배포 및 QA (Task 018~020)

**의존성 규칙**: 선행 Task 완료 없이 후속 Task 진행 불가. `docs/ROADMAP.md`의 "Task 의존성 그래프" 참고.

### Task 파일 명명 규칙

```
/tasks/XXX-description.md
```

- `XXX`: 3자리 숫자 (001, 002, ... 020)
- `description`: Task 설명 (예: `001-setup.md`, `007-home-page.md`)

### Task 파일 필수 섹션

모든 Task 파일(`/tasks/XXX-*.md`)은 다음 구조를 따라야 함:

```markdown
# Task XXX: [Task 명]

## 개요
[한 문장 설명]

## 범위
[무엇을 구현하는가]

## 관련 파일
- `app/page.tsx` - 수정
- `lib/types.ts` - 참고
- `lib/notion.ts` - 새로 작성
- ...

## 수락 기준 (Acceptance Criteria)
- [ ] 기준 1
- [ ] 기준 2
- ...

## 구현 단계 (Implementation Steps)
1. 단계 1
   - [ ] 세부 항목 1
   - [ ] 세부 항목 2
2. 단계 2
   - [ ] 세부 항목 1

## 테스트 체크리스트 (필수)
*(API/비즈니스 로직 작업인 경우 필수)*

### Playwright MCP 테스트 시나리오
- [ ] 시나리오 1 (예: 글 목록 로드 시 10개 글 표시)
- [ ] 시나리오 2 (예: 글 클릭 시 상세 페이지 표시)
- [ ] 엣지 케이스 (예: 빈 상태, 404)

### 수동 테스트 (필요시)
- [ ] 항목 1
- [ ] 항목 2

## 진행 상황
- [ ] 구현 완료
- [ ] 테스트 통과
- [ ] ROADMAP.md 업데이트 완료

## 참고 사항
[특별한 주의사항, 제약사항 등]
```

**예외**: Task 005 (UI 컴포넌트), Task 014 (다크모드) 등 UI 관련 작업은 Playwright 테스트가 필수는 아니지만 권장됨.

---

## 코드 구현 표준

### 1. TypeScript 타입 정의

**규칙**: 모든 함수, 변수, 컴포넌트는 명시적 타입 정의 필수 (any 금지)

```typescript
// ❌ 금지
function getPosts(limit) {
  // ...
}

// ✅ 필수
function getPosts(limit: number): Promise<Post[]> {
  // ...
}
```

**lib/types.ts 필수 타입**:

```typescript
// Post 타입 (Notion 게시물)
interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  publishedDate: Date;
  modifiedDate: Date;
  featured: boolean;
  notionPageId: string;
}

// 추가 타입: Category, Tag, NotionBlock 등
```

### 2. Notion API 클라이언트 (lib/notion.ts)

**ISR 캐싱 규칙**: 모든 Notion 데이터 페칭 함수는 **revalidate: 86400** (24시간) 캐싱 필수

```typescript
// lib/notion.ts
export async function getAllPosts() {
  // Notion API 호출
  // ...
  return posts;
}

// app/page.tsx (Server Component)
export const revalidate = 86400;  // 24시간 캐싱

export default async function Home() {
  const posts = await getAllPosts();  // 캐시된 데이터
  // ...
}
```

**Notion API Rate Limit**: 3 request/sec (초당 최대 3개 요청)
- `Promise.all()` 사용 시 최대 3개 요청만 병렬 처리
- 4개 이상이면 순차 처리 또는 배치 처리 필수

**지원 블록 타입**:
- Paragraph, Heading 1/2/3
- Code (언어별 문법강조)
- Image
- Bulleted List, Numbered List
- Quote

**미지원 블록**: fallback UI 제공 또는 경고 로그 출력

### 3. Tailwind CSS v4 및 다크모드

**구조**:
- `app/globals.css`에서 **@import "tailwindcss"** 로 시작
- **@theme inline {}** 블록에서 색상 토큰 정의
- `:root` (라이트 모드), `.dark` (다크 모드) 선택자에서 OKLCH 색상 정의
- 다크모드: `<html>` 요소에 `.dark` 클래스 적용 (next-themes)

```css
/* app/globals.css */
@import "tailwindcss";

@theme inline {
  --color-primary: oklch(0.5 0.18 260);
  --color-destructive: oklch(0.577 0.245 27.325);
}

:root {
  --primary: oklch(0.5 0.18 260);
  --background: oklch(0.99 0 0);
  --foreground: oklch(0.2 0 0);
}

.dark {
  --primary: oklch(0.7 0.15 260);
  --background: oklch(0.1 0 0);
  --foreground: oklch(0.95 0 0);
}
```

**Hydration 불일치 방지**:
- `app/layout.tsx`에 `suppressHydrationWarning` 속성 필수
- next-themes `disableTransitionOnChange` 옵션 활용

### 4. 컴포넌트 구조

**Server Component vs Client Component**:
- **기본값**: Server Component
- **"use client" 필수 경우**: 상태 관리, 이벤트 핸들러, hooks 사용
- **예외**: Providers.tsx (next-themes ThemeProvider)

```typescript
// ✅ Server Component (기본값)
export async function PostCard({ post }: { post: Post }) {
  return <article>{/* ... */}</article>;
}

// ✅ Client Component (필요시에만)
"use client";
export function SearchBox() {
  const [query, setQuery] = useState("");
  // ...
}
```

### 5. 검색 기능 (debouncing)

**규칙**: 검색 입력 시 **debouncing 300ms** 필수

```typescript
"use client";
import { useCallback } from "react";
import { debounce } from "lodash";

export function SearchBox() {
  const handleSearch = useCallback(
    debounce((query: string) => {
      // API 호출 또는 상태 업데이트
    }, 300),
    []
  );
  
  return <input onChange={(e) => handleSearch(e.target.value)} />;
}
```

### 6. 반응형 디자인

**브레이크포인트**: 360px (모바일) ~ 1920px (데스크톱)

```typescript
// Tailwind 반응형 클래스 사용
<div className="
  grid grid-cols-1        // 모바일: 1 컬럼
  sm:grid-cols-2          // sm: 2 컬럼
  md:grid-cols-3          // md: 3 컬럼
  lg:grid-cols-4          // lg: 4 컬럼
  gap-4
">
  {/* ... */}
</div>
```

**모바일 우선 접근법**: 기본 CSS로 모바일 스타일, `md:`, `lg:` 등으로 확대 화면 스타일 적용

---

## 테스트 표준 (Playwright MCP)

### 언제 Playwright 테스트 필수인가?

**필수 케이스**:
1. **API 연동 작업** (Task 006: Notion API 클라이언트)
2. **비즈니스 로직** (Task 007: 홈 페이지, Task 008: 글 상세, Task 009: 카테고리 필터)
3. **E2E 테스트** (Task 019: 통합 테스트)

**선택 케이스**:
- UI 컴포넌트 (Task 005, 014, 015 등)

### Playwright MCP 테스트 템플릿

```markdown
### Playwright MCP 테스트 시나리오

#### 시나리오 1: 홈 페이지 글 목록 로드
- [ ] 브라우저 열기 및 홈 페이지 접속 (`http://localhost:3000`)
- [ ] PostCard 컴포넌트 최소 10개 표시 확인
- [ ] 각 카드에 제목, 요약, 카테고리, 태그, 발행일 포함 확인
- [ ] Skeleton 로딩 상태 표시 확인 (API 응답 지연 시뮬레이션)

#### 시나리오 2: 글 상세 페이지
- [ ] 홈 페이지에서 글 제목 클릭
- [ ] `/posts/[slug]` 경로로 이동 확인
- [ ] Notion 블록 렌더링 확인:
  - [ ] Paragraph 블록
  - [ ] Heading 1/2/3 블록
  - [ ] Code 블록 (언어별 하이라이트)
  - [ ] Image 블록
- [ ] 메타 정보 영역 확인 (제목, 카테고리, 태그, 발행/수정일)
- [ ] 이전/다음 글 네비게이션 동작 확인

#### 시나리오 3: 카테고리 필터
- [ ] 홈 페이지에서 카테고리 선택
- [ ] `/categories/[category]` 경로로 이동 확인
- [ ] 선택된 카테고리에 해당하는 글만 표시 확인

#### 엣지 케이스
- [ ] 빈 카테고리 (글 없음) → 적절한 메시지 표시
- [ ] 존재하지 않는 slug → 404 페이지 표시
- [ ] Notion API 실패 → fallback UI 또는 에러 메시지 표시
```

### E2E 테스트 전체 플로우 (Task 019)

```
홈 페이지 로드
  → 글 카드 클릭
    → 글 상세 페이지
      → 이전/다음 글 네비게이션
        → 다른 글로 이동

홈 페이지 로드
  → 카테고리 필터 클릭
    → 카테고리 페이지
      → 글 진입

홈 페이지 로드
  → 검색창에 키워드 입력 (debouncing 확인)
    → 검색 결과 페이지
      → 글 진입

다크모드 토글
  → 페이지 새로고침 시 다크모드 유지 확인
```

---

## 파일 간 상호작용 규칙

### 파일 수정 체크리스트

**Task 완료 시 다음 파일들을 확인하고 동기화**:

| 상황 | 수정할 파일 | 내용 |
|------|---------|------|
| Task 완료 | `docs/ROADMAP.md` | ✅로 표시, 실제 일수 기록 |
| 새 타입 추가 | `lib/types.ts` | Post, Category, Tag 등 타입 정의 |
| 새 API 함수 | `lib/notion.ts` | revalidate: 86400 캐싱 적용 |
| 색상 변경 | `app/globals.css` | :root와 .dark 모두 수정 |
| 새 라우트 추가 | `app/layout.tsx` | 필요시 Header/Footer 업데이트 |
| Task 구현 중 | `tasks/XXX-*.md` | 진행 상황 업데이트 |

### ROADMAP.md 동기화 규칙

**Task 완료 직후**:

1. Task 상태를 ✅로 변경
2. "실제 일수" 기록
3. Phase별 "상태" 컬럼 업데이트
4. "성공 기준 체크리스트" 해당 항목에 ✅ 표시

```markdown
| 001 | Notion DB 및 Integration 설정 | 0.5d | 0.75d | ✅ | yujuyamelong |
```

---

## 기술 제약사항 및 완화 전략

### 1. Notion API Rate Limiting (3 req/s)

**문제**: Notion API는 초당 최대 3개 요청만 허용

**완화 전략**:
- ISR 캐싱 (revalidate: 86400) 사용으로 빈번한 API 호출 방지
- `Promise.all()` 사용 시 최대 3개 요청만 병렬 처리
- 4개 이상 요청 필요 시 배치 처리 또는 순차 처리
- 재시도 로직 도입 (선택사항)

### 2. Notion 블록 렌더링 누락

**문제**: Notion API가 지원하지 않는 블록 타입 존재 (예: Database, Web Bookmark 등)

**완화 전략**:
- 지원 블록: Paragraph, Heading, Code, Image, List, Quote 만 구현
- 미지원 블록: fallback UI 제공 (예: "지원하지 않는 블록" 메시지)
- 경고 로그 출력으로 개발자 인지

### 3. Notion 이미지 URL 만료 (1시간 TTL)

**문제**: Notion이 제공하는 이미지 URL은 1시간 후 만료됨

**완화 전략**:
- `next/image` 컴포넌트 사용으로 빌드 시점에 이미지 다운로드 및 최적화
- 또는 자체 CDN 캐싱 도입 (Vercel에서 자동 처리 가능)

### 4. Notion DB 스키마 변경

**문제**: Notion 컬럼 구조 변경 시 코드 유지보수 곤란

**완화 전략**:
- TypeScript 타입을 Single Source of Truth로 관리
- 컬럼명을 상수화 (예: const NOTION_FIELDS = { TITLE: "Title", CATEGORY: "Category" })

### 5. 빌드 시간 증가

**문제**: 글 수가 많아질 경우 `generateStaticParams()` 빌드 시간 증가

**완화 전략**:
- 우선순위 글만 정적 생성 (ISR revalidate 사용)
- 나머지는 ISR로 fallback (첫 요청 시 생성)

### 6. API 키 보안

**문제**: Notion API 키 노출 시 보안 위험

**금지 규칙**:
- ❌ `NEXT_PUBLIC_NOTION_API_KEY` (공개 환경변수 금지)
- ❌ 클라이언트 컴포넌트에서 API 호출

**필수 규칙**:
- ✅ `NOTION_API_KEY` (서버 환경변수만 사용)
- ✅ Server Component에서만 API 호출
- ✅ 환경 변수는 `.env.local`에 저장, git 무시

### 7. 다크모드 Hydration 불일치

**문제**: 서버 렌더링과 클라이언트 렌더링의 테마 불일치

**완화 전략**:
- `app/layout.tsx`에 `suppressHydrationWarning` 속성 추가
- next-themes `disableTransitionOnChange` 옵션 활용

```typescript
<html suppressHydrationWarning>
  <body>
    <Providers>
      {/* ... */}
    </Providers>
  </body>
</html>
```

---

## 금지 사항 (Do NOT)

### ❌ 코드 관련

1. **any 타입 사용** → TypeScript strict 모드 위반
2. **환경 변수 public화** (NEXT_PUBLIC_NOTION_API_KEY 등) → 보안 위험
3. **클라이언트에서 Notion API 호출** → API 키 노출 위험
4. **ISR 캐싱 미설정** → API Rate Limit 초과
5. **미지원 블록 타입 무시** → 사용자 콘텐츠 손실
6. **Hydration 경고 무시** → 다크모드 깜박임

### ❌ 워크플로우 관련

1. **Task 파일 없이 구현** → 진행 상황 추적 불가
2. **테스트 체크리스트 생략** (API/비즈니스 로직) → 품질 보증 불가
3. **ROADMAP.md 미갱신** → 진행 상황 불일치
4. **선행 Task 미완료 → 후속 Task 진행** → 의존성 위반
5. **Task 파일에 단계 진행 상황 미기록** → 재검토 곤란

### ❌ 환경 설정 관련

1. **API 키 git에 commit** → 보안 위험
2. **타입 정의 없이 구현** → 유지보수 곤란
3. **globals.css 설정 파일 생성** (Tailwind v4는 설정파일 불필요)
4. **shadcn/ui 스타일 직접 수정** → 업데이트 시 충돌

---

## 의사결정 기준

### 신기술 도입 vs 기존 기술 유지

**기준**:
1. **ROADMAP.md에 명시된 기술만 사용** (예: highlight.js 또는 prism.js)
2. **선택지가 있을 경우 팀 결정 문서 참고** (PRD.md)
3. **미정 기술은 Task 명세에 "(선택)" 표시**

예: Task 013 "코드 문법 강조" → highlight.js vs prism.js 중 선택

### 구현 범위 결정

**규칙**:
1. **ROADMAP.md 수락 기준(Acceptance Criteria) 만족 시 Task 완료**
2. **수락 기준 외 기능은 추가하지 않음** (scope creep 방지)
3. **향후 개선 필요 시 별도 Task 생성**

### 성능 최적화 우선순위

1. **ISR 캐싱** (가장 중요)
2. **Image 최적화** (next/image)
3. **Code Splitting** (Dynamic Import)
4. **Bundle 분석** (필요시)

---

## AI 에이전트 체크리스트

### Task 시작 전
- [ ] Task 파일 검토 (`/tasks/XXX-*.md`)
- [ ] 선행 Task 완료 확인 (ROADMAP.md)
- [ ] 관련 파일 목록 파악
- [ ] 타입 정의 확인 (lib/types.ts)

### 구현 중
- [ ] 타입 먼저 정의
- [ ] Server Component 기본값 유지
- [ ] ISR 캐싱 설정 (revalidate: 86400)
- [ ] Tailwind CSS v4 스타일 적용
- [ ] 다크모드 색상 정의 (.dark 클래스)

### 구현 후
- [ ] Playwright MCP 테스트 실행 (필요시)
- [ ] Task 파일 진행 상황 업데이트
- [ ] ROADMAP.md 동기화 (✅, 일수, 상태 등)
- [ ] 코드 검토 (any 타입, API 키 노출 등)
- [ ] 다음 Task 의존성 확인

### Task 완료 시
- [ ] ✅ Task 완료 표시 (Task 파일 및 ROADMAP.md)
- [ ] 실제 구현 일수 기록
- [ ] Phase 상태 업데이트
- [ ] 성공 기준 체크리스트 확인
- [ ] 다음 Task 준비

---

**문서 버전**: 1.0
**생성일**: 2026-04-25
**최종 수정**: 2026-04-25
