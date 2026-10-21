/*
 * The specification rows of a head-to-head, merged across both phones: the phone pages' rows plus an Ex rating summary
 * and the safe-use rules. Shared by the head-to-head pages and the teaser on the /compare/ hub, so both show the same
 * values under the same labels. Rows that neither phone has a value for are dropped.
 */
import { TEMP_CLASS_MAX, zoneLabel, type Phone } from './phones';
import { safetyRows, specGroups, caseWord, type SpecGroup, type SpecRow } from './spec-groups';

export const NOT_IN_DATA = 'Not in our data';

export interface CompareRow {
  label: string;
  /** One cell per phone, in the order the phones were given; undefined where that phone has no such row */
  cells: (SpecRow | undefined)[];
}

const row = (label: string, value: string | undefined, ...keys: string[]): SpecRow => ({ label, value, keys });

/** "i.safe MOBILE IS540.M1: rated for Group I as well as Zone 1/21". Variant names get the brand, as phone names have */
const miningVersion = (p: Phone) => {
  const v = p.data.variants.find((x) => /mining/i.test(x.description));
  if (!v) return undefined;
  const maker = p.data.brand.replace(/\s*\(.*\)$/, '');
  const name = v.name.startsWith(maker) ? v.name : `${maker} ${v.name}`;
  return `${name}: ${v.description.replace(/^Mining version,\s*/i, '').split(/\.\s/)[0].replace(/\.$/, '')}`;
};

function groupsFor(p: Phone): SpecGroup[] {
  const c = p.data.certification;
  const [certification, ...rest] = specGroups(p);
  return [
    {
      title: 'Ex rating',
      rows: [
        row('Certified for', zoneLabel(p)),
        row('Protection', c.protection ?? c.note),
        row('Gas group', c.gasGroup),
        row('Temperature class', c.tempClass && `${c.tempClass} (≤ ${TEMP_CLASS_MAX[c.tempClass]} °C)`),
        row('Mining version', miningVersion(p)),
      ],
    },
    certification,
    { title: 'Safe use', rows: [...safetyRows(p), row('Conditions of use', p.data.safety.conditions, 'safety.conditions')] },
    ...rest,
  ];
}

/** Merges two ordered lists, keeping each list's order: items only in the second list follow their predecessor there */
function mergeOrder(lists: string[][]): string[] {
  const out: string[] = [];
  for (const list of lists) {
    let prev = -1;
    for (const item of list) {
      let i = out.indexOf(item);
      if (i < 0) out.splice((i = prev + 1), 0, item);
      prev = i;
    }
  }
  return out;
}

/** The merged specification groups for two phones, in page order */
export function compareRows(phones: Phone[]): { title: string; rows: CompareRow[] }[] {
  // A case and a housing list the same through-case rows, so both phones share one group title
  const words = [...new Set(phones.map(caseWord))];
  const throughTitle = `What works through the ${words.join(' or ')}`;
  const groups = phones.map((p) => groupsFor(p).map((g) => (g.title.startsWith('What works through the') ? { ...g, title: throughTitle } : g)));
  return mergeOrder(groups.map((gs) => gs.map((g) => g.title))).map((title) => {
    const sides = groups.map((gs) => gs.find((g) => g.title === title)?.rows ?? []);
    const labels = mergeOrder(sides.map((rows) => rows.map((r) => r.label)));
    return {
      title,
      rows: labels
        .map((label) => ({ label, cells: sides.map((rows) => rows.find((r) => r.label === label)) }))
        .filter((r) => r.cells.some((c) => c?.value)),
    };
  });
}
