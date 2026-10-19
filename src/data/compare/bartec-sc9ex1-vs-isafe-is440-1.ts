import type { ComparePage } from '../compare-pages';

const page: ComparePage = {
  phones: ['bartec-sc9ex1', 'isafe-is440-1'],
  title: 'BARTEC SC9EX1 Smartscanner vs i.safe MOBILE IS440.1 Compared',
  description:
    'BARTEC SC9EX1 Smartscanner or i.safe MOBILE IS440.1? A built-in scanner with Zone 0, or a push-to-talk handheld: two different jobs, compared for Zone 1.',
  h1: 'BARTEC SC9EX1 Smartscanner vs i.safe MOBILE IS440.1',
  eyebrow: 'Compare · Scanning or push-to-talk phones for Zone 1',
  lead:
    'These two intrinsically safe phones do different jobs, so ask first what your crews carry them for. The BARTEC SC9EX1 Smartscanner is an Android 15 smartphone with a Zebra scan engine built in, certified for Zone 0/1/21 (Ex ia op is) and weighing 370 g. The i.safe MOBILE IS440.1 is a radio-style handheld built around push-to-talk, with a dedicated key and a channel selector, at 307 g; barcode scanning is listed as not available. Both hold a Class I Division 1 approval for North America and have a battery you swap outside the hazardous area. Here is how they compare, and which we would choose for which team.',
  verdict: {
    summary: [
      'These phones do different jobs, so pick by what the crew has to do first. If your crews scan barcodes, or any of your areas are Zone 0, we would choose the BARTEC SC9EX1 Smartscanner: the scan engine is built in and it is certified for Zone 0/1/21. If the job is voice, with a dedicated push-to-talk key, a channel selector and a lighter body, and your sites stop at Zone 1/21, we would choose the i.safe MOBILE IS440.1. A crew that needs scanning as well as push-to-talk should look at the BARTEC SC9EX1 Smartscanner, which has a programmable push-to-talk key and works with an app.',
    ],
    choose: [
      {
        id: 'bartec-sc9ex1',
        reasons: [
          'Your crews scan all day: it has a Zebra scan engine built in, while barcode scanning is listed as not available on the i.safe MOBILE IS440.1.',
          'Your work reaches Zone 0: it is certified for Zone 0/1/21 (Ex ia op is, Ga) and its North American listing includes Zone 0 AEx, while the i.safe MOBILE IS440.1 is not certified for Zone 0.',
          'Your crews read, type and check records as well as scan: it has a 6.1-inch AMOLED display at 1080 × 2340 with glove and stylus touch, Android 15, 8 GB of RAM and 128 GB of storage, against 2.4 inches at 240 × 320 with 4 GB and 64 GB.',
          'Photos and video are part of the job: it has a 48 MP autofocus rear camera and records 4K video, while our data has no rear camera or video figures for the i.safe MOBILE IS440.1.',
          'You want a path to newer software: BARTEC lists an upgrade to Android 16, with further upgrades subject to Qualcomm.',
        ],
      },
      {
        id: 'isafe-is440-1',
        reasons: [
          'Voice is the job: it has a dedicated push-to-talk key with PoC apps, a channel selector and M1 and M2 keys, so the main actions sit on keys rather than on a screen.',
          'Your crews carry the device all shift and do not scan: at 307 g it weighs 63 g less than the BARTEC SC9EX1 Smartscanner at 370 g.',
          'You plan the fleet around long support: i.safe MOBILE states security patches until Q4 2032, against BARTEC’s statement of at least May 2030.',
          'You want a bodycam: its 8 MP autofocus front camera is usable as one.',
          'Some of your crews work underground: the i.safe MOBILE IS440.M1 mining version keeps the Zone 1/21 rating, and our data does not list a mining version for the BARTEC SC9EX1 Smartscanner.',
        ],
      },
    ],
  },
  differences: [
    {
      row: 'Barcode scanning',
      note: 'This is the biggest split between them. The BARTEC SC9EX1 Smartscanner has a Zebra scan engine built in. On the i.safe MOBILE IS440.1, barcode scanning is listed as not available, so scanning crews should look at the BARTEC SC9EX1 Smartscanner.',
    },
    {
      row: 'Certified for',
      title: 'Hazardous zones covered',
      note: 'This decides where a phone may be used at all. The BARTEC SC9EX1 Smartscanner is certified for Zone 0 as well as Zone 1/21 (Ex ia op is, Ga), and its North American listing includes Zone 0 AEx; the i.safe MOBILE IS440.1 stops at Zone 1/21 (Ex ib, Gb).',
    },
    {
      row: 'Push-to-talk',
      note: 'The i.safe MOBILE IS440.1 is built around it: a dedicated key, PoC (push-to-talk over cellular) apps, a channel selector and M1 and M2 keys. The BARTEC SC9EX1 Smartscanner puts push-to-talk on one of its two programmable keys and works with an app, so the choice of push-to-talk app is yours.',
    },
    {
      row: 'Weight',
      note: 'At 307 g the i.safe MOBILE IS440.1 weighs 63 g less than the BARTEC SC9EX1 Smartscanner at 370 g, which counts for crews who carry the device for a whole shift. The BARTEC SC9EX1 Smartscanner has the larger battery, 4300 mAh against 2400 mAh, but our data has no run-time figures for either phone.',
    },
  ],
  sections: [
    {
      title: 'Barcode scanning and data capture',
      edge: 'bartec-sc9ex1',
      text: [
        'This is the job the BARTEC SC9EX1 Smartscanner is built for. It has a Zebra scan engine inside the phone, so there is nothing to attach or carry separately. Its certificate adds the op is protection (inherently safe optical radiation) to the Ex ia rating, and the conditions of use list the SE55 scan engine as a Class 2 laser (520 nm). For stores, logistics and asset-tagging rounds where people scan all day, that is the simpler tool. It also has a 48 MP autofocus rear camera and records 4K video.',
        'The i.safe MOBILE IS440.1 does a different job. Barcode scanning is listed as not available, so it is not the phone for scanning rounds, and our data has no rear camera or video figures for it, so we cannot compare cameras for inspection photos. Its 8 MP autofocus front camera is usable as a bodycam, and both phones read NFC tags. Our data lists no scanning performance figures for the BARTEC SC9EX1 Smartscanner, so test it on your own labels and in your own lighting before you commit to a fleet.',
      ],
    },
    {
      title: 'Push-to-talk, alarms and carrying',
      edge: 'isafe-is440-1',
      text: [
        'Push-to-talk is where the i.safe MOBILE IS440.1 is at home. It is a radio-style handheld with a dedicated push-to-talk key and PoC (push-to-talk over cellular) apps, a channel selector, M1 and M2 keys and a programmable red key that i.safe lists for SOS and lone-worker use. App World comes preinstalled with curated push-to-talk and MDM apps. For a crew that talks more than it taps, the main actions sit on keys, and the handheld weighs 307 g.',
        'The BARTEC SC9EX1 Smartscanner reaches push-to-talk through a smartphone. It has two programmable keys, one for push-to-talk and one for emergency calls, and relies on an app for push-to-talk and for lone working; our data does not list a preinstalled safety app for it. It weighs 370 g against 307 g, and its battery is 4300 mAh against 2400 mAh, but our data has no run-time figures for either phone, so test battery life over a real shift. Both are rated IP68 and MIL-STD-810H.',
      ],
    },
    {
      title: 'Zone 0 and certification',
      edge: 'bartec-sc9ex1',
      text: [
        'The BARTEC SC9EX1 Smartscanner is intrinsically safe (Ex ia op is) and certified for Zone 0/1/21 under ATEX and IECEx, with protection level Ga for gas, and its North American listing (E226123) includes Zone 0 AEx ia op is IIC T4 Ga. The i.safe MOBILE IS440.1 is Ex ib and certified to level Gb, which covers Zone 1 and Zone 2, and our data lists it as not certified for Zone 0. If a scanning or voice round takes people into Zone 0, only the BARTEC SC9EX1 Smartscanner of these two qualifies.',
        'On the rest of the rating they match. Both are IIC T4 for gas and IIIC T135 °C for dust, both hold a Class I Division 1 approval for North America, and both are certified for −20 °C to +55 °C ambient. T4 suits most gases, but not those that ignite below 135 °C. BARTEC’s ATEX dust marking includes IP64, which our data does not show for i.safe. The i.safe MOBILE IS440.1 has a mining version, the i.safe MOBILE IS440.M1, which keeps Zone 1/21 alongside Group I; our data does not list one for the BARTEC SC9EX1 Smartscanner.',
      ],
    },
    {
      title: 'Screen, software, updates and charging',
      edge: 'even',
      text: [
        'The BARTEC SC9EX1 Smartscanner is the fuller platform on paper. It has a 6.1-inch AMOLED display (1080 × 2340, Gorilla Glass Victus) with glove and stylus touch, and runs Android 15 on the Qualcomm QCM6490 with 8 GB of RAM and 128 GB of storage; BARTEC lists an upgrade to Android 16, with further upgrades subject to Qualcomm. The i.safe MOBILE IS440.1 has a 2.4-inch Gorilla Glass 3 display with touch listed for gloves and wet use, and runs ISM-OS 14 on the same processor with 4 GB of RAM and 64 GB of storage, with App World preinstalled.',
        'On support dates the i.safe MOBILE IS440.1 is ahead: i.safe MOBILE states security patches until Q4 2032, while BARTEC states security updates for the BARTEC SC9EX1 Smartscanner until at least May 2030. Both batteries are user-replaceable, and both phones must be charged, and have the battery changed, outside the hazardous area. BARTEC says to use original BARTEC accessories only and gives a charging range of 0 to +45 °C in its datasheet, although its product page says 0 to +40 °C; for North America, i.safe specifies its PROTECTOR 2.0 USB-C cable for the i.safe MOBILE IS440.1.',
      ],
    },
  ],
  faq: [
    {
      q: 'Is the BARTEC SC9EX1 Smartscanner better than the i.safe MOBILE IS440.1?',
      a: 'Neither is better across the board, because they do different jobs. The BARTEC SC9EX1 Smartscanner suits teams that scan barcodes or enter Zone 0, with a 6.1-inch screen to work on. The i.safe MOBILE IS440.1 suits crews built around push-to-talk: a dedicated key, a channel selector and 307 g. Both are certified for Zone 1/21 and Class I Division 1.',
    },
    {
      q: 'Can the i.safe MOBILE IS440.1 scan barcodes?',
      a: 'No. Barcode scanning is listed as not available on the i.safe MOBILE IS440.1. The BARTEC SC9EX1 Smartscanner has a built-in Zebra scan engine, and both phones read NFC tags.',
    },
    {
      q: 'Which is better for push-to-talk?',
      a: 'The i.safe MOBILE IS440.1 is the radio-style option: a dedicated push-to-talk key with PoC apps, a channel selector, M1 and M2 keys, and 307 g against 370 g. The BARTEC SC9EX1 Smartscanner has a programmable push-to-talk key and works with an app, with a 6.1-inch screen and a scan engine for everything else. Choose by how much of the shift your crew spends on voice and how much on data.',
    },
    {
      q: 'Can either phone be used in Zone 0?',
      a: 'Only the BARTEC SC9EX1 Smartscanner. It is certified for Zone 0/1/21 (Ex ia op is, protection level Ga), and its North American listing includes Zone 0 AEx ia op is IIC T4 Ga. The i.safe MOBILE IS440.1 is certified to protection level Gb, which covers Zone 1 and Zone 2, and is not certified for Zone 0.',
    },
    {
      q: 'Are both phones approved for North America?',
      a: 'Yes. Both are approved for Class I Division 1, Groups A to D, Class II Division 1, Groups E to G, and Class III, with temperature code T4. The BARTEC SC9EX1 Smartscanner is listed under E226123, and BARTEC lists a separate North America part number (17-S19C-31111111, Verizon). The i.safe MOBILE IS440.1 holds a QPS certificate of compliance (LR3081-6R2, dated 30 September 2025).',
    },
    {
      q: 'Does BARTEC make the same phone without the scan engine?',
      a: 'BARTEC’s smartphone without the built-in scan engine is the BARTEC SP9EX1. It carries the same ATEX and IECEx certificate numbers (UL 24 ATEX 3153X and IECEx UL 24.0004X), weighs 350 g and scans through its camera with third-party software instead.',
    },
    {
      q: 'How much do the BARTEC SC9EX1 Smartscanner and i.safe MOBILE IS440.1 cost?',
      a: 'Prices depend on volume, configuration and region, so both are on request. Contact us for a price.',
    },
  ],
  cta: {
    kind: 'neutral',
    heading: 'Still deciding between the two?',
    text: 'These two phones do different jobs, so the choice comes down to whether your crews scan or talk, and whether any of your areas are Zone 0. Tell us about your sites and the work your team does and we will help you choose impartially.',
  },
};

export default page;
