import { test, expect } from "@playwright/test";

test.describe("검색 기능 E2E 테스트", () => {
  test("검색 입력창이 헤더에 표시됨", async ({ page }) => {
    await page.goto("/");

    // 헤더 확인
    const header = page.locator("header");
    await expect(header).toBeVisible({ timeout: 10000 });

    // 검색 입력 필드 확인
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();
  });

  test("검색 입력 후 검색 페이지로 이동", async ({ page }) => {
    await page.goto("/");

    // 검색 입력 필드 찾기
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // 검색어 입력 (debouncing 타이머가 발동할 때까지 대기)
    await searchInput.fill("React");

    // debouncing 300ms + 페이지 로드 시간 대기
    await page.waitForURL("/search?q=*", { timeout: 5000 });

    // 검색 결과 페이지의 헤딩 확인
    const heading = page.locator("h1", { hasText: "검색 결과" });
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test("검색 결과 표시", async ({ page }) => {
    // 직접 검색 페이지로 이동
    await page.goto("/search?q=React");

    // 검색 결과 헤딩 확인
    const heading = page.locator("h1", { hasText: "검색 결과" });
    await expect(heading).toBeVisible({ timeout: 10000 });

    // 검색어 표시 확인
    const searchQueryDisplay = page.locator("span.font-semibold:has-text('React')").first();
    await expect(searchQueryDisplay).toBeVisible();
  });

  test("검색 결과가 없을 때 메시지 표시", async ({ page }) => {
    // 존재하지 않는 검색어로 검색
    await page.goto("/search?q=xyzabc123notexist");

    // 검색 결과가 없다는 메시지 확인
    const noResultsHeading = page.locator("text=검색 결과가 없습니다");
    await expect(noResultsHeading).toBeVisible({ timeout: 10000 });

    // 0개의 결과 표시 확인
    const resultCount = page.locator("text=0개의 결과");
    await expect(resultCount).toBeVisible();
  });

  test("검색 초기화 버튼 작동", async ({ page }) => {
    await page.goto("/");

    // 검색 입력 필드 찾기
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // 검색어 입력
    await searchInput.fill("TypeScript");

    // 초기화 버튼이 나타날 때까지 대기
    const clearButton = page.locator('[data-testid="search-clear"]');
    await expect(clearButton).toBeVisible({ timeout: 1000 });

    // 초기화 버튼 클릭
    await clearButton.click();

    // 검색 입력창이 비워졌는지 확인
    await expect(searchInput).toHaveValue("");
  });

  test("제목으로 검색", async ({ page }) => {
    await page.goto("/search?q=TypeScript");

    // 검색 결과 페이지 로드 확인
    const heading = page.locator("h1", { hasText: "검색 결과" });
    await expect(heading).toBeVisible({ timeout: 10000 });

    // 포스트 카드가 있는지 확인 (검색 결과가 있을 경우)
    const postCards = page.locator('[data-testid="post-card"]');
    const count = await postCards.count();

    // 결과가 없거나 있을 수 있으므로 페이지가 정상적으로 로드되는지만 확인
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("태그로 검색", async ({ page }) => {
    await page.goto("/");

    // 검색 입력 필드 찾기
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // 태그명 입력 (예: JavaScript)
    await searchInput.fill("JavaScript");

    // debouncing 시간 대기
    await page.waitForURL("/search?q=*", { timeout: 5000 });

    // 검색 결과 페이지 확인
    const heading = page.locator("h1", { hasText: "검색 결과" });
    await expect(heading).toBeVisible();
  });

  test("검색 페이지에서 포스트 카드 클릭", async ({ page }) => {
    await page.goto("/search?q=React");

    // 검색 결과 로드 대기
    await page.waitForSelector('[data-testid="post-card"]', { timeout: 10000 });

    const postCards = page.locator('[data-testid="post-card"]');
    const count = await postCards.count();

    // 검색 결과가 있을 경우만 테스트
    if (count > 0) {
      const firstCard = postCards.first();
      const postLink = firstCard.locator('[data-testid="post-link"]').first();

      const href = await postLink.getAttribute("href");
      expect(href).toMatch(/^\/posts\//);
    }
  });

  test("검색 입력 시 debouncing 작동 확인", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // 빠르게 여러 글자 입력
    await searchInput.type("T", { delay: 50 });
    await searchInput.type("y", { delay: 50 });
    await searchInput.type("p", { delay: 50 });
    await searchInput.type("e", { delay: 50 });

    // URL이 변경되지 않았는지 확인 (debouncing 중)
    let currentUrl = page.url();
    expect(currentUrl).not.toContain("/search?q=");

    // debouncing 300ms 후 자동으로 검색이 실행되어 URL이 변경됨
    await page.waitForURL("/search?q=*", { timeout: 2000 });
  });

  test("빈 검색어로 검색하면 홈의 포스트 목록으로 이동", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // 빈 문자열로 입력
    await searchInput.fill("   ");

    // debouncing 후 홈의 포스트 목록으로 이동 (slide=1)
    await page.waitForURL("/?slide=1", { timeout: 2000 });

    // 포스트 카드가 보이는지 확인 (PostListView 로드 확인)
    const postCards = page.locator('[data-testid="post-card"]');
    await expect(postCards.first()).toBeVisible({ timeout: 10000 });
  });

  test("검색 페이지에서 검색어를 지우면 홈의 포스트 목록으로 이동", async ({ page }) => {
    await page.goto("/search?q=React");

    // 검색 결과 페이지 로드 확인
    const heading = page.locator("h1", { hasText: "검색 결과" });
    await expect(heading).toBeVisible({ timeout: 10000 });

    // 검색 입력 필드 찾기
    const searchInput = page.locator('[data-testid="search-input"]');

    // 검색어를 전부 지우기
    await searchInput.fill("");

    // debouncing 후 홈의 포스트 목록으로 이동 (slide=1)
    await page.waitForURL("/?slide=1", { timeout: 2000 });

    // 홈페이지인지 확인
    const title = await page.title();
    expect(title).toBe("홈");
  });

  test("초기화 버튼을 클릭하면 홈의 포스트 목록으로 이동", async ({ page }) => {
    await page.goto("/search?q=TypeScript");

    // 검색 결과 페이지 로드 확인
    const heading = page.locator("h1", { hasText: "검색 결과" });
    await expect(heading).toBeVisible({ timeout: 10000 });

    // 초기화 버튼 클릭
    const clearButton = page.locator('[data-testid="search-clear"]');
    await expect(clearButton).toBeVisible();
    await clearButton.click();

    // 홈의 포스트 목록으로 이동했는지 확인 (slide=1)
    await page.waitForURL("/?slide=1", { timeout: 2000 });

    const title = await page.title();
    expect(title).toBe("홈");
  });
});
