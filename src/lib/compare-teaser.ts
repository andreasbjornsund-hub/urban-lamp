/*
 * The short version of a head-to-head shown in the /compare/ hub's picker: the verdict, the first few key differences
 * with their values, and the first reason to choose each phone. Built from the same page file and phone data as the
 * full page, so nothing is written twice. The hub renders the default pair and fetches the rest from
 * /compare-teasers.json.
 */
import type { ComparePage } from '../data/compare-pages';
import { compareRows, NOT_IN_DATA } from './compare-rows';
import type { Phone } from './phones';

/** How many key differences the teaser shows; the page lists them most important first */
export const TEASER_DIFFERENCES = 4;

export interface TeaserValue {
  value: string;
  known: boolean;
  /** The value carries an "unconfirmed" note on the full page */
  unconfirmed: boolean;
}

export interface Teaser {
  slug: string;
  href: string;
  title: string;
  /** The two phone slugs, in the page's (alphabetical) order; every list below follows it */
  phones: [string, string];
  summary: string;
  differences: { title: string; values: [TeaserValue, TeaserValue] }[];
  /** The first reason to choose each phone */
  reasons: [string, string];
}

export function compareTeaser(page: ComparePage & { slug: string }, phones: [Phone, Phone]): Teaser {
  const rows = compareRows(phones).flatMap((g) => g.rows);
  const differences = page.differences.slice(0, TEASER_DIFFERENCES).map((d) => {
    const found = rows.find((r) => r.label === d.row);
    if (!found) throw new Error(`/compare/${page.slug}/: no specification row called "${d.row}"`);
    const values = found.cells.map((c, i) =>
      c?.value
        ? { value: c.value, known: true, unconfirmed: c.keys.some((k) => phones[i].data.unconfirmed[k]) }
        : { value: NOT_IN_DATA, known: false, unconfirmed: false },
    ) as [TeaserValue, TeaserValue];
    return { title: d.title ?? d.row, values };
  });
  const reason = (id: string) => {
    const choice = page.verdict.choose.find((c) => c.id === id);
    if (!choice?.reasons[0]) throw new Error(`/compare/${page.slug}/: no reason to choose "${id}"`);
    return choice.reasons[0];
  };
  return {
    slug: page.slug,
    href: `/compare/${page.slug}/`,
    title: page.h1,
    phones: [phones[0].id, phones[1].id],
    summary: page.verdict.summary[0],
    differences,
    reasons: [reason(phones[0].id), reason(phones[1].id)],
  };
}
