import type { CollectionEntry } from 'astro:content';

export type Phone = CollectionEntry<'phones'>;

export const TYPE_LABEL: Record<Phone['data']['type'], string> = {
  dedicated: 'Dedicated Ex phone',
  'ex-case': 'Certified Ex case',
  conversion: 'Device conversion',
};

export const TYPE_EXPLAINER: Record<Phone['data']['type'], string> = {
  dedicated: 'A phone designed and certified from the ground up for hazardous areas.',
  'ex-case': 'A certified enclosure that makes a standard consumer phone safe for hazardous areas.',
  conversion: 'A standard phone that is permanently modified and sealed by a specialist.',
};

/** Maximum surface temperature for each temperature class */
export const TEMP_CLASS_MAX: Record<string, number> = { T1: 450, T2: 300, T3: 200, T4: 135, T5: 100, T6: 85 };

export const ZONES = {
  gas: [
    { id: '0', label: 'Zone 0', hint: 'Explosive gas present continuously or for long periods' },
    { id: '1', label: 'Zone 1', hint: 'Explosive gas likely in normal operation' },
    { id: '2', label: 'Zone 2', hint: 'Explosive gas unlikely, and only briefly' },
  ],
  dust: [
    { id: '20', label: 'Zone 20', hint: 'Combustible dust present continuously or for long periods' },
    { id: '21', label: 'Zone 21', hint: 'Combustible dust likely in normal operation' },
    { id: '22', label: 'Zone 22', hint: 'Combustible dust unlikely, and only briefly' },
  ],
} as const;

/** Highest-risk gas zone a phone is certified for, as a short label: "Zone 0", "Zone 1" */
export function topZone(p: Phone): string {
  const z = [...p.data.certification.zonesGas].sort()[0];
  return z ? `Zone ${z}` : '—';
}

/** Conventional short label: "Zone 1/21", "Zone 0/1/21". Zone 2/22 are implied by the higher rating. */
export function zoneLabel(p: Phone): string {
  const c = p.data.certification;
  const gas = [...c.zonesGas].sort();
  const g = gas.length > 1 ? gas.filter((z) => z !== '2') : gas;
  const d = [...c.zonesDust].sort().slice(0, 1);
  return `Zone ${[...g, ...d].join('/')}`;
}

/* ---------- Ex marking decoder ---------- */

export interface MarkingPart {
  token: string;
  label: string;
  meaning: string;
}

const PROTECTION: Record<string, string> = {
  ia: 'Intrinsic safety, level "ia": stays safe with two faults. The highest level, required for Zone 0.',
  ib: 'Intrinsic safety, level "ib": stays safe with one fault. Suitable for Zone 1 and 2.',
  ic: 'Intrinsic safety, level "ic": safe in normal operation. Zone 2 only.',
  db: 'Flameproof enclosure: any ignition inside is contained and cannot reach the atmosphere outside.',
  tb: 'Protection by enclosure for dust: the enclosure keeps dust out and its surface stays below the stated temperature.',
};

const GROUP: Record<string, string> = {
  IIA: 'Gas group IIA, e.g. propane. The least demanding group.',
  IIB: 'Gas group IIB, e.g. ethylene. Also covers IIA.',
  IIC: 'Gas group IIC, e.g. hydrogen and acetylene. The most demanding group; also covers IIA and IIB.',
  IIIA: 'Dust group IIIA: combustible flyings.',
  IIIB: 'Dust group IIIB: non-conductive dust. Also covers IIIA.',
  IIIC: 'Dust group IIIC: conductive dust. The most demanding group; also covers IIIA and IIIB.',
};

const EPL: Record<string, string> = {
  Ga: 'Equipment protection level Ga (very high): suitable for Zone 0, 1 and 2.',
  Gb: 'Equipment protection level Gb (high): suitable for Zone 1 and 2.',
  Gc: 'Equipment protection level Gc (enhanced): suitable for Zone 2.',
  Da: 'Equipment protection level Da (very high): suitable for Zone 20, 21 and 22.',
  Db: 'Equipment protection level Db (high): suitable for Zone 21 and 22.',
  Dc: 'Equipment protection level Dc (enhanced): suitable for Zone 22.',
};

