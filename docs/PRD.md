# 개인 개발 블로그 - 제품 요구사항 문서 (PRD)

## 1. 프로젝트 개요

### 프로젝트명
개인 개발 블로그 (Personal Tech Blog with Notion CMS)

### 목적
Notion을 CMS(Content Management System)로 활용하여 개인 기술 블로그를 운영하는 웹 애플리케이션입니다. 개발자가 Notion에 글을 작성하면 자동으로 블로그 웹사이트에 반영되는 시스템을 구축합니다.

### CMS 선택 이유
- **편리한 글 작성**: 별도의 관리자 대시보드 없이 Notion에서 직관적으로 글 작성 가능
- **비용 절감**: 별도의 CMS 서비스 구독 불필요
- **데이터 관리**: Notion에서 체계적으로 콘텐츠 관리
- **유연성**: 카테고리, 태그, 상태 등을 손쉽게 관리
- **버전 관리**: Notion의 버전 관리 기능 활용 가능

---

## 2. 목표 및 성공 기준

### 목표
1. Notion을 활용한 완전한 CMS 기반 블로그 시스템 구축
2. 사용자 친화적이고 반응형 블로그 웹사이트 구현
3. 빠른 콘텐츠 로딩과 최적화된 성능 제공

### 성공 기준
- [ ] Notion API를 통해 게시된 글 자동 동기화
- [ ] 글 목록 페이지에서 최근 글 표시 (최소 10개)
- [ ] 카테고리별 필터링 기능 정상 작동
- [ ] 검색 기능으로 제목, 태그 검색 가능
- [ ] 모바일(360px)부터 데스크톱(1920px)까지 완벽한 반응형 디자인
- [ ] 다크모드 지원
- [ ] Lighthouse 성능 점수 80점 이상

---

## 3. 주요 기능

### 3.1 핵심 기능

#### 1. 블로그 글 목록 (Home Page)
- **설명**: 발행된 모든 블로그 글의 목록을 최신순으로 표시
- **세부 기능**:
  - 최근 글부터 표시 (발행일 기준 내림차순)
  - 글 제목, 요약, 발행일, 카테고리, 태그 표시
  - 페이지네이션 또는 무한 스크롤 (초기: 10개씩)
  - 썸네일 이미지 지원 (옵션)

#### 2. 블로그 글 상세 페이지
- **설명**: 개별 글의 전체 내용을 표시
- **세부 기능**:
  - Notion 페이지의 블록 내용을 HTML로 렌더링
  - 글 제목, 카테고리, 태그 표시
  - 발행일 및 수정일 표시
  - 이전/다음 글 네비게이션
  - 목차 (Table of Contents) 자동 생성
  - 코드 블록 문법 강조 (Syntax Highlighting)

#### 3. 카테고리별 필터링
- **설명**: 선택한 카테고리의 글만 표시
- **세부 기능**:
  - 좌측 사이드바 또는 상단 탭에서 카테고리 선택
  - 동적으로 글 목록 업데이트
  - 선택된 카테고리 하이라이트
  - "전체" 선택으로 모든 글 표시

#### 4. 검색 기능
- **설명**: 제목, 태그 기반 검색
- **세부 기능**:
  - 헤더에 검색 입력 필드
  - 실시간 검색 결과 (debouncing 적용)
  - 검색 결과 페이지에서 매칭된 글 목록 표시
  - 검색 히스토리 (로컬 스토리지)

#### 5. 태그 기반 검색
- **설명**: 특정 태그로 글 필터링
- **세부 기능**:
  - 글 상세 페이지에서 태그 클릭 시 같은 태그의 글 목록 표시
  - 여러 태그 동시 선택 가능 (AND/OR 로직)
  - 태그 클라우드 표시 (옵션)

#### 6. 반응형 디자인
- **설명**: 모든 디바이스에서 최적화된 레이아웃
- **세부 기능**:
  - 모바일: 360px 이상
  - 태블릿: 768px 이상
  - 데스크톱: 1024px 이상
  - 터치 친화적 UI 요소
  - 빠른 로딩 속도

#### 7. 다크모드 지원
- **설명**: 사용자 시스템 설정 또는 수동 전환
- **세부 기능**:
  - next-themes를 통한 다크모드 관리
  - 사용자 선택 저장
  - 부드러운 테마 전환 애니메이션


---

## 4. 기술 스택

### Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| **Next.js** | 15 | React 프레임워크 (App Router) |
| **React** | 19 | UI 라이브러리 |
| **TypeScript** | - | 타입 안전성 |
| **Tailwind CSS** | v4 | CSS 프레임워크 (CSS-first) |
| **shadcn/ui** | - | UI 컴포넌트 라이브러리 |
| **Lucide React** | - | 아이콘 라이브러리 |
| **next-themes** | - | 다크모드 관리 |

