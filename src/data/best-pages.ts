/*
 * Content for the /best/{slug}/ pages, rendered by src/pages/best/[slug].astro. Each page is one file in
 * src/data/best/ (the filename is the slug), collected below.
 * Every fact in a table, badge or marking comes from the phone data (the master workbook); the text in those files
 * is the editorial layer: what each phone achieves for the teams that use it and why it is ranked where it is.
 * When the workbook changes, re-read the wording against it.
 */
import type { Phone } from '../lib/phones';

export interface BestPick {
  /** Phone slug in src/content/phones */
  id: string;
  /** Short "best for" label shown on the rank badge, named after the work the phone suits */
  label: string;
  /** Opinion copy: what the phone achieves for a team, with the key figures and any trade-off that affects planning */
  why: string[];
}

/**
 * Table columns the template can fill from the phone data. Unknown values show as "Not verified", never "no".
 * protection, gasGroup, tempClass, certification, weight: as on the Zone 1 page
 * type: dedicated phone / Ex case / conversion · zones: "Zone 1/21" · dust: dust group and zones
 * division: confirmed North American Division · schemes: every scheme incl. Division and national ones (INMETRO…)
 * os, updates, ambient, camera, keys, network, wifi, ptt, barcode, loneWorker: from os / specs / capabilities
 * cameraFree: whether a camera-free version is offered
 */
export type BestColumn =
  | 'protection'
  | 'gasGroup'
  | 'tempClass'
  | 'certification'
  | 'weight'
  | 'type'
  | 'zones'
  | 'dust'
  | 'division'
  | 'schemes'
  | 'os'
  | 'updates'
  | 'ambient'
  | 'camera'
  | 'keys'
  | 'network'
  | 'wifi'
  | 'ptt'
  | 'barcode'
  | 'loneWorker'
  | 'cameraFree';

export interface BestPage {
  slug: string;
  /** Page title, at most 60 characters */
  title: string;
  /** Meta description, at most 160 characters */
  description: string;
  h1: string;
  eyebrow: string;
  lead: string;
  /** Section headings that name what the page covers */
  headings: {
    /** e.g. "Our picks for Zone 1" */
    ranking: string;
    /** e.g. "What a Zone 1 phone must show" */
    checklist: string;
    /** e.g. "Other Zone 1 phones on sale" */
    others: string;
    /** e.g. "Zone 1 phone questions" */
    faq: string;
  };
  /** Note under the "At a glance" table, e.g. what every pick is certified for */
  glanceNote: string;
  /** Columns after Rank, Phone and Best for. Default: protection, gasGroup, tempClass, certification, weight */
  glanceColumns?: BestColumn[];
  /** When set, an ⓘ tooltip with this text sits next to every "best for" label (e.g. when labels are estimates) */
  labelNote?: string;
  /** Short paragraphs under "How we ranked" */
  method: string[];
  picks: BestPick[];
  /** Which phones belong on this page. The template adds "current" and lists those not picked under headings.others */
  pool: (p: Phone) => boolean;
  others: {
    /** Button label, e.g. "Filter all Zone 1 phones" */
    filterLabel: string;
    /** Find phones URL with the matching filters, e.g. "/phones/?zone=1" */
    filterHref: string;
    /** Accessible name of the table, e.g. "Other current phones certified for Zone 1" */
    tableLabel: string;
    /** Note under the table */
    note: string;
    /** Default: alphabetical by brand, then name (no brand favoured) */
    sort?: 'name' | 'weight';
    /** Columns after Phone. Default: type, zones, gasGroup, tempClass, certification, os, weight */
    columns?: BestColumn[];
  };
  /** "Before you buy" section */
  checklist: { lead: string; items: { title: string; text: string }[] };
  faq: { q: string; a: string }[];
  /**
   * Call-to-action panel. "xshielder" is the sponsor panel (only on pages where an Xshielder product is picked);
   * "neutral" offers impartial advice and Find phones.
   */
  cta:
    | { kind: 'xshielder'; heading: string; text: string; link?: { label: string; href: string } }
    | { kind: 'neutral'; heading: string; text: string };
}

const modules = import.meta.glob<{ default: BestPage }>('./best/*.ts', { eager: true });

export const BEST_PAGES: BestPage[] = Object.entries(modules)
  .map(([path, m]) => {
    const page = m.default;
    if (!path.endsWith(`/${page.slug}.ts`)) throw new Error(`${path}: slug "${page.slug}" must match the filename`);
    return page;
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

export const bestPage = (slug: string) => BEST_PAGES.find((p) => p.slug === slug);
