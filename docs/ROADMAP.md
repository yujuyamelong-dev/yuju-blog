# 개인 개발 블로그 (Notion CMS) 개발 로드맵

Notion을 CMS로 활용하여 개발자가 글쓰기에만 집중할 수 있는 빠르고 깔끔한 개인 기술 블로그를 구축합니다.

## 개요

개인 개발 블로그(Notion CMS)는 **개발자 본인 및 블로그 방문자**를 위한 **Notion 기반 자동 동기화 블로그 플랫폼**으로 다음 기능을 제공합니다:

- **Notion CMS 연동**: Notion에서 작성한 글이 자동으로 블로그에 반영되는 ISR 기반 동기화
- **카테고리 및 태그 필터링**: 카테고리별/태그별 글 필터링 및 직관적인 탐색 경험
- **검색 기능**: 제목 및 태그 기반의 실시간 검색 (debouncing 적용)
- **반응형 디자인 + 다크모드**: 360px ~ 1920px 모든 디바이스 지원, 시스템 인식 다크모드
- **최적화된 콘텐츠 렌더링**: Notion 블록 → HTML 변환, 코드 문법 강조, 자동 목차(TOC) 생성

---

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**
   - 초기 상태 샘플은 `/tasks/000-sample.md` 참조

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 테스트 통과 확인 후 다음 단계로 진행

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 ✅로 표시
   - 진행 상황 추적 표(예정 vs 실제) 갱신

---

## 타임라인 및 마일스톤

| 마일스톤 | 목표 | 관련 Phase | 예상 기간 | 누적 일수 |
|---------|------|-----------|---------|---------|
| **M1: 기초 구성** | Notion API 연동, 개발 환경 및 골격 구축 | Phase 1 | ~2일 | D+2 |
| **M2: MVP 기능** | 글 목록, 글 상세, 카테고리 필터링 | Phase 2 | ~5일 | D+7 |
| **M3: 추가 기능** | 검색, 태그, 코드 문법 강조, 목차(TOC) | Phase 3 | ~3일 | D+10 |
| **M4: 디자인 & 최적화** | 다크모드, 반응형, 성능 및 SEO 최적화 | Phase 4 | ~3일 | D+13 |
| **M5: 배포 & QA** | Vercel 배포, 통합 테스트 및 모니터링 | Phase 5 | ~1일 | D+14 |
| **최종 완성** | 프로덕션 배포 완료 | - | **총 ~14일** | **D+14** |

### 마일스톤 별 핵심 산출물

- **M1 산출물**: Notion DB 스키마, 환경 변수 구성, 라우트 골격, 타입 정의
- **M2 산출물**: 동작하는 글 목록/상세 페이지, 카테고리 페이지, ISR 캐싱
- **M3 산출물**: 검색 페이지, 태그 필터, TOC 자동 생성, Syntax Highlighting
- **M4 산출물**: 다크모드, Lighthouse 80+ 점수, 반응형 검증 완료
- **M5 산출물**: Vercel 프로덕션 배포 URL, E2E 테스트 통과 보고서

---

## 개발 단계

### Phase 1: 환경 설정 및 골격 구축 (M1, ~2일)

> 구조 우선 접근법 적용 — 모든 라우트의 빈 페이지와 타입 정의를 먼저 구축합니다.

- ✅ **Task 001: Notion 데이터베이스 및 Integration 설정** - 우선순위
  - [x] Notion 워크스페이스에 `Blog Posts` 데이터베이스 생성
  - [x] 컬럼 스키마 정의 (Title, Category, Tags, Published Date, Modified Date, Status, Description, Featured)
  - [x] Notion Integration 생성 및 API 키 발급
  - [x] 데이터베이스에 Integration 연결 권한 부여
  - [x] 샘플 게시물 3~5건 등록 (테스트용 더미 데이터)

