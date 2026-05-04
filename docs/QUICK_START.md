# 빠른 시작 가이드

## 역할별 빠른 시작

### 🖊️ 콘텐츠 작성자용

#### 처음 5분 안에 글 발행하기

**1단계: Notion 데이터베이스 접근**
```
1. 관리자로부터 공유받은 Notion 링크 클릭
2. "Duplicate" 또는 저장된 링크에서 데이터베이스 접근
3. "Add a page" 또는 "New" 클릭
```

**2단계: 글 작성**
```
필수 필드 작성:
  □ Title: "제 첫 번째 글입니다"
  □ Slug: "my-first-post"
  □ Published: 체크 활성화 ☑
  □ PublishedDate: 오늘 날짜 선택
  □ Category: 적절한 카테고리 선택

선택 필드:
  □ Tags: 관련 태그 선택 (여러 개 가능)
  □ Excerpt: "이 글의 요약입니다..." (155자 이내)
  □ Cover: 썸네일 이미지 추가
```

**3단계: 본문 작성**
```
Notion에서 지원하는 포맷:
  • 제목 (# Heading 1, ## Heading 2)
  • 굵은글씨 (**굵게**)
  • 기울임 (*기울임*)
  • 코드 (`코드`)
  • 코드 블록 (``` 삼중 백틱)
  • 리스트 (• 또는 1.)
  • 인용문 (> 인용)
  • 이미지 (+ 이미지 추가)
  • 테이블 (+ 테이블 추가)
```

**4단계: 발행 확인**
```
발행 후 약 5분 기다립니다.

사이트 확인:
  1. https://yourdomain.com 접속
  2. 홈페이지 최신 글 목록 확인
  3. 혹은 /search에서 글 제목으로 검색
```

**자주 사용하는 팁:**
```
Slug 작성:
  ✓ 영문 소문자 + 하이픈
  ✓ my-first-post, hello-world
  ✗ MyFirstPost, My First Post, 한글

이미지 삽입:
  1. + 버튼 → Image
  2. 컴퓨터 또는 웹에서 이미지 선택
  3. 자동으로 Notion에서 호스팅됨

링크 추가:
  1. 텍스트 선택
  2. Cmd/Ctrl + K
  3. URL 입력

더 많은 도움:
  → docs/README.md의 "글작성 가이드" 참조
```

---

### 👨‍💻 개발자용

#### 처음 10분 안에 로컬 개발 시작하기

**1단계: 저장소 클론**
```bash
git clone https://github.com/yujuyamelong/my-blog.git
cd my-blog
```

**2단계: 환경변수 설정**
```bash
# .env.example 복사
cp .env.example .env.local

# .env.local 편집하고 실제 값 입력:
# - NEXT_PUBLIC_NOTION_DATABASE_ID
# - NOTION_API_KEY
```

**3단계: 의존성 설치 및 실행**
```bash
npm install
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

**4단계: 코드 수정 및 테스트**
```bash
# 파일 수정 (예: components/header.tsx)
# 브라우저에서 자동으로 새로고침됨 (Fast Refresh)

# 린트 검사
npm run lint

# 프로덕션 빌드 테스트
npm run build
npm start
```

**5단계: 변경사항 커밋 및 푸시**
```bash
git add .
git commit -m "기능명: 설명"
git push origin feature-branch

# GitHub에서 Pull Request 생성
```

**개발 환경 팁:**
```
Hot Reload (자동 새로고침):
  ✓ .tsx 파일 수정 시 즉시 반영
  ✓ CSS 변경도 즉시 반영

TypeScript:
  ✓ 파일 저장 시 자동 타입 체크
  ✓ VS Code에서 타입 에러 확인 가능

디버깅:
  - F12로 개발자 도구 열기
  - Console 탭에서 에러 확인
  - Network 탭에서 API 요청 확인
```

**커밋 메시지 규칙:**
```
형식: [타입]: 설명

타입:
  feat: 새로운 기능
  fix: 버그 수정
  refactor: 코드 구조 변경
  docs: 문서 작성
  style: 코드 스타일 변경

예시:
  feat: 댓글 기능 추가
  fix: 다크모드에서 텍스트 가시성 개선
  docs: 배포 가이드 작성
```

---

## 🚀 배포 프로세스

### 콘텐츠 작성자용 배포

**배포 자동화**
```
Notion에서 글을 발행하면:
1. 개발자가 코드 푸시 (매일 또는 주기적)
2. GitHub에 push → Vercel 자동 배포
3. 약 1-2분 후 사이트에 반영

수동 배포 요청 (긴급):
  → 관리자/개발자에게 연락
  → "지금 바로 배포해주세요" 요청
  → 약 2-3분 내 배포 완료
```

### 개발자용 배포

