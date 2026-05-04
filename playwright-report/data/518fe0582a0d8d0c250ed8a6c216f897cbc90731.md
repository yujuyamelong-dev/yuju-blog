# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tag-filtering.spec.ts >> 태그 필터링 기능 >> 글 상세에서 태그 클릭 후 필터 페이지 이동
- Location: e2e\tag-filtering.spec.ts:4:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[data-testid="tag-link"]').first() to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - generic [ref=e4]:
    - heading "404" [level=1] [ref=e5]
    - heading "This page could not be found." [level=2] [ref=e7]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("태그 필터링 기능", () => {
  4  |   test("글 상세에서 태그 클릭 후 필터 페이지 이동", async ({ page }) => {
  5  |     // 직접 post URL로 이동
  6  |     await page.goto("/posts/nextjs-15-app-router-guide");
  7  | 
  8  |     // 태그 링크 대기
  9  |     const tagLink = page.locator('[data-testid="tag-link"]').first();
> 10 |     await tagLink.waitFor({ timeout: 10000 });
     |                   ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  11 | 
  12 |     const tagSlug = await tagLink.getAttribute("data-tag");
  13 |     expect(tagSlug).toBeTruthy();
  14 | 
  15 |     // 태그 클릭
  16 |     await tagLink.click();
  17 | 
  18 |     // 태그 필터 페이지로 이동 확인
  19 |     await page.waitForURL(`**/tags/${tagSlug}**`, { timeout: 10000 });
  20 |     expect(page.url()).toContain(`/tags/${tagSlug}`);
  21 |   });
  22 | 
  23 |   test("태그 필터 페이지에서 제목 표시", async ({ page }) => {
  24 |     // 직접 post URL로 이동
  25 |     await page.goto("/posts/nextjs-15-app-router-guide");
  26 | 
  27 |     // 태그 링크 대기
  28 |     const tagLink = page.locator('[data-testid="tag-link"]').first();
  29 |     await tagLink.waitFor({ timeout: 10000 });
  30 | 
  31 |     const tagSlug = await tagLink.getAttribute("data-tag");
  32 | 
  33 |     // 태그 클릭
  34 |     await tagLink.click();
  35 |     await page.waitForURL(`**/tags/${tagSlug}**`, { timeout: 10000 });
  36 | 
  37 |     // 태그 페이지 제목 확인
  38 |     const h1 = page.locator("h1");
  39 |     await h1.waitFor({ timeout: 10000 });
  40 |     const title = await h1.textContent();
  41 |     expect(title).toContain("#");
  42 |   });
  43 | 
  44 |   test("태그 필터 페이지에서 글 목록 표시", async ({ page }) => {
  45 |     // 직접 post URL로 이동
  46 |     await page.goto("/posts/nextjs-15-app-router-guide");
  47 | 
  48 |     // 태그 링크 대기
  49 |     const tagLink = page.locator('[data-testid="tag-link"]').first();
  50 |     await tagLink.waitFor({ timeout: 10000 });
  51 | 
  52 |     const tagSlug = await tagLink.getAttribute("data-tag");
  53 | 
  54 |     // 태그 클릭
  55 |     await tagLink.click();
  56 |     await page.waitForURL(`**/tags/${tagSlug}**`, { timeout: 10000 });
  57 | 
  58 |     // 글 카드 확인
  59 |     const postCards = page.locator('[data-testid="post-card"]');
  60 |     const count = await postCards.count();
  61 |     expect(count).toBeGreaterThanOrEqual(0);
  62 |   });
  63 | 
  64 |   test("정적 생성 확인 - 태그 페이지 직접 접근", async ({ page }) => {
  65 |     // 먼저 post 페이지에서 태그를 구해서
  66 |     await page.goto("/posts/nextjs-15-app-router-guide");
  67 | 
  68 |     const tagLink = page.locator('[data-testid="tag-link"]').first();
  69 |     await tagLink.waitFor({ timeout: 10000 });
  70 |     const tagSlug = await tagLink.getAttribute("data-tag");
  71 | 
  72 |     // 태그 페이지에 직접 접근
  73 |     await page.goto(`/tags/${tagSlug}`);
  74 | 
  75 |     // 페이지가 성공적으로 로드되었는지 확인
  76 |     const h1 = page.locator("h1");
  77 |     await h1.waitFor({ timeout: 10000 });
  78 |     const title = await h1.textContent();
  79 |     expect(title).toContain("#");
  80 |   });
  81 | });
  82 | 
```