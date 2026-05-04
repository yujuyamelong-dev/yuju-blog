import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/notion';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://my-blog-yujuyamelong.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { items: posts } = await getAllPosts();

  // 홈페이지
  const homeEntry: MetadataRoute.Sitemap[0] = {
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  };

  // 글 목록 페이지
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.modifiedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 카테고리 목록 추출 및 페이지 생성
  const categories = Array.from(
    new Set(posts.map((post) => post.category?.slug).filter(Boolean))
  ) as string[];

  const categoryEntries: MetadataRoute.Sitemap = categories.map((slug) => ({
    url: `${siteUrl}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 태그 목록 추출 및 페이지 생성
  const tagSlugs = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagSlugs.add(tag.slug);
    });
  });

  const tagEntries: MetadataRoute.Sitemap = Array.from(tagSlugs).map((slug) => ({
    url: `${siteUrl}/tags/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 검색 페이지
  const searchEntry: MetadataRoute.Sitemap[0] = {
    url: `${siteUrl}/search`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.5,
  };

  return [homeEntry, ...postEntries, ...categoryEntries, ...tagEntries, searchEntry];
}
