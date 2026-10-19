import type { ComparePage } from '../compare-pages';

const page: ComparePage = {
  phones: ['ecom-smart-ex-03-dz2', 'ecom-smart-ex-203'],
  title: 'ecom Smart-Ex 03 DZ2 vs ecom Smart-Ex 203 Compared',
  description:
    'ecom Smart-Ex 03 DZ2 or ecom Smart-Ex 203? Two Zone 2 Android phones compared on scanning, camera, storage and security updates, with our pick for each team.',
  h1: 'ecom Smart-Ex 03 DZ2 vs ecom Smart-Ex 203',
  eyebrow: 'Compare · Zone 2 Android phones',
  lead:
    'The ecom Smart-Ex 03 DZ2 and the ecom Smart-Ex 203 are two ecom Android phones for Zone 2/22. Both are intrinsically safe (Ex ic), certified under ATEX and IECEx with IIC T4 and a Class I Division 2 approval for North America, both have 8 GB of RAM, 5G and a battery you can swap outside the hazardous area, and neither is certified for Zone 1. The differences show up in the work: scanning, photos, storage, alarms and how long security updates run. Here is how they compare, and which we would choose for which team.',
  verdict: {
    summary: [
      'Both phones cover the same Zone 2/22 ground, so pick by the work your team does. For crews who want alarms and lone working ready to go, scan now and then or on hot sites, and want the longer update runway, we would choose the ecom Smart-Ex 03 DZ2. For crews who scan all day, photograph their work and carry data on a memory card, we would choose the ecom Smart-Ex 203.',
    ],
    choose: [
      {
        id: 'ecom-smart-ex-03-dz2',
        reasons: [
          'You want the longer update runway: it runs Android 15 with security updates until November 2032, against Android 14 and March 2032 on the ecom Smart-Ex 203.',
          'Your lone workers need an alarm app ready to go: ecom’s eSentinel comes preinstalled and can be assigned to the dedicated alarm key.',
          'You scan now and then, or on hot sites: it scans with its camera and ecom’s paid eBARCODE-ML app, so there is no accessory to fit and the +60 °C ambient range stays.',
          'Some of your sites are Zone 1 and you want one phone family: the ecom Smart-Ex 03 DZ1 is the Zone 1 version of the same phone.',
        ],
      },
      {
        id: 'ecom-smart-ex-203',
        reasons: [
          'You scan all day: it takes the SM-Ex S203 SR scanner accessory (Zebra), though fitting it limits the ambient range to +50 °C.',
          'Photos are part of the job: its 48 MP autofocus rear camera suits inspection records better than a 13 MP camera tuned for scanning.',
          'You need room on the device: it takes a microSD card of up to 512 GB on top of 128 GB of storage.',
          'You want a larger screen in a lighter phone: it has a 6.3-inch display with glove and wet touch at 365 g, against 6 inches and 400 g.',
        ],
      },
    ],
  },
  differences: [
    {
      row: 'Barcode scanning',
      note: 'The ecom Smart-Ex 03 DZ2 scans with its camera and ecom’s paid eBARCODE-ML app, so there is nothing to fit. The ecom Smart-Ex 203 takes the SM-Ex S203 SR scanner accessory (Zebra), which suits all-day scanning but changes its ambient range, as the next point shows.',
    },
    {
      row: 'Ambient temperature (Ta)',
      title: 'Maximum ambient temperature',
      note: 'Both are certified from −20 °C to +60 °C, but with the scanner module fitted the ecom Smart-Ex 203 is limited to +50 °C. If a site runs hotter than that, the ecom Smart-Ex 203 cannot be used there with the scanner fitted; the ecom Smart-Ex 03 DZ2 keeps +60 °C.',
    },
    {
      row: 'Rear camera',
      title: 'Camera',
      note: 'For inspection photos the ecom Smart-Ex 203 has the higher-resolution camera, with a 16 MP front camera as well. The ecom Smart-Ex 03 DZ2’s 13 MP camera is tuned for scanning with ecom’s barcode app.',
    },
    {
      row: 'Security updates',
      note: 'ecom lists updates until November 2032 for the ecom Smart-Ex 03 DZ2 and until March 2032 for the ecom Smart-Ex 203, eight months apart, and the two run Android 15 and Android 14. That matters most for fleets you plan to keep for many years.',
    },
  ],
  sections: [
    {
      title: 'Barcode scanning and data capture',
      edge: 'ecom-smart-ex-203',
      text: [
        'Scanning is the clearest split between the two. The ecom Smart-Ex 03 DZ2 scans with its 13 MP rear camera, which ecom tunes for scanning, using ecom’s eBARCODE-ML app, a paid add-on. That suits occasional scans: there is no accessory to buy, fit or carry, and the ambient range stays at −20 °C to +60 °C. A team that scans in volume may prefer a hardware scanner. NFC reading is built in on both phones.',
        'The ecom Smart-Ex 203 takes a hardware scanner, the SM-Ex S203 SR (Zebra), through its extra interface for peripherals, which suits stores, logistics and asset-tagging rounds with many scans per shift. There is a planning cost: with the scanner fitted, the ambient range narrows from −20 °C to +60 °C to −20 °C to +50 °C. On hot sites the ecom Smart-Ex 03 DZ2 keeps its +60 °C.',
      ],
    },
    {
      title: 'Camera, display and storage',
      edge: 'ecom-smart-ex-203',
      text: [
        'The ecom Smart-Ex 203 is the stronger choice when the phone is also the crew’s camera. It has a 48 MP autofocus rear camera with an LED flash and a 16 MP front camera, against a 13 MP rear camera with phase-detection autofocus and an LED flash, and a 5 MP front camera, on the ecom Smart-Ex 03 DZ2. Its display is a 6.3-inch TFT at 1080 × 2340 with glove and wet touch; the ecom Smart-Ex 03 DZ2 has a 6-inch display at 1080 × 2160 with glove touch.',
        'Storage and weight point the same way. Both have 8 GB of RAM and 128 GB of storage, and the ecom Smart-Ex 203 also takes a microSD card of up to 512 GB, useful for offline data and photo records. It weighs 365 g against 400 g. Its battery is 4500 mAh against 4400 mAh, but our data has no run-time figures for either phone, so test battery life over a real shift.',
      ],
    },
    {
      title: 'Software and security updates',
      edge: 'ecom-smart-ex-03-dz2',
      text: [
        'The ecom Smart-Ex 03 DZ2 runs Android 15 on a Qualcomm Dragonwing QCM6490, and ecom lists security updates until November 2032. The ecom Smart-Ex 203 runs Android 14 on a Qualcomm Dragonwing QCM4490, with security updates until March 2032. Both are Android Enterprise Recommended, which helps IT teams that manage a fleet, and both offer 5G, Wi-Fi 6E, Bluetooth 5.2, NFC, nano-SIM and eSIM. Both are rated IP68 and MIL-STD-810H.',
        'For a fleet you plan to keep for years, the longer update date and the higher Android version favor the ecom Smart-Ex 03 DZ2, by eight months of security updates. The two phones use different processors, and our data has no performance figures to compare them, so we do not rank them on speed. If your team runs on a shorter replacement cycle, the earlier update date for the ecom Smart-Ex 203 may not matter.',
      ],
    },
    {
      title: 'Alarms, lone working and certification',
      edge: 'ecom-smart-ex-03-dz2',
      text: [
        'Both phones put push-to-talk on a key and offer built-in emergency alarms. The ecom Smart-Ex 03 DZ2 has a dedicated alarm key alongside programmable push-to-talk and multifunction keys, and ecom’s eSentinel alarm app and eDiagnostics come preinstalled. On the ecom Smart-Ex 203 the programmable push-to-talk / multifunction key can serve as the alarm, and ecom has not confirmed a lone-worker app for this exact model. If lone working is central to your safety case, ask ecom before you choose it.',
        'On the core rating they match. Both are certified for Zone 2/22 under ATEX and IECEx with IIC T4 and IIIC T135 °C, and approved for Class I Division 2 in North America. Neither is certified for Zone 1. Both must be charged, and the battery swapped, outside the hazardous area: ecom specifies charging at 0 to 45 °C for the ecom Smart-Ex 03 DZ2 and +5 to +45 °C for the ecom Smart-Ex 203, whose conditions of use also say low mechanical-hazard locations only.',
      ],
    },
  ],
  faq: [
    {
      q: 'Is the ecom Smart-Ex 03 DZ2 better than the ecom Smart-Ex 203?',
      a: 'Neither is better across the board. The ecom Smart-Ex 03 DZ2 suits crews that want eSentinel alarms ready, camera scanning at up to +60 °C and security updates until November 2032. The ecom Smart-Ex 203 suits crews that scan with hardware, take photos with its 48 MP camera and need microSD storage. Both are certified for Zone 2/22 and Class I Division 2.',
    },
    {
      q: 'Can either phone scan barcodes?',
      a: 'Yes, in different ways. The ecom Smart-Ex 03 DZ2 scans with its camera and ecom’s eBARCODE-ML app, which is a paid add-on. The ecom Smart-Ex 203 takes the SM-Ex S203 SR scanner accessory (Zebra). With the scanner fitted, its ambient range is −20 °C to +50 °C instead of −20 °C to +60 °C.',
    },
    {
      q: 'Can either phone be used in Zone 1?',
      a: 'No. Both are certified for Zone 2/22 only, at protection level Gc. The ecom Smart-Ex 03 DZ1 is the Zone 1 version of the ecom Smart-Ex 03 DZ2. Our data lists no Zone 1 version of the ecom Smart-Ex 203.',
    },
    {
      q: 'Which gets security updates for longer?',
      a: 'The ecom Smart-Ex 03 DZ2, by eight months. ecom lists security updates until November 2032 for it and until March 2032 for the ecom Smart-Ex 203, and the two run Android 15 and Android 14.',
    },
    {
      q: 'Are both phones approved for North America?',
      a: 'Yes. Both are approved for Class I Division 2, Groups A to D, with temperature code T4, and for Class II Division 2, Groups F and G. The ecom Smart-Ex 03 DZ2 is listed under E115956; our data has no listing number for the ecom Smart-Ex 203.',
    },
    {
      q: 'Can you charge either phone in the hazardous area?',
      a: 'No. Both must be charged, and have their batteries changed, outside the hazardous area. ecom specifies charging at 0 to 45 °C for the ecom Smart-Ex 03 DZ2 and +5 to +45 °C for the ecom Smart-Ex 203, whose conditions of use also say no connections to the USB-C port or charging pads in hazardous areas.',
    },
    {
      q: 'How much do the ecom Smart-Ex 03 DZ2 and ecom Smart-Ex 203 cost?',
      a: 'Prices depend on volume, configuration and region, so both are on request. Contact us for a price.',
    },
  ],
  cta: {
    kind: 'neutral',
    heading: 'Still deciding between the two?',
    text: 'Both phones are certified for Zone 2/22 only, so the choice comes down to the work your team does. Tell us about your sites and we will help you choose impartially, or check whether any of your areas need a Zone 1 phone.',
  },
};

export default page;