/** Splits a marking such as "II 2G Ex db IIC T6 Gb" into explained parts. Unknown tokens are kept as-is. */
export function decodeMarking(marking: string): MarkingPart[] {
  return marking
    .trim()
    .split(/\s+/)
    .map((token): MarkingPart => {
      if (token === 'II') return { token, label: 'Equipment group', meaning: 'Group II: equipment for surface industries (not mining).' };
      if (/^[123][GD]$/.test(token)) {
        const cat = token[0];
        const medium = token[1] === 'G' ? 'gas' : 'dust';
        const zone = medium === 'gas' ? { '1': 'Zone 0', '2': 'Zone 1', '3': 'Zone 2' }[cat] : { '1': 'Zone 20', '2': 'Zone 21', '3': 'Zone 22' }[cat];
        return { token, label: 'ATEX category', meaning: `Category ${cat} for ${medium}: suitable down to ${zone}.` };
      }
      if (token === 'Ex') return { token, label: 'Explosion protected', meaning: 'Certified to the IEC 60079 / EN 60079 series.' };
      if (PROTECTION[token]) return { token, label: 'Protection type', meaning: PROTECTION[token] };
      if (GROUP[token]) return { token, label: token.startsWith('III') ? 'Dust group' : 'Gas group', meaning: GROUP[token] };
      if (/^T[1-6]$/.test(token))
        return { token, label: 'Temperature class', meaning: `Surface stays below ${TEMP_CLASS_MAX[token]} °C. T6 is the strictest class.` };
      if (/^T\d+°C$/.test(token)) return { token, label: 'Max surface temperature', meaning: `Surface stays below ${token.slice(1)} in dust.` };
      if (EPL[token]) return { token, label: 'Protection level', meaning: EPL[token] };
      return { token, label: '', meaning: '' };
    });
}

/* ---------- Comparison ---------- */

export interface CompareRow {
  label: string;
  value: (p: Phone) => string;
  /** Higher is better; used to highlight the best value in a row */
  rank?: (p: Phone) => number | undefined;
}

const yesNo = (v: boolean | undefined) => (v === undefined ? '—' : v ? 'Yes' : 'No');

export const COMPARE_ROWS: CompareRow[] = [
  { label: 'Type', value: (p) => TYPE_LABEL[p.data.type] },
  {
    label: 'Gas zones',
    value: (p) => p.data.certification.zonesGas.map((z) => `Zone ${z}`).join(', ') || '—',
    rank: (p) => (p.data.certification.zonesGas.includes('0') ? 1 : 0),
  },
  { label: 'Dust zones', value: (p) => p.data.certification.zonesDust.map((z) => `Zone ${z}`).join(', ') || '—' },
  { label: 'Protection', value: (p) => p.data.certification.protection ?? '—' },
  { label: 'Gas group', value: (p) => p.data.certification.gasGroup ?? '—' },
  {
    label: 'Temperature class',
    value: (p) => p.data.certification.tempClass ?? '—',
    rank: (p) => (p.data.certification.tempClass ? Number(p.data.certification.tempClass.slice(1)) : undefined),
  },
  {
    label: 'Certification',
    value: (p) => {
      const c = p.data.certification;
      const s = [c.atex && 'ATEX', c.iecex && 'IECEx', ...c.otherSchemes].filter(Boolean);
      return s.length ? s.join(' + ') : (c.note ?? '—');
    },
  },
  { label: 'Operating system', value: (p) => p.data.os.version },
  {
    label: 'Weight',
    value: (p) => (p.data.specs.weightG ? `${p.data.specs.weightG} g` : '—'),
    rank: (p) => (p.data.specs.weightG ? -p.data.specs.weightG : undefined),
  },
  { label: 'Display', value: (p) => p.data.specs.display ?? '—' },
  { label: '5G', value: (p) => (p.data.specs.connectivity?.includes('5G') ? 'Yes' : '—') },
  { label: 'Push-to-talk key', value: (p) => yesNo(p.data.specs.pttKey) },
  { label: 'Price', value: () => 'On request' },
];

/** For each row, the indexes of the phones with the best value (only when values differ) */
export function bestInRow(row: CompareRow, phones: Phone[]): Set<number> {
  if (!row.rank) return new Set();
  const scores = phones.map(row.rank);
  const known = scores.filter((s): s is number => s !== undefined);
  if (known.length < 2 || new Set(known).size < 2) return new Set();
  const max = Math.max(...known);
  return new Set(scores.flatMap((s, i) => (s === max ? [i] : [])));
}

/* ---------- Find phones: facts used by the filters, cards and compare tray ---------- */

export const GROUP_RANK: Record<string, number> = { IIA: 1, IIB: 2, IIC: 3 };

/*
 * Field-worker features. A phone has a feature when its specs show it (derive) or when its data file
 * lists it in "features". Only verified facts count: no entry means "not verified", not "no".
 */