### Backend & CMS
| 기술 | 용도 |
|------|------|
| **Notion API** | 블로그 콘텐츠 데이터 소스 |
| **@notionhq/client** | Notion API TypeScript SDK |

### Deployment
| 서비스 | 용도 |
|-------|------|
| **Vercel** | Next.js 호스팅 및 배포 |

### 개발 도구
| 도구 | 용도 |
|-----|------|
| **ESLint** | 코드 품질 검사 |
| **TypeScript** | 타입 검사 |

---

## 5. Notion 데이터베이스 설계

### 데이터베이스 구조

#### 테이블: Blog Posts
**용도**: 블로그 게시물 메타데이터 관리

| 컬럼명 | 타입 | 설명 | 필수 | 예시 |
|--------|------|------|------|------|
| **Title** | Title | 블로그 글 제목 | O | "Next.js 15에서 App Router 완벽 가이드" |
| **Category** | Select | 글의 카테고리 | O | React, Next.js, TypeScript, Web Design |
| **Tags** | Multi-select | 글의 태그 (여러 개 선택 가능) | X | "성능 최적화", "튜토리얼", "고급 기술" |
| **Published Date** | Date | 글 발행일 | O | 2026-04-24 |
| **Modified Date** | Last edited time | 마지막 수정일 | - | (자동) |
| **Status** | Select | 글의 상태 | O | "초안" / "발행됨" |
| **Description** | Text | 글 요약 (홈 페이지에서 표시) | X | "Next.js 15의 App Router에 대해 알아봅시다..." |
| **Content** | Page Content | 블로그 글 본문 | O | (Notion 블록들) |
| **Featured** | Checkbox | 추천 글 여부 | X | True / False |

### 카테고리 예시
- React
- Next.js
- TypeScript
- Web Design
- Performance
- DevOps

### 태그 예시
- 튜토리얼
- 성능 최적화
- 팁
- 도구 소개
- 문제 해결

---

## 6. 화면 구성 및 사용자 흐름

### 6.1 페이지 구조

#### 1. **홈 페이지 (/)** 
```
┌─────────────────────────────────────┐
│          Header (검색, 테마)          │
├─────────────────────────────────────┤
│                                     │
│  Recent Blog Posts                  │
│  ┌─────────────────────────────────┐│
│  │ Post Card 1                      ││
│  │ - Title                          ││
│  │ - Category Badge                 ││
│  │ - Tags                           ││
│  │ - Publish Date                   ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ Post Card 2                      ││
│  └─────────────────────────────────┘│
│  ...                                │
│                                     │
│  [More Posts] / Pagination          │
│                                     │
├─────────────────────────────────────┤
│          Footer (Links)              │
└─────────────────────────────────────┘
```

#### 2. **글 상세 페이지 (/posts/[slug])**
```
┌─────────────────────────────────────┐
│          Header (검색, 테마)          │
├─────────────────────────────────────┤
│                                     │
│  Article Header                     │
│  ├─ Title                           │
│  ├─ Category Badge                  │
│  ├─ Tags                            │
│  ├─ Publish Date | Modified Date    │
│  └─ Author                          │
│                                     │
│  ┌─ [Table of Contents] (우측)     │
│  │                                  │
│  │  Article Content (Notion Blocks) │
│  │  - Headings                      │
│  │  - Paragraphs                    │
│  │  - Code Blocks (Syntax Highlight)│
│  │  - Images                        │
│  │  - Lists                         │
│  │  - Quotes                        │
│  │                                  │
│  └─ Share Buttons (우측)            │
│                                     │
│  Navigation                         │
│  ├─ [← Previous Post] [Next Post →] │
│                                     │
├─────────────────────────────────────┤
│          Footer (Links)              │
└─────────────────────────────────────┘
```

#### 3. **카테고리 페이지 (/categories/[category])**
```
┌─────────────────────────────────────┐
│          Header (검색, 테마)          │
├─────────────────────────────────────┤
│                                     │
│  Category: [Category Name]          │
│  Posts Count: 10                    │
│                                     │
│  Filter:                            │
│  [All] [React] [Next.js] [...]     │
│                                     │
│  Posts in [Category]                │
│  ┌─────────────────────────────────┐│
│  │ Post Card 1                      ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ Post Card 2                      ││
│  └─────────────────────────────────┘│
│  ...                                │
│                                     │
├─────────────────────────────────────┤
│          Footer (Links)              │
└─────────────────────────────────────┘
```

#### 4. **검색 결과 페이지 (/search?q=keyword)**
```
┌─────────────────────────────────────┐
│          Header (검색, 테마)          │
├─────────────────────────────────────┤
│                                     │
│  Search Results for "keyword"       │
│  Found: 5 posts                     │
│                                     │
│  Search Box (populated with query)  │
│                                     │
│  Results                            │
│  ┌─────────────────────────────────┐│
│  │ Post Card 1                      ││
│  └─────────────────────────────────┘│
│  ...                                │
│                                     │
│  No results found (if empty)        │
│                                     │
├─────────────────────────────────────┤
│          Footer (Links)              │
└─────────────────────────────────────┘
```

