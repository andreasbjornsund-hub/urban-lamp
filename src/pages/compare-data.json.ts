import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getImage } from 'astro:assets';
import { COMPARE_ROWS, phoneFacts } from '../lib/phones';

/* Data for the site-wide compare tray, fetched only when the tray is used */
export const GET: APIRoute = async () => {
  const phones = await getCollection('phones');
  const facts = await Promise.all(
    phones.map(async (p) => {
      const thumb = p.data.image
        ? (await getImage({ src: p.data.image, width: 120, height: 120, fit: 'contain', format: 'webp' })).src
        : undefined;
      const f = phoneFacts(p, thumb);
      return { id: f.id, name: f.name, brand: f.brand, href: f.href, thumb: f.thumb, compare: f.compare };
    }),
  );
  return new Response(JSON.stringify({ rows: COMPARE_ROWS.map((r) => r.label), phones: facts }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
