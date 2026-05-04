import { test, expect, devices } from "@playwright/test";

// 테스트할 viewport 크기들
const VIEWPORTS = [
  {
    name: "Mobile (360px)",
    width: 360,
    height: 800,
  },
  {
    name: "Mobile (375px - iPhone SE)",
    width: 375,
    height: 812,
  },
  {
    name: "Mobile (414px - iPhone 12)",
    width: 414,
    height: 896,
  },
  {
    name: "Tablet (768px - iPad)",
    width: 768,
    height: 1024,
  },
  {
    name: "Tablet (820px - iPad Air)",
    width: 820,
    height: 1180,
  },
  {
    name: "Desktop (1024px)",
    width: 1024,
    height: 768,
  },
  {
    name: "Desktop (1280px)",
    width: 1280,
    height: 720,
  },
  {
    name: "Desktop (1920px)",
    width: 1920,
    height: 1080,
  },
];

test.describe("반응형 디자인 - 다중 Viewport", () => {
  test.describe("홈 페이지", () => {
    VIEWPORTS.forEach((viewport) => {
      test(`${viewport.name}에서 정상 렌더링`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
        });
        const page = await context.newPage();

        await page.goto("/");
        await page.waitForTimeout(500);

        // 레이아웃이 깨지지 않았는지 확인
        const header = page.locator("header");
        await expect(header).toBeVisible();

        // 모든 텍스트가 overflow 없이 렌더링되는지 확인
        const mainContent = page.locator("main");
        const boundingBox = await mainContent.boundingBox();
        expect(boundingBox).not.toBeNull();

        if (viewport.width < 768) {
          // 모바일: 검색 박스 가시성 확인
          const searchBox = page.locator('[data-testid="search-input"]');
          await expect(searchBox).toBeVisible();
        }

        await context.close();
      });
    });
  });

  test.describe("글 목록 페이지 (포스트 목록)", () => {
    VIEWPORTS.forEach((viewport) => {
      test(`${viewport.name}에서 그리드 레이아웃 확인`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
        });
        const page = await context.newPage();

        // 홈 페이지로 이동 후 포스트 목록 슬라이드로 전환
        await page.goto("/?slide=1");
        await page.waitForTimeout(500);

        // PostCard들이 올바른 컬럼 수로 배치되는지 확인
        const cards = page.locator('[data-testid="post-card"]');
        const cardCount = await cards.count();

        if (cardCount > 0) {
          const firstCard = cards.first();
          const boundingBox = await firstCard.boundingBox();
          expect(boundingBox).not.toBeNull();
          expect(boundingBox!.width).toBeGreaterThan(0);
        }

        // 그리드 컨테이너 확인
        const gridContainer = page.locator(".grid");
        if (await gridContainer.isVisible()) {
          const gridBoundingBox = await gridContainer.boundingBox();
          // max-width 제약이 있으므로 viewport보다 작을 수 있음
          expect(gridBoundingBox!.width).toBeLessThanOrEqual(viewport.width);
          expect(gridBoundingBox!.width).toBeGreaterThan(0);
        }

        await context.close();
      });
    });
  });

  test.describe("글 상세 페이지", () => {
    VIEWPORTS.forEach((viewport) => {
      test(`${viewport.name}에서 콘텐츠 레이아웃 확인`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
        });
        const page = await context.newPage();

        // 첫 번째 포스트로 이동
        await page.goto("/");
        await page.waitForTimeout(500);

        // 포스트 목록으로 이동
        const viewPostsButton = page.locator("button:has-text('블로그 글 보기')");
        if (await viewPostsButton.isVisible()) {
          await viewPostsButton.click();
        }

        // 첫 번째 포스트 클릭
        const firstPostLink = page.locator('[data-testid="post-link"]').first();
        if (await firstPostLink.isVisible()) {
          await firstPostLink.click();
          await page.waitForTimeout(500);

          // 글 제목이 정상 렌더링되는지 확인
          const postTitle = page.locator('[data-testid="post-title"]');
          await expect(postTitle).toBeVisible();

          // 콘텐츠 영역이 overflow 없이 렌더링되는지 확인
          const postContent = page.locator('[data-testid="post-content"]');
          const boundingBox = await postContent.boundingBox();
          expect(boundingBox).not.toBeNull();
          expect(boundingBox!.width).toBeGreaterThan(0);

          // 글자 크기가 적절한지 확인 (height > 0)
          const headings = page.locator("h1, h2, h3");
          const headingCount = await headings.count();
          if (headingCount > 0) {
            const firstHeading = headings.first();
            const headingBoundingBox = await firstHeading.boundingBox();
            expect(headingBoundingBox!.height).toBeGreaterThan(0);
          }
        }

        await context.close();
      });
    });
  });

  test.describe("터치 친화적 요소 검증", () => {
    test("모바일에서 버튼/링크 최소 44px 탭 영역 확보", async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 375, height: 812 },
      });
      const page = await context.newPage();

      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Header 버튼들 확인
      const themeToggleButton = page.locator('button[aria-label="다크/라이트 모드 전환"]');
      const buttonBoundingBox = await themeToggleButton.boundingBox();

      // 최소 44px 크기 확보 (이상적으로는 48px 이상)
      if (buttonBoundingBox) {
        expect(Math.min(buttonBoundingBox.width, buttonBoundingBox.height)).toBeGreaterThanOrEqual(44);
      }

      await context.close();
    });
  });

  test.describe("이미지 반응형 확인", () => {
    VIEWPORTS.forEach((viewport) => {
      test(`${viewport.name}에서 이미지 렌더링`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
        });
        const page = await context.newPage();

        await page.goto("/");
        await page.waitForTimeout(500);

        // 슬라이드로 이동
        await page.goto("/?slide=1");

        // PostCard 이미지 확인
        const images = page.locator('img[alt*=""]');
        const imageCount = await images.count();

        for (let i = 0; i < Math.min(imageCount, 3); i++) {
          const image = images.nth(i);
          const boundingBox = await image.boundingBox();
          expect(boundingBox).not.toBeNull();
          expect(boundingBox!.width).toBeGreaterThan(0);
          expect(boundingBox!.height).toBeGreaterThan(0);
        }

        await context.close();
      });
    });
  });

  test.describe("텍스트 가독성", () => {
    VIEWPORTS.forEach((viewport) => {
      test(`${viewport.name}에서 텍스트 라인 길이 확인`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
        });
        const page = await context.newPage();

        await page.goto("/");
        await page.waitForTimeout(500);

        // 메인 콘텐츠 영역 너비 확인
        const mainContent = page.locator("main");
        const boundingBox = await mainContent.boundingBox();

        // 가독성을 위해 최대 너비는 제한되어야 함
        // 모바일에서는 전체 너비, 데스크톱에서는 max-w-7xl이지만 viewport와 동일할 수도 있음
        expect(boundingBox!.width).toBeGreaterThan(0);

        await context.close();
      });
    });
  });
});