### 6.2 사용자 흐름 (User Flow)

#### 흐름 1: 블로그 글 읽기
```
홈 페이지 방문
    ↓
글 목록 확인
    ↓
글 카드 클릭
    ↓
글 상세 페이지 로드 및 표시
    ↓
글 내용 읽음
    ↓
[이전/다음 글 읽기] 또는 [홈으로]
```

#### 흐름 2: 카테고리로 필터링
```
홈 페이지 방문
    ↓
좌측 사이드바에서 카테고리 선택
    ↓
카테고리 페이지로 이동
    ↓
해당 카테고리의 글 목록 표시
    ↓
글 선택
```

#### 흐름 3: 검색
```
헤더의 검색 입력 필드 클릭
    ↓
키워드 입력
    ↓
Enter 또는 검색 버튼 클릭
    ↓
검색 결과 페이지 표시
    ↓
결과에서 글 선택
```

#### 흐름 4: 테마 전환
```
헤더의 테마 토글 버튼 클릭
    ↓
다크모드 ↔ 라이트모드 전환
    ↓
사용자 선택 저장
```

---

## 7. API 연동 명세

### 7.1 Notion API 활용

#### 1. 데이터베이스 쿼리
**목적**: Notion 데이터베이스에서 블로그 글 조회

```typescript
// 예: 발행된 글만 조회 (최신순)
notion.databases.query({
  database_id: process.env.NOTION_DATABASE_ID,
  filter: {
    property: "Status",
    select: {
      equals: "발행됨"
    }
  },
  sorts: [
    {
      property: "Published Date",
      direction: "descending"
    }
  ]
})
```

**응답**: 글 목록 (제목, 카테고리, 태그, 발행일 등)

#### 2. 페이지 조회
**목적**: 개별 글의 상세 내용 조회

```typescript
// Notion 페이지의 모든 블록 조회
notion.blocks.children.list({
  block_id: page_id
})
```

**응답**: 글의 모든 블록 (문단, 코드, 이미지 등)

#### 3. 블록 렌더링
- 문단 (Paragraph) → `<p>` 태그
- 제목 (Heading) → `<h1>`, `<h2>`, `<h3>` 태그
- 코드 (Code) → `<pre><code>` 태그 (문법 강조)
- 이미지 (Image) → `<img>` 태그
- 리스트 (Bulleted/Numbered List) → `<ul>`, `<ol>` 태그
- 인용 (Quote) → `<blockquote>` 태그

### 7.2 캐싱 전략

- **정적 생성 (Static Generation)**: 글 목록, 글 상세 (빌드 타임)
- **캐시 유효성**: 24시간 (ISR 설정)
- **온디맨드 재검증**: Notion 업데이트 시 수동 트리거 (옵션)

---

## 8. MVP 범위

### 포함 사항
- [x] Notion API 연동
- [x] 글 목록 페이지
- [x] 글 상세 페이지
- [x] 카테고리별 필터링
- [x] 검색 기능 (제목 기반)
- [x] 기본 스타일링 (Tailwind CSS, shadcn/ui)
- [x] 반응형 디자인 (Mobile-first)
- [x] 다크모드 지원
- [x] 코드 블록 문법 강조

### 제외 사항 (향후 추가)
- [ ] 댓글 기능
- [ ] 관련 글 추천
- [ ] 글 추천 기능
- [ ] RSS 피드
- [ ] 소셜 미디어 공유
- [ ] Google Analytics
- [ ] 고급 검색 (필터링)
- [ ] 태그 클라우드
- [ ] 관리자 대시보드

---

## 9. 구현 계획

### Phase 1: 환경 설정 (1-2일)
- [ ] Notion 데이터베이스 생성
- [ ] Notion Integration 생성 및 API 키 발급
- [ ] @notionhq/client 패키지 설치
- [ ] 환경 변수 설정 (.env.local)
- [ ] TypeScript 타입 정의

### Phase 2: 기본 기능 구현 (3-5일)
- [ ] Notion API 클라이언트 설정
- [ ] 글 목록 페이지 구현 (`app/page.tsx`)
- [ ] 글 상세 페이지 구현 (`app/posts/[slug]/page.tsx`)
- [ ] Notion 블록 → HTML 렌더링
- [ ] 기본 스타일링 (Tailwind CSS)

### Phase 3: 추가 기능 구현 (2-3일)
- [ ] 카테고리 필터링 구현
- [ ] 검색 기능 구현
- [ ] 태그 기반 필터링
- [ ] 목차(TOC) 자동 생성
- [ ] 코드 블록 문법 강조 (highlight.js 또는 prism.js)

