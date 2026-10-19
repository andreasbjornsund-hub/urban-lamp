/*
 * Content for the head-to-head pages at /compare/{a}-vs-{b}/, rendered by src/pages/compare/[pair].astro. Each page is
 * one file in src/data/compare/ named after its slug (the two phone slugs in alphabetical order, joined by "-vs-").
 * Only pairs with a file get a page: the compare tray covers every other combination without adding indexed pages.
 * Every value in a table, card or badge comes from the phone data (the master workbook); the text in those files is
 * the editorial layer: which teams and workflows suit each phone. When the workbook changes, re-read the wording.
 */

export interface CompareChoice {
  /** Phone slug */
  id: string;
  /** Reasons to choose this phone, each one sentence that names the work or site it suits */
  reasons: string[];
}

export interface CompareDifference {
  /**
   * Label of a row in the specification table (from src/lib/spec-groups.ts, or the "Ex rating" rows the template
   * adds), e.g. "Ambient temperature (Ta)". The values come from the phone data; the build fails on an unknown label.
   */
  row: string;
  /** Optional heading for the card when the row label is too technical, e.g. "Maximum ambient temperature" */
  title?: string;
  /** Why the difference matters for a team or site, one or two sentences */
  note: string;
}

export interface CompareSection {
  title: string;
  /** Phone slug that comes out ahead on this topic, or "even" */
  edge: string;
  text: string[];
}

export interface ComparePage {
  /**
   * The two phone slugs, in the order the page names them (the URL sorts them). Labels always use each phone's full
   * name, brand included ("ecom Smart-Ex 03 DZ1"), and so does the copy: never the model alone
   */
  phones: [string, string];
  /** Page title, at most 60 characters */
  title: string;
  /** Meta description, at most 160 characters */
  description: string;
  h1: string;
  eyebrow: string;
  lead: string;
  verdict: {
    /** One or two short paragraphs: the overall call and why */
    summary: string[];
    choose: [CompareChoice, CompareChoice];
  };
  /**
   * Only the few differences that decide the choice, most important first. Niche points (e.g. a UKEX certificate)
   * go at the end of a "choose" list instead
   */
  differences: CompareDifference[];
  /** Head-to-head on each kind of work */
  sections: CompareSection[];
  faq: { q: string; a: string }[];
  /**
   * Call-to-action panel. "xshielder" is the sponsor panel (only on pages that include an Xshielder product);
   * "neutral" offers impartial advice and Find phones.
   */
  cta:
    | { kind: 'xshielder'; heading: string; text: string; link?: { label: string; href: string } }
    | { kind: 'neutral'; heading: string; text: string };
}

/** URL slug for a pair, whichever order the phones are given in */
export const compareSlug = (a: string, b: string) => [a, b].sort().join('-vs-');

const modules = import.meta.glob<{ default: ComparePage }>('./compare/*.ts', { eager: true });

export const COMPARE_PAGES: (ComparePage & { slug: string })[] = Object.entries(modules)
  .map(([path, m]) => {
    const page = m.default;
    const slug = compareSlug(...page.phones);
    if (!path.endsWith(`/${slug}.ts`)) throw new Error(`${path}: a page comparing ${page.phones.join(' and ')} must be called ${slug}.ts`);
    return { ...page, slug };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

/** The head-to-head page for two phones, if there is one */
export const comparePage = (a: string, b: string) => COMPARE_PAGES.find((p) => p.slug === compareSlug(a, b));

/** Every head-to-head page that includes a phone */
export const comparePagesFor = (id: string) => COMPARE_PAGES.filter((p) => p.phones.includes(id));
