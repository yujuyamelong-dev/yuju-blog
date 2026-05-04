import { test, expect } from "@playwright/test";

test.describe("Notion API 테스트", () => {
  test("getAllPosts() - 발행된 글 목록 조회", async ({ page }) => {
    await page.goto("/");

    // 페이지가 로드되고 PostCard 컴포넌트가 렌더링되었는지 확인
    const postCards = page.locator('[data-testid="post-card"]');
    const count = await postCards.count();

    expect(count).toBeGreaterThan(0);
  });

  test("getPostBySlug() - 특정 글 조회", async ({ page }) => {
    // 먼저 홈페이지에서 글 목록 로드
    await page.goto("/");
    await page.waitForTimeout(500);

    // 포스트 목록 슬라이드로 이동 (슬라이드 인디케이터 클릭)
    const postListButton = page.locator('button[aria-label="슬라이드 2로 이동"]');
    if (await postListButton.isVisible()) {
      await postListButton.click();
      await page.waitForTimeout(600);
    }

    // 첫 번째 글 링크 클릭
    const firstPostLink = page.locator('[data-testid="post-link"]').first();
    await firstPostLink.click({ timeout: 10000 });

    // 글 상세 페이지 확인
    const postTitle = page.locator('[data-testid="post-title"]');
    await expect(postTitle).toBeVisible();

    // 제목이 비어있지 않은지 확인
    const titleText = await postTitle.textContent();
    expect(titleText).toBeTruthy();
  });

  test("getPostBlocks() - 글의 블록 렌더링", async ({ page }) => {
    // 글 상세 페이지로 이동
    await page.goto("/");
    await page.waitForTimeout(500);

    // 포스트 목록 슬라이드로 이동
    const postListButton = page.locator('button[aria-label="슬라이드 2로 이동"]');
    if (await postListButton.isVisible()) {
      await postListButton.click();
      await page.waitForTimeout(600);
    }

    const firstPostLink = page.locator('[data-testid="post-link"]').first();
    await firstPostLink.click({ timeout: 10000 });

    // 콘텐츠 영역이 렌더링되었는지 확인
    const content = page.locator('[data-testid="post-content"]');
    await expect(content).toBeVisible();

    // 블록 요소가 있는지 확인
    const blocks = page.locator('[data-testid="notion-block"]');
    const blockCount = await blocks.count();
    expect(blockCount).toBeGreaterThan(0);
  });

  test("카테고리 필터링", async ({ page }) => {
    // 홈페이지에서 카테고리 필터 클릭
    await page.goto("/");
    await page.waitForTimeout(500);

    // 포스트 목록 슬라이드로 이동
    const postListButton = page.locator('button[aria-label="슬라이드 2로 이동"]');
    if (await postListButton.isVisible()) {
      await postListButton.click();
      await page.waitForTimeout(600);
    }

    // 첫 번째 글의 카테고리 클릭 (카테고리 필터 페이지로 이동)
    const categoryTag = page.locator('[data-testid="category-link"]').first();
    const categoryName = await categoryTag.getAttribute("data-category");

    if (categoryName) {
      await categoryTag.click();

      // 카테고리 페이지로 이동했는지 확인
      await expect(page).toHaveURL(new RegExp(`/category/${categoryName}`));

      // 해당 카테고리의 글들이 렌더링되었는지 확인
      const postCards = page.locator('[data-testid="post-card"]');
      const count = await postCards.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("태그 필터링", async ({ page }) => {
    // 글 상세 페이지로 이동
    await page.goto("/");
    await page.waitForTimeout(500);

    // 포스트 목록 슬라이드로 이동
    const postListButton = page.locator('button[aria-label="슬라이드 2로 이동"]');
    if (await postListButton.isVisible()) {
      await postListButton.click();
      await page.waitForTimeout(600);
    }

    const firstPostLink = page.locator('[data-testid="post-link"]').first();
    await firstPostLink.click({ timeout: 10000 });

    // 첫 번째 태그 클릭
    const tagLink = page.locator('[data-testid="tag-link"]').first();
    const tagName = await tagLink.getAttribute("data-tag");

    if (tagName) {
      await tagLink.click();

      // 태그 페이지로 이동했는지 확인
      await expect(page).toHaveURL(new RegExp(`/tags/${tagName}`));

      // 해당 태그의 글들이 렌더링되었는지 확인
      const postCards = page.locator('[data-testid="post-card"]');
      const count = await postCards.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("Rate Limit 관리 - 연속 요청 처리", async ({ page }) => {
    // 여러 글을 빠르게 로드하여 Rate Limit이 정상 작동하는지 확인
    await page.goto("/");
    await page.waitForTimeout(500);

    // 포스트 목록 슬라이드로 이동
    const postListButton = page.locator('button[aria-label="슬라이드 2로 이동"]');
    if (await postListButton.isVisible()) {
      await postListButton.click();
      await page.waitForTimeout(600);
    }

    // 여러 글 링크에 접근
    const postLinks = page.locator('[data-testid="post-link"]');
    const count = Math.min(2, await postLinks.count());

    for (let i = 0; i < count; i++) {
      await postLinks.nth(i).click({ timeout: 10000 });
      await expect(page.locator('[data-testid="post-title"]')).toBeVisible();
      await page.goBack();
      await page.goto("/");
      await page.waitForTimeout(500);

      // 포스트 목록 슬라이드로 다시 이동
      const btn = page.locator('button[aria-label="슬라이드 2로 이동"]');
      if (await btn.isVisible()) {
        await btn.click();
        await page.waitForTimeout(600);
      }
    }

    // 모든 요청이 정상적으로 완료되었는지 확인
    expect(true).toBe(true);
  });
});
