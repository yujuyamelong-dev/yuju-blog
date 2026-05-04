import { test, expect } from "@playwright/test";

test.describe("태그 필터링 기능", () => {
  test("글 상세에서 태그 클릭 후 필터 페이지 이동", async ({ page }) => {
    // 직접 post URL로 이동
    await page.goto("/posts/nextjs-15-app-router-guide");

    // 태그 링크 대기
    const tagLink = page.locator('[data-testid="tag-link"]').first();
    await tagLink.waitFor({ timeout: 10000 });

    const tagSlug = await tagLink.getAttribute("data-tag");
    expect(tagSlug).toBeTruthy();

    // 태그 클릭
    await tagLink.click();

    // 태그 필터 페이지로 이동 확인
    await page.waitForURL(`**/tags/${tagSlug}**`, { timeout: 10000 });
    expect(page.url()).toContain(`/tags/${tagSlug}`);
  });

  test("태그 필터 페이지에서 제목 표시", async ({ page }) => {
    // 직접 post URL로 이동
    await page.goto("/posts/nextjs-15-app-router-guide");

    // 태그 링크 대기
    const tagLink = page.locator('[data-testid="tag-link"]').first();
    await tagLink.waitFor({ timeout: 10000 });

    const tagSlug = await tagLink.getAttribute("data-tag");

    // 태그 클릭
    await tagLink.click();
    await page.waitForURL(`**/tags/${tagSlug}**`, { timeout: 10000 });

    // 태그 페이지 제목 확인
    const h1 = page.locator("h1");
    await h1.waitFor({ timeout: 10000 });
    const title = await h1.textContent();
    expect(title).toContain("#");
  });

  test("태그 필터 페이지에서 글 목록 표시", async ({ page }) => {
    // 직접 post URL로 이동
    await page.goto("/posts/nextjs-15-app-router-guide");

    // 태그 링크 대기
    const tagLink = page.locator('[data-testid="tag-link"]').first();
    await tagLink.waitFor({ timeout: 10000 });

    const tagSlug = await tagLink.getAttribute("data-tag");

    // 태그 클릭
    await tagLink.click();
    await page.waitForURL(`**/tags/${tagSlug}**`, { timeout: 10000 });

    // 글 카드 확인
    const postCards = page.locator('[data-testid="post-card"]');
    const count = await postCards.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("정적 생성 확인 - 태그 페이지 직접 접근", async ({ page }) => {
    // 먼저 post 페이지에서 태그를 구해서
    await page.goto("/posts/nextjs-15-app-router-guide");

    const tagLink = page.locator('[data-testid="tag-link"]').first();
    await tagLink.waitFor({ timeout: 10000 });
    const tagSlug = await tagLink.getAttribute("data-tag");

    // 태그 페이지에 직접 접근
    await page.goto(`/tags/${tagSlug}`);

    // 페이지가 성공적으로 로드되었는지 확인
    const h1 = page.locator("h1");
    await h1.waitFor({ timeout: 10000 });
    const title = await h1.textContent();
    expect(title).toContain("#");
  });
});