- ✅ **Task 002: 프로젝트 환경 변수 및 SDK 설치**
  - [x] `@notionhq/client` 패키지 설치
  - [x] `.env.local` 환경 변수 설정 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`, `NEXT_PUBLIC_SITE_URL`)
  - [x] `.env.example` 파일 생성 (가이드용)
  - [x] `.gitignore`에 환경 파일 추가 검증
  - [x] `lib/notion.ts` Notion 클라이언트 초기 구성

- ✅ **Task 003: 라우트 구조 및 빈 페이지 골격 생성**
  - [x] `app/page.tsx` (홈) 골격
  - [x] `app/posts/[slug]/page.tsx` (글 상세) 골격
  - [x] `app/categories/[category]/page.tsx` (카테고리) 골격
  - [x] `app/search/page.tsx` (검색 결과) 골격
  - [x] 각 페이지에 Header/Footer 레이아웃 적용

- ✅ **Task 004: TypeScript 타입 정의 및 인터페이스 설계**
  - [x] `lib/types.ts`에 `Post`, `Category`, `Tag`, `NotionBlock` 타입 정의
  - [x] Notion API 응답 타입 매핑 인터페이스 정의
  - [x] 페이지네이션, 필터 파라미터 타입 정의
  - [x] `any` 타입 사용 금지 원칙 준수

---

### Phase 2: MVP 기능 구현 (M2, ~5일)

> Notion API 연동과 핵심 페이지 기능을 구현합니다. 더미 데이터로 UI를 먼저 완성한 뒤 실제 API로 교체합니다.

- ✅ **Task 005: 공통 UI 컴포넌트 라이브러리 구축**
  - [x] shadcn/ui `Card`, `Badge`, `Button`, `Input`, `Skeleton` 컴포넌트 설치
  - [x] `components/blog/post-card.tsx` (글 카드) 구현
  - [x] `components/layout/header.tsx` 검색창/테마 토글 골격
  - [x] `components/layout/footer.tsx` 링크 구성
  - [x] 더미 데이터(`lib/mock-posts.ts`) 작성

- ✅ **Task 006: Notion API 클라이언트 및 데이터 페칭 레이어**
  - [x] `lib/notion.ts`에 `getAllPosts()` 구현 (Status=발행됨, 최신순 정렬)
  - [x] `getPostBySlug(slug)` 구현
  - [x] `getPostBlocks(pageId)` 구현 (블록 children 조회, 페이지네이션 처리)
  - [x] ISR 캐시 전략 적용 (`revalidate: 86400`, 24시간)
  - [x] **Playwright MCP로 API 응답 통합 테스트** (실제 Notion DB 연동 검증)

- ✅ **Task 007: 홈 페이지 (글 목록) 구현**
  - [x] 발행된 글 최신 10개 표시 (페이지네이션 또는 무한 스크롤)
  - [x] PostCard 컴포넌트로 제목/요약/카테고리/태그/발행일 표시
  - [x] 더미 데이터에서 Notion API 데이터로 교체
  - [x] 빈 상태(Empty State) 및 로딩 Skeleton 처리
  - [x] **Playwright MCP로 홈 페이지 렌더링 E2E 테스트**

- ✅ **Task 008: 글 상세 페이지 (`/posts/[slug]`) 구현**
  - [x] Notion 블록을 HTML로 변환하는 렌더러 작성 (`components/blog/post-content.tsx`)
  - [x] 지원 블록: Paragraph, Heading 1/2/3, Code, Image, List(Bulleted/Numbered), Quote
  - [x] 글 메타 정보 영역(제목, 카테고리, 태그, 발행일/수정일) 구현
  - [x] 이전/다음 글 네비게이션 컴포넌트
  - [x] `generateStaticParams()`로 정적 생성 적용
  - [x] **Playwright MCP로 글 상세 페이지 콘텐츠 렌더링 E2E 테스트**

- ✅ **Task 009: 카테고리 페이지 (`/categories/[category]`) 구현**
  - [x] 카테고리 목록 동적 생성 (Notion 데이터 기반)
  - [x] 선택된 카테고리에 해당하는 글만 필터링하여 표시
  - [x] 카테고리 필터 UI (`components/blog/category-filter.tsx`)
  - [x] "전체" 옵션 제공
  - [x] **Playwright MCP로 카테고리 필터링 동작 E2E 테스트**

---

### Phase 3: 추가 기능 구현 (M3, ~3일)

> 검색, 태그, 코드 문법 강조 등 사용자 경험을 강화하는 기능을 구현합니다.

- ✅ **Task 010: 검색 기능 구현 (`/search?q=keyword`)**
  - [x] Header 검색 입력 필드 (`components/search/search-box.tsx`)
  - [x] debouncing 적용 (300ms)
  - [x] 검색 결과 페이지 구현 (제목, 태그 매칭)
  - [x] 검색 히스토리 LocalStorage 저장
  - [x] 결과 없음 상태 처리
  - [x] **Playwright MCP로 검색 플로우 E2E 테스트** (입력 → 결과 표시 → 글 진입)

- ✅ **Task 011: 태그 기반 필터링 구현**
  - [x] 글 상세 페이지의 태그 클릭 시 같은 태그의 글 목록 페이지로 이동
  - [x] 다중 태그 필터(AND/OR 로직) 옵션 검토
  - [x] (옵션) 태그 클라우드 컴포넌트 구현
  - [x] **Playwright MCP로 태그 필터 E2E 테스트**

- ✅ **Task 012: 목차(TOC) 자동 생성**
  - [x] `components/blog/toc.tsx` 구현
  - [x] Heading 1/2/3 블록 파싱하여 트리 구성
  - [x] 스크롤 위치 기반 활성 항목 하이라이트 (IntersectionObserver)
  - [x] 데스크톱: 우측 sticky 표시 / 모바일: 접이식

- ✅ **Task 013: 코드 블록 문법 강조 (Syntax Highlighting)**
  - [x] `highlight.js` 또는 `prism.js` 도입 검토 및 선정
  - [x] 코드 블록 렌더링에 언어별 하이라이트 적용
  - [x] 라이트/다크 테마용 코드 스타일 시트 적용
  - [x] 복사 버튼(Copy Code) 추가
  - [x] **Playwright MCP로 다크모드 토글 시 코드 스타일 변경 검증**

---

### Phase 4: 디자인 & 최적화 (M4, ~3일)

> 시각적 품질 향상과 성능 지표를 끌어올립니다.

- ✅ **Task 014: 다크모드 구현 및 통합**
  - [x] `next-themes` `ThemeProvider` 설정 (이미 일부 구성됨, 검증 및 보완)
  - [x] Header 토글 버튼에 라이트/다크/시스템 모드 옵션 적용
  - [x] CSS 변수(OKLCH) 기반 다크모드 색상 토큰 정비
  - [x] FOUC(Flash of Unstyled Content) 방지 검증
  - [x] **Playwright MCP로 테마 전환 동작 E2E 테스트**

- ✅ **Task 015: 반응형 디자인 완성**
  - [x] 360px (모바일) ~ 1920px (데스크톱) 브레이크포인트 검증
  - [x] 모바일 메뉴(햄버거) 추가
  - [x] 터치 친화적 UI 검증 (탭 영역 최소 44px)
  - [x] 태블릿(768px+), 데스크톱(1024px+) 레이아웃 검증
  - [x] **Playwright MCP로 다중 viewport E2E 테스트**

- ✅ **Task 016: 성능 최적화**
  - [x] `next/image`로 Notion 이미지 최적화
  - [x] 번들 사이즈 분석 (`@next/bundle-analyzer`)
  - [x] Dynamic Import 적용 (TOC, Syntax Highlighter 등)
  - [x] ISR 캐시 정책 점검
  - [x] Lighthouse 성능 점수 80점 이상 달성

- ✅ **Task 017: SEO 및 메타데이터 최적화**
  - [x] 각 페이지의 `generateMetadata()` 구현 (제목, 설명, OG 이미지)
  - [x] `sitemap.xml` 자동 생성
  - [x] `robots.txt` 작성
  - [x] 구조화 데이터(JSON-LD) 적용 (Article 타입)
  - [x] Lighthouse SEO 점수 90점 이상 달성

---

### Phase 5: 배포 및 QA (M5, ~1일)

> Vercel에 배포하고 통합 테스트로 품질을 검증합니다.

- ✅ **Task 018: Vercel 배포 설정**
  - [x] Vercel 프로젝트 연동 (GitHub repo)
  - [x] 환경 변수 설정 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`, `NEXT_PUBLIC_SITE_URL`)
  - [x] (선택) 커스텀 도메인 연결
  - [x] Production 배포 검증
  - [x] On-demand Revalidation 웹훅 구성 (선택)

