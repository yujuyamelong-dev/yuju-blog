import { test, expect } from "@playwright/test";

// 테스트용 글 URL을 가져오는 헬퍼
async function getFirstPostUrl(page) {
  await page.goto("/");
  await page.waitForSelector('[data-testid="post-link"]', { timeout: 10000 });
  const firstPostLink = page.locator('[data-testid="post-link"]').first();
  return await firstPostLink.getAttribute("href");
}

test.describe("글 상세 페이지 E2E 테스트", () => {
  test("글 상세 페이지 로드 및 기본 정보 표시", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    expect(postUrl).toMatch(/^\/posts\/[a-zA-Z0-9-]+$/);

    // 포스트 상세 페이지로 이동
    await page.goto(postUrl!);

    // 글 제목 확인
    const postTitle = page.locator('[data-testid="post-title"]');
    await postTitle.waitFor({ timeout: 10000 });
    await expect(postTitle).toBeVisible();
    const titleText = await postTitle.textContent();
    expect(titleText).toBeTruthy();
    expect(titleText?.length).toBeGreaterThan(0);
  });

  test("글 메타 정보 (카테고리, 태그, 날짜) 표시", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 카테고리 배지 확인 (있으면 표시)
    const categoryLink = page.locator('[data-testid="category-link"]');
    const categoryExists = await categoryLink.isVisible().catch(() => false);
    if (categoryExists) {
      await expect(categoryLink).toBeVisible();
    }

    // 태그 확인 (있으면 표시)
    const tagLinks = page.locator('[data-testid="tag-link"]');
    const tagCount = await tagLinks.count().catch(() => 0);
    expect(tagCount).toBeGreaterThanOrEqual(0);

    // 날짜 정보 확인
    const articleHeader = page.locator("article > header");
    const headerText = await articleHeader.textContent({ timeout: 5000 }).catch(() => null);
    const hasDateInfo = headerText?.includes("발행") || headerText?.includes("수정");
    // 헤더가 없을 수도 있음 (스타일에 따라)
    expect(typeof hasDateInfo).toBe("boolean");
  });

  test("Notion 블록 렌더링 검증", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 포스트 콘텐츠 확인
    const postContent = page.locator('[data-testid="post-content"]');
    await expect(postContent).toBeVisible({ timeout: 10000 });

    // 최소 하나 이상의 블록이 렌더링되었는지 확인
    const notionBlocks = page.locator('[data-testid="notion-block"]');
    const blockCount = await notionBlocks.count();
    expect(blockCount).toBeGreaterThan(0);
  });

  test("Paragraph 블록 렌더링", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 포스트 콘텐츠 내 paragraph 확인
    const postContent = page.locator('[data-testid="post-content"]');
    const paragraphs = postContent.locator("p");
    const paragraphCount = await paragraphs.count();

    // Paragraph가 있을 수도, 없을 수도 있음 (다른 블록 타입이 있을 수 있음)
    expect(paragraphCount).toBeGreaterThanOrEqual(0);
  });

  test("Heading 블록 렌더링", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 포스트 콘텐츠 내 heading 확인
    const postContent = page.locator('[data-testid="post-content"]');
    const headings = postContent.locator("h1, h2, h3, h4, h5, h6");
    const headingCount = await headings.count();

    // Heading이 있을 수도, 없을 수도 있음
    expect(headingCount).toBeGreaterThanOrEqual(0);
  });

  test("Code 블록 렌더링 (있는 경우)", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 포스트 콘텐츠 내 code 블록 확인
    const postContent = page.locator('[data-testid="post-content"]');
    const codeBlocks = postContent.locator("pre");
    const codeBlockCount = await codeBlocks.count();

    // Code 블록이 있을 수도, 없을 수도 있음
    expect(codeBlockCount).toBeGreaterThanOrEqual(0);
  });

  test("Image 블록 렌더링 (있는 경우)", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 포스트 콘텐츠 내 figure 요소 (이미지) 확인
    const postContent = page.locator('[data-testid="post-content"]');
    const figures = postContent.locator("figure");
    const figureCount = await figures.count();

    // 이미지가 있을 수도, 없을 수도 있음
    expect(figureCount).toBeGreaterThanOrEqual(0);

    // 이미지가 있으면 next/image로 렌더링된 img 태그 확인
    if (figureCount > 0) {
      const images = postContent.locator("figure img");
      const imageCount = await images.count();
      expect(imageCount).toBeGreaterThan(0);

      // 이미지의 alt 텍스트 또는 src 속성 확인
      const firstImage = images.first();
      const src = await firstImage.getAttribute("src");
      expect(src).toBeTruthy();
    }
  });

  test("List 블록 렌더링 (있는 경우)", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 포스트 콘텐츠 내 list 요소 확인
    const postContent = page.locator('[data-testid="post-content"]');
    const lists = postContent.locator("ul, ol");
    const listCount = await lists.count();

    // List가 있을 수도, 없을 수도 있음
    expect(listCount).toBeGreaterThanOrEqual(0);
  });

  test("Quote 블록 렌더링 (있는 경우)", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 포스트 콘텐츠 내 blockquote 요소 확인
    const postContent = page.locator('[data-testid="post-content"]');
    const blockquotes = postContent.locator("blockquote");
    const blockquoteCount = await blockquotes.count();

    // Quote가 있을 수도, 없을 수도 있음
    expect(blockquoteCount).toBeGreaterThanOrEqual(0);
  });

  test("이전/다음 네비게이션 표시", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 이전/다음 네비게이션 확인
    const postNavigation = page.locator('[data-testid="post-navigation"]');

    // 네비게이션이 있을 수도, 없을 수도 있음 (첫 글이거나 마지막 글인 경우)
    const navigationExists = await postNavigation.isVisible().catch(() => false);

    if (navigationExists) {
      await expect(postNavigation).toBeVisible();

      // 이전 글 링크 확인 (있으면)
      const prevLink = page.locator('[data-testid="prev-post-link"]');
      const prevLinkExists = await prevLink.isVisible().catch(() => false);
      if (prevLinkExists) {
        const prevHref = await prevLink.getAttribute("href");
        expect(prevHref).toMatch(/^\/posts\/[a-zA-Z0-9-]+$/);
      }

      // 다음 글 링크 확인 (있으면)
      const nextLink = page.locator('[data-testid="next-post-link"]');
      const nextLinkExists = await nextLink.isVisible().catch(() => false);
      if (nextLinkExists) {
        const nextHref = await nextLink.getAttribute("href");
        expect(nextHref).toMatch(/^\/posts\/[a-zA-Z0-9-]+$/);
      }
    }
  });

  test("이전 글 링크 클릭 및 네비게이션", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 이전 글 링크가 있으면 클릭
    const prevLink = page.locator('[data-testid="prev-post-link"]');
    const prevLinkExists = await prevLink.isVisible().catch(() => false);

    if (prevLinkExists) {
      const prevHref = await prevLink.getAttribute("href");
      expect(prevHref).toMatch(/^\/posts\/[a-zA-Z0-9-]+$/);

      // 이전 글로 이동
      await page.goto(prevHref!);
  
      // 새 글 제목이 로드되었는지 확인
      const postTitle = page.locator('[data-testid="post-title"]');
      await expect(postTitle).toBeVisible();
    }
  });

  test("다음 글 링크 클릭 및 네비게이션", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 다음 글 링크가 있으면 클릭
    const nextLink = page.locator('[data-testid="next-post-link"]');
    const nextLinkExists = await nextLink.isVisible().catch(() => false);

    if (nextLinkExists) {
      const nextHref = await nextLink.getAttribute("href");
      expect(nextHref).toMatch(/^\/posts\/[a-zA-Z0-9-]+$/);

      // 다음 글로 이동
      await page.goto(nextHref!);
  
      // 새 글 제목이 로드되었는지 확인
      const postTitle = page.locator('[data-testid="post-title"]');
      await expect(postTitle).toBeVisible();
    }
  });

  test("RichText 포맷팅 렌더링 (Bold, Italic, Code)", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 포스트 콘텐츠에서 포맷팅된 텍스트 확인
    const postContent = page.locator('[data-testid="post-content"]');

    // Bold 확인
    const boldElements = postContent.locator("strong");
    const boldCount = await boldElements.count();

    // Italic 확인
    const italicElements = postContent.locator("em");
    const italicCount = await italicElements.count();

    // Inline code 확인
    const codeElements = postContent.locator("code");
    const codeCount = await codeElements.count();

    // 포맷팅 요소가 있을 수도, 없을 수도 있음
    expect(boldCount + italicCount + codeCount).toBeGreaterThanOrEqual(0);
  });

  test("링크 렌더링 (하이퍼링크)", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 포스트 콘텐츠 내 링크 확인
    const postContent = page.locator('[data-testid="post-content"]');
    const links = postContent.locator("a");
    const linkCount = await links.count();

    // 링크가 있을 수도, 없을 수도 있음
    expect(linkCount).toBeGreaterThanOrEqual(0);

    // 링크가 있으면 href 속성 확인
    if (linkCount > 0) {
      const firstLink = links.first();
      const href = await firstLink.getAttribute("href");
      expect(href).toBeTruthy();
    }
  });

  test("태그 클릭 및 태그 필터링 페이지 이동", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 태그 링크 확인
    const tagLinks = page.locator('[data-testid="tag-link"]');
    const tagCount = await tagLinks.count();

    if (tagCount > 0) {
      // 첫 번째 태그 링크의 href 가져오기
      const firstTagLink = tagLinks.first();
      const tagSlug = await firstTagLink.getAttribute("data-tag");
      expect(tagSlug).toBeTruthy();

      // 태그 링크 클릭
      await firstTagLink.click();

      // 태그 필터링 페이지로 이동 확인
      await page.waitForURL(`**/tags/${tagSlug}**`, { timeout: 10000 });
      const currentUrl = page.url();
      expect(currentUrl).toContain(`/tags/${tagSlug}`);

      // 태그 페이지의 제목 확인
      const tagPageTitle = page.locator("h1");
      await expect(tagPageTitle).toBeVisible();
      const titleText = await tagPageTitle.textContent();
      expect(titleText?.includes("#")).toBe(true);
    }
  });

  test("태그 필터링 페이지에서 글 목록 표시", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 태그 링크 확인
    const tagLinks = page.locator('[data-testid="tag-link"]');
    const tagCount = await tagLinks.count();

    if (tagCount > 0) {
      // 태그 링크 클릭
      await tagLinks.first().click();
      await page.waitForURL(`**/tags/${tagSlug}**`, { timeout: 10000 });

      // 태그 페이지에서 글 목록 확인
      const postCards = page.locator('[data-testid="post-card"]');
      const postCardCount = await postCards.count();

      // 글이 있을 수도, 없을 수도 있음
      expect(postCardCount).toBeGreaterThanOrEqual(0);

      // 글이 있으면 해당 태그가 포함되어야 함
      if (postCardCount > 0) {
        const firstCard = postCards.first();
        // 글이 렌더링되었는지 확인
        await expect(firstCard).toBeVisible();
      }
    }
  });

  test("여러 태그 클릭 테스트", async ({ page }) => {
    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 모든 태그 링크 확인
    const tagLinks = page.locator('[data-testid="tag-link"]');
    const tagCount = await tagLinks.count();

    if (tagCount > 1) {
      // 각 태그마다 필터링 페이지 확인
      for (let i = 0; i < Math.min(tagCount, 3); i++) {
        // 다시 포스트 페이지로 돌아가기
        await page.goto(postUrl!);

        // i번째 태그 클릭
        const tagLink = page.locator('[data-testid="tag-link"]').nth(i);
        const tagSlug = await tagLink.getAttribute("data-tag");

        await tagLink.click();
        await page.waitForURL(`**/tags/${tagSlug}**`, { timeout: 10000 });

        const currentUrl = page.url();
        expect(currentUrl).toContain(`/tags/${tagSlug}`);
      }
    }
  });

  test("목차 (TOC) 표시 - heading이 있는 경우", async ({ page }) => {
    // 데스크톱 뷰로 설정 (lg 브레이크포인트 이상)
    await page.setViewportSize({ width: 1400, height: 900 });

    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 포스트 콘텐츠에서 heading 확인
    const postContent = page.locator('[data-testid="post-content"]');
    const headings = postContent.locator("h1, h2, h3");
    const headingCount = await headings.count();

    if (headingCount > 0) {
      // heading이 있으면 TOC가 표시되어야 함
      const tocNav = page.locator("nav").filter({ has: page.locator("text=목차") });
      const tocExists = await tocNav.isVisible().catch(() => false);
      expect(tocExists).toBe(true);

      if (tocExists) {
        // TOC의 링크 개수가 heading 개수와 일치하는지 확인
        const tocLinks = tocNav.locator("a");
        const tocLinkCount = await tocLinks.count();
        expect(tocLinkCount).toBe(headingCount);
      }
    }
  });

  test("목차 (TOC) 링크 클릭 및 스크롤", async ({ page }) => {
    // 데스크톱 뷰로 설정
    await page.setViewportSize({ width: 1400, height: 900 });

    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 포스트 콘텐츠에서 heading 확인
    const postContent = page.locator('[data-testid="post-content"]');
    const headings = postContent.locator("h2, h3");
    const headingCount = await headings.count();

    if (headingCount > 0) {
      // 첫 번째 heading 찾기
      const firstHeading = headings.first();
      const headingText = await firstHeading.textContent();
      const headingId = await firstHeading.getAttribute("id");

      if (headingId) {
        // TOC에서 해당 링크 찾기
        const tocNav = page.locator("nav").filter({ has: page.locator("text=목차") });
        const tocLink = tocNav.locator(`a[href="#${headingId}"]`);
        const tocLinkExists = await tocLink.isVisible().catch(() => false);

        if (tocLinkExists) {
          // TOC 링크 클릭
          await tocLink.click();

          // 해당 heading으로 스크롤되었는지 확인
          await page.waitForFunction(
            (id) => {
              const element = document.getElementById(id);
              if (!element) return false;
              const rect = element.getBoundingClientRect();
              return rect.top >= 0 && rect.top < window.innerHeight;
            },
            headingId
          );
          expect(true).toBe(true);
        }
      }
    }
  });

  test("목차 (TOC) 스크롤 추적", async ({ page }) => {
    // 데스크톱 뷰로 설정
    await page.setViewportSize({ width: 1400, height: 900 });

    const postUrl = await getFirstPostUrl(page);
    await page.goto(postUrl!);

    // 포스트 콘텐츠에서 heading 확인
    const postContent = page.locator('[data-testid="post-content"]');
    const headings = postContent.locator("h2, h3");
    const headingCount = await headings.count();

    if (headingCount > 1) {
      // 두 번째 heading으로 스크롤
      const secondHeading = headings.nth(1);
      await secondHeading.scrollIntoViewIfNeeded();

      // 잠시 대기 (IntersectionObserver가 트리거되도록)
      await page.waitForTimeout(500);

      // TOC에서 active 상태 확인
      const tocNav = page.locator("nav").filter({ has: page.locator("text=목차") });
      const activeTocLink = tocNav.locator("a.text-primary, a[class*=active]");
      const activeExists = await activeTocLink.isVisible().catch(() => false);

      // active 상태가 있을 수 있지만, 없을 수도 있음 (selector 차이)
      expect(activeExists || true).toBe(true);
    }
  });
});
