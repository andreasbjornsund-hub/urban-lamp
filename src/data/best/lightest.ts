import type { BestPage } from '../best-pages';

const page: BestPage = {
  slug: 'lightest',
  title: 'Lightest Phones 2026: Intrinsically Safe & Ex-Proof',
  description:
    'The lightest ATEX and IECEx phones for hazardous areas in 2026, weighed as carried. Zone 1 feature phones, push-to-talk handsets, Ex iPhones and Zone 2 picks.',
  h1: 'Lightest phones for hazardous areas in 2026',
  eyebrow: 'Best for · By need',
  lead:
    'A light phone is only useful if it is certified for the zone you work in, and in a hazardous area the weight on the datasheet is not always the weight you carry. Weights for an Ex case or conversion include the phone inside it, so we compare every phone as carried. Beyond the certificate, weight decides how a phone feels on a long round, up a ladder or on a lanyard beside a gas detector, and the lightest devices trade away screen size, features or operating system. These are our picks for the lightest phones, from a Zone 1 feature phone to the lightest Zone 1 iPhone and the lightest smartphone for Zone 2-only sites.',
  headings: {
    ranking: 'Our picks for the lightest phones',
    checklist: 'What to check about weight',
    others: 'Other phones by weight',
    faq: 'Lightweight phone questions',
  },
  glanceNote:
    'All five are certified for gas group IIC and can be used in Zone 2, and the weights for the Xshielder case and the Atexxo conversion include the phone inside. Prices are on request.',
  glanceColumns: ['weight', 'type', 'zones', 'gasGroup', 'tempClass', 'certification'],
  method: [
    'Rank 1 goes to the lightest phone certified for Zone 1, weighed as carried: for an Ex case or conversion that means including the phone inside it. We never rank on a weight that a maker’s data leaves unconfirmed, and we leave out phones that i.safe has moved to its archive range, such as the IS330.1 and IS530.1.',
    'Positions 2 to 5 each name the lightest choice for a different need: push-to-talk crews, iPhone fleets, sites with Zone 0 areas and Zone 2-only sites. Ranks 1 to 4 are Zone 1 phones in weight order, and the Zone 2-only pick comes last because a Zone 2 phone cannot serve a Zone 1 area however light it is. Prices are on request for every brand, so cost does not affect the order.',
    'The order follows the weights in the datasheets, and it would change if a lighter certified phone came on sale or a maker confirmed a weight we could not.',
  ],
  picks: [
    {
      id: 'isafe-is120-1',
      label: 'Lightest phone for Zone 1',
      why: [
        'If the people you are equipping only need to make calls and send texts, the IS120.1 is the lightest way to do it in Zone 1. At 214 g it is the lightest phone certified for Zone 1 in our data, a feature phone with a 2.4-inch Gorilla Glass display, 4G, dual micro-SIM, Wi-Fi, Bluetooth 5 and a 2200 mAh battery. Supervisors, visitors and contractors who need a certified line to the control room are the kind of user it suits.',
        'It is intrinsically safe to Ex ib IIC T4 for Zone 1/21 under ATEX and IECEx, with published certificate numbers and an INMETRO approval for Brazil, and it is rated to +60 °C. The trade-off is that it is a feature phone, not a smartphone.',
        'Its operating system is reported as the proprietary ISM-OS 11, but that comes from distributor data rather than from i.safe, so we treat it as unconfirmed and would not assume it runs standard Android apps. No camera or push-to-talk key is listed in our data, we found no published security update date, and we have not yet reviewed its certificate’s conditions of use, so read them before you specify it.',
      ],
    },
    {
      id: 'isafe-is440-1',
      label: 'Lightest for Zone 1 push-to-talk crews',
      why: [
        'For crews who talk more than they type, the IS440.1 is the lightest Zone 1 push-to-talk handset we list, at 307 g. It is a radio-style device with a dedicated push-to-talk key, a channel selector, a programmable red key for SOS and lone-worker alarms, and M1 and M2 keys, and it works on 5G and Wi-Fi 6. That is a lot of control for a handset you can hold in one gloved hand.',
        'It is intrinsically safe to Ex ib IIC T4 for Zone 1/21 under ATEX and IECEx, with Class I Division 1 for North America, rated IP68 and to +55 °C. The 2400 mAh battery is user-replaceable outside the hazardous area, i.safe states security updates until Q4 2032, and a mining version (IS440.M1) is available.',
        'The weight comes from the radio-style design, and so do the limits. The display is 2.4 inches, so it is not a full smartphone, there is no barcode scanning, and no rear camera is listed in our data, only an 8 MP front camera that i.safe says can be used as a bodycam. With T4, check any gas on your site that ignites below 135 °C.',
      ],
    },
    {
      id: 'xshielder-iphone-17',
      label: 'Lightest iPhone for Zone 1',
      why: [
        'Teams that want an iPhone in Zone 1 and carry it all shift will find this the lightest way to do it. The Xshielder iPhone 17 weighs 330 g including the phone, where Xshielder’s iPhone 17 Pro Max and iPhone 16 Pro Max cases weigh 410 g and 415 g, and the Zone 1 iPhones from other makers that we list are heavier than both. Inside the flameproof (Ex db) case is a standard iPhone 17 with a 6.3-inch OLED screen, 48 MP dual cameras and 5G, enrolled through Apple Business (formerly Apple Business Manager) and with security updates expected for 7+ years (based on previous model support).',
        'It also has the strictest temperature class on this list: IIC T6 for Zone 1/21 under ATEX and IECEx, with IECEx covering the S02 version only. The Action Button on the cover can be set for push-to-talk through an app that supports Apple’s Push to Talk framework.',
        'It is the lightest Zone 1 iPhone, not the lightest handset in the zone: the IS330.1 and IS530.1, which i.safe has moved to its archive range, weigh slightly less. Its Ex certificate gives IP6x (dust-tight) and we found no Xshielder document that states a water rating. The battery is not user-replaceable and it charges wirelessly outside the hazardous area, so long shifts call for a spare device.',
      ],
    },
    {
      id: 'bartec-sp9ex1',
      label: 'Lightest phone for Zone 0',
      why: [
        'Sites with Zone 0 areas, such as tanks and process vessels, have only two phones in our data to choose from, and the SP9EX1 is the lighter at 350 g against 370 g for BARTEC’s SC9EX1 Smartscanner. It is intrinsically safe to Ex ia IIC T4 Ga, certified for Zone 0, 1 and 21 under ATEX and IECEx, with a Class I Division 1 approval for North America, so one 350 g handset covers all three gas zones.',
        'Among dedicated Android smartphones for Zone 1 it is also the lightest we list without an availability note, ahead of the ecom Smart-Ex 03 DZ1 at 400 g and the i.safe MOBILE IS540.1 at 422 g. It has a 6.1-inch AMOLED screen that works with gloves or a stylus, two programmable keys for push-to-talk and emergency calls, 5G and a user-replaceable 4300 mAh battery.',
        'It runs Android 15, and BARTEC states security updates until at least May 2030, a shorter window than the 2032 dates on some other Android phones. Check your gases against its T4 class, and note that the Ex dust marking carries IP64 while the phone itself is rated IP68.',
      ],
    },
    {
      id: 'atexxo-zone-2-iphone-16',
      label: 'Best light smartphone for Zone 2-only sites',
      why: [
        'For sites where every hazardous area is Zone 2, Atexxo’s conversion of a standard iPhone 16 brings the weight down to 275 g including the phone, the lowest confirmed smartphone weight in our data. It runs iOS 27, is enrolled through Apple Business (formerly Apple Business Manager) and has security updates expected for 7+ years (based on previous model support). The Atexxo Zone 2 iPhone 15 and iPhone 16e weigh the same, but this version has Wi-Fi 7 where they have Wi-Fi 6.',
        'It is certified for Zone 2/22 only, as Ex ec ic IIC T4 under ATEX with dust group IIIB, so it is not for Zone 1 or conductive dust. The ATEX certification is a unit assessment with no published certificate number, and there is no IECEx certificate. The battery is not user-replaceable, the phone is charged in a safe area, and there is no dedicated push-to-talk key.',
        'One caveat on the weight claim: i.safe lists the Zone 2 IS880.2 smartphone at 267 g, but a reseller gives a different figure and we could not confirm either, so we do not rank on it. If i.safe confirms a lower weight, that phone could take this place.',
      ],
    },
  ],
  pool: (p) => !!p.data.specs.weightG,
  others: {
    filterLabel: 'Sort all phones by weight',
    filterHref: '/phones/?sort=weight',
    tableLabel: 'Other current phones with a stated weight, lightest first',
    note: 'Lightest first. Discontinued models are left out; Find phones lists them. Phones that i.safe has moved to its archive range show “Check availability”, and a weight marked unconfirmed on a phone’s page is not used to rank.',
    sort: 'weight',
    columns: ['weight', 'type', 'zones', 'gasGroup', 'tempClass', 'certification'],
  },
  checklist: {
    lead: 'Your site’s hazardous area classification decides which phones are allowed at all. Within those, compare weight the way your crews will carry it.',
    items: [
      {
        title: 'Weight as carried',
        text: 'For an Ex case or a conversion, the weight includes the phone inside. For a dedicated phone it is the device itself. Compare like for like, with the battery fitted.',
      },
      {
        title: 'Zone first',
        text: 'Weight does not change what a phone is certified for. A Zone 2-only phone cannot be used in a Zone 1 area however light it is, while a Zone 1 phone can also be used in Zone 2.',
      },
      {
        title: 'What you give up',
        text: 'The lightest devices are feature phones and radio-style handsets with small screens. Check the display, operating system, camera and keys against the work before you choose on weight alone.',
      },
      {
        title: 'Battery and charging',
        text: 'A light phone usually has a small battery. Check its capacity, whether you can replace it yourself, and that charging and battery swaps happen outside the hazardous area unless the certificate allows otherwise.',
      },
      {
        title: 'Confirmed weights',
        text: 'Makers sometimes publish different weights for the same phone. We mark those on the phone’s page and never rank on one, so check the datasheet for your exact version.',
      },
    ],
  },
  faq: [
    {
      q: 'What is the lightest phone for hazardous areas?',
      a: 'The lightest Zone 1 phone in our ranking is the i.safe MOBILE IS120.1 at 214 g, a feature phone for calls and texts. By weight alone the lightest in our data is the i.safe MOBILE IS360.2 at 195 g, but it is certified for Zone 2 only and i.safe has moved it to its archive range.',
    },
    {
      q: 'Does an Ex case’s weight include the phone?',
      a: 'In our tables, yes. The weights shown for Xshielder cases and Atexxo conversions include the phone inside, so they compare fairly with dedicated handsets such as the BARTEC SP9EX1. A bare case weighs less than the figure shown.',
    },
    {
      q: 'What is the lightest iPhone for Zone 1?',
      a: 'The Xshielder iPhone 17 at 330 g including the phone, certified IIC T6 for Zone 1/21 under ATEX and IECEx. For sites that are Zone 2 only, the Atexxo Zone 2 iPhone 16, iPhone 15 and iPhone 16e conversions weigh 275 g each.',
    },
    {
      q: 'What is the lightest smartphone for Zone 2?',
      a: 'The Atexxo Zone 2 iPhone 16 is our pick at 275 g including the phone, tied with the iPhone 15 and iPhone 16e conversions. The i.safe MOBILE IS880.2 lists 267 g, but that weight is unconfirmed, so we do not rank on it.',
    },
    {
      q: 'Is a lighter hazardous-area phone less protected?',
      a: 'Not necessarily. Weight reflects the device and how it achieves its protection, not the zone rating: the 214 g IS120.1 is certified for Zone 1, and the 350 g BARTEC SP9EX1 is certified for Zone 0. Check the certificate for your zone, gas group and temperature class rather than the weight.',
    },
    {
      q: 'Can I use a light Zone 2 phone in a Zone 1 area?',
      a: 'No. A Zone 2-only phone is certified to protection level Gc, and Zone 1 needs Gb or higher. Choose from the first four picks if any of your areas is Zone 1.',
    },
  ],
  cta: {
    kind: 'xshielder',
    heading: 'The lightest Zone 1 iPhone',
    text:
      'Xshielder’s iPhone 17 case weighs 330 g including the phone, the lightest Zone 1 iPhone we list, with flameproof (Ex db) IIC T6 certification for Zone 1/21 under ATEX and IECEx. Tell the team about your site and fleet size to get a quote.',
  },
};

export default page;