**자동 배포 (권장)**
```bash
# 1단계: 코드 커밋
git add .
git commit -m "feat: 새 기능 추가"

# 2단계: main 브랜치로 push
git push origin main

# 3단계: Vercel에서 자동 배포
# → Vercel Dashboard에서 배포 진행 상황 모니터링
```

**수동 배포**
```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel --prod

# 또는 Vercel Dashboard에서 "Redeploy" 클릭
```

**배포 후 확인**
```
체크리스트:
  □ Vercel Dashboard에서 배포 성공 (초록색 ✓)
  □ 사이트 접속 가능 (https://yourdomain.com)
  □ 최신 글이 표시됨
  □ 검색 기능 작동
  □ 다크모드 토글 작동
```

---

## 📚 자주 묻는 질문 (FAQ)

### Q: 글을 작성했는데 왜 안 보여요?

**A:** 다음을 확인하세요:

```
1. Published 체크박스 활성화 여부
   → "Published" 필드가 체크되어 있나요?

2. PublishedDate 설정
   → 날짜가 현재 또는 과거인가요?

3. Slug 필드
   → 특수문자나 공백이 없나요?

4. 배포 완료 대기
   → 코드 푸시 후 약 1-2분 대기
   → Vercel Dashboard에서 배포 상태 확인

5. 캐시 초기화
   → Ctrl+Shift+Delete로 브라우저 캐시 비우기
   → 다시 새로고침
```

### Q: 이미지가 깨져서 보여요.

**A:** 다음을 시도하세요:

```
1. Notion에서 이미지 URL 확인
   → 복사 링크에서 호스팅 서버 확인

2. 주요 호스팅 서버 (이미 허용됨):
   ✓ notion.so
   ✓ amazonaws.com
   ✓ unsplash.com

3. 다른 서버의 이미지:
   → 개발자에게 연락하여 허용 요청
   → next.config.ts에 도메인 추가 필요

4. Notion 이미지 만료:
   → 이미지를 다시 추가하면 새 URL 생성
```

### Q: 배포 후 이전 내용이 보여요.

**A:** 캐시 때문입니다:

```
1. 브라우저 캐시 비우기
   → Ctrl+Shift+Delete
   → "쿠키 및 기타 사이트 데이터" 선택
   → 삭제

2. CDN 캐시 리셋 (개발자용)
   → Vercel Dashboard → Deployments
   → 최신 배포 → "Redeploy" 클릭

3. 강제 새로고침
   → Ctrl+F5 (Windows) 또는 Cmd+Shift+R (Mac)
```

### Q: 검색이 작동하지 않아요.

**A:** 다음을 확인하세요:

```
1. /search 페이지 접속 확인
   → https://yourdomain.com/search

2. 브라우저 콘솔에서 에러 확인
   → F12 → Console 탭

3. Vercel Analytics에서 에러율 확인
   → Vercel Dashboard → Analytics

4. API 키 확인
   → 환경변수 설정 여부 확인
   → Notion API 토큰 유효성 확인

5. 개발자에게 연락
   → 서버 로그 확인 필요
```

### Q: 로컬에서 개발할 때 글이 보이지 않아요.

**A:** 환경변수를 확인하세요:

```bash
# 1. .env.local 파일 확인
cat .env.local

# 2. 필수 값 확인
# - NEXT_PUBLIC_NOTION_DATABASE_ID 설정?
# - NOTION_API_KEY 설정?

# 3. 개발 서버 재시작
# - npm run dev를 중지 (Ctrl+C)
# - npm run dev 다시 실행

# 4. 캐시 초기화
rm -rf .next
npm run dev
```

---

## 📖 더 알아보기

자세한 가이드는 다음 문서를 참조하세요:

**콘텐츠 작성자:**
- [README.md - 글작성 가이드](../README.md#글작성-가이드)
- [README.md - 배포 가이드](../README.md#배포-가이드)

**개발자:**
- [README.md - 배포 가이드](../README.md#배포-가이드)
- [MONITORING.md - 모니터링 가이드](./MONITORING.md)
- [SECURITY_AND_BACKUP.md - 보안 가이드](./SECURITY_AND_BACKUP.md)

**기술 정보:**
- [프로젝트 구조](../README.md#프로젝트-구조)
- [기술 스택](../README.md#기술-스택)

---

## 🆘 도움 받기

**문제 발생 시:**

1. 이 가이드에서 FAQ 확인
2. README.md의 트러블슈팅 섹션 확인
3. MONITORING.md의 장애 대응 절차 확인
4. 개발자에게 GitHub Issue로 보고

**연락처:**
- 이메일: yujuyamelong@gmail.com
- GitHub Issues: 버그 리포팅

---

*마지막 업데이트: 2026년 5월 3일*
*작성자: Claude Code*
