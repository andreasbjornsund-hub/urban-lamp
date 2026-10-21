import type { ComparePage } from '../compare-pages';

const page: ComparePage = {
  phones: ['ecom-smart-ex-203', 'xciel-xciphone-17'],
  title: 'ecom Smart-Ex 203 vs Xciel XCiPhone 17 Compared',
  description:
    'ecom Smart-Ex 203 or Xciel XCiPhone 17? Two Zone 2 phones with Division 2 listings compared on dust, IECEx, heat and iPhone against Android, with our pick.',
  h1: 'ecom Smart-Ex 203 vs Xciel XCiPhone 17',
  eyebrow: 'Compare · iPhone or Android for Zone 2 and Division 2',
  lead:
    'These two share a zone and differ in almost everything else. Both are intrinsically safe (Ex ic), certified for Zone 2 under ATEX with T4 gas protection, and both hold a Class I Division 2 approval for North America, the Xciel XCiPhone 17 on one of its versions. The ecom Smart-Ex 203 is a dedicated Android phone that also carries a dust rating for Zone 22 and an IECEx certificate. The Xciel XCiPhone 17 is an Ex ic case around a standard Apple iPhone 17, with no dust zone rating and no IECEx certificate. Neither is certified for Zone 1. Here is how they compare, and which we would choose for which team.',
  verdict: {
    summary: [
      'Both phones clear the same bar for Zone 2 gas sites and Class I Division 2 sites, so the choice comes down to dust, heat and the phone your team wants to carry. For sites with combustible dust, clients that ask for IECEx, hot sites, gloved crews and long shifts, we would choose the ecom Smart-Ex 203: it has a dust Zone 22 rating, IECEx, a +60 °C ambient limit, glove touch, a programmable push-to-talk key and a swappable battery. For iPhone fleets, teams that want a T6 North American listing or teams that want to fit their own iPhone, we would choose the Xciel XCiPhone 17.',
    ],
    choose: [
      {
        id: 'ecom-smart-ex-203',
        reasons: [
          'Combustible dust is part of the hazard: it is certified for dust Zone 22 (IIIC T135 °C, protection level Dc) and approved for Class II Division 2 Groups F and G, while the Xciel XCiPhone 17 has no dust zone rating and its conditions of use state it is not for Zone 22.',
          'Your sites run hot: it is certified up to +60 °C ambient (+50 °C with the scanner fitted), against +50 °C for the Xciel XCiPhone 17.',
          'Your crews wear gloves and rely on push-to-talk or an alarm: it has glove and wet touch and a programmable push-to-talk / multifunction key that can serve as the alarm.',
          'Shifts outrun one charge or you scan all day: its 4500 mAh battery is user-replaceable outside the hazardous area, and it takes the SM-Ex S203 SR scanner accessory (Zebra).',
          'A site or client asks for IECEx: it holds IECEx EPS 25.0034X as well as ATEX, while the Xciel XCiPhone 17 is certified under ATEX only.',
        ],
      },
      {
        id: 'xciel-xciphone-17',
        reasons: [
          'Your fleet already runs iPhones: a standard iPhone 17 sits inside, managed through Apple Business, with security updates expected for 7+ years (based on previous model support).',
          'Your Division 2 sites handle gases that ignite below 135 °C: the Xciel XCiPhone17 version’s North American listing is T6 (Groups A-D), against T4 for the ecom Smart-Ex 203.',
          'You would rather install the iPhone yourself: the Xciel XCiPhone17-A version (ATEX Zone 2 only) can be fitted by the customer, following Xciel’s procedure.',
          'Crews review drawings and photos on site: it has a 6.3-inch OLED at 2622 × 1206, against a 6.3-inch TFT at 1080 × 2340, with 256 GB or 512 GB of storage.',
        ],
      },
    ],
  },
  differences: [
    {
      row: 'Protection level (EPL)',
      title: 'Gas and dust protection level',
      note: 'Gc covers gas in Zone 2 and Dc covers dust in Zone 22. The ecom Smart-Ex 203 is rated for both, while the Xciel XCiPhone 17 is rated Gc for gas and has no dust zone rating. Its conditions of use state it is not for Zone 0, 1, 20, 21 or 22.',
    },
    {
      row: 'North America',
      note: 'Both hold a Class I Division 2 listing for Groups A-D. The ecom Smart-Ex 203 is listed at T4 and also covers Class II Division 2 (Groups F and G). The Xciel XCiPhone17 version holds LabTest LC25-5610-1 at T6, which matters only where a substance ignites below 135 °C. Order that version: the Xciel XCiPhone17-A version is ATEX Zone 2 only.',
    },
    {
      row: 'Ambient temperature (Ta)',
      title: 'Maximum ambient temperature',
      note: 'The ecom Smart-Ex 203 is certified from −20 °C to +60 °C, 10 °C more headroom than the Xciel XCiPhone 17 on hot sites. With the scanner module fitted it falls to +50 °C, the same limit as the Xciel XCiPhone 17.',
    },
    {
      row: 'Replaceable battery',
      note: 'The ecom Smart-Ex 203 lets you swap a charged battery outside the hazardous area. The Xciel XCiPhone 17’s battery is not user-replaceable, so it is charged outside hazardous areas and the shift has to be planned around that.',
    },
    {
      row: 'Operating system',
      note: 'This decides which fleet the phone fits. The ecom Smart-Ex 203 runs Android 14 and is Android Enterprise Recommended; the Xciel XCiPhone 17 runs iOS 27 on a standard iPhone 17, managed through Apple Business.',
    },
  ],
  sections: [
    {
      title: 'Gas, dust and where the phone may work',
      edge: 'ecom-smart-ex-203',
      text: [
        'On gas the two match. Both are intrinsically safe (Ex ic) and certified for Zone 2 at protection level Gc, with an ATEX marking of II 3G Ex ic IIC T4 Gc, and neither is certified for Zone 1 or Zone 0. The split is dust. The ecom Smart-Ex 203 adds II 3D Ex ic IIIC T135 °C Dc and is certified for dust Zone 22. The Xciel XCiPhone 17 has no dust zone rating, and its conditions of use state that it is not for Zone 0, 1, 20, 21 or 22.',
        'A plant where gas and dust both occur, or a site classified Zone 22, therefore points to the ecom Smart-Ex 203. It brings one limit of its own: its conditions of use say low mechanical-hazard locations only. For a Zone 2 site with a gas hazard only, both are rated for the job, and the choice moves to the practical points that follow.',
      ],
    },
    {
      title: 'North America and Division 2',
      edge: 'even',
      text: [
        'Both phones hold a Class I Division 2 listing, so on the core Division 2 question they match. The ecom Smart-Ex 203 is approved for Class I Division 2 Groups A-D at T4 and for Class II Division 2 Groups F and G at T4, plus Class I Zone 2 AEx ic IIC T4 Gc and Zone 22 AEx ic IIIC T135 °C Dc. Our data has no listing number for it. The Xciel XCiPhone 17 holds LabTest certificate LC25-5610-1: Class I Division 2, Groups A-D, T6, with IP54 and an ambient range of −20 to +50 °C, tested to CSA C22.2 No. 213-17 and UL 121201.',
        'The details differ. T6 matters only where a substance ignites below 135 °C, and most hydrocarbons sit at T1 to T3, so for many sites T4 is enough, but on a Division 2 site with such a substance the Xciel XCiPhone 17’s listing is the stricter one. That listing covers one version: order the Xciel XCiPhone17 version, installed by Xciel, because the Xciel XCiPhone17-A version is ATEX Zone 2 only. Our data does not show a Class II listing for the Xciel XCiPhone 17, so a Division 2 site with combustible dust should check with Xciel.',
      ],
    },
    {
      title: 'Keys, gloves, scanning and carrying',
      edge: 'ecom-smart-ex-203',
      text: [
        'The ecom Smart-Ex 203 is the more hands-on tool. It has glove and wet touch and a programmable push-to-talk / multifunction key that can serve as the alarm, and push-to-talk is built in alongside an app. ecom has not confirmed a lone-worker app for this exact model, so ask ecom if lone working is central to your safety case. The Xciel XCiPhone 17 has a standard capacitive touchscreen without glove touch and no hardware push-to-talk key: push-to-talk and lone-worker alerts run through apps, and the Action Button is mappable if it is accessible.',
        'For scanning, the ecom Smart-Ex 203 takes the SM-Ex S203 SR scanner accessory (Zebra), which suits stores, logistics and asset rounds, with a +50 °C ambient limit while it is fitted. The Xciel XCiPhone 17 scans QR codes with the iPhone camera and handles 1D and 2D codes through an app. Our data does not say which iPhone controls and cameras work through Xciel’s case, so confirm that with Xciel. The ecom Smart-Ex 203 weighs 365 g, and our data lists no weight for the Xciel XCiPhone 17. The ecom Smart-Ex 203 is rated IP68 and MIL-STD-810H; the Xciel XCiPhone 17’s North American listing records IP54, and our data holds no other ingress rating for it.',
      ],
    },
    {
      title: 'iPhone or Android: battery, display and software',
      edge: 'even',
      text: [
        'Power is a clear practical gap. The ecom Smart-Ex 203’s 4500 mAh battery is user-replaceable, so a crew can carry a charged spare and change it outside the hazardous area, and ecom specifies charging at +5 to +45 °C. The Xciel XCiPhone 17’s 3692 mAh battery is not replaceable: it is charged outside hazardous areas, and its USB-C port takes wired accessories outside hazardous areas only. Our data has no run-time figure for the ecom Smart-Ex 203, so we do not compare battery life: test both over a real shift.',
        'The Xciel XCiPhone 17 puts a standard iPhone 17 inside: a 6.3-inch OLED at 2622 × 1206, up to 120 Hz, Wi-Fi 7 and iOS 27 on the Apple A19, with 256 GB or 512 GB of storage and security updates expected for 7+ years (based on previous model support). The ecom Smart-Ex 203 has a 6.3-inch TFT at 1080 × 2340, a 48 MP autofocus camera with LED flash and a 16 MP front camera, runs Android 14 with security updates until Q1 2032, and offers 128 GB of storage plus microSD up to 512 GB. Both have 8 GB of RAM and 5G.',
      ],
    },
  ],
  faq: [
    {
      q: 'Is the ecom Smart-Ex 203 better than the Xciel XCiPhone 17?',
      a: 'Neither is better across the board. Both are certified for Zone 2 and approved for Class I Division 2 (the Xciel XCiPhone 17 in its Xciel XCiPhone17 version). The ecom Smart-Ex 203 suits sites with combustible dust, IECEx requirements, hot sites and gloved crews, and it has a swappable battery. The Xciel XCiPhone 17 suits iPhone fleets, a T6 Division 2 listing and teams that fit their own iPhone in the Xciel XCiPhone17-A version.',
    },
    {
      q: 'Can either phone be used in Zone 1?',
      a: 'No. The ecom Smart-Ex 203 is certified for Zone 2/22 only, and our data lists no Zone 1 version. The Xciel XCiPhone 17 is certified for Zone 2 only, and its conditions of use state that it is not for Zone 0, 1, 20, 21 or 22. Both are intrinsically safe (Ex ic) phones.',
    },
    {
      q: 'Are both phones approved for North America?',
      a: 'Yes, both for Class I Division 2, Groups A to D. The ecom Smart-Ex 203 is listed at T4 and also for Class II Division 2 Groups F and G; our data has no listing number for it. The Xciel XCiPhone 17 holds LabTest certificate LC25-5610-1 at T6, with IP54 and Ta −20 to +50 °C, for the Xciel XCiPhone17 version only.',
    },
    {
      q: 'Which of the two has a dust rating and an IECEx certificate?',
      a: 'The ecom Smart-Ex 203: it is certified for dust Zone 22 (IIIC T135 °C) and holds IECEx EPS 25.0034X alongside ATEX EPS 25 ATEX 1 131 X. The Xciel XCiPhone 17 has no dust zone rating and is certified under ATEX only, with no IECEx certificate.',
    },
    {
      q: 'Can you charge either phone in the hazardous area?',
      a: 'No. Both must be charged outside the hazardous area. The Xciel XCiPhone 17 allows charging and wired accessories only outside hazardous areas. For the ecom Smart-Ex 203, ecom specifies charging at +5 to +45 °C, no connections to the USB-C port or charging pads in hazardous areas, and battery changes outside the hazardous area.',
    },
    {
      q: 'How does push-to-talk work on each?',
      a: 'The ecom Smart-Ex 203 has a programmable push-to-talk / multifunction key, with push-to-talk built in alongside an app. The Xciel XCiPhone 17 has no hardware push-to-talk key: it runs push-to-talk through apps built on Apple’s Push to Talk framework, and its Action Button is mappable if accessible.',
    },
    {
      q: 'How much do the ecom Smart-Ex 203 and Xciel XCiPhone 17 cost?',
      a: 'Prices depend on volume, configuration and region, so both are on request. Contact us for a price.',
    },
  ],
  cta: {
    kind: 'neutral',
    heading: 'Still deciding between the two?',
    text: 'Both phones are certified for Zone 2 and approved for Class I Division 2 (the Xciel XCiPhone 17 in its Xciel XCiPhone17 version), so the choice comes down to dust, heat and whether your team wants iPhone or Android. Tell us about your sites and we will help you choose impartially, or check whether any of your areas need a Zone 1 phone.',
  },
};

export default page;
