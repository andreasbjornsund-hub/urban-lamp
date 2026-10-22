/*
 * The labelled rows behind a phone's "Safe use" and "Full specifications" sections, shared by the phone pages and
 * the head-to-head comparisons so both list the same facts under the same labels. Each row carries the data keys
 * whose "unconfirmed" note applies to it; the page decides how to number and show those notes.
 */
import { TYPE_LABEL, FORM_LABEL, securityUpdates, type Phone } from './phones';

export interface SpecRow {
  label: string;
  value?: string;
  /** Keys into the phone's "unconfirmed" notes; the first one with a note applies */
  keys: string[];
}

export interface SpecGroup {
  title: string;
  rows: SpecRow[];
}

const yn = (v: boolean | undefined) => (v === undefined ? undefined : v ? 'Yes' : 'No');
const row = (label: string, value: string | undefined, ...keys: string[]): SpecRow => ({ label, value, keys });

/** "case" for an Ex case, "housing" for a dedicated phone or conversion */
export const caseWord = (p: Phone) => (p.data.type === 'ex-case' ? 'case' : 'housing');

/** Rules for use in the hazardous area. The certificate's conditions of use are kept separate (safety.conditions) */
export function safetyRows(p: Phone): SpecRow[] {
  const { certification: c, safety, specs: s } = p.data;
  return [
    row('Ambient temperature (Ta)', c.ambient, 'certification.ambient'),
    row('Charging', safety.charging),
    row('Battery swap', safety.batterySwap),
    row('IP code in the Ex certificate', s.exIp, 'specs.exIp'),
    row('Operating temperature', s.operatingTemp, 'specs.operatingTemp'),
  ];
}

/** Every specification row in page order, including rows without a value (pages drop those) */
export function specGroups(p: Phone): SpecGroup[] {
  const { certification: c, specs: s, os } = p.data;
  const d = p.data;
  const specRows = (keys: (keyof typeof s)[], labels: Record<string, string>) =>
    keys.map((k) => row(labels[k], typeof s[k] === 'string' ? (s[k] as string) : undefined, `specs.${k}`));

  return [
    {
      title: 'Certification',
      rows: [
        row('ATEX marking', c.atex?.marking, 'certification.atex.marking'),
        row('ATEX certificate', c.atex?.number ?? c.atex?.scope),
        row('IECEx marking', c.iecex?.marking, 'certification.iecex.marking'),
        row('IECEx certificate', c.iecex ? [c.iecex.number, c.iecex.scope && `(${c.iecex.scope})`].filter(Boolean).join(' ') : undefined),
        row('UKEX certificate', c.ukex),
        row('Other approvals', c.otherSchemes.join('; ') || undefined, 'certification.otherSchemes'),
        row('North America', c.northAmerica, 'certification.northAmerica'),
        row('Protection level (EPL)', c.epl),
        row('Dust group', c.dustGroup),
        row('Max surface temperature (dust)', c.maxSurfaceTemp),
        row('Standards', c.standards.join(', ') || undefined),
      ],
    },
    {
      title: 'Device',
      rows: [
        row('Type', TYPE_LABEL[d.type]),
        row('Device type', FORM_LABEL[d.formFactor]),
        row('Phone inside', d.hostDevice),
        row('Launched', d.launchYear?.toString()),
        row('Part numbers', s.partNumbers),
        row('Operating system', os.version, 'os.version'),
        row('OS at launch', os.atLaunch),
        row('OS upgrades', os.upgradeLimit),
        row('Security updates', securityUpdates(os), 'os.securityUntil'),
        ...specRows(['chip', 'ram', 'storage'], { chip: 'Processor', ram: 'Memory (RAM)', storage: 'Storage' }),
      ],
    },
    ...(d.throughCase.length
      ? [{ title: `What works through the ${caseWord(p)}`, rows: d.throughCase.map((t) => row(t.label, t.value, `throughCase.${t.label}`)) }]
      : []),
    ...(d.capabilities.length
      ? [{ title: 'Field capabilities', rows: d.capabilities.map((t) => row(t.label, t.value, `capabilities.${t.label}`)) }]
      : []),
    {
      title: 'Display and camera',
      rows: specRows(['display', 'resolution', 'refreshRate', 'brightness', 'touch', 'camera', 'frontCamera', 'video', 'depthSensing'], {
        display: 'Display', resolution: 'Resolution', refreshRate: 'Refresh rate', brightness: 'Brightness', touch: 'Touch',
        camera: 'Rear camera', frontCamera: 'Front camera', video: 'Video', depthSensing: 'Depth sensing',
      }),
    },
    {
      title: 'Connectivity',
      rows: specRows(['network', 'bands', 'wifi', 'bluetooth', 'nfc', 'gnss', 'sim', 'uwb', 'satellite'], {
        network: 'Network', bands: 'Bands', wifi: 'Wi-Fi', bluetooth: 'Bluetooth', nfc: 'NFC', gnss: 'Satellite positioning',
        sim: 'SIM', uwb: 'Ultra Wideband', satellite: 'Satellite features',
      }),
    },
    {
      title: 'Physical and power',
      rows: [
        row('Weight', s.weightG ? `${s.weightG} g${s.weightNote ? ` (${s.weightNote.toLowerCase()})` : ''}` : undefined, 'specs.weightG'),
        row('Dimensions', s.dimensionsMm ? `${s.dimensionsMm} mm` : undefined, 'specs.dimensionsMm'),
        ...specRows(['ipRating', 'ruggedness', 'battery', 'batteryLife'], {
          ipRating: 'Ingress protection', ruggedness: 'Ruggedness', battery: 'Battery', batteryLife: 'Battery life',
        }),
        row('Replaceable battery', yn(s.replaceableBattery)),
        ...specRows(['port', 'wirelessCharging'], { port: 'Port', wirelessCharging: 'Wireless charging' }),
      ],
    },
    {
      title: 'Controls & Accessibility',
      rows: [
        ...specRows(['keys'], { keys: 'Keys' }),
        row('Push-to-talk key', yn(s.pttKey), ...(s.pttKey ? ['capabilities.Push-to-talk'] : [])),
        row('Glove touch', yn(s.gloveTouch)),
        ...specRows(['biometrics', 'accessories'], { biometrics: 'Biometrics', accessories: 'Accessory interface' }),
      ],
    },
    {
      title: 'Fleet and support',
      rows: [
        row('Device management', os.enterprise),
        row('Preinstalled apps', s.apps, 'specs.apps'),
        row('Manufacturer', `${d.manufacturer.name}, ${d.manufacturer.country}`),
      ],
    },
  ];
}
