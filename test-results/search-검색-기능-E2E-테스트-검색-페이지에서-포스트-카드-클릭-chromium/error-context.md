# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search.spec.ts >> 검색 기능 E2E 테스트 >> 검색 페이지에서 포스트 카드 클릭
- Location: e2e\search.spec.ts:114:7

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-card"]') to be visible

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
          - text: React
        - button "검색어 초기화" [ref=e17]:
          - img
      - link "관리자 로그인" [ref=e18] [cursor=pointer]:
        - /url: /admin/login
        - button "관리자 로그인" [ref=e19]: 로그인
      - button "다크/라이트 모드 전환" [ref=e20]:
        - img
    - main [ref=e21]:
      - generic [ref=e22]:
        - generic [ref=e23]:
          - heading "검색 결과" [level=1] [ref=e24]
          - paragraph [ref=e25]: "\"React\" 에 대한 0개의 결과"
        - generic [ref=e26]:
          - generic [ref=e27]: 🔍
          - heading "검색 결과가 없습니다" [level=2] [ref=e28]
          - paragraph [ref=e29]: 다른 검색어를 시도하거나 카테고리를 둘러보세요.
    - contentinfo [ref=e30]:
      - generic [ref=e31]:
        - generic [ref=e32]:
          - generic [ref=e33]:
            - link "블로그 홈" [ref=e34] [cursor=pointer]:
              - /url: /
              - img [ref=e36]
              - generic [ref=e39]: 개발 블로그
            - paragraph [ref=e40]: 개발하면서 배우고 경험한 것들을 기록하는 기술 블로그입니다. Notion CMS로 관리됩니다.
            - generic [ref=e41]:
              - link "GitHub 프로필" [ref=e42] [cursor=pointer]:
                - /url: https://github.com
                - img [ref=e43]
              - link "Twitter 프로필" [ref=e46] [cursor=pointer]:
                - /url: https://twitter.com
                - img [ref=e47]
              - link "RSS 피드 구독" [ref=e49] [cursor=pointer]:
                - /url: /rss.xml
                - img [ref=e50]
          - generic [ref=e54]:
            - heading "탐색" [level=3] [ref=e55]
            - list [ref=e56]:
              - listitem [ref=e57]:
                - link "홈" [ref=e58] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e59]:
                - link "모든 글" [ref=e60] [cursor=pointer]:
                  - /url: /posts
              - listitem [ref=e61]:
                - link "카테고리" [ref=e62] [cursor=pointer]:
                  - /url: /categories
              - listitem [ref=e63]:
                - link "검색" [ref=e64] [cursor=pointer]:
                  - /url: /search
          - generic [ref=e65]:
            - heading "기술 스택" [level=3] [ref=e66]
            - list [ref=e67]:
              - listitem [ref=e68]:
                - link "Next.js" [ref=e69] [cursor=pointer]:
                  - /url: https://nextjs.org
              - listitem [ref=e70]:
                - link "shadcn/ui" [ref=e71] [cursor=pointer]:
                  - /url: https://ui.shadcn.com
              - listitem [ref=e72]:
                - link "Tailwind CSS" [ref=e73] [cursor=pointer]:
                  - /url: https://tailwindcss.com
              - listitem [ref=e74]:
                - link "Notion" [ref=e75] [cursor=pointer]:
                  - /url: https://www.notion.so
        - generic [ref=e76]:
          - paragraph [ref=e77]: © 2026 개발 블로그. All rights reserved.
          - paragraph [ref=e78]: Next.js 15 + Tailwind CSS v4 + Notion CMS
  - alert [ref=e79]
