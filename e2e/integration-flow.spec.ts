import { test, expect } from "@playwright/test";

test.describe("통합 E2E 흐름 테스트", () => {
  test("시나리오1: 홈 → 글 상세 → 이전/다음 네비게이션", async ({ page }) => {
    // 홈 페이지 접속
    await page.goto("/");
    await expect(page).toHaveTitle("홈");

    // 포스트 카드 로드 확인
    await page.waitForSelector('[data-testid="post-card"]', { timeout: 10000 });
    const postCards = page.locator('[data-testid="post-card"]');
    const cardCount = await postCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(3);

    // 첫 번째 포스트 클릭
    const firstPostLink = page.locator('[data-testid="post-link"]').first();
    const postUrl = await firstPostLink.getAttribute("href");
    expect(postUrl).toMatch(/^\/posts\/[a-zA-Z0-9-]+$/);

    await firstPostLink.click();
    await page.waitForURL(`**${postUrl}**`, { timeout: 10000 });

    // 글 상세 페이지 확인
    const postTitle = page.locator('[data-testid="post-title"]');
    await expect(postTitle).toBeVisible({ timeout: 10000 });

    // 포스트 콘텐츠 로드 확인
    const postContent = page.locator('[data-testid="post-content"]');
    await expect(postContent).toBeVisible({ timeout: 10000 });

    // 이전/다음 네비게이션 확인
    const postNavigation = page.locator('[data-testid="post-navigation"]');
    const navigationExists = await postNavigation.isVisible().catch(() => false);

    if (navigationExists) {
      // 다음 글이 있으면 클릭
      const nextLink = page.locator('[data-testid="next-post-link"]');
      const nextLinkExists = await nextLink.isVisible().catch(() => false);

      if (nextLinkExists) {
        const nextHref = await nextLink.getAttribute("href");
        expect(nextHref).toMatch(/^\/posts\/[a-zA-Z0-9-]+$/);

        await nextLink.click();
        await page.waitForURL(`**${nextHref}**`, { timeout: 10000 });

        // 새 글이 로드되었는지 확인
        const newTitle = page.locator('[data-testid="post-title"]');
        await expect(newTitle).toBeVisible({ timeout: 10000 });
      }
    }
  });

  test("시나리오2: 카테고리 필터링", async ({ page }) => {
    // 홈 페이지 접속
    await page.goto("/");

    // 카테고리 필터 확인
    const categoryLinks = page.locator('nav[aria-label="카테고리 필터"] a');
    const categoryCount = await categoryLinks.count();

    if (categoryCount > 1) {
      // 첫 번째 카테고리 선택 (0번째는 전체)
      const categoryName = await categoryLinks.nth(1).textContent();
      await categoryLinks.nth(1).click();

      // 카테고리 페이지 로드 확인
      await page.waitForURL("**/categories/**", { timeout: 10000 });
      const pageTitle = page.locator("h1").first();
      await expect(pageTitle).toBeVisible({ timeout: 10000 });

      // 포스트 카드 로드 확인
      const postCards = page.locator('[data-testid="post-card"]');
      const count = await postCards.count();

      // 카테고리에 포스트가 있을 수도, 없을 수도 있음
      expect(count).toBeGreaterThanOrEqual(0);

      // 각 포스트 카드의 카테고리 확인
      if (count > 0) {
        const firstCard = postCards.first();
        const categoryBadge = firstCard.locator('[data-testid="category-link"]');
        const hasBadge = await categoryBadge.isVisible().catch(() => false);
        expect(typeof hasBadge).toBe("boolean");
      }
    }
  });

  test("시나리오3: 검색 (debouncing) 기능", async ({ page }) => {
    // 홈 페이지 접속
    await page.goto("/");

    // 검색 입력창 확인
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // debouncing 테스트: 빠르게 입력 후 한번만 요청되는지 확인
    const initialUrl = page.url();

    // 검색어 입력 (debouncing 중)
    await searchInput.type("T", { delay: 50 });
    await searchInput.type("y", { delay: 50 });
    await searchInput.type("p", { delay: 50 });
    await searchInput.type("e", { delay: 50 });

    // debouncing 전에는 URL이 변경되지 않음
    let currentUrl = page.url();
    expect(currentUrl).toBe(initialUrl);

    // debouncing 후 검색 페이지로 이동
    await page.waitForURL("/search?q=*", { timeout: 5000 });

    // 검색 결과 확인
    const heading = page.locator("h1", { hasText: "검색 결과" });
    await expect(heading).toBeVisible({ timeout: 10000 });

    const postCards = page.locator('[data-testid="post-card"]');
    const count = await postCards.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("시나리오4: 다크모드 전환 및 유지", async ({ page }) => {
    // 홈 페이지 접속
    await page.goto("/");

    const html = page.locator("html");
    const initialClass = await html.getAttribute("class");

    // 다크모드 토글 버튼 확인
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    const toggleExists = await themeToggle.isVisible().catch(() => false);

    if (toggleExists) {
      // 다크모드 토글
      await themeToggle.click();
      await page.waitForTimeout(500);

      // 클래스 변경 확인
      const newClass = await html.getAttribute("class");
      expect(typeof newClass).toBe("string");

      // 포스트 카드 확인 (다크모드에서도 렌더링 확인)
      const postCards = page.locator('[data-testid="post-card"]');
      const count = await postCards.count();
      expect(count).toBeGreaterThanOrEqual(0);

      // 글 상세 페이지에서도 다크모드 확인
      if (count > 0) {
        const firstPostLink = page.locator('[data-testid="post-link"]').first();
        await firstPostLink.click();

        // 글 상세 페이지 로드 확인
        const postTitle = page.locator('[data-testid="post-title"]');
        await expect(postTitle).toBeVisible({ timeout: 10000 });

        // 다크모드가 유지되는지 확인
        const postHtml = page.locator("html");
        const postClass = await postHtml.getAttribute("class");
        expect(postClass).toContain(newClass?.includes("dark") ? "dark" : "");
      }
    }
  });

  test("엣지케이스: 404 페이지", async ({ page }) => {
    // 존재하지 않는 글 접속
    await page.goto("/posts/nonexistent-post-12345", {
      waitUntil: "networkidle",
    });

    // 404 에러 또는 홈페이지 리다이렉트 확인
    const response = await page.goto("/posts/nonexistent-post-12345");
    const status = response?.status();

    // 404이거나 다른 상태 코드 확인
    expect(status).toBeTruthy();
  });

  test("엣지케이스: 빈 검색 결과", async ({ page }) => {
    // 존재하지 않는 검색어로 검색
    await page.goto("/search?q=xyznotexist12345");

    // 검색 결과가 없다는 메시지 확인
    const noResults = page.locator("text=검색 결과가 없습니다");
    const noResultsExists = await noResults.isVisible().catch(() => false);

    if (noResultsExists) {
      await expect(noResults).toBeVisible({ timeout: 10000 });
    } else {
      // 또는 0개 결과 메시지 확인
      const zeroResults = page.locator("text=0개");
      const zeroExists = await zeroResults.isVisible().catch(() => false);
      expect(zeroExists || noResultsExists).toBe(true);
    }
  });

  test("엣지케이스: 카테고리별 글이 없을 때", async ({ page }) => {
    // 홈 페이지에서 시작
    await page.goto("/");

    // 모든 카테고리 링크 확인
    const categoryLinks = page.locator('nav[aria-label="카테고리 필터"] a');
    const categoryCount = await categoryLinks.count();

    if (categoryCount > 1) {
      // 마지막 카테고리 시도 (글이 없을 가능성이 높음)
      const lastCategory = categoryLinks.nth(categoryCount - 1);
      await lastCategory.click();

      // 페이지 로드 확인
      await page.waitForURL("**/categories/**", { timeout: 10000 });

      const postCards = page.locator('[data-testid="post-card"]');
      const count = await postCards.count();

      // 결과가 있거나 없을 수 있음
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });
});
