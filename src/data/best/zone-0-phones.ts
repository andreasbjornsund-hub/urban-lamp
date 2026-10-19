import type { BestPage } from '../best-pages';

const page: BestPage = {
  slug: 'zone-0-phones',
  title: 'Best Zone 0 Phones 2026: Ex-Rated Picks Compared',
  description:
    'The two phones on sale certified for Zone 0 under ATEX and IECEx in 2026: BARTEC’s intrinsically safe SP9EX1 and SC9EX1 Smartscanner, compared and ranked.',
  h1: 'Best Zone 0 phones in 2026',
  eyebrow: 'Best for · By zone',
  lead:
    'Zone 0 is where an explosive gas atmosphere is present continuously or for long periods, such as inside tanks and process vessels, so a phone taken there needs equipment protection level Ga, the highest for gas. Of the phones we track, only two on sale have it, both intrinsically safe handsets from BARTEC with ATEX, IECEx and North American certification. These are our picks for Zone 0 work, one for inspection and communication and one for scanning and data capture.',
  headings: {
    ranking: 'Our picks for Zone 0',
    checklist: 'What a Zone 0 phone must show',
    others: 'Other Zone 0 phones on sale',
    faq: 'Zone 0 phone questions',
  },
  glanceNote: 'Both are certified for gas Zones 0, 1 and 2 and dust Zones 21 and 22. Prices are on request.',
  glanceColumns: ['protection', 'zones', 'gasGroup', 'tempClass', 'certification', 'weight'],
  method: [
    'We rank first the phone whose certificates cover the most Zone 0 work. The two Zone 0 phones on sale share the same ATEX, IECEx and North American certificates, so the decider is size: the SP9EX1 weighs 350 g and is 17.9 mm thick, against 370 g and 30.8 mm for the SC9EX1 Smartscanner.',
    'Position 2 goes to the better choice for scanning and data capture. Phones rated only for Zone 1 or Zone 2 are not eligible, so there is no table of other phones, and cost is left out because both are priced on request.',
    'The order would change if a certificate showed one phone covering more of Zone 0 than the other, or if another phone gained Zone 0 certification. For teams whose main job is scanning, the Smartscanner is the better fit despite ranking second.',
  ],
  picks: [
    {
      id: 'bartec-sp9ex1',
      label: 'Best overall for Zone 0',
      why: [
        'Our recommendation for work inside tanks, vessels and other spaces where gas is present most of the time is the SP9EX1, and the same handset can stay with the crew in the Zone 1 and Zone 2 areas around them. Its ATEX and IECEx certificates rate it intrinsically safe to Ex ia IIC T4 Ga, and its North American listing names Class I Division 1 and Zone 0 AEx ia IIC T4 Ga. It shares those certificates with the SC9EX1 Smartscanner and ranks ahead as the lighter, slimmer phone, at 350 g and 17.9 mm thick.',
        'Crews get a full 5G Android phone for the rest of the job: push-to-talk and emergency calls sit on two programmable keys, gloves or a stylus work on the 6.1-inch AMOLED screen, and the 48 MP camera films in 4K at 30 frames per second to document what an entry finds. It runs Android 15 and can move to Android 16, and BARTEC states security updates until at least May 2030. For Wi-Fi-only sites, the Cam version drops the cellular radio and keeps the same certificates.',
        'Its limits apply to both Zone 0 phones we list. T4 is the ceiling, so gases that ignite below 135 °C are outside its rating, and dust cover stops at Zones 21 and 22 (protection level Db, with IP64 in the ATEX dust marking), with no Zone 20 rating. The certificate conditions call for protection from high-energy impacts, and BARTEC’s quick start guide sets 2 J as the limit for the display and lenses. Charging and battery swaps take place outside the hazardous area.',
      ],
    },
    {
      id: 'bartec-sc9ex1',
      label: 'Best for scanning and data capture',
      why: [
        'Teams that log stock, samples or equipment in Zone 0 areas get a Zebra scan engine built into the phone, so there is no separate scan module to carry or fit. The SC9EX1 Smartscanner holds the same ATEX, IECEx and North American certificates as the SP9EX1, with “op is” in the marking for inherently safe optical radiation: Ex ia op is IIC T4 Ga, plus Class I Division 1 and Zone 0 AEx in North America.',
        'Apart from the scanner and its size, it is built like the SP9EX1, with 5G, NFC, the same 48 MP camera and 4K video, two programmable keys and glove and stylus touch. It runs Android 15, and BARTEC states security updates until at least May 2030. Its conditions of use add one point: the SE55 scan engine is a Class 2 laser (520 nm).',
        'Size is the cost of the scanner. At 370 g and 30.8 mm thick it is 20 g heavier and nearly 13 mm thicker than the SP9EX1, which is why it ranks second. Otherwise the same limits apply: T4, dust Zones 21 and 22 only, and charging and battery changes outside the hazardous area.',
      ],
    },
  ],
  pool: (p) => p.data.certification.zonesGas.includes('0'),
  others: {
    filterLabel: 'Filter all Zone 0 phones',
    filterHref: '/phones/?zone=0',
    tableLabel: 'Other current phones certified for Zone 0',
    note: 'Both phones on sale that are certified for Zone 0 are ranked above, so there are no others to list. Discontinued models are left out; Find phones lists them.',
  },
  checklist: {
    lead: 'Start from your site’s area classification, confirmed by your safety engineer, then read each phone’s certificate and its conditions of use for your exact model.',
    items: [
      {
        title: 'Equipment protection level',
        text: 'Zone 0 requires equipment protection level Ga, shown at the end of the gas marking (ATEX category 1G). Gb is the Zone 1 level and Gc the Zone 2 level, whatever the protection method.',
      },
      {
        title: 'Protection method',
        text: 'Intrinsic safety at level ia keeps the energy in the circuits too low to ignite the atmosphere, even with two faults, and it is how both Zone 0 phones here are protected. The flameproof (Ex db) cases we list are certified for Zone 1, not Zone 0.',
      },
      {
        title: 'Gas group and temperature class',
        text: 'Both phones are IIC, the group that includes hydrogen and acetylene, and T4, which limits the surface to 135 °C. Make sure every substance on your site ignites above that temperature.',
      },
      {
        title: 'Dust zone',
        text: 'A Zone 0 gas rating says nothing about dust. Both phones are certified for dust Zones 21 and 22, so they are not for Zone 20, where dust is present continuously or for long periods.',
      },
      {
        title: 'Certificates and conditions',
        text: 'Both phones share certificate numbers you can look up: UL 24 ATEX 3153X and IECEx UL 24.0004X. Their conditions of use require protection from high-energy impacts and strong electrostatic charge, and charging and battery changes outside the hazardous area.',
      },
    ],
  },
  faq: [
    {
      q: 'What is the best phone for Zone 0 hazardous areas?',
      a: 'The BARTEC SP9EX1 ranks first. It has the same ATEX, IECEx and North American certificates as the SC9EX1 Smartscanner, the other Zone 0 phone on sale, and is lighter and slimmer (350 g against 370 g). Choose the Smartscanner when scanning is the main task.',
    },
    {
      q: 'Do I need a Zone 0 phone for Zone 1 or Zone 2 work?',
      a: 'No. A phone certified for Zone 1 is enough for Zone 1 and Zone 2. A Zone 0 phone makes sense when crews enter tanks, vessels or other Zone 0 spaces, because one device then covers every zone on the site.',
    },
    {
      q: 'Why is an Ex ia phone sometimes rated for Zone 1 only?',
      a: 'Because the protection level on the certificate applies to the whole phone, and Zone 0 needs Ga. Some Ex ia phones are certified at Gb, the Zone 1 level, such as the ecom Smart-Ex 03 DZ1 (Ex ia IIC T4 Gb), so check the final letters of the marking as well as “ia”.',
    },
    {
      q: 'Can a flameproof case be used in Zone 0?',
      a: 'None that we list. A flameproof (Ex db) case is rated at protection level Gb, the Zone 1 level, because it is built to contain an ignition inside it rather than prevent one. Both Zone 0 phones on sale are intrinsically safe.',
    },
    {
      q: 'What does T4 mean for a Zone 0 phone?',
      a: 'It is the temperature class: the phone’s surface stays at or below 135 °C. Both Zone 0 phones are T4, so substances that ignite below 135 °C are outside their rating.',
    },
    {
      q: 'Does a Zone 0 phone need both ATEX and IECEx certification?',
      a: 'Only where your site calls for both. ATEX applies to equipment sold in the EU and is also accepted in Great Britain, IECEx is accepted in many other markets, and North American sites need a listing for the location. Both BARTEC phones carry all three, plus Korean KCs certificates.',
    },
  ],
  cta: {
    kind: 'neutral',
    heading: 'Choosing between two Zone 0 phones',
    text:
      'The SP9EX1 and the SC9EX1 Smartscanner share certificates, so the choice comes down to the work your team does. Tell us about your site and tasks and we will help you choose impartially, or check whether a Zone 1 phone would do.',
  },
};

export default page;
