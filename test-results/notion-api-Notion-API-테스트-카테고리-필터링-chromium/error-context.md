# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: notion-api.spec.ts >> Notion API 테스트 >> 카테고리 필터링
- Location: e2e\notion-api.spec.ts:64:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.getAttribute: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-testid="category-link"]').first()

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
          - generic:
            - generic:
              - generic:
                - img
              - generic:
                - img
              - generic:
                - generic:
                  - generic: 안녕하세요, 반갑습니다!
                - heading "저는 유주 입니다." [level=1]:
                  - generic: 저는
                  - generic: 유주
                  - generic: 입니다.
                - paragraph:
                  - img
                  - text: 풀스텍 개발자
                - paragraph:
                  - img
                  - text: AI 네이티브 개발자
                - paragraph:
                  - text: 개발하면서 배우고 경험한 것들을 기록합니다.
                  - text: 다양한 프로그래밍 언어를 배우는 것과 좋은 UI/UX를 만드는 것에
                  - text: 관심이 많습니다.
                - generic:
                  - generic: TypeScript
                  - generic: Next.js
                  - generic: React
                  - generic: Tailwind CSS
                  - generic: Node.js
                  - generic: Java
                  - generic: Vue.js
                - generic:
                  - button "다음 포스트로 이동":
                    - text: 블로그 글 보기
                    - img
                  - link "GitHub":
                    - /url: https://github.com
                    - img
                    - text: GitHub
                  - link "이력서 보러가기":
                    - /url: https://yujuyamelong-dev.github.io/my-web-profile/
                    - img
                    - text: 이력서 보러가기
                - generic:
                  - generic:
                    - generic:
                      - img
                    - generic:
                      - generic: "3"
                      - generic: 포스트
                  - generic:
                    - generic:
                      - img
                    - generic:
                      - generic: 3+
                      - generic: 프로젝트
                  - generic:
                    - generic:
                      - img
                    - generic:
                      - generic: 5+
                      - generic: 기술 스택
          - generic [ref=e25]:
            - generic [ref=e26]:
              - heading "블로그 글 목록" [level=2] [ref=e27]
              - paragraph [ref=e28]: 총 3개의 글
            - generic [ref=e29]:
              - generic [ref=e38] [cursor=pointer]:
                - link "자바스크립트 강의 초안입니다." [ref=e39]:
                  - /url: /posts/353da59e-7d34-80ba-a340-da3e87577aa4
                  - heading "자바스크립트 강의 초안입니다." [level=3] [ref=e40]
                - paragraph [ref=e41]: 자바스크립트 강의 초안입니당
                - generic [ref=e42]:
                  - img [ref=e43]
                  - link "javascript" [ref=e46]:
                    - /url: /tags/javascript
                  - link "클로드 코드" [ref=e47]:
                    - /url: /tags/-
                - generic [ref=e48]:
                  - generic [ref=e49]:
                    - img [ref=e50]
                    - time [ref=e52]: 2026년 5월 2일
                  - generic [ref=e53]: 읽기 →
              - generic [ref=e63] [cursor=pointer]:
                - link "웹 포트폴리오" [ref=e64]:
                  - /url: /posts/34eda59e-7d34-8077-b987-f8a0d7d92846
                  - heading "웹 포트폴리오" [level=3] [ref=e65]
                - paragraph [ref=e66]: 나의 웹 포트폴리오
                - generic [ref=e67]:
                  - img [ref=e68]
                  - link "html" [ref=e71]:
                    - /url: /tags/html
                  - link "css" [ref=e72]:
                    - /url: /tags/css
                  - link "javascript" [ref=e73]:
                    - /url: /tags/javascript
                - generic [ref=e74]:
                  - generic [ref=e75]:
                    - img [ref=e76]
                    - time [ref=e78]: 2026년 4월 26일
                  - generic [ref=e79]: 읽기 →
              - generic [ref=e89] [cursor=pointer]:
                - link "클로드 코드 강의 초안" [ref=e90]:
                  - /url: /posts/34eda59e-7d34-804a-a5fe-f9fba835a2f3
                  - heading "클로드 코드 강의 초안" [level=3] [ref=e91]
                - paragraph [ref=e92]: 클로드 코드 학습을 위한 강의초안
                - generic [ref=e93]:
                  - img [ref=e94]
                  - link "Claude Code" [ref=e97]:
                    - /url: /tags/claude-code
                  - link "클로드 코드" [ref=e98]:
                    - /url: /tags/-
                  - link "강의초안" [ref=e99]:
                    - /url: /tags
                - generic [ref=e100]:
                  - generic [ref=e101]:
                    - img [ref=e102]
                    - time [ref=e104]: 2026년 4월 26일
                  - generic [ref=e105]: 읽기 →
        - button "이전 슬라이드" [ref=e107]:
          - img [ref=e108]
        - button "다음 슬라이드" [ref=e110]:
          - img [ref=e111]
        - generic [ref=e113]:
          - button "슬라이드 1로 이동" [ref=e114]
          - button "슬라이드 2로 이동" [active] [ref=e115]
        - generic [ref=e116]: 2 / 2
  - alert [ref=e117]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.describe("Notion API 테스트", () => {
  4   |   test("getAllPosts() - 발행된 글 목록 조회", async ({ page }) => {
  5   |     await page.goto("/");
  6   | 
  7   |     // 페이지가 로드되고 PostCard 컴포넌트가 렌더링되었는지 확인
  8   |     const postCards = page.locator('[data-testid="post-card"]');
  9   |     const count = await postCards.count();
  10  | 
  11  |     expect(count).toBeGreaterThan(0);
  12  |   });
  13  | 
  14  |   test("getPostBySlug() - 특정 글 조회", async ({ page }) => {
  15  |     // 먼저 홈페이지에서 글 목록 로드
  16  |     await page.goto("/");
  17  |     await page.waitForTimeout(500);
  18  | 
  19  |     // 포스트 목록 슬라이드로 이동 (슬라이드 인디케이터 클릭)
  20  |     const postListButton = page.locator('button[aria-label="슬라이드 2로 이동"]');
  21  |     if (await postListButton.isVisible()) {
  22  |       await postListButton.click();
  23  |       await page.waitForTimeout(600);
  24  |     }
  25  | 
  26  |     // 첫 번째 글 링크 클릭
  27  |     const firstPostLink = page.locator('[data-testid="post-link"]').first();
  28  |     await firstPostLink.click({ timeout: 10000 });
  29  | 
  30  |     // 글 상세 페이지 확인
  31  |     const postTitle = page.locator('[data-testid="post-title"]');
  32  |     await expect(postTitle).toBeVisible();
  33  | 
  34  |     // 제목이 비어있지 않은지 확인
  35  |     const titleText = await postTitle.textContent();
  36  |     expect(titleText).toBeTruthy();
  37  |   });
  38  | 
  39  |   test("getPostBlocks() - 글의 블록 렌더링", async ({ page }) => {
  40  |     // 글 상세 페이지로 이동
  41  |     await page.goto("/");
  42  |     await page.waitForTimeout(500);
  43  | 
  44  |     // 포스트 목록 슬라이드로 이동
  45  |     const postListButton = page.locator('button[aria-label="슬라이드 2로 이동"]');
  46  |     if (await postListButton.isVisible()) {
  47  |       await postListButton.click();
  48  |       await page.waitForTimeout(600);
  49  |     }
  50  | 
  51  |     const firstPostLink = page.locator('[data-testid="post-link"]').first();
  52  |     await firstPostLink.click({ timeout: 10000 });
  53  | 
  54  |     // 콘텐츠 영역이 렌더링되었는지 확인
  55  |     const content = page.locator('[data-testid="post-content"]');
  56  |     await expect(content).toBeVisible();
  57  | 
  58  |     // 블록 요소가 있는지 확인
  59  |     const blocks = page.locator('[data-testid="notion-block"]');
  60  |     const blockCount = await blocks.count();
  61  |     expect(blockCount).toBeGreaterThan(0);
  62  |   });
  63  | 
  64  |   test("카테고리 필터링", async ({ page }) => {
  65  |     // 홈페이지에서 카테고리 필터 클릭
  66  |     await page.goto("/");
  67  |     await page.waitForTimeout(500);
  68  | 
  69  |     // 포스트 목록 슬라이드로 이동
  70  |     const postListButton = page.locator('button[aria-label="슬라이드 2로 이동"]');
  71  |     if (await postListButton.isVisible()) {
  72  |       await postListButton.click();
  73  |       await page.waitForTimeout(600);
  74  |     }
  75  | 
  76  |     // 첫 번째 글의 카테고리 클릭 (카테고리 필터 페이지로 이동)
  77  |     const categoryTag = page.locator('[data-testid="category-link"]').first();
> 78  |     const categoryName = await categoryTag.getAttribute("data-category");
      |                                            ^ Error: locator.getAttribute: Test timeout of 30000ms exceeded.
  79  | 
  80  |     if (categoryName) {
  81  |       await categoryTag.click();
  82  | 
  83  |       // 카테고리 페이지로 이동했는지 확인
  84  |       await expect(page).toHaveURL(new RegExp(`/category/${categoryName}`));
  85  | 
  86  |       // 해당 카테고리의 글들이 렌더링되었는지 확인
  87  |       const postCards = page.locator('[data-testid="post-card"]');
  88  |       const count = await postCards.count();
  89  |       expect(count).toBeGreaterThan(0);
  90  |     }
  91  |   });
  92  | 
  93  |   test("태그 필터링", async ({ page }) => {
  94  |     // 글 상세 페이지로 이동
  95  |     await page.goto("/");
  96  |     await page.waitForTimeout(500);
  97  | 
  98  |     // 포스트 목록 슬라이드로 이동
  99  |     const postListButton = page.locator('button[aria-label="슬라이드 2로 이동"]');
  100 |     if (await postListButton.isVisible()) {
  101 |       await postListButton.click();
  102 |       await page.waitForTimeout(600);
  103 |     }
  104 | 
  105 |     const firstPostLink = page.locator('[data-testid="post-link"]').first();
  106 |     await firstPostLink.click({ timeout: 10000 });
  107 | 
  108 |     // 첫 번째 태그 클릭
  109 |     const tagLink = page.locator('[data-testid="tag-link"]').first();
  110 |     const tagName = await tagLink.getAttribute("data-tag");
  111 | 
  112 |     if (tagName) {
  113 |       await tagLink.click();
  114 | 
  115 |       // 태그 페이지로 이동했는지 확인
  116 |       await expect(page).toHaveURL(new RegExp(`/tags/${tagName}`));
  117 | 
  118 |       // 해당 태그의 글들이 렌더링되었는지 확인
  119 |       const postCards = page.locator('[data-testid="post-card"]');
  120 |       const count = await postCards.count();
  121 |       expect(count).toBeGreaterThan(0);
  122 |     }
  123 |   });
  124 | 
  125 |   test("Rate Limit 관리 - 연속 요청 처리", async ({ page }) => {
  126 |     // 여러 글을 빠르게 로드하여 Rate Limit이 정상 작동하는지 확인
  127 |     await page.goto("/");
  128 |     await page.waitForTimeout(500);
  129 | 
  130 |     // 포스트 목록 슬라이드로 이동
  131 |     const postListButton = page.locator('button[aria-label="슬라이드 2로 이동"]');
  132 |     if (await postListButton.isVisible()) {
  133 |       await postListButton.click();
  134 |       await page.waitForTimeout(600);
  135 |     }
  136 | 
  137 |     // 여러 글 링크에 접근
  138 |     const postLinks = page.locator('[data-testid="post-link"]');
  139 |     const count = Math.min(2, await postLinks.count());
  140 | 
  141 |     for (let i = 0; i < count; i++) {
  142 |       await postLinks.nth(i).click({ timeout: 10000 });
  143 |       await expect(page.locator('[data-testid="post-title"]')).toBeVisible();
  144 |       await page.goBack();
  145 |       await page.goto("/");
  146 |       await page.waitForTimeout(500);
  147 | 
  148 |       // 포스트 목록 슬라이드로 다시 이동
  149 |       const btn = page.locator('button[aria-label="슬라이드 2로 이동"]');
  150 |       if (await btn.isVisible()) {
  151 |         await btn.click();
  152 |         await page.waitForTimeout(600);
  153 |       }
  154 |     }
  155 | 
  156 |     // 모든 요청이 정상적으로 완료되었는지 확인
  157 |     expect(true).toBe(true);
  158 |   });
  159 | });
  160 | 
```