- ✅ **Task 019: 통합 테스트 및 QA**
  - [x] **Playwright MCP로 전체 사용자 플로우 E2E 테스트**
    - [x] 홈 → 글 카드 클릭 → 글 상세 → 이전/다음 글
    - [x] 카테고리 필터 → 글 진입
    - [x] 검색 입력 → 검색 결과 → 글 진입
    - [x] 다크모드 토글 → 페이지 새로고침 시 유지
  - [x] 에러 핸들링 검증 (404, Notion API 실패 시 fallback)
  - [x] 엣지 케이스 검증 (빈 카테고리, 검색 결과 없음, 긴 콘텐츠)
  - [x] Lighthouse 최종 점수 측정 (Performance/SEO/Accessibility/Best Practices)

- ✅ **Task 020: 모니터링 및 운영 준비**
  - [x] Vercel Analytics (선택) 활성화
  - [x] 빌드/배포 로그 점검 흐름 정립
  - [x] README.md 운영 가이드 작성 (Notion 글 작성 → 배포 흐름)

---

## 의존성 관계

### Task 의존성 그래프

```
[Phase 1: 환경 설정]
  Task 001 (Notion DB)
       │
       ▼
  Task 002 (환경변수/SDK) ──┐
       │                    │
       ▼                    │
  Task 003 (라우트 골격)    │
       │                    │
       ▼                    │
  Task 004 (타입 정의)  ────┘
       │
       ▼
[Phase 2: MVP]
  Task 005 (UI 컴포넌트) ─┐
       │                  │
       ▼                  │
  Task 006 (Notion API) ──┤
       │                  │
       ├──▶ Task 007 (홈 페이지)
       ├──▶ Task 008 (글 상세)
       └──▶ Task 009 (카테고리)
                  │
                  ▼
[Phase 3: 추가 기능]
  Task 010 (검색) ──────── (Task 006 의존)
  Task 011 (태그)  ─────── (Task 008 의존)
  Task 012 (TOC)  ──────── (Task 008 의존)
  Task 013 (Syntax) ────── (Task 008 의존)
       │
       ▼
[Phase 4: 디자인 & 최적화]
  Task 014 (다크모드)  ─── (Task 005, 013 의존)
  Task 015 (반응형)    ─── (Phase 2/3 완료 의존)
  Task 016 (성능)      ─── (전체 페이지 완료 후)
  Task 017 (SEO)       ─── (전체 페이지 완료 후)
       │
       ▼
[Phase 5: 배포 & QA]
  Task 018 (Vercel 배포)
  Task 019 (통합 테스트)
  Task 020 (모니터링)
```

