/*
 * Content for the /guides/{slug}/ pages, rendered by src/pages/guides/[slug].astro and listed on /guides/. Each guide is
 * one file in src/data/guides/ (the filename is the slug), collected below; add a file to add a page (it joins the
 * sitemap, the Guides menu and the index automatically).
 * The copy is written outside the repo (HubSpot-style HTML in ../guides/) and pasted in word for word. The template
 * does the rest: outbound links get the HAG link policy (src/lib/links.ts), tables get a scroll wrapper, internal links
 * to /phones/, /best/, /compare/ and /guides/ are checked at build time, and FAQ answers feed the FAQPage JSON-LD.
 */

export interface GuidePage {
  slug: string;
  /** Page title, at most 60 characters */
  title: string;
  /** Meta description, at most 160 characters */
  description: string;
  h1: string;
  /** Short label for the Guides menu and the index card */
  navLabel: string;
  /** Opening paragraph, shown under the h1 (plain text) */
  lead: string;
  /** ISO dates for the Article JSON-LD and the "Updated" line */
  datePublished: string;
  dateModified: string;
  /**
   * Article body as HTML, from the first h2 to the end of the last section before the call to action. Allowed tags:
   * h2, h3, p, a, strong, em, ul/ol/li, table. Write `<!-- CALCULATOR -->` where the cost calculator goes.
   */
  body: string;
  /** Closing call to action, rendered in the forest CTA band (heading and one paragraph of HTML) */
  cta: { kind: 'xshielder' | 'neutral'; heading: string; html: string };
  /**
   * FAQ pairs for the FAQPage JSON-LD (plain text) and the accordion at the foot of the page. Set `faqInBody` when the
   * body already shows every question as an h3 with its answer (the FAQ page), so the accordion isn't repeated.
   */
  faq: { q: string; a: string }[];
  faqInBody?: boolean;
}

const modules = import.meta.glob<{ default: GuidePage }>('./guides/*.ts', { eager: true });

export const GUIDE_PAGES: GuidePage[] = Object.entries(modules)
  .map(([path, m]) => {
    const page = m.default;
    if (!path.endsWith(`/${page.slug}.ts`)) throw new Error(`${path}: slug "${page.slug}" must match the filename`);
    if (page.title.length > 60) throw new Error(`/guides/${page.slug}/: title is ${page.title.length} characters (max 60)`);
    if (page.description.length > 160) throw new Error(`/guides/${page.slug}/: description is ${page.description.length} characters (max 160)`);
    return page;
  })
  // The FAQ page last, then newest first, then alphabetical
  .sort(
    (a, b) =>
      Number(!!a.faqInBody) - Number(!!b.faqInBody) ||
      b.datePublished.localeCompare(a.datePublished) ||
      a.slug.localeCompare(b.slug),
  );

export const guidePage = (slug: string) => GUIDE_PAGES.find((p) => p.slug === slug);
