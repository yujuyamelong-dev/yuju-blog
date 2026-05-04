# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: post-detail.spec.ts >> 글 상세 페이지 E2E 테스트 >> 태그 필터링 페이지에서 글 목록 표시
- Location: e2e\post-detail.spec.ts:302:7

# Error details

```
ReferenceError: tagSlug is not defined
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]: "#javascript | 유주's Blog"
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
      - generic [ref=e22]:
        - heading "#javascript" [level=1] [ref=e23]
        - generic [ref=e24]:
          - generic [ref=e33] [cursor=pointer]:
            - link "자바스크립트 강의 초안입니다." [ref=e34]:
              - /url: /posts/353da59e-7d34-80ba-a340-da3e87577aa4
              - heading "자바스크립트 강의 초안입니다." [level=3] [ref=e35]
            - paragraph [ref=e36]: 자바스크립트 강의 초안입니당
            - generic [ref=e37]:
              - img [ref=e38]
              - link "javascript" [ref=e41]:
                - /url: /tags/javascript
              - link "클로드 코드" [ref=e42]:
                - /url: /tags/-
            - generic [ref=e43]:
              - generic [ref=e44]:
                - img [ref=e45]
                - time [ref=e47]: 2026년 5월 2일
              - generic [ref=e48]: 읽기 →
          - generic [ref=e58] [cursor=pointer]:
            - link "웹 포트폴리오" [ref=e59]:
              - /url: /posts/34eda59e-7d34-8077-b987-f8a0d7d92846
              - heading "웹 포트폴리오" [level=3] [ref=e60]
            - paragraph [ref=e61]: 나의 웹 포트폴리오
            - generic [ref=e62]:
              - img [ref=e63]
              - link "html" [ref=e66]:
                - /url: /tags/html
              - link "css" [ref=e67]:
                - /url: /tags/css
              - link "javascript" [ref=e68]:
                - /url: /tags/javascript
            - generic [ref=e69]:
              - generic [ref=e70]:
                - img [ref=e71]
                - time [ref=e73]: 2026년 4월 26일
              - generic [ref=e74]: 읽기 →
    - contentinfo [ref=e76]:
      - generic [ref=e77]:
        - generic [ref=e78]:
          - generic [ref=e79]:
            - link "블로그 홈" [ref=e80] [cursor=pointer]:
              - /url: /
              - img [ref=e82]
              - generic [ref=e85]: 개발 블로그
            - paragraph [ref=e86]: 개발하면서 배우고 경험한 것들을 기록하는 기술 블로그입니다. Notion CMS로 관리됩니다.
            - generic [ref=e87]:
              - link "GitHub 프로필" [ref=e88] [cursor=pointer]:
                - /url: https://github.com
                - img [ref=e89]
              - link "Twitter 프로필" [ref=e92] [cursor=pointer]:
                - /url: https://twitter.com
                - img [ref=e93]
              - link "RSS 피드 구독" [ref=e95] [cursor=pointer]:
                - /url: /rss.xml
                - img [ref=e96]
          - generic [ref=e100]:
            - heading "탐색" [level=3] [ref=e101]
            - list [ref=e102]:
              - listitem [ref=e103]:
                - link "홈" [ref=e104] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e105]:
                - link "모든 글" [ref=e106] [cursor=pointer]:
                  - /url: /posts
              - listitem [ref=e107]:
                - link "카테고리" [ref=e108] [cursor=pointer]:
                  - /url: /categories
              - listitem [ref=e109]:
                - link "검색" [ref=e110] [cursor=pointer]:
                  - /url: /search
          - generic [ref=e111]:
            - heading "기술 스택" [level=3] [ref=e112]
            - list [ref=e113]:
              - listitem [ref=e114]:
                - link "Next.js" [ref=e115] [cursor=pointer]:
                  - /url: https://nextjs.org
              - listitem [ref=e116]:
                - link "shadcn/ui" [ref=e117] [cursor=pointer]:
                  - /url: https://ui.shadcn.com
              - listitem [ref=e118]:
                - link "Tailwind CSS" [ref=e119] [cursor=pointer]:
                  - /url: https://tailwindcss.com
              - listitem [ref=e120]:
                - link "Notion" [ref=e121] [cursor=pointer]:
                  - /url: https://www.notion.so
        - generic [ref=e122]:
          - paragraph [ref=e123]: © 2026 개발 블로그. All rights reserved.
          - paragraph [ref=e124]: Next.js 15 + Tailwind CSS v4 + Notion CMS
```

# Test source