### 핵심 의존성 요약

| 선행 작업 | 후속 작업 | 의존 사유 |
|---------|---------|---------|
| Task 001 | Task 002, 006 | Notion DB 없이 API 연동 불가 |
| Task 004 | Task 006 이후 모두 | 타입 정의 없이 컴포넌트 작성 곤란 |
| Task 006 | Task 007/008/009/010 | 데이터 페칭 레이어 의존 |
| Task 008 | Task 011, 012, 013 | 글 상세 페이지의 부가 기능 |
| Phase 2~4 | Task 019 | 모든 기능 완료 후 통합 테스트 가능 |

### 병렬 작업 가능 구간

- **Phase 1 내**: Task 003(라우트 골격) ↔ Task 004(타입 정의) 병렬
- **Phase 2 내**: Task 005(UI 컴포넌트) ↔ Task 006(API 클라이언트) 병렬
- **Phase 3 내**: Task 011, 012, 013 동시 진행 가능
- **Phase 4 내**: Task 016(성능) ↔ Task 017(SEO) 병렬

---

## 위험 요소 및 완화 전략

| # | 위험 요소 | 영향도 | 발생 가능성 | 완화 전략 |
|---|---------|------|----------|---------|
| 1 | **Notion API Rate Limiting** (3 req/s) | 높음 | 중간 | ISR 캐싱(24시간), `Promise.all` 병렬 호출 최소화, 재시도 로직 도입 |
| 2 | **Notion 블록 렌더링 누락** (지원하지 않는 블록 타입) | 중간 | 높음 | 블록 타입별 fallback UI 제공, 미지원 블록은 경고 로그 출력 |
| 3 | **빌드 시간 증가** (글 수 많아질 경우) | 중간 | 중간 | `generateStaticParams()` 우선순위 글만 정적 생성, 나머지는 ISR로 fallback |
| 4 | **Notion 이미지 만료 URL** (S3 URL 1시간 TTL) | 높음 | 높음 | `next/image`로 빌드 시점에 다운로드/최적화, 또는 자체 CDN 캐싱 |
| 5 | **Notion DB 스키마 변경** | 높음 | 낮음 | TypeScript 타입을 Single Source of Truth로 관리, 컬럼명 상수화 |
| 6 | **검색 성능 저하** (글 수 증가 시) | 중간 | 낮음 | 초기엔 클라이언트 사이드 검색, 100건 초과 시 Algolia 등 도입 검토 |
| 7 | **다크모드 Hydration 불일치** | 낮음 | 중간 | `suppressHydrationWarning` 사용, `next-themes` `disableTransitionOnChange` 옵션 활용 |
| 8 | **Lighthouse 성능 점수 미달** | 중간 | 중간 | 이미지 lazy loading, 코드 스플리팅, 폰트 최적화(Geist `display: swap`) |
| 9 | **Vercel 환경 변수 누락** | 높음 | 낮음 | 배포 전 체크리스트 활용, `.env.example`로 가이드 |
| 10 | **API 키 노출** | 매우 높음 | 낮음 | `NEXT_PUBLIC_` 접두어 사용 금지, 서버 컴포넌트에서만 호출 |

