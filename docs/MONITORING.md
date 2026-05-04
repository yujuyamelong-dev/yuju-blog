# 모니터링 및 운영 가이드

## 개요

이 문서는 Notion CMS 블로그의 모니터링 및 운영에 필요한 모든 절차를 제공합니다.

---

## 1. 일일 운영 체크리스트

### 아침 점검 (8:00 AM)

**항목 1: 사이트 접속 확인**
```bash
# 터미널에서 실행
curl -s https://yourdomain.com | grep -q "유주's Blog" && echo "✓ 사이트 정상" || echo "✗ 사이트 오류"
```

**항목 2: 최신 글 표시 확인**
- 홈페이지 방문 → 최신 글 확인
- 예상: 지난주 발행된 글들이 표시되어야 함

**항목 3: Vercel Analytics 확인**
1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. "Analytics" 탭 → "Web Analytics" 선택
3. 에러율 확인 (정상: 0%, 주의: 1-5%, 위험: 5% 이상)

**항목 4: 배포 상태 확인**
- Vercel Dashboard → Deployments 탭
- 최근 배포 상태: ✓ (초록색) = 정상

### 발견 시 대응

| 증상 | 원인 | 대응 |
|-----|------|------|
| 사이트 접속 불가 | DNS/서버 문제 | Vercel 상태 페이지 확인 |
| 최신 글 미표시 | Notion 싱크 지연 | 1시간 대기 후 재확인 |
| 에러율 증가 | API 문제 | 배포 로그 확인 |

---

## 2. 주간 운영 체크리스트

### 매주 월요일 14:00

**항목 1: 빌드 로그 검토**
1. Vercel Dashboard → Deployments
2. 지난 7일간 배포 로그 확인
3. 경고(⚠) 또는 에러(✗) 확인

**항목 2: 성능 메트릭 검토**
```
Vercel Analytics → Web Vitals
- LCP (Largest Contentful Paint): < 2.5s 권장
- FID (First Input Delay): < 100ms 권장
- CLS (Cumulative Layout Shift): < 0.1 권장
```

**항목 3: 트래픽 분석**
- 가장 많이 방문한 페이지 확인
- 검색 키워드 분석
- 사용자 지역 분석

**항목 4: API 상태 확인**
```bash
# Notion API 직접 테스트
curl -X POST https://api.notion.com/v1/databases/{DB_ID}/query \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2024-04" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## 3. 월간 운영 체크리스트

### 매월 1일 10:00

**항목 1: 월간 레포트 생성**
```
Vercel Analytics → 지난 30일 데이터 확인
- 총 방문 수
- 평균 성능 점수
- 상위 5개 페이지
- 에러 발생 기록
```

**항목 2: 비용 검토**
- Vercel 사용량 확인
- Notion API 호출 수 확인 (무료: 3회/초, 유료: 100회/초)
- 예상 청구액 검토

**항목 3: 콘텐츠 품질 검토**
```
Notion 데이터베이스 점검:
- 발행되지 않은 글 (Published = unchecked)
- 누락된 메타데이터 (Slug, Category 등)
- 깨진 링크 또는 이미지 확인
```

**항목 4: 보안 검토**
- API 키 로테이션 검토 (6개월마다 권장)
- 접근 로그 확인
- 비정상적인 트래픽 패턴 확인

**항목 5: 백업 생성**
```bash
# 수동 백업
git tag backup-$(date +%Y-%m-%d)
git push origin backup-$(date +%Y-%m-%d)

