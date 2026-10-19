import type { ComparePage } from '../compare-pages';

const page: ComparePage = {
  phones: ['bartec-sc9ex1', 'ecom-smart-ex-203'],
  title: 'BARTEC SC9EX1 Smartscanner vs ecom Smart-Ex 203 Compared',
  description:
    'BARTEC SC9EX1 Smartscanner or ecom Smart-Ex 203? Built-in or accessory scanner, Zone 0/1 or Zone 2, storage and updates compared, with our pick for each team.',
  h1: 'BARTEC SC9EX1 Smartscanner vs ecom Smart-Ex 203',
  eyebrow: 'Compare · Zone 0/1 or Zone 2 scanning phones',
  lead:
    'Both of these intrinsically safe Android phones scan with a Zebra scanner, but they are not rated for the same sites. The BARTEC SC9EX1 Smartscanner has the scan engine built in and is certified for Zone 0/1/21 (Ex ia op is), with a Class I Division 1 approval for North America. The ecom Smart-Ex 203 takes its scanner as an accessory and is certified for Zone 2/22 only (Ex ic), with a Class I Division 2 approval. Both have 8 GB of RAM, 5G and a battery you swap outside the hazardous area. Here is how they compare, and which we would choose for which team.',
  verdict: {
    summary: [
      'Start with the zones on your sites. The BARTEC SC9EX1 Smartscanner is certified for Zone 0/1/21 and Class I Division 1, which also cover Zone 2 and Division 2, so for any Zone 0 or Zone 1 work we would choose it. The ecom Smart-Ex 203 is for sites where Zone 2 is enough. There, for crews that want microSD storage of up to 512 GB, a scanner fitted only on the phones that need it and security updates listed until March 2032, we would choose the ecom Smart-Ex 203. For Zone 2 crews that scan all day, either works, and the BARTEC SC9EX1 Smartscanner keeps its +55 °C range with the scanner built in.',
    ],
    choose: [
      {
        id: 'bartec-sc9ex1',
        reasons: [
          'Any of your work reaches Zone 0 or Zone 1: it is certified for Zone 0/1/21 (Ex ia op is, Ga), while the ecom Smart-Ex 203 is certified for Zone 2/22 only, and our data lists no Zone 1 version of it.',
          'Your crews scan all day and want nothing to attach: it has a Zebra scan engine built in and keeps its −20 °C to +55 °C range, where the ecom Smart-Ex 203 is limited to +50 °C once its scanner is fitted.',
          'You work at North American Division 1 sites: its Class I Division 1 listing (E226123) also covers Division 2, while the ecom Smart-Ex 203 holds Division 2 only.',
          'You want newer software: it runs Android 15, and BARTEC lists an upgrade to Android 16, with further upgrades subject to Qualcomm.',
          'Your crews wear gloves and use a stylus, or record video: it has a 6.1-inch AMOLED display with glove and stylus touch and records 4K video.',
        ],
      },
      {
        id: 'ecom-smart-ex-203',
        reasons: [
          'You need storage on the device: it takes a microSD card of up to 512 GB on top of 128 GB, and our data does not mention a card slot on the BARTEC SC9EX1 Smartscanner.',
          'Only some of your Zone 2 crews scan: it takes the SM-Ex S203 SR scanner (Zebra) as an accessory, so you fit it only where it is needed, and the phones without it keep the −20 °C to +60 °C range.',
          'You plan the fleet around long support: ecom lists security updates until March 2032, against BARTEC’s statement of at least May 2030, and the phone is Android Enterprise Recommended.',
          'Your crews work with wet hands or use the front camera: it has a 6.3-inch display with glove and wet touch and a 16 MP front camera, against 8 MP on the BARTEC SC9EX1 Smartscanner.',
        ],
      },
    ],
  },
  differences: [
    {
      row: 'Certified for',
      title: 'Hazardous zones covered',
      note: 'This decides where a phone may be used at all. The BARTEC SC9EX1 Smartscanner is certified for Zone 0/1/21, which also covers Zone 2/22; the ecom Smart-Ex 203 is certified for Zone 2/22 only, so it cannot be used in Zone 1 or Zone 0 areas.',
    },
    {
      row: 'Barcode scanning',
      note: 'The BARTEC SC9EX1 Smartscanner has a Zebra scan engine built in. The ecom Smart-Ex 203 takes the SM-Ex S203 SR scanner (Zebra) as an accessory, which you fit only where it is needed, but fitting it limits the ambient range to −20 °C to +50 °C, against −20 °C to +55 °C for the BARTEC SC9EX1 Smartscanner.',
    },
    {
      row: 'Security updates',
      title: 'Security update support',
      note: 'ecom lists security updates for the ecom Smart-Ex 203 until March 2032, while BARTEC states at least May 2030 for the BARTEC SC9EX1 Smartscanner, a gap of 22 months. The BARTEC SC9EX1 Smartscanner runs the newer Android 15, and BARTEC lists an upgrade to Android 16.',
    },
    {
      row: 'Storage',
      note: 'The ecom Smart-Ex 203 takes a microSD card of up to 512 GB alongside 128 GB of storage, which helps with offline scan data and photos. Our data lists 128 GB for the BARTEC SC9EX1 Smartscanner and does not mention a card slot.',
    },
  ],
  sections: [
    {
      title: 'Barcode scanning',
      edge: 'bartec-sc9ex1',
      text: [
        'The BARTEC SC9EX1 Smartscanner is built for scanning: a Zebra scan engine sits inside the phone, so there is nothing to attach or carry separately, and its certificate adds op is protection (inherently safe optical radiation) to the Ex ia rating. The conditions of use list the SE55 scan engine as a Class 2 laser (520 nm). For stores, logistics and asset-tagging rounds where people scan all day, and for any scanning in Zone 0 or Zone 1, it is the only one of the two that qualifies.',
        'The ecom Smart-Ex 203 takes the SM-Ex S203 SR scanner (Zebra) through its extra interface for peripherals. That suits Zone 2 fleets where only some crews scan, because you fit the scanner only where it is needed. There is a planning cost: with the scanner fitted, the ambient range narrows from −20 °C to +60 °C to −20 °C to +50 °C, below the −20 °C to +55 °C of the BARTEC SC9EX1 Smartscanner. On hot Zone 2 sites where nobody scans, the ecom Smart-Ex 203 has more headroom, +60 °C against +55 °C. Both phones read NFC tags.',
      ],
    },
    {
      title: 'Zone 0, Zone 1 and certification',
      edge: 'bartec-sc9ex1',
      text: [
        'The BARTEC SC9EX1 Smartscanner is intrinsically safe (Ex ia op is) and certified for Zone 0/1/21 under ATEX and IECEx, with protection level Ga for gas. Its North American listing (E226123) covers Class I Division 1, Groups A to D, and includes Zone 0 AEx ia op is IIC T4 Ga. The ecom Smart-Ex 203 is Ex ic, certified to level Gc for Zone 2/22, with a Class I Division 2 approval, and our data lists no Zone 1 version of it. A rating for Zone 0 or Division 1 also covers Zone 2 and Division 2, so the BARTEC SC9EX1 Smartscanner can work wherever the ecom Smart-Ex 203 can.',
        'On the rest of the rating they match: both are IIC T4 for gas and IIIC T135 °C for dust, and T4 suits most gases, but not those that ignite below 135 °C. Both certificates limit mechanical and electrostatic risk: BARTEC says to protect the BARTEC SC9EX1 Smartscanner against high impact energy, and the ecom Smart-Ex 203’s conditions of use say low mechanical-hazard locations only. Both are rated IP68 and MIL-STD-810H as devices, and BARTEC’s ATEX dust marking includes IP64, which our data does not show for ecom.',
      ],
    },
    {
      title: 'Screen, camera and storage',
      edge: 'even',
      text: [
        'On paper the cameras are closely matched: both phones have a 48 MP autofocus rear camera. The BARTEC SC9EX1 Smartscanner adds an f/1.79 lens, records 4K video and has an 8 MP front camera; the ecom Smart-Ex 203 has an LED flash and a 16 MP front camera, and our data does not list video for it. The BARTEC SC9EX1 Smartscanner has a 6.1-inch AMOLED screen (1080 × 2340, Gorilla Glass Victus) with glove and stylus touch; the ecom Smart-Ex 203 has a 6.3-inch TFT screen (1080 × 2340) with glove and wet touch.',
        'Storage gives the ecom Smart-Ex 203 a clear point. Both have 8 GB of RAM and 128 GB of storage, but the ecom Smart-Ex 203 also takes a microSD card of up to 512 GB, useful for offline data and photo records. The weights are close, 370 g against 365 g, and our data lists no weight for the scanner accessory, so weigh a fitted phone before you equip a fleet. The ecom Smart-Ex 203 has the larger battery, 4500 mAh against 4300 mAh, but our data has no run-time figures for either phone, so test battery life over a real shift.',
      ],
    },
    {
      title: 'Keys, updates and charging',
      edge: 'ecom-smart-ex-203',
      text: [
        'Both phones put push-to-talk and an emergency call on keys and rely on an app for lone working. The BARTEC SC9EX1 Smartscanner has two programmable keys, one for push-to-talk and one for emergency calls. The ecom Smart-Ex 203 has one programmable push-to-talk / multifunction key that can serve as the alarm, plus a side fingerprint reader, and ecom has not confirmed a lone-worker app for this exact model. If lone working is central to your safety case, ask ecom before you choose it.',
        'On updates, ecom lists security updates for the ecom Smart-Ex 203 until March 2032, and it is Android Enterprise Recommended. BARTEC states security updates for the BARTEC SC9EX1 Smartscanner until at least May 2030, and our data does not show its Android Enterprise status. Neither phone can be charged, or have its battery changed, in the hazardous area. ecom specifies charging at +5 to +45 °C; BARTEC says to use original BARTEC accessories only, with a charging range of 0 to +45 °C in its datasheet and 0 to +40 °C on its product page.',
      ],
    },
  ],
  faq: [
    {
      q: 'Is the BARTEC SC9EX1 Smartscanner better than the ecom Smart-Ex 203?',
      a: 'Neither is better across the board, but they are not rated for the same sites. The BARTEC SC9EX1 Smartscanner suits Zone 0 and Zone 1 work, Division 1 sites and crews that scan all day with a built-in scanner. The ecom Smart-Ex 203 suits Zone 2/22 and Division 2 sites where you want microSD storage, an optional scanner and security updates listed until March 2032.',
    },
    {
      q: 'Can either phone scan barcodes?',
      a: 'Yes, in different ways. The BARTEC SC9EX1 Smartscanner has a built-in Zebra scan engine. The ecom Smart-Ex 203 takes the SM-Ex S203 SR scanner (Zebra) as an accessory, and with it fitted its ambient range is −20 °C to +50 °C instead of −20 °C to +60 °C.',
    },
    {
      q: 'Can either phone be used in Zone 0 or Zone 1?',
      a: 'Only the BARTEC SC9EX1 Smartscanner. It is certified for Zone 0/1/21 (Ex ia op is, protection level Ga), and its North American listing includes Zone 0 AEx ia op is IIC T4 Ga. The ecom Smart-Ex 203 is certified for Zone 2/22 only, at protection level Gc, and our data lists no Zone 1 version of it.',
    },
    {
      q: 'Are both phones approved for North America?',
      a: 'Yes, at different levels. The BARTEC SC9EX1 Smartscanner is listed under E226123 for Class I Division 1, Groups A to D, Class II Division 1, Groups E to G, and Class III, with temperature code T4. The ecom Smart-Ex 203 is approved for Class I Division 2, Groups A to D, with temperature code T4, and for Class II Division 2, Groups F and G; our data has no listing number for it. A Division 1 listing also covers Division 2 sites.',
    },
    {
      q: 'Which gets security updates for longer?',
      a: 'The ecom Smart-Ex 203, by 22 months on the makers’ dates. ecom lists security updates until March 2032, while BARTEC states security updates for the BARTEC SC9EX1 Smartscanner until at least May 2030, and lists an upgrade to Android 16, with further upgrades subject to Qualcomm.',
    },
    {
      q: 'Can you charge either phone in the hazardous area?',
      a: 'No. Both must be charged, and have their batteries changed, outside the hazardous area. ecom specifies charging at +5 to +45 °C and no connections to the USB-C port or charging pads in hazardous areas. BARTEC specifies original BARTEC accessories and a charging range of 0 to +45 °C in its datasheet (0 to +40 °C on its product page).',
    },
    {
      q: 'How much do the BARTEC SC9EX1 Smartscanner and ecom Smart-Ex 203 cost?',
      a: 'Prices depend on volume, configuration and region, so both are on request. Contact us for a price.',
    },
  ],
  cta: {
    kind: 'neutral',
    heading: 'Still deciding between the two?',
    text: 'The BARTEC SC9EX1 Smartscanner is certified for Zone 0/1/21 and the ecom Smart-Ex 203 for Zone 2/22, so the zones on your sites come first, then how much your crews scan. Tell us about your sites and fleet and we will help you choose impartially.',
  },
};

export default page;
