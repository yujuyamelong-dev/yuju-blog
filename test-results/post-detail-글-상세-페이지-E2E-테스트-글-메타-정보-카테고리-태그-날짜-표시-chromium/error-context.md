# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: post-detail.spec.ts >> 글 상세 페이지 E2E 테스트 >> 글 메타 정보 (카테고리, 태그, 날짜) 표시
- Location: e2e\post-detail.spec.ts:28:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "boolean"
Received: "undefined"
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
      - article [ref=e21]:
        - generic [ref=e22]:
          - generic [ref=e23]:
            - heading "자바스크립트 강의 초안입니다." [level=1] [ref=e24]
            - generic [ref=e25]:
              - link "#javascript" [ref=e26] [cursor=pointer]:
                - /url: /tags/javascript
                - generic [ref=e27]: "#javascript"
              - link "#클로드 코드" [ref=e28] [cursor=pointer]:
                - /url: /tags/-
                - generic [ref=e29]: "#클로드 코드"
            - generic [ref=e30]:
              - generic [ref=e31]: "발행: 2026년 5월 2일"
              - generic [ref=e32]: "수정: 2026년 5월 2일"
          - paragraph [ref=e34]: 자바스크립트 강의 초안입니당
          - navigation [ref=e35]:
            - link "다음 글 → 웹 포트폴리오" [ref=e38] [cursor=pointer]:
              - /url: /posts/34eda59e-7d34-8077-b987-f8a0d7d92846
              - generic [ref=e39]: 다음 글 →
              - generic [ref=e40]: 웹 포트폴리오
          - link "← 목록으로 돌아가기" [ref=e42] [cursor=pointer]:
            - /url: /?slide=1
  - alert [ref=e43]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | // 테스트용 글 URL을 가져오는 헬퍼
  4   | async function getFirstPostUrl(page) {
  5   |   await page.goto("/");
  6   |   await page.waitForSelector('[data-testid="post-link"]', { timeout: 10000 });
  7   |   const firstPostLink = page.locator('[data-testid="post-link"]').first();
  8   |   return await firstPostLink.getAttribute("href");
  9   | }
  10  | 
  11  | test.describe("글 상세 페이지 E2E 테스트", () => {
  12  |   test("글 상세 페이지 로드 및 기본 정보 표시", async ({ page }) => {
  13  |     const postUrl = await getFirstPostUrl(page);
  14  |     expect(postUrl).toMatch(/^\/posts\/[a-zA-Z0-9-]+$/);
  15  | 
  16  |     // 포스트 상세 페이지로 이동
  17  |     await page.goto(postUrl!);
  18  | 
  19  |     // 글 제목 확인
  20  |     const postTitle = page.locator('[data-testid="post-title"]');
  21  |     await postTitle.waitFor({ timeout: 10000 });
  22  |     await expect(postTitle).toBeVisible();
  23  |     const titleText = await postTitle.textContent();
  24  |     expect(titleText).toBeTruthy();
  25  |     expect(titleText?.length).toBeGreaterThan(0);
  26  |   });
  27  | 
  28  |   test("글 메타 정보 (카테고리, 태그, 날짜) 표시", async ({ page }) => {
  29  |     const postUrl = await getFirstPostUrl(page);
  30  |     await page.goto(postUrl!);
  31  | 
  32  |     // 카테고리 배지 확인 (있으면 표시)
  33  |     const categoryLink = page.locator('[data-testid="category-link"]');
  34  |     const categoryExists = await categoryLink.isVisible().catch(() => false);
  35  |     if (categoryExists) {
  36  |       await expect(categoryLink).toBeVisible();
  37  |     }
  38  | 
  39  |     // 태그 확인 (있으면 표시)
  40  |     const tagLinks = page.locator('[data-testid="tag-link"]');
  41  |     const tagCount = await tagLinks.count().catch(() => 0);
  42  |     expect(tagCount).toBeGreaterThanOrEqual(0);
  43  | 
  44  |     // 날짜 정보 확인
  45  |     const articleHeader = page.locator("article > header");
  46  |     const headerText = await articleHeader.textContent({ timeout: 5000 }).catch(() => null);
  47  |     const hasDateInfo = headerText?.includes("발행") || headerText?.includes("수정");
  48  |     // 헤더가 없을 수도 있음 (스타일에 따라)
> 49  |     expect(typeof hasDateInfo).toBe("boolean");
      |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  50  |   });
  51  | 
  52  |   test("Notion 블록 렌더링 검증", async ({ page }) => {
  53  |     const postUrl = await getFirstPostUrl(page);
  54  |     await page.goto(postUrl!);
  55  | 
  56  |     // 포스트 콘텐츠 확인
  57  |     const postContent = page.locator('[data-testid="post-content"]');
  58  |     await expect(postContent).toBeVisible({ timeout: 10000 });
  59  | 
  60  |     // 최소 하나 이상의 블록이 렌더링되었는지 확인
  61  |     const notionBlocks = page.locator('[data-testid="notion-block"]');
  62  |     const blockCount = await notionBlocks.count();
  63  |     expect(blockCount).toBeGreaterThan(0);
  64  |   });
  65  | 
  66  |   test("Paragraph 블록 렌더링", async ({ page }) => {
  67  |     const postUrl = await getFirstPostUrl(page);
  68  |     await page.goto(postUrl!);
  69  | 
  70  |     // 포스트 콘텐츠 내 paragraph 확인
  71  |     const postContent = page.locator('[data-testid="post-content"]');
  72  |     const paragraphs = postContent.locator("p");
  73  |     const paragraphCount = await paragraphs.count();
  74  | 
  75  |     // Paragraph가 있을 수도, 없을 수도 있음 (다른 블록 타입이 있을 수 있음)
  76  |     expect(paragraphCount).toBeGreaterThanOrEqual(0);
  77  |   });
  78  | 
  79  |   test("Heading 블록 렌더링", async ({ page }) => {
  80  |     const postUrl = await getFirstPostUrl(page);
  81  |     await page.goto(postUrl!);
  82  | 
  83  |     // 포스트 콘텐츠 내 heading 확인
  84  |     const postContent = page.locator('[data-testid="post-content"]');
  85  |     const headings = postContent.locator("h1, h2, h3, h4, h5, h6");
  86  |     const headingCount = await headings.count();
  87  | 
  88  |     // Heading이 있을 수도, 없을 수도 있음
  89  |     expect(headingCount).toBeGreaterThanOrEqual(0);
  90  |   });
  91  | 
  92  |   test("Code 블록 렌더링 (있는 경우)", async ({ page }) => {
  93  |     const postUrl = await getFirstPostUrl(page);
  94  |     await page.goto(postUrl!);
  95  | 
  96  |     // 포스트 콘텐츠 내 code 블록 확인
  97  |     const postContent = page.locator('[data-testid="post-content"]');
  98  |     const codeBlocks = postContent.locator("pre");
  99  |     const codeBlockCount = await codeBlocks.count();
  100 | 
  101 |     // Code 블록이 있을 수도, 없을 수도 있음
  102 |     expect(codeBlockCount).toBeGreaterThanOrEqual(0);
  103 |   });
  104 | 
  105 |   test("Image 블록 렌더링 (있는 경우)", async ({ page }) => {
  106 |     const postUrl = await getFirstPostUrl(page);
  107 |     await page.goto(postUrl!);
  108 | 
  109 |     // 포스트 콘텐츠 내 figure 요소 (이미지) 확인
  110 |     const postContent = page.locator('[data-testid="post-content"]');
  111 |     const figures = postContent.locator("figure");
  112 |     const figureCount = await figures.count();
  113 | 
  114 |     // 이미지가 있을 수도, 없을 수도 있음
  115 |     expect(figureCount).toBeGreaterThanOrEqual(0);
  116 | 
  117 |     // 이미지가 있으면 next/image로 렌더링된 img 태그 확인
  118 |     if (figureCount > 0) {
  119 |       const images = postContent.locator("figure img");
  120 |       const imageCount = await images.count();
  121 |       expect(imageCount).toBeGreaterThan(0);
  122 | 
  123 |       // 이미지의 alt 텍스트 또는 src 속성 확인
  124 |       const firstImage = images.first();
  125 |       const src = await firstImage.getAttribute("src");
  126 |       expect(src).toBeTruthy();
  127 |     }
  128 |   });
  129 | 
  130 |   test("List 블록 렌더링 (있는 경우)", async ({ page }) => {
  131 |     const postUrl = await getFirstPostUrl(page);
  132 |     await page.goto(postUrl!);
  133 | 
  134 |     // 포스트 콘텐츠 내 list 요소 확인
  135 |     const postContent = page.locator('[data-testid="post-content"]');
  136 |     const lists = postContent.locator("ul, ol");
  137 |     const listCount = await lists.count();
  138 | 
  139 |     // List가 있을 수도, 없을 수도 있음
  140 |     expect(listCount).toBeGreaterThanOrEqual(0);
  141 |   });
  142 | 
  143 |   test("Quote 블록 렌더링 (있는 경우)", async ({ page }) => {
  144 |     const postUrl = await getFirstPostUrl(page);
  145 |     await page.goto(postUrl!);
  146 | 
  147 |     // 포스트 콘텐츠 내 blockquote 요소 확인
  148 |     const postContent = page.locator('[data-testid="post-content"]');
  149 |     const blockquotes = postContent.locator("blockquote");
```