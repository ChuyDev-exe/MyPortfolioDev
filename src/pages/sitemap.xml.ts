import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

interface SitemapEntry {
  url: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

export const GET: APIRoute = async () => {
  const allPosts = await getCollection('posts');
  const baseUrl = 'https://jesusvelez.xyz';

  const sitemapEntries: SitemapEntry[] = [
    { url: '/', priority: '1.0', changefreq: 'monthly' },
    { url: '/about', priority: '0.9', changefreq: 'monthly' },
    { url: '/DevBlog', priority: '0.8', changefreq: 'weekly' },
    { url: '/Blog/Posts', priority: '0.7', changefreq: 'weekly' },
    ...allPosts.map((post) => ({
      url: `/Blog/${post.slug}`,
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: post.data.date.toISOString().split('T')[0]
    } as SitemapEntry))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${baseUrl}${entry.url}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};