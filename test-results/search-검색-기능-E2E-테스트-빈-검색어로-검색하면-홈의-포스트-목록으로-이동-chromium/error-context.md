# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search.spec.ts >> 검색 기능 E2E 테스트 >> 빈 검색어로 검색하면 홈의 포스트 목록으로 이동
- Location: e2e\search.spec.ts:153:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="search-input"]')
Expected: visible
Error: strict mode violation: locator('[data-testid="search-input"]') resolved to 2 elements:
    1) <input value="" type="text" placeholder="글 검색..." aria-label="블로그 글 검색" data-testid="search-input" class="flex w-full rounded-md border px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9 pr-9 h-10 text-sm bg-muted/50 border-muted hover:bg-muted focus:bg-background transit…/> aka getByRole('textbox', { name: '블로그 글 검색' })
    2) <input value="" type="text" placeholder="글 검색..." aria-label="블로그 글 검색" data-testid="search-input" class="flex w-full rounded-md border px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9 pr-9 h-10 text-sm bg-muted/50 border-muted hover:bg-muted focus:bg-background transit…/> aka getByTestId('search-input').nth(1)

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="search-input"]')
    2 × locator resolved to <input value="" type="text" placeholder="글 검색..." aria-label="블로그 글 검색" data-testid="search-input" class="flex w-full rounded-md border px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9 pr-9 h-10 text-sm bg-muted/50 border-muted hover:bg-muted focus:bg-background transit…/>
      - unexpected value "hidden"

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
  118 |     await page.waitForSelector('[data-testid="post-card"]', { timeout: 10000 });
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
> 157 |     await expect(searchInput).toBeVisible({ timeout: 10000 });
      |                               ^ Error: expect(locator).toBeVisible() failed
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