```ts
  213 |     const nextLink = page.locator('[data-testid="next-post-link"]');
  214 |     const nextLinkExists = await nextLink.isVisible().catch(() => false);
  215 | 
  216 |     if (nextLinkExists) {
  217 |       const nextHref = await nextLink.getAttribute("href");
  218 |       expect(nextHref).toMatch(/^\/posts\/[a-zA-Z0-9-]+$/);
  219 | 
  220 |       // 다음 글로 이동
  221 |       await page.goto(nextHref!);
  222 |   
  223 |       // 새 글 제목이 로드되었는지 확인
  224 |       const postTitle = page.locator('[data-testid="post-title"]');
  225 |       await expect(postTitle).toBeVisible();
  226 |     }
  227 |   });
  228 | 
  229 |   test("RichText 포맷팅 렌더링 (Bold, Italic, Code)", async ({ page }) => {
  230 |     const postUrl = await getFirstPostUrl(page);
  231 |     await page.goto(postUrl!);
  232 | 
  233 |     // 포스트 콘텐츠에서 포맷팅된 텍스트 확인
  234 |     const postContent = page.locator('[data-testid="post-content"]');
  235 | 
  236 |     // Bold 확인
  237 |     const boldElements = postContent.locator("strong");
  238 |     const boldCount = await boldElements.count();
  239 | 
  240 |     // Italic 확인
  241 |     const italicElements = postContent.locator("em");
  242 |     const italicCount = await italicElements.count();
  243 | 
  244 |     // Inline code 확인
  245 |     const codeElements = postContent.locator("code");
  246 |     const codeCount = await codeElements.count();
  247 | 
  248 |     // 포맷팅 요소가 있을 수도, 없을 수도 있음
  249 |     expect(boldCount + italicCount + codeCount).toBeGreaterThanOrEqual(0);
  250 |   });
  251 | 
  252 |   test("링크 렌더링 (하이퍼링크)", async ({ page }) => {
  253 |     const postUrl = await getFirstPostUrl(page);
  254 |     await page.goto(postUrl!);
  255 | 
  256 |     // 포스트 콘텐츠 내 링크 확인
  257 |     const postContent = page.locator('[data-testid="post-content"]');
  258 |     const links = postContent.locator("a");
  259 |     const linkCount = await links.count();
  260 | 
  261 |     // 링크가 있을 수도, 없을 수도 있음
  262 |     expect(linkCount).toBeGreaterThanOrEqual(0);
  263 | 
  264 |     // 링크가 있으면 href 속성 확인
  265 |     if (linkCount > 0) {
  266 |       const firstLink = links.first();
  267 |       const href = await firstLink.getAttribute("href");
  268 |       expect(href).toBeTruthy();
  269 |     }
  270 |   });
  271 | 
  272 |   test("태그 클릭 및 태그 필터링 페이지 이동", async ({ page }) => {
  273 |     const postUrl = await getFirstPostUrl(page);
  274 |     await page.goto(postUrl!);
  275 | 
  276 |     // 태그 링크 확인
  277 |     const tagLinks = page.locator('[data-testid="tag-link"]');
  278 |     const tagCount = await tagLinks.count();
  279 | 
  280 |     if (tagCount > 0) {
  281 |       // 첫 번째 태그 링크의 href 가져오기
  282 |       const firstTagLink = tagLinks.first();
  283 |       const tagSlug = await firstTagLink.getAttribute("data-tag");
  284 |       expect(tagSlug).toBeTruthy();
  285 | 
  286 |       // 태그 링크 클릭
  287 |       await firstTagLink.click();
  288 | 
  289 |       // 태그 필터링 페이지로 이동 확인
  290 |       await page.waitForURL(`**/tags/${tagSlug}**`, { timeout: 10000 });
  291 |       const currentUrl = page.url();
  292 |       expect(currentUrl).toContain(`/tags/${tagSlug}`);
  293 | 
  294 |       // 태그 페이지의 제목 확인
  295 |       const tagPageTitle = page.locator("h1");
  296 |       await expect(tagPageTitle).toBeVisible();
  297 |       const titleText = await tagPageTitle.textContent();
  298 |       expect(titleText?.includes("#")).toBe(true);
  299 |     }
  300 |   });
  301 | 
  302 |   test("태그 필터링 페이지에서 글 목록 표시", async ({ page }) => {
  303 |     const postUrl = await getFirstPostUrl(page);
  304 |     await page.goto(postUrl!);
  305 | 
  306 |     // 태그 링크 확인
  307 |     const tagLinks = page.locator('[data-testid="tag-link"]');
  308 |     const tagCount = await tagLinks.count();
  309 | 
  310 |     if (tagCount > 0) {
  311 |       // 태그 링크 클릭
  312 |       await tagLinks.first().click();
> 313 |       await page.waitForURL(`**/tags/${tagSlug}**`, { timeout: 10000 });
      |                                        ^ ReferenceError: tagSlug is not defined
  314 | 
  315 |       // 태그 페이지에서 글 목록 확인
  316 |       const postCards = page.locator('[data-testid="post-card"]');
  317 |       const postCardCount = await postCards.count();
  318 | 
  319 |       // 글이 있을 수도, 없을 수도 있음
  320 |       expect(postCardCount).toBeGreaterThanOrEqual(0);
  321 | 
  322 |       // 글이 있으면 해당 태그가 포함되어야 함
  323 |       if (postCardCount > 0) {
  324 |         const firstCard = postCards.first();
  325 |         // 글이 렌더링되었는지 확인
  326 |         await expect(firstCard).toBeVisible();
  327 |       }
  328 |     }
  329 |   });
  330 | 
  331 |   test("여러 태그 클릭 테스트", async ({ page }) => {
  332 |     const postUrl = await getFirstPostUrl(page);
  333 |     await page.goto(postUrl!);
  334 | 
  335 |     // 모든 태그 링크 확인
  336 |     const tagLinks = page.locator('[data-testid="tag-link"]');
  337 |     const tagCount = await tagLinks.count();
  338 | 
  339 |     if (tagCount > 1) {
  340 |       // 각 태그마다 필터링 페이지 확인
  341 |       for (let i = 0; i < Math.min(tagCount, 3); i++) {
  342 |         // 다시 포스트 페이지로 돌아가기
  343 |         await page.goto(postUrl!);
  344 | 
  345 |         // i번째 태그 클릭
  346 |         const tagLink = page.locator('[data-testid="tag-link"]').nth(i);
  347 |         const tagSlug = await tagLink.getAttribute("data-tag");
  348 | 
  349 |         await tagLink.click();
  350 |         await page.waitForURL(`**/tags/${tagSlug}**`, { timeout: 10000 });
  351 | 
  352 |         const currentUrl = page.url();
  353 |         expect(currentUrl).toContain(`/tags/${tagSlug}`);
  354 |       }
  355 |     }
  356 |   });
  357 | 
  358 |   test("목차 (TOC) 표시 - heading이 있는 경우", async ({ page }) => {
  359 |     // 데스크톱 뷰로 설정 (lg 브레이크포인트 이상)
  360 |     await page.setViewportSize({ width: 1400, height: 900 });
  361 | 
  362 |     const postUrl = await getFirstPostUrl(page);
  363 |     await page.goto(postUrl!);
  364 | 
  365 |     // 포스트 콘텐츠에서 heading 확인
  366 |     const postContent = page.locator('[data-testid="post-content"]');
  367 |     const headings = postContent.locator("h1, h2, h3");
  368 |     const headingCount = await headings.count();
  369 | 
  370 |     if (headingCount > 0) {
  371 |       // heading이 있으면 TOC가 표시되어야 함
  372 |       const tocNav = page.locator("nav").filter({ has: page.locator("text=목차") });
  373 |       const tocExists = await tocNav.isVisible().catch(() => false);
  374 |       expect(tocExists).toBe(true);
  375 | 
  376 |       if (tocExists) {
  377 |         // TOC의 링크 개수가 heading 개수와 일치하는지 확인
  378 |         const tocLinks = tocNav.locator("a");
  379 |         const tocLinkCount = await tocLinks.count();
  380 |         expect(tocLinkCount).toBe(headingCount);
  381 |       }
  382 |     }
  383 |   });
  384 | 
  385 |   test("목차 (TOC) 링크 클릭 및 스크롤", async ({ page }) => {
  386 |     // 데스크톱 뷰로 설정
  387 |     await page.setViewportSize({ width: 1400, height: 900 });
  388 | 
  389 |     const postUrl = await getFirstPostUrl(page);
  390 |     await page.goto(postUrl!);
  391 | 
  392 |     // 포스트 콘텐츠에서 heading 확인
  393 |     const postContent = page.locator('[data-testid="post-content"]');
  394 |     const headings = postContent.locator("h2, h3");
  395 |     const headingCount = await headings.count();
  396 | 
  397 |     if (headingCount > 0) {
  398 |       // 첫 번째 heading 찾기
  399 |       const firstHeading = headings.first();
  400 |       const headingText = await firstHeading.textContent();
  401 |       const headingId = await firstHeading.getAttribute("id");
  402 | 
  403 |       if (headingId) {
  404 |         // TOC에서 해당 링크 찾기
  405 |         const tocNav = page.locator("nav").filter({ has: page.locator("text=목차") });
  406 |         const tocLink = tocNav.locator(`a[href="#${headingId}"]`);
  407 |         const tocLinkExists = await tocLink.isVisible().catch(() => false);
  408 | 
  409 |         if (tocLinkExists) {
  410 |           // TOC 링크 클릭
  411 |           await tocLink.click();
  412 | 
  413 |           // 해당 heading으로 스크롤되었는지 확인
```