# Notion 내보내기 (Notion 웹에서 수행)
# Workspace Settings → More → Export
```

---

## 4. Vercel Analytics 활용

### 주요 지표 설명

**Core Web Vitals**
- **LCP (Largest Contentful Paint)**
  - 정의: 페이지의 주요 콘텐츠가 렌더링되는 시간
  - 목표: 2.5초 이하
  - 개선 팁: 이미지 최적화, 비동기 스크립트 사용

- **FID (First Input Delay)**
  - 정의: 사용자 입력 후 응답 시간
  - 목표: 100ms 이하
  - 개선 팁: JavaScript 번들 크기 줄이기

- **CLS (Cumulative Layout Shift)**
  - 정의: 페이지 레이아웃 변화 정도
  - 목표: 0.1 이하
  - 개선 팁: 이미지/동영상에 명시적 크기 설정

### 데이터 해석

```
✓ 초록색: 90-100 (우수)
🟡 노란색: 50-89 (보통)
✗ 빨간색: 0-49 (미흡)
```

---

## 5. 장애 대응 및 복구

### 장애 유형별 대응

#### 장애 1: 사이트 접속 불가
```
발생 시간: 즉시 인지
대응 1단계:
  1. Vercel 상태 페이지 확인 (https://vercel-status.com)
  2. DNS 설정 확인
  3. 브라우저 캐시 초기화 (Ctrl+Shift+Delete)

대응 2단계 (10분 이상 지속):
  1. Vercel Dashboard → Deployments
  2. 이전 성공한 배포 찾기
  3. "Redeploy" 클릭으로 이전 버전 복구

대응 3단계 (재배포 실패):
  1. GitHub에서 코드 상태 확인
  2. 최근 커밋 로그 검토
  3. 필요시 Rollback
```

#### 장애 2: 최신 글이 보이지 않음
```
원인 추적:
  1. Notion에서 "Published" 체크 확인
  2. "PublishedDate"가 현재 날짜 이전인지 확인
  3. Slug 필드에 특수문자 없는지 확인

해결 절차:
  1. 자정 UTC 기준 최대 1시간 지연 (캐시)
  2. Vercel 강제 재배포: Deployments → "Redeploy"
  3. 브라우저 캐시 초기화

로그 확인:
  curl https://yourdomain.com/api/posts
```

#### 장애 3: 이미지가 깨짐 (X 마크)
```
원인 분석:
  1. F12 (개발자 도구) → Network 탭
  2. 이미지 요청 찾기 → Status 확인
  3. 404: 이미지 URL 오류
  4. 403: 접근 권한 없음
  5. 타임아웃: 호스트 서버 문제

해결 방법:
  1. Notion에서 이미지 URL 확인
  2. next.config.ts의 remotePatterns 확인
  3. 필요시 이미지를 CDN으로 업로드

next.config.ts 확인:
  - amazonaws.com ✓
  - notion.so ✓
  - unsplash.com ✓
```

#### 장애 4: 검색이 작동하지 않음
```
원인 조사:
  1. /search 페이지 접속 시도
  2. 브라우저 콘솔 (F12) 에러 메시지 확인
  3. Network 탭에서 API 요청 상태 확인

일반적인 에러 코드:
  401: Notion API 키 만료 → 재발급
  403: API 권한 부족 → 권한 확인
  429: 요청 빈도 초과 → 조절
  500: 서버 에러 → 배포 로그 확인

복구:
  1. env 변수 확인
  2. Vercel 재배포
  3. Notion API 토큰 재생성 필요시
```

---

## 6. 성능 최적화

### 페이지 로드 시간 개선

**1단계: 병목 지점 찾기**
```bash
# Vercel Analytics에서 느린 페이지 확인
# Dashboard → Analytics → Pages → "Duration" 정렬
```

**2단계: 원인 파악**
```
일반적인 원인:
- 큰 이미지: 다운샘플링 또는 WebP 변환
- 많은 API 호출: 요청 최적화 또는 캐싱
- 무거운 라이브러리: 번들 분석 (ANALYZE=true npm run build)
```

**3단계: 개선**
```
이미지 최적화:
  - Next.js Image 컴포넌트 사용
  - 명시적 width/height 설정
  - 동적 import 사용

API 최적화:
  - 필요한 필드만 요청
  - 캐싱 활성화 (Cache-Control 헤더)
  - 요청 배칭
```

---

## 7. 모니터링 도구

### Vercel Analytics
- **URL:** https://vercel.com/dashboard
- **확인 항목:** Core Web Vitals, 에러율, 트래픽
- **빈도:** 일일

### GitHub Insights
- **URL:** https://github.com/yujuyamelong/my-blog/insights
- **확인 항목:** 커밋 빈도, 기여도
- **빈도:** 주간

### Notion Analytics
- **URL:** Notion 작업영역 설정 → Analytics
- **확인 항목:** 페이지 뷰, 사용자 활동
- **빈도:** 월간

---

## 8. 연락처 및 에스컬레이션

### 기술 지원 채널
- GitHub Issues: 코드/기술 문제
- 이메일: yujuyamelong@gmail.com
- 긴급 연락: (24시간 대응)

### 에스컬레이션 프로세스
1. **Level 1 (자체 해결):** 위 트러블슈팅 가이드 참조
2. **Level 2 (개발자 지원):** 자세한 로그와 함께 GitHub Issue 생성
3. **Level 3 (긴급):** 직접 연락

---

## 부록: 유용한 명령어

```bash
# 로컬 개발 환경 완전 재시작
rm -rf .next node_modules && npm install && npm run dev

# 빌드 테스트
npm run build && npm start

# 린트 자동 수정
npm run lint -- --fix

# Notion API 직접 테스트
curl -X POST https://api.notion.com/v1/search \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2024-04" \
  -H "Content-Type: application/json" \
  -d '{"query":"post"}'
```

---

*마지막 업데이트: 2026년 5월 3일*
*작성자: Claude Code*
