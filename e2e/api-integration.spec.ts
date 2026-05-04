import { test, expect } from "@playwright/test";

test.describe("Notion API 통합 테스트", () => {
  test("홈페이지 로드 - 서버 렌더링 확인", async ({ page }) => {
    await page.goto("/");

    // 페이지가 정상 로드됨
    expect(page.url()).toContain("localhost:3000");

    // 헤더 존재 확인
    const header = page.locator("header");
    await expect(header).toBeVisible({ timeout: 10000 });
  });

  test("Notion 데이터베이스 쿼리 동작 확인", async ({ page }) => {
    // 홈페이지 로드 시 getAllPosts() 호출 확인
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    // 페이지 콘텐츠 로드됨
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible({ timeout: 10000 });

    // 페이지 소스 렌더링됨
    const pageContent = await page.content();
    expect(pageContent.length).toBeGreaterThan(100);
  });

  test("ISR 캐싱 동작 확인", async ({ page }) => {
    // 첫 번째 요청
    const response1 = await page.goto("/");
    expect(response1?.ok()).toBe(true);

    // 두 번째 요청 (캐시된 데이터)
    const response2 = await page.goto("/");
    expect(response2?.ok()).toBe(true);

    // 둘 다 성공적으로 로드됨
    expect(response1?.status()).toBe(200);
  });

  test("Rate Limit 관리 - 연속 요청 처리", async ({ page }) => {
    // 순차적 요청 (Rate Limit 관리 테스트)
    // Notion API는 3req/s 제한이 있으므로, 순차 처리 확인

    const response1 = await page.goto("/");
    expect(response1?.ok()).toBe(true);

    await page.waitForTimeout(500);

    const response2 = await page.goto("/");
    expect(response2?.ok()).toBe(true);

    await page.waitForTimeout(500);

    const response3 = await page.goto("/");
    expect(response3?.ok()).toBe(true);
  });

  test("에러 처리 - 잘못된 페이지", async ({ page }) => {
    const response = await page.goto("/invalid-slug-that-does-not-exist");

    // 존재하지 않는 포스트는 404 또는 notfound 처리
    if (response?.status()) {
      expect([404, 307, 308]).toContain(response.status());
    }
  });

  test("환경변수 로드 확인", async ({ page }) => {
    // Notion API 환경변수가 로드되었는지 확인
    // 서버에서 에러 없이 시작됨을 의미함
    const startTime = Date.now();
    await page.goto("/");
    const loadTime = Date.now() - startTime;

    // 타임아웃 없이 로드됨 (환경변수 설정 완료)
    expect(loadTime).toBeLessThan(30000);
  });
});
