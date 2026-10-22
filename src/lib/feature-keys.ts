/*
 * Every feature key a phone can list in "features". Kept free of content types so the content schema can import
 * it without a circular reference (which would turn every phone into `any`). Labels, groups and derive rules are
 * in FEATURE_GROUPS and EX_FEATURES (src/lib/phones.ts), which must use exactly these keys.
 */
export const FEATURE_KEYS = [
  '5g',
  'wifi6',
  'esim',
  'dual-sim',
  'nfc',
  'satellite',
  'camera-48mp',
  'camera-free',
  'lidar',
  'thermal',
  'barcode',
  'ptt',
  'sos-key',
  'programmable-key',
  'glove',
  'tripod-mount',
  'lanyard',
  'ip68',
  'mil-std',
  'replaceable-battery',
  'wireless-charging',
  'charge-in-zone',
  'mdm',
  'updates-2030',
  'mining-version',
] as const;

export type Feature = (typeof FEATURE_KEYS)[number];
