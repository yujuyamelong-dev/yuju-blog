# 보안 및 백업 정책

## 개요

이 문서는 Notion CMS 블로그의 보안 및 데이터 보호 정책을 설명합니다.

---

## 1. API 키 보안

### 1.1 Notion API 키 관리

#### ✅ 올바른 방법

**로컬 개발 환경:**
```bash
# 1. .env.local 파일에 저장 (Git 무시됨)
NOTION_API_KEY=secret_key_here

# 2. .gitignore 확인 (이미 설정됨)
cat .gitignore | grep "env"
```

**프로덕션 환경 (Vercel):**
```bash
# Vercel 웹 대시보드를 통해 관리
1. Vercel Dashboard → Project Settings
2. Environment Variables 탭
3. NOTION_API_KEY 추가 (Secret으로 표시)
```

#### ❌ 금지 사항

```javascript
// ❌ 절대 하지 말 것!
const apiKey = "secret_1a2b3c4d5e6f7g8h9i0j";  // 노출됨!

// ❌ 환경변수 파일을 Git에 커밋
git add .env.local  // 위험!

// ❌ 공개 채널에 공유
Slack: "API 키는 abcd1234입니다" // 절대 금지!

// ❌ 클라이언트 코드에 작성
export const fetchPosts = async () => {
  const response = await fetch('/api/posts', {
    headers: {
      'Authorization': 'Bearer secret_key'  // 브라우저에 노출!
    }
  });
};
```

### 1.2 API 토큰 권한 최소화

**권장 권한 설정:**
```
Notion Integration Capabilities:
├─ Content Capabilities
│  ├─ Read content ✓
│  ├─ Create content ✗ (불필요)
│  ├─ Update content ✗ (불필요)
│  └─ Delete content ✗ (금지)
├─ Database connections
│  └─ (읽기 권한이 있는 데이터베이스만 선택)
└─ User Information
   ├─ Read email ✗ (불필요)
   └─ Read name ✓ (필수)
```

