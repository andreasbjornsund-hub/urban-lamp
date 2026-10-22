import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';
import { BEST_PAGES } from '../data/best-pages';
import { COMPARE_PAGES } from '../data/compare-pages';
import { GUIDE_PAGES } from '../data/guide-pages';
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

  // lastmod is the date the content last changed, never the build date, or search engines learn to ignore it
  const verifiedOf = (ids: string[]) =>
    day(new Date(Math.max(...phones.filter((p) => ids.includes(p.id)).map((p) => p.data.lastVerified.getTime()))));
  const latest = (dates: (string | undefined)[]) => dates.filter(Boolean).sort().at(-1);

  const phonePages = phones.map((p) => ({ loc: `${SITE.url}/phones/${p.id}/`, lastmod: day(p.data.lastVerified), priority: '0.8' }));
  const comparePages = COMPARE_PAGES.map((c) => ({ loc: `${SITE.url}/compare/${c.slug}/`, lastmod: verifiedOf(c.phones), priority: '0.8' }));
  // Same date as the page's own "verified" line: the newest check among its picks
  const bestPages = BEST_PAGES.map((b) => ({ loc: `${SITE.url}/best/${b.slug}/`, lastmod: verifiedOf(b.picks.map((p) => p.id)), priority: '0.9' }));
  const guidePages = GUIDE_PAGES.map((g) => ({ loc: `${SITE.url}/guides/${g.slug}/`, lastmod: g.dateModified, priority: '0.8' }));
  const phonesLastmod = latest(phonePages.map((e) => e.lastmod));

  const astroPages: Entry[] = [
    // The home page summarises the phones, Best for pages and guides
    { loc: `${SITE.url}/`, lastmod: latest([phonesLastmod, ...guidePages.map((e) => e.lastmod)]), priority: '1.0' },
    { loc: `${SITE.url}/phones/`, lastmod: phonesLastmod, priority: '0.9' },
    // Info pages have no content date to go on, so they carry no lastmod
    { loc: `${SITE.url}/disclosure/`, priority: '0.3' },
    ...['about', 'how-we-rate', 'contact', 'terms', 'cookies'].map((slug) => ({
      loc: `${SITE.url}/${slug}/`,
      priority: slug === 'contact' ? '0.5' : '0.3',
    })),
    ...bestPages,
    ...phonePages,
    // The /compare/ index changes whenever one of its head-to-heads does
    { loc: `${SITE.url}/compare/`, lastmod: latest(comparePages.map((c) => c.lastmod)), priority: '0.8' },
    ...comparePages,
    ...guidePages,
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
