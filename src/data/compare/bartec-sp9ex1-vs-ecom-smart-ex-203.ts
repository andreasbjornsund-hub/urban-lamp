import type { ComparePage } from '../compare-pages';

const page: ComparePage = {
  phones: ['bartec-sp9ex1', 'ecom-smart-ex-203'],
  title: 'BARTEC SP9EX1 vs ecom Smart-Ex 203 Compared',
  description:
    'BARTEC SP9EX1 or ecom Smart-Ex 203? Zone 0/1 or Zone 2, scanning, storage, weight and security updates compared, with our pick for each team.',
  h1: 'BARTEC SP9EX1 vs ecom Smart-Ex 203',
  eyebrow: 'Compare · Zone 0/1 or Zone 2 Android phones',
  lead:
    'The BARTEC SP9EX1 and the ecom Smart-Ex 203 are both intrinsically safe Android phones with 8 GB of RAM, 5G and a battery you swap outside the hazardous area, but they are rated for different zones. The BARTEC SP9EX1 (Ex ia) is certified for Zone 0/1/21 and Class I Division 1; the ecom Smart-Ex 203 (Ex ic) is certified for Zone 2/22 and Class I Division 2 only. The rest of the choice is about scanning, storage, weight and security updates. Here is how they compare, and which we would choose for which team.',
  verdict: {
    summary: [
      'Start with the highest zone you enter. For any Zone 0 or Zone 1 work we would choose the BARTEC SP9EX1: its rating also covers Zone 2 and Division 2, and it is 15 g lighter. The ecom Smart-Ex 203 is for sites where Zone 2 is enough, and there we would choose it for crews that scan in volume with a hardware scanner, need card storage of up to 512 GB or want security updates listed until March 2032. For other Zone 2 work either phone will do.',
    ],
    choose: [
      {
        id: 'bartec-sp9ex1',
        reasons: [
          'Your work reaches Zone 0 or Zone 1: it is certified for Zone 0/1/21 (Ex ia, Ga) and its North American listing includes Zone 0 AEx, while the ecom Smart-Ex 203 is certified for Zone 2/22 only.',
          'You work at North American Division 1 sites: it holds Class I Division 1 (E226123), which also covers Division 2, while the ecom Smart-Ex 203 holds Division 2 only.',
          'Crews carry the phone for a full shift: it weighs 350 g against 365 g for the ecom Smart-Ex 203.',
          'The screen and video matter on your rounds: it has a 6.1-inch AMOLED display with glove and stylus touch and records 4K video.',
          'You want a path to newer Android versions: it runs Android 15, and BARTEC lists an upgrade to Android 16, with further upgrades subject to Qualcomm.',
        ],
      },
      {
        id: 'ecom-smart-ex-203',
        reasons: [
          'Your crews scan all day at Zone 2 sites: it takes the SM-Ex S203 SR scanner (Zebra), while the BARTEC SP9EX1 scans through its camera with third-party software.',
          'You need storage on the device: it takes a microSD card of up to 512 GB, and our data does not mention a card slot on the BARTEC SP9EX1.',
          'You plan the fleet around long support: ecom lists security updates until March 2032, against BARTEC’s statement of at least May 2030, and the phone is Android Enterprise Recommended.',
          'Some Zone 2 sites run hot and the phones carry no scanner: it is certified to +60 °C ambient, against +55 °C for the BARTEC SP9EX1, but only +50 °C with the scanner fitted.',
        ],
      },
    ],
  },
  differences: [
    {
      row: 'Certified for',
      title: 'Hazardous zones covered',
      note: 'This decides where a phone may be used at all. The BARTEC SP9EX1 is certified for Zone 0/1/21, which also covers Zone 2/22; the ecom Smart-Ex 203 is certified for Zone 2/22 only, so it cannot be used in Zone 1 or Zone 0 areas.',
    },
    {
      row: 'Barcode scanning',
      note: 'The ecom Smart-Ex 203 takes the SM-Ex S203 SR scanner (Zebra), which suits all-day scanning but limits its ambient range to −20 °C to +50 °C once fitted. The BARTEC SP9EX1 scans through its camera with third-party software, which suits occasional scans and leaves nothing extra to carry.',
    },
    {
      row: 'Security updates',
      title: 'Security update support',
      note: 'ecom lists security updates for the ecom Smart-Ex 203 until March 2032, while BARTEC states at least May 2030 for the BARTEC SP9EX1, a gap of 22 months. The BARTEC SP9EX1 runs the newer Android 15, and BARTEC lists an upgrade to Android 16.',
    },
    {
      row: 'Storage',
      note: 'The ecom Smart-Ex 203 takes a microSD card of up to 512 GB alongside 128 GB of storage, which helps with offline data and photo records. Our data lists 128 GB for the BARTEC SP9EX1 and does not mention a card slot.',
    },
  ],
  sections: [
    {
      title: 'Zone 0 and certification',
      edge: 'bartec-sp9ex1',
      text: [
        'This is the biggest gap between the two. The BARTEC SP9EX1 is intrinsically safe (Ex ia) and certified for Zone 0/1/21 under ATEX and IECEx, with protection level Ga for gas, and its North American listing (E226123) includes Zone 0 AEx ia IIC T4 Ga and Class I Division 1. The ecom Smart-Ex 203 is Ex ic, certified to level Gc for Zone 2/22, with a Class I Division 2 approval, and our data lists no Zone 1 version of it. Because the higher rating also covers Zone 2, the BARTEC SP9EX1 can work anywhere the ecom Smart-Ex 203 can, but not the other way round.',
        'On the rest of the rating they match: both are IIC T4 for gas and IIIC T135 °C for dust, and T4 suits most gases, but not those that ignite below 135 °C. Both certificates limit mechanical and electrostatic risk: BARTEC says to protect the BARTEC SP9EX1 against high impact energy, and the ecom Smart-Ex 203’s conditions of use say low mechanical-hazard locations only. Both are rated IP68 and MIL-STD-810H as devices, and BARTEC’s ATEX dust marking includes IP64, which our data does not show for ecom.',
      ],
    },
    {
      title: 'Scanning and data capture',
      edge: 'ecom-smart-ex-203',
      text: [
        'The ecom Smart-Ex 203 is the phone to look at where scanning is a daily task and Zone 2 is enough. It takes the SM-Ex S203 SR scanner (Zebra) through its extra interface for peripherals, which suits stores, logistics and asset-tagging rounds with many scans per shift. There is a planning cost: with the scanner fitted, the ambient range narrows from −20 °C to +60 °C to −20 °C to +50 °C, below the −20 °C to +55 °C of the BARTEC SP9EX1. Both phones read NFC tags.',
        'The BARTEC SP9EX1 scans through its camera with third-party software, which suits occasional scans and leaves nothing extra to carry. If scanning is the main job in Zone 0 or Zone 1, BARTEC also makes the BARTEC SC9EX1 Smartscanner, which has a built-in Zebra scan engine. Storage is the other gap: the ecom Smart-Ex 203 takes a microSD card of up to 512 GB on top of 128 GB, while our data lists 128 GB for the BARTEC SP9EX1 and does not mention a card slot. Our data lists no scanning performance figures for either phone.',
      ],
    },
    {
      title: 'Screen, camera and handling',
      edge: 'even',
      text: [
        'Both phones have a 48 MP autofocus rear camera. The BARTEC SP9EX1 adds an f/1.79 lens, records 4K video and has an 8 MP front camera; the ecom Smart-Ex 203 has an LED flash and a 16 MP front camera, and our data does not list video for it. The BARTEC SP9EX1 has a 6.1-inch AMOLED screen (1080 × 2340, Gorilla Glass Victus) with glove and stylus touch. The ecom Smart-Ex 203 has a 6.3-inch TFT screen (1080 × 2340) with glove and wet touch, and a side fingerprint reader, which our data does not list for the BARTEC SP9EX1.',
        'In the hand, the BARTEC SP9EX1 weighs 350 g and the ecom Smart-Ex 203 365 g, and our data lists no weight for the scanner accessory, so weigh a fitted phone before you equip a fleet. The ecom Smart-Ex 203 has the larger battery, 4500 mAh against 4300 mAh, but our data has no run-time figures for either phone, so test battery life over a real shift. Both are rated IP68 and MIL-STD-810H. The BARTEC SP9EX1 Cam version has no cellular radio or SIM slot and is covered by the same certificates.',
      ],
    },
    {
      title: 'Updates, alarms and charging',
      edge: 'ecom-smart-ex-203',
      text: [
        'On updates, ecom lists security updates for the ecom Smart-Ex 203 until March 2032, and it is Android Enterprise Recommended with Wi-Fi 6E. BARTEC states security updates for the BARTEC SP9EX1 until at least May 2030, and our data does not show its Android Enterprise status; it has Wi-Fi 6. The BARTEC SP9EX1 runs Android 15 against Android 14, and BARTEC lists an upgrade to Android 16, with further upgrades subject to Qualcomm. The two use different processors, and our data has no performance figures, so we do not rank them on speed.',
        'Both phones put push-to-talk and an emergency call on keys and rely on an app for lone working. The BARTEC SP9EX1 has two programmable keys, one for each. The ecom Smart-Ex 203 has one programmable push-to-talk / multifunction key that can serve as the alarm, and ecom has not confirmed a lone-worker app for this exact model. Neither phone can be charged, or have its battery changed, in the hazardous area: ecom specifies charging at +5 to +45 °C, and BARTEC says to use original BARTEC accessories only.',
      ],
    },
  ],
  faq: [
    {
      q: 'Is the BARTEC SP9EX1 better than the ecom Smart-Ex 203?',
      a: 'Neither is better across the board, but they are not rated for the same sites. The BARTEC SP9EX1 suits Zone 0 and Zone 1 work, Division 1 sites and teams that want a lighter phone with an AMOLED screen and 4K video. The ecom Smart-Ex 203 suits Zone 2/22 and Division 2 sites where you want a hardware scanner, microSD storage and security updates listed until March 2032.',
    },
    {
      q: 'Can either phone be used in Zone 0 or Zone 1?',
      a: 'Only the BARTEC SP9EX1. It is certified for Zone 0/1/21 (Ex ia, protection level Ga), and its North American listing includes Zone 0 AEx ia IIC T4 Ga. The ecom Smart-Ex 203 is certified for Zone 2/22 only, at protection level Gc, and our data lists no Zone 1 version of it.',
    },
    {
      q: 'How does each phone scan barcodes?',
      a: 'The BARTEC SP9EX1 scans through its camera with third-party software. The ecom Smart-Ex 203 takes the SM-Ex S203 SR scanner (Zebra) as an accessory, and with it fitted its ambient range is −20 °C to +50 °C instead of −20 °C to +60 °C. For a built-in scan engine, BARTEC offers the BARTEC SC9EX1 Smartscanner.',
    },
    {
      q: 'Which gets security updates for longer?',
      a: 'The ecom Smart-Ex 203, by 22 months on the makers’ dates. ecom lists security updates until March 2032, while BARTEC states security updates for the BARTEC SP9EX1 until at least May 2030, and lists an upgrade to Android 16, with further upgrades subject to Qualcomm.',
    },
    {
      q: 'Are both phones approved for North America?',
      a: 'Yes, at different levels. The BARTEC SP9EX1 is listed under E226123 for Class I Division 1, Groups A to D, Class II Division 1, Groups E to G, and Class III, with temperature code T4. The ecom Smart-Ex 203 is approved for Class I Division 2, Groups A to D, with temperature code T4, and for Class II Division 2, Groups F and G; our data has no listing number for it. A Division 1 listing also covers Division 2 sites.',
    },
    {
      q: 'Can you charge either phone in the hazardous area?',
      a: 'No. Both must be charged, and have their batteries changed, outside the hazardous area. ecom specifies charging at +5 to +45 °C and no connections to the USB-C port or charging pads in hazardous areas. BARTEC specifies original BARTEC accessories and a charging range of 0 to +45 °C in its datasheet (0 to +40 °C on its product page).',
    },
    {
      q: 'How much do the BARTEC SP9EX1 and ecom Smart-Ex 203 cost?',
      a: 'Prices depend on volume, configuration and region, so both are on request. Contact us for a price.',
    },
  ],
  cta: {
    kind: 'neutral',
    heading: 'Still deciding between the two?',
    text: 'The BARTEC SP9EX1 is certified for Zone 0/1/21 and the ecom Smart-Ex 203 for Zone 2/22, so the zones on your sites come first, then how you scan and how long you need updates. Tell us about your sites and we will help you choose impartially.',
  },
};

export default page;
