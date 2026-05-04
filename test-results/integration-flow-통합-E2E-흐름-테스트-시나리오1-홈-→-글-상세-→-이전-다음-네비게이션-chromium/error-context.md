# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: integration-flow.spec.ts >> 통합 E2E 흐름 테스트 >> 시나리오1: 홈 → 글 상세 → 이전/다음 네비게이션
- Location: e2e\integration-flow.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-link"]').first()
    - locator resolved to <a data-testid="post-link" href="/posts/353da59e-7d34-80ba-a340-da3e87577aa4">…</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative z-10 flex w-full max-w-4xl flex-col items-start px-4 sm:px-6 md:px-16 lg:px-20 xl:px-24">…</div> from <div class="absolute inset-0 transition-opacity duration-500 opacity-100">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative z-10 flex w-full max-w-4xl flex-col items-start px-4 sm:px-6 md:px-16 lg:px-20 xl:px-24">…</div> from <div class="absolute inset-0 transition-opacity duration-500 opacity-100">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    53 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="relative z-10 flex w-full max-w-4xl flex-col items-start px-4 sm:px-6 md:px-16 lg:px-20 xl:px-24">…</div> from <div class="absolute inset-0 transition-opacity duration-500 opacity-100">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner "사이트 헤더" [ref=e3]:
      - link "블로그 홈으로 이동" [ref=e4] [cursor=pointer]:
        - /url: /
        - img [ref=e6]
        - generic [ref=e10]: 유주's Blog
      - generic [ref=e12]:
        - img [ref=e13]
        - textbox "블로그 글 검색" [ref=e16]:
          - /placeholder: 글 검색...
      - link "관리자 로그인" [ref=e17] [cursor=pointer]:
        - /url: /admin/login
        - button "관리자 로그인" [ref=e18]: 로그인
      - button "다크/라이트 모드 전환" [ref=e19]:
        - img
    - main [ref=e20]:
      - generic [ref=e21]:
        - generic [ref=e22]:
          - generic [ref=e24]:
            - generic:
              - img
            - generic:
              - img
            - generic [ref=e26]:
              - generic [ref=e29]: 안녕하세요, 반갑습니다!
              - heading "저는 유주 입니다." [level=1] [ref=e30]:
                - generic [ref=e31]: 저는
                - generic [ref=e32]: 유주
                - generic [ref=e33]: 입니다.
              - paragraph [ref=e34]:
                - img [ref=e35]
                - text: 풀스텍 개발자
              - paragraph [ref=e39]:
                - img [ref=e40]
                - text: AI 네이티브 개발자
              - paragraph [ref=e44]:
                - text: 개발하면서 배우고 경험한 것들을 기록합니다.
                - text: 다양한 프로그래밍 언어를 배우는 것과 좋은 UI/UX를 만드는 것에
                - text: 관심이 많습니다.
              - generic [ref=e45]:
                - generic [ref=e46]: TypeScript
                - generic [ref=e47]: Next.js
                - generic [ref=e48]: React
                - generic [ref=e49]: Tailwind CSS
                - generic [ref=e50]: Node.js
                - generic [ref=e51]: Java
                - generic [ref=e52]: Vue.js
              - generic [ref=e53]:
                - button "다음 포스트로 이동" [ref=e54]:
                  - text: 블로그 글 보기
                  - img [ref=e55]
                - link "GitHub" [ref=e57] [cursor=pointer]:
                  - /url: https://github.com
                  - img [ref=e58]
                  - text: GitHub
                - link "이력서 보러가기" [ref=e61] [cursor=pointer]:
                  - /url: https://yujuyamelong-dev.github.io/my-web-profile/
                  - img [ref=e62]
                  - text: 이력서 보러가기
              - generic [ref=e65]:
                - generic [ref=e66]:
                  - img [ref=e68]
                  - generic [ref=e72]:
                    - generic [ref=e73]: "3"
                    - generic [ref=e74]: 포스트
                - generic [ref=e75]:
                  - img [ref=e77]
                  - generic [ref=e80]:
                    - generic [ref=e81]: 3+
                    - generic [ref=e82]: 프로젝트
                - generic [ref=e83]:
                  - img [ref=e85]
                  - generic [ref=e88]:
                    - generic [ref=e89]: 5+
                    - generic [ref=e90]: 기술 스택
          - generic:
            - generic:
              - generic:
                - generic:
                  - heading "블로그 글 목록" [level=2]
                  - paragraph: 총 3개의 글
                - generic:
                  - generic:
                    - generic:
                      - generic:
                        - link "자바스크립트 강의 초안입니다.":
                          - /url: /posts/353da59e-7d34-80ba-a340-da3e87577aa4
                          - heading "자바스크립트 강의 초안입니다." [level=3]
                        - paragraph: 자바스크립트 강의 초안입니당
                        - generic:
                          - img
                          - link "javascript":
                            - /url: /tags/javascript
                          - link "클로드 코드":
                            - /url: /tags/-
                        - generic:
                          - generic:
                            - img
                            - time: 2026년 5월 2일
                          - generic: 읽기 →
                  - generic:
                    - generic:
                      - generic:
                        - link "웹 포트폴리오":
                          - /url: /posts/34eda59e-7d34-8077-b987-f8a0d7d92846
                          - heading "웹 포트폴리오" [level=3]
                        - paragraph: 나의 웹 포트폴리오
                        - generic:
                          - img
                          - link "html":
                            - /url: /tags/html
                          - link "css":
                            - /url: /tags/css
                          - link "javascript":
                            - /url: /tags/javascript
                        - generic:
                          - generic:
                            - img
                            - time: 2026년 4월 26일
                          - generic: 읽기 →
                  - generic:
                    - generic:
                      - generic:
                        - link "클로드 코드 강의 초안":
                          - /url: /posts/34eda59e-7d34-804a-a5fe-f9fba835a2f3
                          - heading "클로드 코드 강의 초안" [level=3]
                        - paragraph: 클로드 코드 학습을 위한 강의초안
                        - generic:
                          - img
                          - link "Claude Code":
                            - /url: /tags/claude-code
                          - link "클로드 코드":
                            - /url: /tags/-
                          - link "강의초안":
                            - /url: /tags
                        - generic:
                          - generic:
                            - img
                            - time: 2026년 4월 26일
                          - generic: 읽기 →
        - button "이전 슬라이드" [ref=e91]:
          - img [ref=e92]
        - button "다음 슬라이드" [ref=e94]:
          - img [ref=e95]
        - generic [ref=e97]:
          - button "슬라이드 1로 이동" [ref=e98]
          - button "슬라이드 2로 이동" [ref=e99]
        - generic [ref=e100]: 1 / 2
  - alert [ref=e101]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.describe("통합 E2E 흐름 테스트", () => {
  4   |   test("시나리오1: 홈 → 글 상세 → 이전/다음 네비게이션", async ({ page }) => {
  5   |     // 홈 페이지 접속
  6   |     await page.goto("/");
  7   |     await expect(page).toHaveTitle("홈");
  8   | 
  9   |     // 포스트 카드 로드 확인
  10  |     await page.waitForSelector('[data-testid="post-card"]', { timeout: 10000 });
  11  |     const postCards = page.locator('[data-testid="post-card"]');
  12  |     const cardCount = await postCards.count();
  13  |     expect(cardCount).toBeGreaterThanOrEqual(3);
  14  | 
  15  |     // 첫 번째 포스트 클릭
  16  |     const firstPostLink = page.locator('[data-testid="post-link"]').first();
  17  |     const postUrl = await firstPostLink.getAttribute("href");
  18  |     expect(postUrl).toMatch(/^\/posts\/[a-zA-Z0-9-]+$/);
  19  | 
> 20  |     await firstPostLink.click();
      |                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
  21  |     await page.waitForURL(`**${postUrl}**`, { timeout: 10000 });
  22  | 
  23  |     // 글 상세 페이지 확인
  24  |     const postTitle = page.locator('[data-testid="post-title"]');
  25  |     await expect(postTitle).toBeVisible({ timeout: 10000 });
  26  | 
  27  |     // 포스트 콘텐츠 로드 확인
  28  |     const postContent = page.locator('[data-testid="post-content"]');
  29  |     await expect(postContent).toBeVisible({ timeout: 10000 });
  30  | 
  31  |     // 이전/다음 네비게이션 확인
  32  |     const postNavigation = page.locator('[data-testid="post-navigation"]');
  33  |     const navigationExists = await postNavigation.isVisible().catch(() => false);
  34  | 
  35  |     if (navigationExists) {
  36  |       // 다음 글이 있으면 클릭
  37  |       const nextLink = page.locator('[data-testid="next-post-link"]');
  38  |       const nextLinkExists = await nextLink.isVisible().catch(() => false);
  39  | 
  40  |       if (nextLinkExists) {
  41  |         const nextHref = await nextLink.getAttribute("href");
  42  |         expect(nextHref).toMatch(/^\/posts\/[a-zA-Z0-9-]+$/);
  43  | 
  44  |         await nextLink.click();
  45  |         await page.waitForURL(`**${nextHref}**`, { timeout: 10000 });
  46  | 
  47  |         // 새 글이 로드되었는지 확인
  48  |         const newTitle = page.locator('[data-testid="post-title"]');
  49  |         await expect(newTitle).toBeVisible({ timeout: 10000 });
  50  |       }
  51  |     }
  52  |   });
  53  | 
  54  |   test("시나리오2: 카테고리 필터링", async ({ page }) => {
  55  |     // 홈 페이지 접속
  56  |     await page.goto("/");
  57  | 
  58  |     // 카테고리 필터 확인
  59  |     const categoryLinks = page.locator('nav[aria-label="카테고리 필터"] a');
  60  |     const categoryCount = await categoryLinks.count();
  61  | 
  62  |     if (categoryCount > 1) {
  63  |       // 첫 번째 카테고리 선택 (0번째는 전체)
  64  |       const categoryName = await categoryLinks.nth(1).textContent();
  65  |       await categoryLinks.nth(1).click();
  66  | 
  67  |       // 카테고리 페이지 로드 확인
  68  |       await page.waitForURL("**/categories/**", { timeout: 10000 });
  69  |       const pageTitle = page.locator("h1").first();
  70  |       await expect(pageTitle).toBeVisible({ timeout: 10000 });
  71  | 
  72  |       // 포스트 카드 로드 확인
  73  |       const postCards = page.locator('[data-testid="post-card"]');
  74  |       const count = await postCards.count();
  75  | 
  76  |       // 카테고리에 포스트가 있을 수도, 없을 수도 있음
  77  |       expect(count).toBeGreaterThanOrEqual(0);
  78  | 
  79  |       // 각 포스트 카드의 카테고리 확인
  80  |       if (count > 0) {
  81  |         const firstCard = postCards.first();
  82  |         const categoryBadge = firstCard.locator('[data-testid="category-link"]');
  83  |         const hasBadge = await categoryBadge.isVisible().catch(() => false);
  84  |         expect(typeof hasBadge).toBe("boolean");
  85  |       }
  86  |     }
  87  |   });
  88  | 
  89  |   test("시나리오3: 검색 (debouncing) 기능", async ({ page }) => {
  90  |     // 홈 페이지 접속
  91  |     await page.goto("/");
  92  | 
  93  |     // 검색 입력창 확인
  94  |     const searchInput = page.locator('[data-testid="search-input"]');
  95  |     await expect(searchInput).toBeVisible({ timeout: 10000 });
  96  | 
  97  |     // debouncing 테스트: 빠르게 입력 후 한번만 요청되는지 확인
  98  |     const initialUrl = page.url();
  99  | 
  100 |     // 검색어 입력 (debouncing 중)
  101 |     await searchInput.type("T", { delay: 50 });
  102 |     await searchInput.type("y", { delay: 50 });
  103 |     await searchInput.type("p", { delay: 50 });
  104 |     await searchInput.type("e", { delay: 50 });
  105 | 
  106 |     // debouncing 전에는 URL이 변경되지 않음
  107 |     let currentUrl = page.url();
  108 |     expect(currentUrl).toBe(initialUrl);
  109 | 
  110 |     // debouncing 후 검색 페이지로 이동
  111 |     await page.waitForURL("/search?q=*", { timeout: 5000 });
  112 | 
  113 |     // 검색 결과 확인
  114 |     const heading = page.locator("h1", { hasText: "검색 결과" });
  115 |     await expect(heading).toBeVisible({ timeout: 10000 });
  116 | 
  117 |     const postCards = page.locator('[data-testid="post-card"]');
  118 |     const count = await postCards.count();
  119 |     expect(count).toBeGreaterThanOrEqual(0);
  120 |   });
```