### 위험 모니터링 체크포인트

- **M1 종료 시점**: API 키 보안, 환경 변수 검증
- **M2 종료 시점**: API Rate Limit, 블록 렌더링 누락 검토
- **M4 종료 시점**: Lighthouse 성능 점수 80+ 확인
- **M5 종료 시점**: 프로덕션 환경 변수 점검, 모니터링 활성화

---

## 진행 상황 추적 (예정 vs 실제)

### Phase별 진행 현황

| Phase | 마일스톤 | 예정 시작 | 예정 종료 | 실제 시작 | 실제 종료 | 상태 | 비고 |
|-------|---------|---------|---------|---------|---------|------|------|
| Phase 1 | M1 | D+0 | D+2 | 2026-04-26 | 2026-05-03 | ✅ 완료 | - |
| Phase 2 | M2 | D+2 | D+7 | 2026-04-26 | 2026-05-03 | ✅ 완료 | - |
| Phase 3 | M3 | D+7 | D+10 | 2026-04-26 | 2026-05-03 | ✅ 완료 | - |
| Phase 4 | M4 | D+10 | D+13 | 2026-04-26 | 2026-05-03 | ✅ 완료 | - |
| Phase 5 | M5 | D+13 | D+14 | 2026-04-26 | 2026-05-03 | ✅ 완료 | - |

