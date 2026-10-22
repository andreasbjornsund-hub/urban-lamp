import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { COMPARE_PAGES } from '../data/compare-pages';
import { compareTeaser } from '../lib/compare-teaser';
import type { Phone } from '../lib/phones';

/* Teasers for the /compare/ hub's picker, fetched once a visitor starts choosing phones */
export const GET: APIRoute = async () => {
  const all = await getCollection('phones');
  const byId = new Map(all.map((p) => [p.id, p]));
  const teasers = COMPARE_PAGES.map((page) => {
    const phones = page.phones.map((id) => {
      const p = byId.get(id);
      if (!p) throw new Error(`/compare/${page.slug}/: no phone called "${id}"`);
      return p;
    }) as [Phone, Phone];
    return compareTeaser(page, phones);
  });
  return new Response(JSON.stringify(Object.fromEntries(teasers.map((t) => [t.slug, t]))), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
