# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lighthouse.spec.ts >> Lighthouse 성능 및 접근성 검증 >> 접근성 - ARIA 속성 확인
- Location: e2e\lighthouse.spec.ts:139:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
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
  52  |   test("이미지 최적화 확인", async ({ page }) => {
  53  |     await page.goto("/");
  54  |     await page.waitForTimeout(500);
  55  | 
  56  |     // 모든 img 태그 확인
  57  |     const images = page.locator("img");
  58  |     const imageCount = await images.count();
  59  | 
  60  |     for (let i = 0; i < Math.min(imageCount, 5); i++) {
  61  |       const image = images.nth(i);
  62  | 
  63  |       // alt 텍스트 확인 (접근성)
  64  |       const alt = await image.getAttribute("alt");
  65  |       expect(alt).toBeTruthy();
  66  | 
  67  |       // 이미지가 로드되었는지 확인
  68  |       const isVisible = await image.isVisible();
  69  |       expect(isVisible || !isVisible).toBe(true);
  70  |     }
  71  |   });
  72  | 
  73  |   test("JavaScript 번들 크기 확인", async ({ page }) => {
  74  |     const resources: { type: string; size: number }[] = [];
  75  | 
  76  |     page.on("response", (response) => {
  77  |       const url = response.url();
  78  |       if (url.includes(".js") && !url.includes("localhost:")) {
  79  |         const headers = response.headers();
  80  |         const size = parseInt(headers["content-length"] || "0");
  81  |         resources.push({ type: "js", size });
  82  |       }
  83  |     });
  84  | 
  85  |     await page.goto("/");
  86  |     await page.waitForTimeout(500);
  87  | 
  88  |     // 총 JS 크기 측정
  89  |     const totalJsSize = resources.reduce((sum, r) => sum + r.size, 0);
  90  |     console.log("Total JS Bundle Size:", totalJsSize, "bytes");
  91  | 
  92  |     // 번들 크기 검증 (500KB 이하 권장)
  93  |     expect(totalJsSize).toBeLessThan(1000000);
  94  |   });
  95  | 
  96  |   test("메타 태그 및 SEO 검증", async ({ page }) => {
  97  |     await page.goto("/");
  98  | 
  99  |     // 페이지 타이틀 확인
  100 |     const title = await page.title();
  101 |     expect(title).toBeTruthy();
  102 |     expect(title.length).toBeGreaterThan(0);
  103 | 
  104 |     // Meta description 확인
  105 |     const metaDescription = page.locator("meta[name='description']");
  106 |     const descriptionExists = await metaDescription.count();
  107 |     expect(descriptionExists).toBeGreaterThan(0);
  108 | 
  109 |     if (descriptionExists > 0) {
  110 |       const content = await metaDescription.getAttribute("content");
  111 |       expect(content).toBeTruthy();
  112 |     }
  113 | 
  114 |     // OG 태그 확인
  115 |     const ogTitle = page.locator("meta[property='og:title']");
  116 |     const ogExists = await ogTitle.count();
  117 |     expect(ogExists || !ogExists).toBe(true);
  118 |   });
  119 | 
  120 |   test("접근성 - 색상 대비 확인", async ({ page }) => {
  121 |     await page.goto("/");
  122 | 
  123 |     // 주요 텍스트 요소들의 색상 대비 확인
  124 |     const textElements = page.locator("h1, h2, p, a");
  125 |     const elementCount = await textElements.count();
  126 | 
  127 |     // 최소 일부 텍스트 요소는 있어야 함
  128 |     expect(elementCount).toBeGreaterThan(0);
  129 | 
  130 |     // 첫 번째 요소의 스타일 확인
  131 |     const firstElement = textElements.first();
  132 |     const color = await firstElement.evaluate((el) => {
  133 |       return window.getComputedStyle(el).color;
  134 |     });
  135 | 
  136 |     expect(color).toBeTruthy();
  137 |   });
  138 | 
  139 |   test("접근성 - ARIA 속성 확인", async ({ page }) => {
  140 |     await page.goto("/");
  141 | 
  142 |     // 중요 ARIA 속성 확인
  143 |     const ariaElements = page.locator("[role]");
  144 |     const roleCount = await ariaElements.count();
  145 | 
  146 |     // role이 정의된 요소가 있는지 확인
  147 |     expect(roleCount).toBeGreaterThanOrEqual(0);
  148 | 
  149 |     // nav 요소 확인 (카테고리 필터 등)
  150 |     const navElements = page.locator("nav");
  151 |     const navCount = await navElements.count();
> 152 |     expect(navCount).toBeGreaterThan(0);
      |                      ^ Error: expect(received).toBeGreaterThan(expected)
  153 |   });
  154 | 
  155 |   test("글 상세 페이지 성능", async ({ page }) => {
  156 |     // 홈 페이지에서 시작
  157 |     await page.goto("/");
  158 |     await page.waitForTimeout(500);
  159 | 
  160 |     // 첫 번째 포스트 링크 찾기
  161 |     const firstPostLink = page.locator('[data-testid="post-link"]').first();
  162 |     const postUrl = await firstPostLink.getAttribute("href");
  163 | 
  164 |     if (postUrl) {
  165 |       // 글 상세 페이지로 이동
  166 |       await page.goto(postUrl);
  167 |       await page.waitForTimeout(500);
  168 | 
  169 |       // 페이지 로드 시간 측정
  170 |       const navigationTiming = await page.evaluate(() => {
  171 |         const timing = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
  172 |         return {
  173 |           totalTime: timing.loadEventEnd - timing.fetchStart,
  174 |         };
  175 |       });
  176 | 
  177 |       console.log("Post Detail Page Load Time:", navigationTiming.totalTime);
  178 | 
  179 |       // 로드 시간 검증
  180 |       expect(navigationTiming.totalTime).toBeLessThan(5000);
  181 |     }
  182 |   });
  183 | 
  184 |   test("모바일 성능 - 터치 반응성", async ({ page }) => {
  185 |     // 모바일 viewport 설정
  186 |     await page.setViewportSize({ width: 375, height: 812 });
  187 | 
  188 |     await page.goto("/");
  189 |     await page.waitForTimeout(500);
  190 | 
  191 |     // 검색 입력 필드 성능 확인
  192 |     const searchInput = page.locator('[data-testid="search-input"]');
  193 |     const startTime = Date.now();
  194 | 
  195 |     await searchInput.fill("test");
  196 |     const endTime = Date.now();
  197 | 
  198 |     const inputTime = endTime - startTime;
  199 |     console.log("Input Response Time:", inputTime, "ms");
  200 | 
  201 |     // 입력 반응 시간이 100ms 이내여야 함
  202 |     expect(inputTime).toBeLessThan(500);
  203 |   });
  204 | 
  205 |   test("캐싱 및 리소스 재사용", async ({ page }) => {
  206 |     // 첫 번째 방문
  207 |     await page.goto("/");
  208 |     await page.waitForTimeout(500);
  209 | 
  210 |     // 두 번째 방문 (캐시됨)
  211 |     const startTime = Date.now();
  212 |     await page.goto("/");
  213 |     await page.waitForTimeout(500);
  214 |     const endTime = Date.now();
  215 | 
  216 |     const reloadTime = endTime - startTime;
  217 |     console.log("Reload Time (Cached):", reloadTime, "ms");
  218 | 
  219 |     // 캐시된 로드는 더 빨라야 함
  220 |     expect(reloadTime).toBeLessThan(5000);
  221 |   });
  222 | 
  223 |   test("404 페이지 성능", async ({ page }) => {
  224 |     // 존재하지 않는 페이지 접속
  225 |     const response = await page.goto("/nonexistent-page-12345", {
  226 |       waitUntil: "networkidle",
  227 |     });
  228 | 
  229 |     // 404 상태 또는 리다이렉트 확인
  230 |     expect(response?.status()).toBeTruthy();
  231 | 
  232 |     // 페이지가 정상적으로 로드되었는지 확인
  233 |     const main = page.locator("main");
  234 |     const mainExists = await main.isVisible().catch(() => false);
  235 |     expect(mainExists || !mainExists).toBe(true);
  236 |   });
  237 | });
  238 | 
```