```

# Test source

```ts
  18  | 
  19  |     // 검색 입력 필드 찾기
  20  |     const searchInput = page.locator('[data-testid="search-input"]');
  21  |     await expect(searchInput).toBeVisible({ timeout: 10000 });
  22  | 
  23  |     // 검색어 입력 (debouncing 타이머가 발동할 때까지 대기)
  24  |     await searchInput.fill("React");
  25  | 
  26  |     // debouncing 300ms + 페이지 로드 시간 대기
  27  |     await page.waitForURL("/search?q=*", { timeout: 5000 });
  28  | 
  29  |     // 검색 결과 페이지의 헤딩 확인
  30  |     const heading = page.locator("h1", { hasText: "검색 결과" });
  31  |     await expect(heading).toBeVisible({ timeout: 10000 });
  32  |   });
  33  | 
  34  |   test("검색 결과 표시", async ({ page }) => {
  35  |     // 직접 검색 페이지로 이동
  36  |     await page.goto("/search?q=React");
  37  | 
  38  |     // 검색 결과 헤딩 확인
  39  |     const heading = page.locator("h1", { hasText: "검색 결과" });
  40  |     await expect(heading).toBeVisible({ timeout: 10000 });
  41  | 
  42  |     // 검색어 표시 확인
  43  |     const searchQueryDisplay = page.locator("span.font-semibold:has-text('React')").first();
  44  |     await expect(searchQueryDisplay).toBeVisible();
  45  |   });
  46  | 
  47  |   test("검색 결과가 없을 때 메시지 표시", async ({ page }) => {
  48  |     // 존재하지 않는 검색어로 검색
  49  |     await page.goto("/search?q=xyzabc123notexist");
  50  | 
  51  |     // 검색 결과가 없다는 메시지 확인
  52  |     const noResultsHeading = page.locator("text=검색 결과가 없습니다");
  53  |     await expect(noResultsHeading).toBeVisible({ timeout: 10000 });
  54  | 
  55  |     // 0개의 결과 표시 확인
  56  |     const resultCount = page.locator("text=0개의 결과");
  57  |     await expect(resultCount).toBeVisible();
  58  |   });
  59  | 
  60  |   test("검색 초기화 버튼 작동", async ({ page }) => {
  61  |     await page.goto("/");
  62  | 
  63  |     // 검색 입력 필드 찾기
  64  |     const searchInput = page.locator('[data-testid="search-input"]');
  65  |     await expect(searchInput).toBeVisible({ timeout: 10000 });
  66  | 
  67  |     // 검색어 입력
  68  |     await searchInput.fill("TypeScript");
  69  | 
  70  |     // 초기화 버튼이 나타날 때까지 대기
  71  |     const clearButton = page.locator('[data-testid="search-clear"]');
  72  |     await expect(clearButton).toBeVisible({ timeout: 1000 });
  73  | 
  74  |     // 초기화 버튼 클릭
  75  |     await clearButton.click();
  76  | 
  77  |     // 검색 입력창이 비워졌는지 확인
  78  |     await expect(searchInput).toHaveValue("");
  79  |   });
  80  | 
  81  |   test("제목으로 검색", async ({ page }) => {
  82  |     await page.goto("/search?q=TypeScript");
  83  | 
  84  |     // 검색 결과 페이지 로드 확인
  85  |     const heading = page.locator("h1", { hasText: "검색 결과" });
  86  |     await expect(heading).toBeVisible({ timeout: 10000 });
  87  | 
  88  |     // 포스트 카드가 있는지 확인 (검색 결과가 있을 경우)
  89  |     const postCards = page.locator('[data-testid="post-card"]');
  90  |     const count = await postCards.count();
  91  | 
  92  |     // 결과가 없거나 있을 수 있으므로 페이지가 정상적으로 로드되는지만 확인
  93  |     expect(count).toBeGreaterThanOrEqual(0);
  94  |   });
  95  | 
  96  |   test("태그로 검색", async ({ page }) => {
  97  |     await page.goto("/");
  98  | 
  99  |     // 검색 입력 필드 찾기
  100 |     const searchInput = page.locator('[data-testid="search-input"]');
  101 |     await expect(searchInput).toBeVisible({ timeout: 10000 });
  102 | 
  103 |     // 태그명 입력 (예: JavaScript)
  104 |     await searchInput.fill("JavaScript");
  105 | 
  106 |     // debouncing 시간 대기
  107 |     await page.waitForURL("/search?q=*", { timeout: 5000 });
  108 | 
  109 |     // 검색 결과 페이지 확인
  110 |     const heading = page.locator("h1", { hasText: "검색 결과" });
  111 |     await expect(heading).toBeVisible();
  112 |   });
  113 | 
  114 |   test("검색 페이지에서 포스트 카드 클릭", async ({ page }) => {
  115 |     await page.goto("/search?q=React");
  116 | 
  117 |     // 검색 결과 로드 대기
> 118 |     await page.waitForSelector('[data-testid="post-card"]', { timeout: 10000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
  119 | 
  120 |     const postCards = page.locator('[data-testid="post-card"]');
  121 |     const count = await postCards.count();
  122 | 
  123 |     // 검색 결과가 있을 경우만 테스트
  124 |     if (count > 0) {
  125 |       const firstCard = postCards.first();
  126 |       const postLink = firstCard.locator('[data-testid="post-link"]').first();
  127 | 
  128 |       const href = await postLink.getAttribute("href");
  129 |       expect(href).toMatch(/^\/posts\//);
  130 |     }
  131 |   });
  132 | 
  133 |   test("검색 입력 시 debouncing 작동 확인", async ({ page }) => {
  134 |     await page.goto("/");
  135 | 
  136 |     const searchInput = page.locator('[data-testid="search-input"]');
  137 |     await expect(searchInput).toBeVisible({ timeout: 10000 });
  138 | 
  139 |     // 빠르게 여러 글자 입력
  140 |     await searchInput.type("T", { delay: 50 });
  141 |     await searchInput.type("y", { delay: 50 });
  142 |     await searchInput.type("p", { delay: 50 });
  143 |     await searchInput.type("e", { delay: 50 });
  144 | 
  145 |     // URL이 변경되지 않았는지 확인 (debouncing 중)
  146 |     let currentUrl = page.url();
  147 |     expect(currentUrl).not.toContain("/search?q=");
  148 | 
  149 |     // debouncing 300ms 후 자동으로 검색이 실행되어 URL이 변경됨
  150 |     await page.waitForURL("/search?q=*", { timeout: 2000 });
  151 |   });
  152 | 
  153 |   test("빈 검색어로 검색하면 홈의 포스트 목록으로 이동", async ({ page }) => {
  154 |     await page.goto("/");
  155 | 
  156 |     const searchInput = page.locator('[data-testid="search-input"]');
  157 |     await expect(searchInput).toBeVisible({ timeout: 10000 });
  158 | 
  159 |     // 빈 문자열로 입력
  160 |     await searchInput.fill("   ");
  161 | 
  162 |     // debouncing 후 홈의 포스트 목록으로 이동 (slide=1)
  163 |     await page.waitForURL("/?slide=1", { timeout: 2000 });
  164 | 
  165 |     // 포스트 카드가 보이는지 확인 (PostListView 로드 확인)
  166 |     const postCards = page.locator('[data-testid="post-card"]');
  167 |     await expect(postCards.first()).toBeVisible({ timeout: 10000 });
  168 |   });
  169 | 
  170 |   test("검색 페이지에서 검색어를 지우면 홈의 포스트 목록으로 이동", async ({ page }) => {
  171 |     await page.goto("/search?q=React");
  172 | 
  173 |     // 검색 결과 페이지 로드 확인
  174 |     const heading = page.locator("h1", { hasText: "검색 결과" });
  175 |     await expect(heading).toBeVisible({ timeout: 10000 });
  176 | 
  177 |     // 검색 입력 필드 찾기
  178 |     const searchInput = page.locator('[data-testid="search-input"]');
  179 | 
  180 |     // 검색어를 전부 지우기
  181 |     await searchInput.fill("");
  182 | 
  183 |     // debouncing 후 홈의 포스트 목록으로 이동 (slide=1)
  184 |     await page.waitForURL("/?slide=1", { timeout: 2000 });
  185 | 
  186 |     // 홈페이지인지 확인
  187 |     const title = await page.title();
  188 |     expect(title).toBe("홈");
  189 |   });
  190 | 
  191 |   test("초기화 버튼을 클릭하면 홈의 포스트 목록으로 이동", async ({ page }) => {
  192 |     await page.goto("/search?q=TypeScript");
  193 | 
  194 |     // 검색 결과 페이지 로드 확인
  195 |     const heading = page.locator("h1", { hasText: "검색 결과" });
  196 |     await expect(heading).toBeVisible({ timeout: 10000 });
  197 | 
  198 |     // 초기화 버튼 클릭
  199 |     const clearButton = page.locator('[data-testid="search-clear"]');
  200 |     await expect(clearButton).toBeVisible();
  201 |     await clearButton.click();
  202 | 
  203 |     // 홈의 포스트 목록으로 이동했는지 확인 (slide=1)
  204 |     await page.waitForURL("/?slide=1", { timeout: 2000 });
  205 | 
  206 |     const title = await page.title();
  207 |     expect(title).toBe("홈");
  208 |   });
  209 | });
  210 | 
```