**설정 방법:**
1. [Notion Developers](https://www.notion.com/my-integrations)
2. 해당 Integration 선택
3. "Capabilities" 탭
4. 필요한 권한만 활성화

### 1.3 API 키 로테이션

**주기:** 6개월마다 또는 팀 변경 시

**절차:**
```bash
# Step 1: 새로운 API 키 생성
1. Notion Developers → Integration 선택
2. "Regenerate secret" 클릭
3. 새 토큰 복사

# Step 2: Vercel에서 업데이트
1. Vercel Dashboard → Project Settings
2. Environment Variables 수정
3. 새 토큰 값 입력 후 저장

# Step 3: 배포 확인
1. Vercel에서 자동으로 재배포됨
2. 배포 로그에서 성공 여부 확인

# Step 4: 구 토큰 비활성화
1. Notion Developers → Integration 선택
2. "Revoke" 클릭하여 완전히 비활성화
```

**백업 API 키 (선택):**
- 제2의 API 키를 별도로 보관
- 프로덕션 토큰 손상 시 빠른 전환 가능
- 주기적으로 갱신

---

## 2. 환경변수 보안

### 2.1 환경변수 타입 구분

```
NEXT_PUBLIC_* 
  → 공개 (클라이언트 코드에 노출)
  → 민감하지 않은 정보만 포함
  예: NEXT_PUBLIC_SITE_URL

그 외
  → 비공개 (서버에서만 사용)
  → API 키, 데이터베이스 URL 등
  예: NOTION_API_KEY
```

### 2.2 로컬 개발 보안

**`.env.local` 파일 설정:**
```bash
# 파일 생성
cp .env.example .env.local

# 내용 작성
NEXT_PUBLIC_NOTION_DATABASE_ID=abc123
NOTION_API_KEY=secret_key_here

# 파일 권한 제한 (선택)
chmod 600 .env.local
```

**`.env.local`은 절대 Git에 커밋하지 말 것:**
```bash
# 실수로 커밋했을 경우 복구
git rm --cached .env.local
git commit -m "Remove .env.local from tracking"
git push

# 새로운 팀원은 .env.example을 참고하여 .env.local 생성
```

### 2.3 팀 협업 시 키 공유

**안전한 방법:**

❌ **금지:**
- Slack, 이메일로 공유
- GitHub Issues나 Discussion에 공개
- 문서나 스크린샷에 포함

✅ **권장:**
- 비밀번호 관리자 (1Password, LastPass 등)
- Notion 비공개 페이지 (임시)
- Vercel Team 기능으로 접근 권한 관리

---

## 3. 배포 보안

### 3.1 GitHub 저장소 보안

**Public vs Private:**
```
Private ✓ (권장)
  - 소스 코드 비노출
  - 커밋 히스토리 보호
  - 선택적 접근 권한 부여

Public ✗ (위험)
  - 커밋에서 API 키 검색 가능
  - 설정 정보 노출
  - 악용 가능성
```

**액세스 제어:**
```
Settings → Collaborators → 권한 설정:
- Admin: 전체 제어 (신뢰할 수 있는 사람만)
- Maintain: 배포 및 릴리스
- Write: 코드 수정, PR 생성
- Triage: 이슈 관리
- Read: 읽기만 가능
```

### 3.2 배포 파이프라인 보안

**Vercel 설정:**
```
Project Settings → Deployment:
  ├─ Production Branch: main (보호됨)
  ├─ Preview: PR 병합 전 테스트
  └─ Development: 선택적 (선택)

Git Settings:
  ├─ Require approval: PR 승인 필수
  ├─ Branch protection: main 브랜치 잠금
  └─ Status checks: 빌드/린트 통과 필수
```

**PR 리뷰 체크리스트:**
- [ ] 환경변수 노출 여부 확인
- [ ] 타입 에러 없음
- [ ] 린트 통과
- [ ] 보안 취약점 스캔 완료

---

## 4. 데이터 백업

### 4.1 백업 전략 (3-2-1 규칙)

```
3개 복사본:
  1. 원본 (Notion)
  2. 코드 저장소 (GitHub)
  3. 클라우드 백업

2가지 저장소:
  1. 클라우드 (Vercel, GitHub)
  2. 로컬 스토리지

1곳 오프사이트:
  - 지역 재해로부터 보호
  - 클라우드 스토리지 (Google Drive, iCloud 등)
```

### 4.2 자동 백업

**GitHub 자동 백업:**
```
설정됨 ✓:
  - 모든 커밋이 GitHub에 자동 저장
  - 30일 이상 이력 보관
  - 언제든 이전 버전 복구 가능
```

**Vercel 자동 백업:**
```
설정됨 ✓:
  - 모든 배포 버전 보관
  - 배포 로그 저장
  - 1년 이상 이력 보관
```

**Notion 자동 백업:**
```
설정됨 ✓:
  - Notion의 원본 데이터 자동 보관
  - 휴지통 30일 보관
  - 버전 히스토리 제공
```

### 4.3 수동 백업 (월간)

**매월 1일 수행:**

**1단계: Notion 내보내기**
```
1. Notion 홈 → Settings & Members
2. Settings → More → Export
3. "All" 선택 → Export
4. 다운로드된 zip 파일을 클라우드 저장소에 저장
```

**2단계: GitHub 태그 생성**
```bash
# 로컬에서 실행
git tag backup-$(date +%Y-%m-%d)
git push origin backup-$(date +%Y-%m-%d)

# 또는 GitHub 웹에서:
# Releases → Draft a new release → 새 버전 생성
```

**3단계: 코드 전체 백업**
```bash
# 전체 디렉토리 압축
tar -czf my-blog-backup-$(date +%Y-%m-%d).tar.gz .

# Windows PowerShell:
Compress-Archive -Path . -DestinationPath "my-blog-backup-$(Get-Date -Format 'yyyy-MM-dd').zip"

# 클라우드에 업로드
```

### 4.4 백업 검증

**월간 복구 테스트:**
```bash
# 백업에서 실제로 복구 가능한지 확인
1. 백업 파일 다운로드
2. 임시 폴더에 압축 해제
3. npm install && npm run build 성공 확인
4. 로컬 개발 서버 실행 테스트
```

---

## 5. 장애 복구 절차

### 5.1 데이터 손실 복구

**시나리오: 글이 실수로 삭제됨**

```
1단계 (즉시):
  □ Notion 휴지통 확인 (30일 보관)
  □ 삭제된 항목 찾기 → 복구

2단계 (Notion에 없을 경우):
  □ GitHub에서 최근 커밋 확인
  □ 커밋 내용에 글 정보 확인
  □ Vercel 배포 히스토리에서 이전 버전 복구

3단계 (모두 실패):
  □ 월간 백업 (Notion 내보내기 파일) 확인
  □ 백업 파일에서 손실된 글 찾기
  □ 수동으로 Notion에 재입력
```

### 5.2 배포 실패 복구

**시나리오: 배포 후 사이트 접속 불가**

```
1단계 (빠른 복구):
  □ Vercel Dashboard → Deployments
  □ 이전에 성공한 배포 찾기 (초록색 ✓)
  □ "Redeploy" 클릭 (자동으로 이전 버전 배포)

2단계 (Redeploy 실패):
  □ GitHub에서 이전 커밋으로 git revert
  □ 커밋 메시지: "Revert: 배포 실패로 인한 이전 버전 복구"
  □ git push origin main

3단계 (심각한 손상):
  □ 근본 원인 파악: 빌드 로그 상세 검토
  □ 로컬에서 npm run build 테스트
  □ 문제 해결 후 다시 배포
```

### 5.3 API 키 손상 복구

**시나리오: API 키가 노출됨**

```
1단계 (즉시):
  □ Notion Developers → Integration 선택
  □ "Regenerate secret" 클릭
  □ 새로운 API 키 복사

2단계 (Vercel 업데이트):
  □ Vercel Dashboard → Project Settings
  □ Environment Variables 수정
  □ NOTION_API_KEY 값 새로운 키로 변경
  □ 저장 (자동 재배포)

3단계 (확인):
  □ 배포 로그에서 성공 여부 확인
  □ 사이트 접속 테스트
  □ /search 페이지에서 글 검색 테스트

4단계 (마무리):
  □ Notion에서 이전 키 비활성화
  □ 팀원에게 알림
  □ 사건 기록 (언제, 어떻게, 복구)
```

---

## 6. 보안 체크리스트

### 월간 보안 감시

- [ ] API 키 로그 검토 (노출 여부)
- [ ] GitHub 커밋 히스토리에서 민감 정보 스캔
- [ ] Vercel 배포 환경변수 확인
- [ ] 팀 액세스 권한 검토
- [ ] 사용되지 않는 통합(Integration) 비활성화
- [ ] Notion 작업영역 권한 확인

### 분기별 보안 감시

- [ ] GitHub 저장소 보안 설정 검토
- [ ] Vercel 프로젝트 설정 검토
- [ ] API 키 로테이션 계획
- [ ] 팀원 온보딩/오프보딩 절차 점검
- [ ] 보안 정책 업데이트

### 연간 보안 감시

- [ ] 보안 감사 (외부 전문가)
- [ ] 백업 복구 테스트 실행
- [ ] 재해 복구 계획 검토 및 업데이트
- [ ] 새로운 보안 위협 조사 및 대응

---

## 7. 보안 인시던트 대응

### 보고 및 처리 절차

```
발견 → 보고 → 격리 → 조사 → 복구 → 사후분석

1. 발견: 비정상 활동 감지
   예: 예상치 못한 배포, API 요청 증가

2. 보고: 팀에 즉시 알림
   → 개발자, 관리자에게 연락

3. 격리: 손상 확대 방지
   → 필요시 서비스 일시 중단
   → 환경변수 비활성화

4. 조사: 원인 파악
   → 배포 로그 분석
   → API 호출 기록 검토

5. 복구: 정상 상태 복원
   → 롤백 또는 재배포
   → API 키 재발급

6. 사후분석: 재발 방지
   → 근본 원인 분석
   → 절차 개선
   → 팀 교육
```

---

## 부록: 유용한 명령어

```bash
# 환경변수 확인
echo $NOTION_API_KEY

# 깃헙에서 커밋된 민감 정보 검색
git log --all -S "secret" --oneline

# 최근 태그 확인
git tag -l | sort -V | tail -10

# 배포 히스토리 확인 (Vercel CLI)
vercel list  # 배포 목록 확인
vercel rollback  # 이전 배포로 롤백

# 보안 패키지 감시
npm audit

# 환경변수 로컬 테스트
source .env.local && npm run dev
```

---

## 연락처

- **개발자:** yujuyamelong@gmail.com
- **긴급:** 직접 연락 (24시간)
- **GitHub Issues:** 기술 문제

---

*마지막 업데이트: 2026년 5월 3일*
*작성자: Claude Code*
