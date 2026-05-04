# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: notion-api.spec.ts >> Notion API 테스트 >> getPostBlocks() - 글의 블록 렌더링
- Location: e2e\notion-api.spec.ts:39:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-content"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-testid="post-content"]')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]: 자바스크립트 강의 초안입니다. | 유주's Blog
  - generic [ref=e3]:
    - banner "사이트 헤더" [ref=e4]:
      - link "블로그 홈으로 이동" [ref=e5] [cursor=pointer]:
        - /url: /
        - img [ref=e7]
        - generic [ref=e11]: 유주's Blog
      - generic [ref=e13]:
        - img [ref=e14]
        - textbox "블로그 글 검색" [ref=e17]:
          - /placeholder: 글 검색...
      - link "관리자 로그인" [ref=e18] [cursor=pointer]:
        - /url: /admin/login
        - button "관리자 로그인" [ref=e19]: 로그인
      - button "다크/라이트 모드 전환" [ref=e20]:
        - img
    - main [ref=e21]:
      - article [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]:
            - heading "자바스크립트 강의 초안입니다." [level=1] [ref=e25]
            - generic [ref=e26]:
              - link "#javascript" [ref=e27] [cursor=pointer]:
                - /url: /tags/javascript
                - generic [ref=e28]: "#javascript"
              - link "#클로드 코드" [ref=e29] [cursor=pointer]:
                - /url: /tags/-
                - generic [ref=e30]: "#클로드 코드"
            - generic [ref=e31]:
              - generic [ref=e32]: "발행: 2026년 5월 2일"
              - generic [ref=e33]: "수정: 2026년 5월 2일"
          - paragraph [ref=e35]: 자바스크립트 강의 초안입니당
          - navigation [ref=e36]:
            - link "다음 글 → 웹 포트폴리오" [ref=e39] [cursor=pointer]:
              - /url: /posts/34eda59e-7d34-8077-b987-f8a0d7d92846
              - generic [ref=e40]: 다음 글 →
              - generic [ref=e41]: 웹 포트폴리오
          - link "← 목록으로 돌아가기" [ref=e43] [cursor=pointer]:
            - /url: /?slide=1
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
> 56  |     await expect(content).toBeVisible();
      |                           ^ Error: expect(locator).toBeVisible() failed
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
  78  |     const categoryName = await categoryTag.getAttribute("data-category");
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
```