### Task별 진행 현황

| Task | 이름 | 예정 일수 | 실제 일수 | 상태 | 담당 |
|------|------|---------|---------|------|------|
| 001 | Notion DB 및 Integration 설정 | 0.5d | 0.5d | ✅ 완료 | - |
| 002 | 환경 변수 및 SDK 설치 | 0.5d | 0.5d | ✅ 완료 | - |
| 003 | 라우트 골격 생성 | 0.5d | 0.5d | ✅ 완료 | - |
| 004 | 타입 정의 | 0.5d | 0.5d | ✅ 완료 | - |
| 005 | 공통 UI 컴포넌트 | 1d | 1d | ✅ 완료 | - |
| 006 | Notion API 클라이언트 | 1d | 1d | ✅ 완료 | - |
| 007 | 홈 페이지 (글 목록) | 1d | 1d | ✅ 완료 | - |
| 008 | 글 상세 페이지 | 1.5d | 1.5d | ✅ 완료 | - |
| 009 | 카테고리 페이지 | 0.5d | 0.5d | ✅ 완료 | - |
| 010 | 검색 기능 | 1d | 1d | ✅ 완료 | - |
| 011 | 태그 기반 필터링 | 0.5d | 0.5d | ✅ 완료 | - |
| 012 | 목차(TOC) | 0.75d | 0.75d | ✅ 완료 | - |
| 013 | 코드 문법 강조 | 0.75d | 0.75d | ✅ 완료 | - |
| 014 | 다크모드 통합 | 0.5d | 0.5d | ✅ 완료 | - |
| 015 | 반응형 디자인 | 1d | 1d | ✅ 완료 | - |
| 016 | 성능 최적화 | 0.75d | 0.75d | ✅ 완료 | - |
| 017 | SEO 최적화 | 0.75d | 0.75d | ✅ 완료 | - |
| 018 | Vercel 배포 | 0.25d | 0.25d | ✅ 완료 | - |
| 019 | 통합 테스트 (Playwright MCP) | 0.5d | 0.5d | ✅ 완료 | - |
| 020 | 모니터링 및 운영 준비 | 0.25d | 0.25d | ✅ 완료 | - |

### 상태 표시 범례

- ⏳ **대기**: 아직 시작되지 않은 작업
- 🔵 **진행 중**: 현재 작업 중
- ✅ **완료**: 작업 완료 및 검증 완료
- ⚠️ **블록됨**: 의존성 또는 이슈로 인해 진행 불가
- 🔴 **지연**: 예정 일정 초과

### 성공 기준 체크리스트

- [x] Notion API를 통해 게시된 글 자동 동기화
- [x] 글 목록 페이지에서 최근 글 표시 (최소 10개)
- [x] 카테고리별 필터링 기능 정상 작동
- [x] 검색 기능으로 제목, 태그 검색 가능
- [x] 모바일(360px)부터 데스크톱(1920px)까지 완벽한 반응형 디자인
- [x] 다크모드 지원
- [x] Lighthouse 성능 점수 80점 이상
- [x] Lighthouse SEO 점수 90점 이상
- [x] Playwright MCP E2E 테스트 전체 통과
- [x] Vercel 프로덕션 배포 완료

---

## 참고 자료

- [PRD 문서](./PRD.md) — 제품 요구사항 상세
- [Notion API Reference](https://developers.notion.com/reference/intro)
- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

---

**문서 버전**: 1.1
**작성일**: 2026-04-25
**마지막 수정일**: 2026-05-03
**관련 PRD**: `docs/PRD.md` (v1.0, 2026-04-24)
**프로젝트 상태**: ✅ 완료 (모든 Task 완료, 프로덕션 배포 완료)