export const FEATURE_GROUPS = [
  {
    title: 'Connectivity',
    features: [
      { key: '5g', label: '5G', derive: (p: Phone) => !!p.data.specs.connectivity?.includes('5G') },
      { key: 'wifi6', label: 'Wi-Fi 6 or newer', derive: (p: Phone) => !!p.data.specs.connectivity?.some((c) => /Wi-Fi [67]/.test(c)) },
      { key: 'esim', label: 'eSIM', derive: (p: Phone) => !!p.data.specs.connectivity?.some((c) => c.includes('eSIM')) },
      { key: 'dual-sim', label: 'Dual SIM' },
      { key: 'nfc', label: 'NFC' },
      { key: 'satellite', label: 'Satellite messaging / SOS' },
    ],
  },
  {
    title: 'Camera and sensors',
    features: [
      { key: 'camera-48mp', label: '48 MP camera or better', derive: (p: Phone) => /\b(4[89]|[5-9]\d|\d{3}) MP/.test(p.data.specs.camera ?? '') },
      { key: 'lidar', label: 'LiDAR scanner' },
      { key: 'thermal', label: 'Thermal camera' },
      { key: 'barcode', label: 'Barcode scanner' },
    ],
  },
  {
    title: 'Controls and handling',
    features: [
      { key: 'ptt', label: 'Push-to-talk key', derive: (p: Phone) => !!p.data.specs.pttKey },
      { key: 'programmable-key', label: 'Programmable key' },
      { key: 'glove', label: 'Glove touch', derive: (p: Phone) => !!p.data.specs.gloveTouch },
      { key: 'tripod-mount', label: 'Tripod mount' },
      { key: 'lanyard', label: 'Lanyard point' },
    ],
  },
  {
    title: 'Durability and power',
    features: [
      { key: 'ip68', label: 'IP68', derive: (p: Phone) => !!p.data.specs.ipRating?.startsWith('IP68') },
      { key: 'mil-std', label: 'MIL-STD-810 tested', derive: (p: Phone) => !!p.data.specs.ruggedness?.includes('MIL-STD-810') },
      { key: 'replaceable-battery', label: 'Replaceable battery', derive: (p: Phone) => !!p.data.specs.replaceableBattery },
      { key: 'wireless-charging', label: 'Wireless charging', derive: (p: Phone) => /wireless/i.test(p.data.specs.charging ?? '') },
    ],
  },
  {
    title: 'Fleet management',
    features: [
      { key: 'mdm', label: 'Works with Intune or Jamf', derive: (p: Phone) => !!p.data.specs.mdm?.some((m) => /Intune|Jamf/.test(m)) },
      { key: 'updates-2030', label: 'Security updates to 2030+' },
    ],
  },
] as const satisfies readonly { title: string; features: readonly { key: string; label: string; derive?: (p: Phone) => boolean }[] }[];

export type Feature = (typeof FEATURE_GROUPS)[number]['features'][number]['key'];
export const FEATURE_KEYS = FEATURE_GROUPS.flatMap((g) => g.features.map((f) => f.key)) as Feature[];
export const FEATURE_LABEL = Object.fromEntries(
  FEATURE_GROUPS.flatMap((g) => g.features.map((f) => [f.key, f.label])),
) as Record<Feature, string>;

export function phoneFeatures(p: Phone): Feature[] {
  const listed = new Set<string>(p.data.features);
  return FEATURE_GROUPS.flatMap((g) =>
    g.features.filter((f) => listed.has(f.key) || ('derive' in f && f.derive(p))).map((f) => f.key),
  );
}

export interface PhoneFacts {
  id: string;
  name: string;
  brand: string;
  href: string;
  thumb?: string;
  sponsor: boolean;
  zonesGas: string[];
  zonesDust: string[];
  zoneLabel: string;
  /** 1 or 2 when a North American Division rating is listed */
  division?: number;
  gasGroup?: string;
  tempClass?: string;
  schemes: ('atex' | 'iecex')[];
  os: 'iOS' | 'Android';
  type: Phone['data']['type'];
  protection?: 'intrinsic' | 'flameproof';
  weightG?: number;
  features: Feature[];
  /** Values and ranks for each row of COMPARE_ROWS, in order */
  compare: { values: string[]; ranks: (number | null)[] };
}

export function phoneFacts(p: Phone, thumb?: string): PhoneFacts {
  const c = p.data.certification;
  const s = p.data.specs;
  const features = phoneFeatures(p);

  return {
    id: p.id,
    name: p.data.name,
    brand: p.data.brand,
    href: `/phones/${p.id}/`,
    thumb,
    sponsor: p.data.sponsor,
    zonesGas: [...c.zonesGas],
    zonesDust: [...c.zonesDust],
    zoneLabel: zoneLabel(p),
    division: c.division ? Number(c.division.match(/Division (\d)/)?.[1]) || undefined : undefined,
    gasGroup: c.gasGroup,
    tempClass: c.tempClass,
    schemes: [...(c.atex ? (['atex'] as const) : []), ...(c.iecex ? (['iecex'] as const) : [])],
    os: p.data.os.name,
    type: p.data.type,
    protection: c.protection?.startsWith('Intrinsic') ? 'intrinsic' : c.protection?.startsWith('Flameproof') ? 'flameproof' : undefined,
    weightG: s.weightG,
    features,
    compare: {
      values: COMPARE_ROWS.map((r) => r.value(p)),
      ranks: COMPARE_ROWS.map((r) => r.rank?.(p) ?? null),
    },
  };
}

/** Default "Highest protection" order: Zone 0 first, then stricter temperature class, more schemes, lighter */
export function protectionScore(f: PhoneFacts): number {
  const minZone = Math.min(...f.zonesGas.map(Number));
  return (3 - minZone) * 1000 + (f.tempClass ? Number(f.tempClass.slice(1)) : 0) * 100 + f.schemes.length * 10;
}
