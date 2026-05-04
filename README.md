# Notion CMS 블로그

Notion 데이터베이스 기반의 프로덕션 레디 블로그 플랫폼입니다. 개발자와 콘텐츠 작성자 모두를 위한 포괄적인 가이드를 제공합니다.

## 📋 목차

- [기술 스택](#기술-스택)
- [설치 및 실행](#설치-및-실행)
- [글작성 가이드](#글작성-가이드)
- [배포 가이드](#배포-가이드)
- [모니터링 및 운영](#모니터링-및-운영)
- [트러블슈팅](#트러블슈팅)
- [보안 및 백업](#보안-및-백업)

---

## 기술 스택

- **Next.js 15.5** - App Router, React Server Components
- **React 19** - 최신 React 기능
- **TypeScript 5.3** - 엄격한 타입 체크
- **TailwindCSS v4** - CSS-first 설정
- **shadcn/ui** - Radix UI 기반 접근 가능한 컴포넌트
- **Notion API** - @notionhq/client로 콘텐츠 관리
- **next-themes** - 다크모드 지원

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정
`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```
NEXT_PUBLIC_NOTION_DATABASE_ID=your_database_id
NOTION_API_KEY=your_notion_api_key
```

**Notion API 키 발급 방법:**
1. [Notion Developers](https://www.notion.com/my-integrations) 접속
2. "New integration" 클릭
3. 앱 이름 설정 후 "Submit" 클릭
4. "Internal Integration Token" 복사

### 3. 개발 서버 시작
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어보세요.

### 4. 프로덕션 빌드
```bash
npm run build
npm run start
```

---

## 글작성 가이드

### 콘텐츠 작성자용

#### 1. Notion 페이지 작성

**페이지 필수 속성:**
- **Title** (텍스트) - 글의 제목
- **Slug** (텍스트) - URL 경로 (예: `my-first-post`)
- **Category** (선택) - 글의 카테고리
- **Tags** (다중선택) - 글의 태그들
- **Published** (체크박스) - 발행 여부
- **PublishedDate** (날짜) - 발행 날짜
- **Excerpt** (텍스트) - 미리보기 텍스트
- **Cover** (파일) - 썸네일 이미지

#### 2. Notion에서 지원하는 콘텐츠 형식
- 제목 (Heading 1, 2, 3)
- 본문 텍스트 (굵게, 기울림, 코드)
- 코드 블록 (지원되는 모든 프로그래밍 언어)
- 리스트 (순서 있음/없음)
- 인용문
- 이미지 및 임베드
- 테이블

#### 3. SEO 최적화 팁
- Slug는 영문 소문자와 하이픈만 사용 (예: `seo-optimization-guide`)
- Excerpt는 155자 이내로 작성 (검색 결과에 표시됨)
- 썸네일 이미지는 1200x630px 권장

#### 4. 발행 절차
1. Notion에서 페이지 작성 및 서식 설정
2. "Published" 체크박스 활성화
3. "PublishedDate" 날짜 설정
4. 개발자에게 배포 요청 또는 자동 배포 대기

---

## 배포 가이드

### 개발자용

#### 로컬 개발에서 배포까지

**1단계: 코드 변경 사항 커밋**
```bash
git add .
git commit -m "메시지"
git push origin main
```

**2단계: Vercel 자동 배포**
- 모든 `main` 브랜치 푸시는 자동으로 Vercel에 배포됨
- 배포 진행 상황: [Vercel Dashboard](https://vercel.com)

**3단계: 배포 후 검증**
```bash
# 프로덕션 환경에서 테스트
curl https://yourdomain.com/api/posts
```

#### 배포 환경 변수 설정

**Vercel 대시보드에서 설정:**
1. Project → Settings → Environment Variables
2. 다음 변수 추가:
   - `NEXT_PUBLIC_NOTION_DATABASE_ID`
   - `NOTION_API_KEY`

⚠️ **주의:** `NOTION_API_KEY`는 secret으로 표시 (노출 금지)

#### 빌드 및 배포 최적화

**빌드 분석:**
```bash
ANALYZE=true npm run build
```

**배포 체크리스트:**
- [ ] 모든 환경변수 설정 확인
- [ ] 린트 통과 (`npm run lint`)
- [ ] 로컬 테스트 완료
- [ ] Vercel Analytics 활성화 확인

---

## 모니터링 및 운영

### Vercel Analytics 활성화

**1. 설정 방법**
1. Vercel Dashboard → Analytics
2. "Enable Web Analytics" 클릭
3. 자동으로 Next.js에 계측 코드 추가

**2. 모니터링 지표**
- **Core Web Vitals:** LCP, FID, CLS
- **페이지 뷰:** 시간대별, 지역별 분석
- **성능 메트릭:** 응답 시간, 에러율

### 모니터링 체크리스트

**일일 점검 (매일 아침)**
- [ ] 사이트 접속 가능 여부 확인
- [ ] 최신 글이 정상 표시되는지 확인
- [ ] Vercel Analytics에서 에러율 확인 (0% 이상은 주의)

**주간 점검 (매주 월요일)**
- [ ] 빌드 로그에서 경고(warning) 확인
- [ ] 이미지 로딩 성능 확인
- [ ] 검색 기능 정상 작동 확인
- [ ] 다크모드 테마 적용 확인

**월간 점검 (매월 1일)**
- [ ] Core Web Vitals 점수 확인
- [ ] 가장 느린 페이지 식별 및 최적화
- [ ] 배포 실패 기록 검토
- [ ] API 호출 트렌드 분석

### 빌드/배포 로그 점검

**Vercel 대시보드에서:**
1. Deployments 탭 → 최근 배포 선택
2. Build Logs 확인:
   - `✓` (초록색): 성공
   - `⚠` (노란색): 경고 (진행 중)
   - `✗` (빨간색): 실패 (조치 필요)

**배포 실패 시 대응:**
```bash
# 로컬에서 빌드 테스트
npm run build

# 상세 로그 확인
npm run build 2>&1 | tail -50
```

**일반적인 빌드 오류:**
| 오류 | 원인 | 해결 방법 |
|-----|------|---------|
| `NOTION_API_KEY` 오류 | 환경변수 미설정 | Vercel 설정에서 확인 |
| 이미지 로딩 실패 | Notion 이미지 만료 | 캐시 비우고 재배포 |
| TypeScript 오류 | 타입 불일치 | `npm run lint`로 확인 후 수정 |

---

## 트러블슈팅

### 흔한 문제와 해결 방법

#### 1. 글이 표시되지 않음
```
증상: Notion에서 작성한 글이 블로그에 보이지 않음

해결 단계:
1. "Published" 체크박스 확인
2. "PublishedDate" 날짜 확인 (현재 또는 과거)
3. Slug 필드 확인 (특수문자 제거)
4. Vercel 배포 로그 확인 (api-error 확인)
```

#### 2. 이미지가 깨짐
```
증상: Notion의 이미지가 X 아이콘으로 표시됨

해결 단계:
1. Notion에서 이미지 URL 확인
2. next.config.ts의 remotePatterns 확인
3. 브라우저 개발자 도구 (F12) → Network 탭에서 이미지 요청 상태 확인
4. 필요시 이미지 URL을 신뢰할 수 있는 호스트로 변경
```

#### 3. 검색 기능이 작동하지 않음
```
증상: 검색 입력해도 결과가 없음

해결 단계:
1. /search 페이지 접속 확인
2. 브라우저 콘솔 (F12) 에러 확인
3. Vercel Analytics에서 API 에러율 확인
4. Notion API 토큰 유효성 확인
```

#### 4. 배포 후 이전 내용이 캐시됨
```
증상: 새로 발행한 글이 안 보임

해결 단계:
1. Vercel 대시보드에서 "Redeploy" 클릭
2. 브라우저 캐시 비우기 (Ctrl+Shift+Delete)
3. CDN 캐시 리셋 (Vercel → Deployments → 최신 배포 → Redeploy)
```

### 디버깅 팁

**개발 모드에서 상세 로그 활성화:**
```bash
DEBUG=* npm run dev
```

**Notion API 직접 테스트:**
```bash
curl -X POST https://api.notion.com/v1/databases/YOUR_DB_ID/query \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Notion-Version: 2024-04"
```

---

## 보안 및 백업

### API 키 보안

#### ✅ 권장 사항
- **환경변수 사용:** `.env.local`에서만 로컬 개발
- **Vercel Secrets:** 프로덕션은 Vercel의 암호화된 환경변수 사용
- **접근 제한:** Notion API 토큰의 권한 최소화 (읽기 전용 권장)

#### ❌ 금지 사항
- GitHub에 `.env.local` 커밋
- API 키를 클라이언트 코드에 작성
- API 키를 공개 채널(Slack, 이메일 등)에 공유

**Notion API 권한 설정:**
1. [Notion Developers](https://www.notion.com/my-integrations) → 토큰 선택
2. "Capabilities" 탭 → 필요한 권한만 활성화
3. "Database connections" → 특정 데이터베이스만 선택

### 백업 정책

#### 자동 백업
- **Notion 백업:** Notion에 저장된 원본 데이터는 자동으로 Notion에서 관리
- **코드 백업:** GitHub 리포지토리에 모든 소스 코드 저장
- **배포 기록:** Vercel에서 모든 배포 버전 보관

#### 수동 백업 (월간 권장)
```bash
# 1. Notion에서 내보내기
# Workspace Settings → More → Export → "All" 선택 → 다운로드

# 2. 코드 백업
git tag backup-2026-05-03
git push origin backup-2026-05-03

# 3. 백업 파일 저장
# 로컬 스토리지 또는 클라우드 스토리지에 보관
```

#### 장애 복구 절차

**시나리오: 데이터 손실**
```
1. Notion에서 휴지통 확인 (30일 보관)
2. GitHub 히스토리에서 이전 커밋 확인
3. Vercel 배포 히스토리에서 이전 버전 롤백
   - Deployments → 이전 배포 선택 → "Redeploy"
```

**시나리오: 사이트 접속 불가**
```
1. Vercel 상태 페이지 확인 (https://vercel-status.com)
2. Vercel 대시보드에서 배포 상태 확인
3. 가장 최근 성공한 배포로 롤백
4. 로컬에서 빌드 테스트 후 재배포
```

---

## 프로젝트 구조

```
my-blog/
├── app/                           # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 홈 페이지
│   ├── globals.css               # TailwindCSS v4 설정
│   ├── providers.tsx             # ThemeProvider
│   ├── admin/                    # 관리자 페이지 (향후 확장)
│   ├── posts/[slug]/             # 글 상세 페이지
│   ├── categories/[category]/    # 카테고리별 글 목록
│   ├── tags/[slug]/              # 태그별 글 목록
│   └── search/                   # 검색 페이지
├── components/
│   ├── layout/                   # 레이아웃 컴포넌트
│   │   ├── header.tsx
│   │   └── footer.tsx
│   └── ui/                       # shadcn/ui 컴포넌트
├── lib/
│   └── utils.ts                  # 유틸리티 함수
├── .env.local                    # 로컬 환경변수 (Git 무시)
├── next.config.ts                # Next.js 설정
├── package.json                  # 의존성
└── tsconfig.json                 # TypeScript 설정
```

---

## 주요 기능

### 콘텐츠 관리
- ✅ Notion 데이터베이스 기반 포스트 관리
- ✅ 카테고리 및 태그 분류
- ✅ 전체 텍스트 검색 기능
- ✅ 썸네일 이미지 지원

### 사용자 경험
- ✅ 반응형 디자인 (모바일 최적화)
- ✅ 다크모드 지원
- ✅ SEO 최적화 (메타데이터, Sitemap)
- ✅ 빠른 로딩 (Next.js 캐싱)

### 개발자 경험
- ✅ TypeScript 완벽 지원
- ✅ ESLint 자동 린트
- ✅ Vercel 한 클릭 배포
- ✅ 상세한 에러 로깅

---

## 자주 묻는 질문 (FAQ)

**Q: 글을 실시간으로 발행할 수 있나요?**
A: 예. Notion에서 "Published" 체크박스를 활성화하고 배포하면 실시간으로 표시됩니다. 배포는 GitHub에 푸시할 때 자동으로 진행됩니다.

**Q: 이전 글은 보존되나요?**
A: 예. Notion 데이터베이스의 모든 글은 Notion에서 관리하며, 원본은 항상 보존됩니다.

**Q: 댓글 기능은 지원하나요?**
A: 현재는 미지원입니다. 향후 업데이트에서 추가될 예정입니다.

**Q: 트래픽이 많으면 어떻게 되나요?**
A: Vercel의 자동 스케일링으로 대응합니다. 추가 비용이 발생할 수 있으니 월간 사용량을 모니터링하세요.

---

## 참고 링크

- [Next.js 문서](https://nextjs.org/docs)
- [Notion API 문서](https://developers.notion.com)
- [Vercel 대시보드](https://vercel.com/dashboard)
- [TailwindCSS 문서](https://tailwindcss.com)
- [shadcn/ui 문서](https://ui.shadcn.com)

## 문의 및 지원

개발 관련 문제: GitHub Issues 또는 이메일로 연락해주세요.

---

*마지막 업데이트: 2026년 5월 3일*