### Phase 4: 디자인 & 최적화 (2-3일)
- [ ] 다크모드 구현 (next-themes)
- [ ] 반응형 디자인 완성
- [ ] 성능 최적화 (이미지, 번들 사이즈)
- [ ] SEO 최적화 (메타데이터, Open Graph)
- [ ] Lighthouse 성능 검사

### Phase 5: 배포 (1일)
- [ ] Vercel 연동
- [ ] 환경 변수 설정
- [ ] 도메인 설정 (선택)
- [ ] 프로덕션 배포
- [ ] 모니터링 설정

---

## 10. 마일스톤

| 마일스톤 | 목표 | 예상 기간 |
|---------|------|---------|
| **M1: 기초 구성** | Notion API 연동, 개발 환경 설정 | ~2일 |
| **M2: MVP 기능** | 글 목록, 상세, 기본 필터링 | ~5일 |
| **M3: 추가 기능** | 검색, 태그, 문법 강조 | ~3일 |
| **M4: 디자인 & 최적화** | 다크모드, 반응형, 성능 | ~3일 |
| **M5: 배포 & QA** | Vercel 배포, 테스트 | ~1일 |
| **최종 완성** | | **~14일** |

---

## 11. 제약사항 및 고려사항

### 제약사항
1. **Notion API 한계**
   - API 요청 속도 제한 (Rate Limiting)
   - 복잡한 쿼리 불가능
   - 실시간 동기화 불가능 (ISR로 해결)

2. **성능**
   - 글 수가 많아질 경우 페이지네이션 필수
   - 큰 Notion 페이지는 로딩 시간 증가 가능

3. **콘텐츠 관리**
   - Notion 데이터베이스 구조 변경 시 코드 수정 필요
   - 초안 글은 자동으로 제외됨

### 고려사항
1. **검색 성능**
   - 클라이언트 사이드 검색 (간단함)
   - 향후 서버 사이드 검색 또는 Algolia 고려

2. **이미지 최적화**
   - Notion의 이미지 URL 사용
   - Next.js Image 컴포넌트로 최적화

3. **접근성 (Accessibility)**
   - WCAG 2.1 AA 표준 준수
   - 시맨틱 HTML 사용
   - 키보드 네비게이션 지원

4. **보안**
   - Notion API 키는 환경 변수로 관리
   - 공개 정보만 노출 (Status: 발행됨)

---

## 12. 환경 변수

```bash
# .env.local
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_database_id
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## 13. 디렉토리 구조

```
my-blog/
├── app/
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 홈 페이지
│   ├── globals.css             # 전역 스타일
│   ├── providers.tsx           # Theme Provider
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx        # 글 상세 페이지
│   ├── categories/
│   │   └── [category]/
│   │       └── page.tsx        # 카테고리 페이지
│   └── search/
│       └── page.tsx            # 검색 결과 페이지
├── components/
│   ├── layout/
│   │   ├── header.tsx          # 헤더
│   │   └── footer.tsx          # 푸터
│   ├── ui/                     # shadcn/ui 컴포넌트
│   ├── blog/
│   │   ├── post-card.tsx       # 글 카드
│   │   ├── post-content.tsx    # 글 내용 렌더러
│   │   ├── toc.tsx             # 목차
│   │   └── category-filter.tsx # 카테고리 필터
│   └── search/
│       └── search-box.tsx      # 검색 입력 필드
├── lib/
│   ├── notion.ts               # Notion API 클라이언트
│   ├── utils.ts                # 유틸 함수
│   └── types.ts                # TypeScript 타입
├── public/                     # 정적 파일
├── docs/
│   └── PRD.md                  # 이 문서
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

---

## 14. 성공 메트릭

| 메트릭 | 목표 | 측정 방법 |
|--------|------|---------|
| 페이지 로딩 속도 | < 2초 | Lighthouse, PageSpeed Insights |
| 반응형 성능 | 모든 기기에서 정상 | 수동 테스트 (모바일, 태블릿, 데스크톱) |
| SEO 점수 | 90점 이상 | Lighthouse SEO 점수 |
| 성능 점수 | 80점 이상 | Lighthouse Performance 점수 |
| 글 동기화 시간 | < 5분 | 배포 로그 확인 |
| 검색 정확도 | 100% | 테스트 케이스 |

---

## 15. 참고 자료

### Notion API 문서
- [Notion API Reference](https://developers.notion.com/reference/intro)
- [@notionhq/client GitHub](https://github.com/makenotion/notion-sdk-js)

### 기술 문서
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

### 코드 문법 강조
- [Highlight.js](https://highlightjs.org/)
- [Prism.js](https://prismjs.com/)

---

**문서 버전**: 1.0  
**작성일**: 2026-04-24  
**마지막 수정일**: 2026-04-24
