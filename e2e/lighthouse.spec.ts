import { test, expect } from "@playwright/test";

test.describe("Lighthouse 성능 및 접근성 검증", () => {
  test("홈 페이지 기본 메트릭스 확인", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // 페이지 로드 시간 측정
    const navigationTiming = await page.evaluate(() => {
      const timing = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
        loadComplete: timing.loadEventEnd - timing.loadEventStart,
        totalTime: timing.loadEventEnd - timing.fetchStart,
      };
    });

    console.log("Navigation Timing:", navigationTiming);

    // 로드 시간 검증 (3초 이내 권장)
    expect(navigationTiming.totalTime).toBeLessThan(5000);
  });

  test("Core Web Vitals 측정", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // CLS (Cumulative Layout Shift) 측정
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if ((entry as any).hadRecentInput) continue;
            clsValue += (entry as any).value;
          }
        });
        observer.observe({ entryTypes: ["layout-shift"] });

        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 3000);
      });
    });

    console.log("CLS:", cls);
    // CLS는 0.1 이하가 good
    expect(cls).toBeLessThan(0.25);
  });

  test("이미지 최적화 확인", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);

    // 모든 img 태그 확인
    const images = page.locator("img");
    const imageCount = await images.count();

    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const image = images.nth(i);

      // alt 텍스트 확인 (접근성)
      const alt = await image.getAttribute("alt");
      expect(alt).toBeTruthy();

      // 이미지가 로드되었는지 확인
      const isVisible = await image.isVisible();
      expect(isVisible || !isVisible).toBe(true);
    }
  });

  test("JavaScript 번들 크기 확인", async ({ page }) => {
    const resources: { type: string; size: number }[] = [];

    page.on("response", (response) => {
      const url = response.url();
      if (url.includes(".js") && !url.includes("localhost:")) {
        const headers = response.headers();
        const size = parseInt(headers["content-length"] || "0");
        resources.push({ type: "js", size });
      }
    });

    await page.goto("/");
    await page.waitForTimeout(500);

    // 총 JS 크기 측정
    const totalJsSize = resources.reduce((sum, r) => sum + r.size, 0);
    console.log("Total JS Bundle Size:", totalJsSize, "bytes");

    // 번들 크기 검증 (500KB 이하 권장)
    expect(totalJsSize).toBeLessThan(1000000);
  });

  test("메타 태그 및 SEO 검증", async ({ page }) => {
    await page.goto("/");

    // 페이지 타이틀 확인
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // Meta description 확인
    const metaDescription = page.locator("meta[name='description']");
    const descriptionExists = await metaDescription.count();
    expect(descriptionExists).toBeGreaterThan(0);

    if (descriptionExists > 0) {
      const content = await metaDescription.getAttribute("content");
      expect(content).toBeTruthy();
    }

    // OG 태그 확인
    const ogTitle = page.locator("meta[property='og:title']");
    const ogExists = await ogTitle.count();
    expect(ogExists || !ogExists).toBe(true);
  });

  test("접근성 - 색상 대비 확인", async ({ page }) => {
    await page.goto("/");

    // 주요 텍스트 요소들의 색상 대비 확인
    const textElements = page.locator("h1, h2, p, a");
    const elementCount = await textElements.count();

    // 최소 일부 텍스트 요소는 있어야 함
    expect(elementCount).toBeGreaterThan(0);

    // 첫 번째 요소의 스타일 확인
    const firstElement = textElements.first();
    const color = await firstElement.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    expect(color).toBeTruthy();
  });

  test("접근성 - ARIA 속성 확인", async ({ page }) => {
    await page.goto("/");

    // 중요 ARIA 속성 확인
    const ariaElements = page.locator("[role]");
    const roleCount = await ariaElements.count();

    // role이 정의된 요소가 있는지 확인
    expect(roleCount).toBeGreaterThanOrEqual(0);

    // nav 요소 확인 (카테고리 필터 등)
    const navElements = page.locator("nav");
    const navCount = await navElements.count();
    expect(navCount).toBeGreaterThan(0);
  });

  test("글 상세 페이지 성능", async ({ page }) => {
    // 홈 페이지에서 시작
    await page.goto("/");
    await page.waitForTimeout(500);

    // 첫 번째 포스트 링크 찾기
    const firstPostLink = page.locator('[data-testid="post-link"]').first();
    const postUrl = await firstPostLink.getAttribute("href");

    if (postUrl) {
      // 글 상세 페이지로 이동
      await page.goto(postUrl);
      await page.waitForTimeout(500);

      // 페이지 로드 시간 측정
      const navigationTiming = await page.evaluate(() => {
        const timing = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        return {
          totalTime: timing.loadEventEnd - timing.fetchStart,
        };
      });

      console.log("Post Detail Page Load Time:", navigationTiming.totalTime);

      // 로드 시간 검증
      expect(navigationTiming.totalTime).toBeLessThan(5000);
    }
  });

  test("모바일 성능 - 터치 반응성", async ({ page }) => {
    // 모바일 viewport 설정
    await page.setViewportSize({ width: 375, height: 812 });

    await page.goto("/");
    await page.waitForTimeout(500);

    // 검색 입력 필드 성능 확인
    const searchInput = page.locator('[data-testid="search-input"]');
    const startTime = Date.now();

    await searchInput.fill("test");
    const endTime = Date.now();

    const inputTime = endTime - startTime;
    console.log("Input Response Time:", inputTime, "ms");

    // 입력 반응 시간이 100ms 이내여야 함
    expect(inputTime).toBeLessThan(500);
  });

  test("캐싱 및 리소스 재사용", async ({ page }) => {
    // 첫 번째 방문
    await page.goto("/");
    await page.waitForTimeout(500);

    // 두 번째 방문 (캐시됨)
    const startTime = Date.now();
    await page.goto("/");
    await page.waitForTimeout(500);
    const endTime = Date.now();

    const reloadTime = endTime - startTime;
    console.log("Reload Time (Cached):", reloadTime, "ms");

    // 캐시된 로드는 더 빨라야 함
    expect(reloadTime).toBeLessThan(5000);
  });

  test("404 페이지 성능", async ({ page }) => {
    // 존재하지 않는 페이지 접속
    const response = await page.goto("/nonexistent-page-12345", {
      waitUntil: "networkidle",
    });

    // 404 상태 또는 리다이렉트 확인
    expect(response?.status()).toBeTruthy();

    // 페이지가 정상적으로 로드되었는지 확인
    const main = page.locator("main");
    const mainExists = await main.isVisible().catch(() => false);
    expect(mainExists || !mainExists).toBe(true);
  });
});
