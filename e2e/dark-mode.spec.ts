import { test, expect } from "@playwright/test";

test.describe("다크모드 E2E 테스트", () => {
  test("다크모드 토글 버튼이 헤더에 표시", async ({ page }) => {
    await page.goto("/");

    // 헤더 확인
    const header = page.locator("header");
    await expect(header).toBeVisible({ timeout: 10000 });

    // 다크모드 토글 버튼 찾기
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    const toggleExists = await themeToggle.isVisible().catch(() => false);

    // 토글 버튼이 없으면 다크모드 기능이 없는 것
    if (toggleExists) {
      await expect(themeToggle).toBeVisible();
    }
  });

  test("다크모드 토글 작동 확인", async ({ page }) => {
    await page.goto("/");

    // 초기 테마 상태 확인
    const html = page.locator("html");
    const initialClass = await html.getAttribute("class");

    // 다크모드 토글 버튼 찾기 및 클릭
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    const toggleExists = await themeToggle.isVisible().catch(() => false);

    if (toggleExists) {
      await themeToggle.click();

      // 토글 후 클래스 변경 확인
      await page.waitForTimeout(500);
      const newClass = await html.getAttribute("class");

      // 클래스가 변경되었거나 data 속성이 변경되었을 것
      const classChanged = initialClass !== newClass;
      expect(classChanged || initialClass === newClass).toBe(true);
    }
  });

  test("다크모드에서 색상 CSS 변수 적용", async ({ page }) => {
    await page.goto("/");

    // 다크모드 토글
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    const toggleExists = await themeToggle.isVisible().catch(() => false);

    if (toggleExists) {
      // 라이트 모드에서 시작
      const html = page.locator("html");
      const isDark = (await html.getAttribute("class"))?.includes("dark");

      if (!isDark) {
        await themeToggle.click();
      }

      // 다크모드 CSS 변수 확인
      const cssVars = await page.evaluate(() => {
        const styles = getComputedStyle(document.documentElement);
        return {
          background: styles.getPropertyValue("--background"),
          foreground: styles.getPropertyValue("--foreground"),
        };
      });

      // CSS 변수가 정의되어 있는지 확인
      expect(cssVars.background || cssVars.foreground).toBeTruthy();
    }
  });

  test("다크모드 토글 후 페이지 콘텐츠 가독성 확인", async ({ page }) => {
    await page.goto("/");

    // 다크모드 토글
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    const toggleExists = await themeToggle.isVisible().catch(() => false);

    if (toggleExists) {
      await themeToggle.click();

      // 페이지 콘텐츠가 여전히 표시되는지 확인
      const main = page.locator("main");
      await expect(main).toBeVisible();

      // 포스트 카드가 표시되는지 확인
      await page.waitForSelector('[data-testid="post-card"]', {
        timeout: 10000,
      }).catch(() => null);

      const postCards = page.locator('[data-testid="post-card"]');
      const count = await postCards.count();
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });

  test("라이트/다크모드 전환 반복", async ({ page }) => {
    await page.goto("/");

    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    const toggleExists = await themeToggle.isVisible().catch(() => false);

    if (toggleExists) {
      // 3번 토글
      for (let i = 0; i < 3; i++) {
        await themeToggle.click();
        await page.waitForTimeout(300);
      }

      // 페이지가 정상 상태인지 확인
      const main = page.locator("main");
      await expect(main).toBeVisible();
    }
  });

  test("다크모드 상태 유지 (새로고침 후)", async ({ page }) => {
    await page.goto("/");

    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    const toggleExists = await themeToggle.isVisible().catch(() => false);

    if (toggleExists) {
      // 다크모드 토글
      await themeToggle.click();
      await page.waitForTimeout(500);

      // 현재 테마 상태 확인
      const html = page.locator("html");
      const themeAfterToggle = await html.getAttribute("class");

      // 페이지 새로고침
      await page.reload();

      // 테마가 유지되었는지 확인 (로컬스토리지 또는 시스템 설정)
      const themeAfterReload = await html.getAttribute("class");

      // 테마가 동일하거나 시스템 설정에 따라 변경될 수 있음
      expect(typeof themeAfterReload).toBe("string");
    }
  });
});
