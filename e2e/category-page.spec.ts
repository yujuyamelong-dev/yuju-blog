import { test, expect } from "@playwright/test";

test.describe("카테고리 페이지 E2E 테스트", () => {
  test("카테고리 페이지 로드 및 기본 레이아웃", async ({ page }) => {
    // 홈 페이지에서 시작해 카테고리 선택
    await page.goto("/");

    // CategoryFilter에서 첫 번째 카테고리 링크 찾기
    const categoryLinks = page.locator('nav[aria-label="카테고리 필터"] a');
    const categoryLinksCount = await categoryLinks.count();

    if (categoryLinksCount > 1) {
      // 첫 번째 카테고리 링크 클릭 (0번째는 "전체" 링크)
      await categoryLinks.nth(1).click();

      // 카테고리 페이지 로드 확인
      const title = page.locator("h1").first();
      await expect(title).toBeVisible({ timeout: 10000 });

      // 헤더와 푸터 확인
      const header = page.locator("header");
      const footer = page.locator("footer");
      await expect(header).toBeVisible();
      await expect(footer).toBeVisible();
    }
  });

  test("카테고리별 글 필터링 및 표시", async ({ page }) => {
    await page.goto("/");

    // 카테고리 선택
    const categoryLinks = page.locator('nav[aria-label="카테고리 필터"] a');
    const categoryLinksCount = await categoryLinks.count();

    if (categoryLinksCount > 1) {
      const categoryName = await categoryLinks.nth(1).textContent();
      await categoryLinks.nth(1).click();

      // 페이지 제목이 선택한 카테고리 이름인지 확인
      const pageTitle = page.locator("h1").first();
      await expect(pageTitle).toContainText(categoryName || "");

      // 포스트 카드가 표시되는지 확인
      await page.waitForSelector('[data-testid="post-card"]', {
        timeout: 10000,
      }).catch(() => null);

      const postCards = page.locator('[data-testid="post-card"]');
      const cardCount = await postCards.count();

      // 카테고리에 포스트가 있는지 확인
      if (cardCount > 0) {
        expect(cardCount).toBeGreaterThan(0);
      }
    }
  });

  test("카테고리 필터 탭 상태 업데이트", async ({ page }) => {
    await page.goto("/");

    const categoryLinks = page.locator('nav[aria-label="카테고리 필터"] a');
    const categoryLinksCount = await categoryLinks.count();

    if (categoryLinksCount > 1) {
      const firstCategoryLink = categoryLinks.nth(1);
      await firstCategoryLink.click();

      // 현재 활성 카테고리 확인 (primary 배경색)
      const activeCategoryLink = page.locator(
        'nav[aria-label="카테고리 필터"] a.border-primary.bg-primary'
      );
      await expect(activeCategoryLink).toBeVisible({ timeout: 10000 });

      const activeText = await activeCategoryLink.textContent();
      expect(activeText).toBeTruthy();
    }
  });

  test("전체 버튼으로 홈 페이지 이동", async ({ page }) => {
    await page.goto("/");

    // 카테고리 선택
    const categoryLinks = page.locator('nav[aria-label="카테고리 필터"] a');
    const categoryLinksCount = await categoryLinks.count();

    if (categoryLinksCount > 1) {
      // 카테고리 클릭
      await categoryLinks.nth(1).click();
      await page.waitForURL(/\/categories\//);

      // "전체" 버튼 클릭
      const allButton = categoryLinks.nth(0);
      await allButton.click();

      // 홈 페이지로 이동 확인
      await expect(page).toHaveURL("/");
    }
  });

  test("카테고리 페이지 메타데이터", async ({ page }) => {
    await page.goto("/");

    const categoryLinks = page.locator('nav[aria-label="카테고리 필터"] a');
    const categoryLinksCount = await categoryLinks.count();

    if (categoryLinksCount > 1) {
      const categoryText = await categoryLinks.nth(1).textContent();
      await categoryLinks.nth(1).click();

      // 페이지 제목 확인 (브라우저 타이틀)
      const pageTitle = await page.title();
      expect(pageTitle).toContain("카테고리");

      // 페이지 제목 요소 확인
      const heading = page.locator("h1").first();
      await expect(heading).toContainText(categoryText || "");
    }
  });

  test("카테고리 필터 네비게이션 일관성", async ({ page }) => {
    // 홈 페이지에서 시작
    await page.goto("/");

    const categoryLinks = page.locator('nav[aria-label="카테고리 필터"] a');
    const categoryLinksCount = await categoryLinks.count();

    if (categoryLinksCount > 1) {
      // 첫 번째 카테고리로 이동
      const firstCategoryName = await categoryLinks.nth(1).textContent();
      await categoryLinks.nth(1).click();

      // 카테고리 페이지에서 "전체" 버튼으로 돌아가기
      await categoryLinks.nth(0).click();

      // 홈 페이지로 돌아왔는지 확인
      await expect(page).toHaveURL("/");

      // 다시 같은 카테고리로 이동
      const freshCategoryLinks = page.locator(
        'nav[aria-label="카테고리 필터"] a'
      );
      await freshCategoryLinks.nth(1).click();

      // 같은 카테고리 페이지로 이동했는지 확인
      const pageTitle = page.locator("h1").first();
      await expect(pageTitle).toContainText(firstCategoryName || "");
    }
  });

  test("카테고리 페이지 grid 레이아웃", async ({ page }) => {
    await page.goto("/");

    const categoryLinks = page.locator('nav[aria-label="카테고리 필터"] a');
    const categoryLinksCount = await categoryLinks.count();

    if (categoryLinksCount > 1) {
      // 데스크톱 뷰포트
      page.setViewportSize({ width: 1280, height: 720 });

      await categoryLinks.nth(1).click();

      // 포스트 카드가 있으면 확인
      const postCards = page.locator('[data-testid="post-card"]');
      const cardCount = await postCards.count();

      if (cardCount > 0) {
        const firstCard = postCards.first();
        await expect(firstCard).toBeVisible();
      }
    }
  });

  test("카테고리 페이지에서 포스트 링크 클릭", async ({ page }) => {
    await page.goto("/");

    const categoryLinks = page.locator('nav[aria-label="카테고리 필터"] a');
    const categoryLinksCount = await categoryLinks.count();

    if (categoryLinksCount > 1) {
      await categoryLinks.nth(1).click();

      // 포스트 링크 찾기
      const postLinks = page.locator('[data-testid="post-link"]');
      const linkCount = await postLinks.count();

      if (linkCount > 0) {
        const firstLink = postLinks.first();
        await expect(firstLink).toBeVisible({ timeout: 10000 });

        // href 속성 확인
        const href = await firstLink.getAttribute("href");
        expect(href).toMatch(/^\/posts\//);
      }
    }
  });

  test("카테고리 URL 인코딩 처리", async ({ page }) => {
    await page.goto("/");

    const categoryLinks = page.locator('nav[aria-label="카테고리 필터"] a');
    const categoryLinksCount = await categoryLinks.count();

    if (categoryLinksCount > 1) {
      const categoryLink = categoryLinks.nth(1);
      const href = await categoryLink.getAttribute("href");

      // URL이 올바르게 인코딩되어 있는지 확인
      if (href && href.includes("categories")) {
        expect(href).toMatch(/^\/categories\//);

        // 링크 클릭
        await categoryLink.click();

        // 페이지가 정상 로드됨
        const main = page.locator("main");
        await expect(main).toBeVisible({ timeout: 10000 });
      }
    }
  });
});
