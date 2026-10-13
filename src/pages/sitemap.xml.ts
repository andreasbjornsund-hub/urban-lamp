import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';
// Legacy pages in public/ keep their hand-maintained entries until they are rebuilt in Astro
import legacy from '../data/legacy-sitemap.xml?raw';

interface Entry {
  loc: string;
  lastmod?: string;
  priority?: string;
}

const day = (d: Date) => d.toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const phones = await getCollection('phones');

  const astroPages: Entry[] = [
    { loc: `${SITE.url}/`, lastmod: day(new Date()), priority: '1.0' },
    ...phones.map((p) => ({ loc: `${SITE.url}/phones/${p.id}/`, lastmod: day(p.data.lastVerified), priority: '0.8' })),
  ];
  const astroLocs = new Set(astroPages.map((e) => e.loc));

  const legacyPages = [...legacy.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map(([, block]) => ({
      loc: block.match(/<loc>(.*?)<\/loc>/)?.[1] ?? '',
      lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
      priority: block.match(/<priority>(.*?)<\/priority>/)?.[1],
    }))
    .filter((e) => e.loc && !astroLocs.has(e.loc));

  const urls = [...astroPages, ...legacyPages]
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n` +
        (e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : '') +
        (e.priority ? `    <priority>${e.priority}</priority>\n` : '') +
        `  </url>`,
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
