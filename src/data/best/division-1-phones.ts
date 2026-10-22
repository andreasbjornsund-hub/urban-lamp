import type { BestPage } from '../best-pages';
import { confirmedDivision } from '../../lib/phones';

const page: BestPage = {
  slug: 'division-1-phones',
  title: 'Best Intrinsically Safe Phones for Class I Div 1 & 2 (2026)',
  description:
    'The best phones for Class I Division 1 and 2 locations in 2026, ranked by North American listing. Intrinsically safe handsets and an iPhone option compared.',
  h1: 'Best Class I Division 1 & 2 phones in 2026',
  eyebrow: 'Best for · By zone',
  lead:
    'In North America, hazardous locations are classified by Class and Division: Class I covers flammable gases and vapors, Division 1 means they are likely to be present in normal operation, and Division 2 means they are present only in abnormal conditions. A phone used there must be approved or listed for the location under the NEC or CEC, so an ATEX or IECEx certificate alone is not enough. Beyond the listing, what matters is the gas groups, the temperature code and the work a phone lets your team do. These are our picks for each kind of Class I Division 1 and 2 work, from lone working and push-to-talk to scanning, long shifts and iPhone fleets.',
  headings: {
    ranking: 'Our picks for Class I Division 1 & 2',
    checklist: 'What a Division 1 or 2 phone must show',
    others: 'Other Division 1 and 2 phones on sale',
    faq: 'Division 1 and 2 phone questions',
  },
  glanceNote:
    'All five have a Class I Division rating in our data, Division 1 on the first three and Division 2 on the last two. Prices are on request.',
  glanceColumns: ['protection', 'division', 'zones', 'tempClass', 'certification', 'weight'],
  method: [
    'Rank 1 goes to the phone whose North American certification covers the most hazardous locations: Class I Division 1 (which also covers Division 2), dust locations (Class II and III) and the NEC 505 Zone system. Where two phones share a listing, the lighter one ranks first.',
    'Positions 2 to 5 each name the strongest choice for a different kind of work, such as lone working and push-to-talk, scanning, long shifts on Division 2 sites, or iPhone fleets. Division 1 phones come first because Division 1 equipment can also be used in Division 2, and the two Division 2 phones are picked for work that only they serve in our data: charging inside the location, and the iPhone 17 with a North American rating. Prices are on request for every brand, so cost does not affect the order.',
    'The order follows the North American listings, and it would change if a certificate showed another phone covers more locations. The BARTEC SC9EX1 Smartscanner shares the listing of the rank 1 phone and sits third because it is the pick for scanning, not because its listing is narrower.',
  ],
  picks: [
    {
      id: 'bartec-sp9ex1',
      label: 'Best overall for Class I Division 1 & 2',
      why: [
        'No phone we have found has a wider North American listing than the SP9EX1, which makes it our first choice for teams that move between Division 1 and Division 2 locations or run sites that also have Zone-classified areas. Its NEC/CEC 500/505 listing (file E226123) covers Class I Division 1 Groups A to D, Class II Division 1 Groups E to G and Class III at T4, and adds Class I Zone 0 AEx ia IIC T4 Ga and Zone 21 AEx ia IIIC T135 °C Db. Because Division 1 equipment can also be used in Division 2, one intrinsically safe (Ex ia) phone covers both, and BARTEC lists a North American version for Verizon.',
        'In use, two programmable keys cover push-to-talk and emergency calls, glove and stylus touch works on the 6.1-inch AMOLED screen, and the 48 MP camera shoots 4K video for records. It runs Android 15 with an upgrade path to Android 16 and has 5G. At 350 g and 17.9 mm thick it is lighter and slimmer than the SC9EX1, which shares its listing, and that decides the order.',
        'Check the temperature code: the listing is T4, so gases that ignite below 135 °C are outside it. BARTEC states security updates until at least May 2030, a shorter horizon than the ecom, i.safe and Xciel picks here, so plan the replacement cycle accordingly. Charging and battery changes happen outside the hazardous location.',
      ],
    },
    {
      id: 'ecom-smart-ex-03-dz1',
      label: 'Best for lone workers and push-to-talk crews',
      why: [
        'Lone workers and radio-style crews on Division 1 sites get the most from this Android phone. A dedicated push-to-talk key works with third-party push-to-talk apps, and an alarm key can be assigned to ecom’s eSentinel alarm app. Glove touch, a 6-inch display and a camera optimized for eBARCODE-ML scanning (a paid add-on) fill the rest of the day, and a camera-free version is available for sites that restrict cameras.',
        'Its cMETus listing (Eurofins MET, file E115956) covers Class I Division 1 Groups A to D at T4, Class II Division 1 Groups E to G and Class III Division 1, plus Class I Zone 1 AEx ia IIC T4 Gb. ATEX, IECEx and UKEX certificates, with approvals in Brazil, Korea, South Africa and Japan, make it easy to move between regions. It is rated to +60 °C, against +55 °C for the BARTEC and i.safe picks, and security updates are listed until Q4 2032 on a device that is Android Enterprise Recommended.',
        'Its North American listing stops at Zone 1: there is no Zone 0 or NEC 505 Zone 0 rating, which the BARTEC pair have. At 400 g it is the heaviest of our five with a published weight, and Android 15 is its upgrade limit. The temperature code is T4, and the user-replaceable 4400 mAh battery is swapped outside the hazardous location.',
      ],
    },
    {
      id: 'bartec-sc9ex1',
      label: 'Best for scanning and data capture',
      why: [
        'Teams that scan stock, tags and equipment in Division 1 locations will want the built-in Zebra scan engine, which makes this the only one of our five with a built-in scanner. It carries the same North American listing as the SP9EX1: Class I Division 1 Groups A to D, Class II Division 1 Groups E to G, Class III and Zone 0 AEx ia op is IIC T4 Ga, with “op is” covering inherently safe optical radiation. BARTEC lists a North American version for Verizon here too.',
        'It is a sibling of the SP9EX1 with the same certificates, so the rest of the phone is shared: 5G, NFC, a 48 MP camera with 4K video, two programmable keys for push-to-talk and emergency calls, Android 15, and security updates stated by BARTEC until at least May 2030. Because the listings match, the choice between the two comes down to whether your team needs the scan engine.',
        'The trade-off is size: at 370 g and 30.8 mm thick it is heavier and thicker than the SP9EX1. The conditions of use note that the scan engine is a Class 2 laser (520 nm), and the same T4 temperature code applies. Charging and battery changes happen outside the hazardous location.',
      ],
    },
    {
      id: 'isafe-is440-2',
      label: 'Best for long shifts on Division 2 sites',
      why: [
        'Maintenance and shutdown crews on Division 2 sites who work long shifts will notice the charging rules first. The IS440.2 may be charged inside Class I Division 2 locations through its external charging contacts, using i.safe-approved charging equipment, and no other phone in our data has that permission. A crew can top up in place instead of leaving the location mid-shift, though the QPS listing allows contact charging in Class I Division 2 but not in Class II Division 2, so check which dust classes apply.',
        'The listing, QPS Certificate of Compliance LR3081-8R1, covers Class I Division 2 Groups A to D at T4, Class II Division 2 Groups F and G (135 °C) and Class III. It is a radio-style handheld with a dedicated push-to-talk key, a channel selector and a programmable red key for SOS or lone working. It has 5G, is rated IP68 and MIL-STD-810H, and at 307 g it is the lightest of our five with a published weight.',
        'It is a Division 2 phone only: its Division 1 sibling, the IS440.1, has to be charged outside the hazardous area. The screen is 2.4 inches and apps come from i.safe’s curated App World of push-to-talk and device-management apps, the ambient range tops out at +55 °C and the temperature code is T4. i.safe states security updates until Q4 2032.',
      ],
    },
    {
      id: 'xciel-xciphone-17',
      label: 'Best for iPhone fleets on Division 2 sites',
      why: [
        'Fleets standardized on iPhone that need a North American rating have one current-generation option in our data, and this is it. Xciel’s XCiPhone17 version is listed for Class I Division 2, Groups A to D, by LabTest, a nationally recognized testing laboratory, and Xciel installs the iPhone in it; the XCiPhone17-A is the ATEX Zone 2 version. Inside the intrinsically safe (Ex ic) case is a standard iPhone 17 running iOS 27, enrolled through Apple Business (formerly Apple Business Manager), with security updates expected for 7+ years (based on previous model support). Xshielder and Atexxo have no North American approval in our data.',
        'Where it falls short is the rest of the certificate picture. It covers Division 2 and Zone 2 only, our data has no dust rating, IECEx certificate or published weight for it, and its ATEX rating (Ex ic IIC T4 Gc) is self-declared by Xciel for category 3 rather than backed by a notified-body certificate, so ask Xciel for the listing and declaration for your exact model. Fleets still on the iPhone 14 can look at Xciel’s XCiPhone 14, which is also listed for Class I Division 2, Groups A to D.',
        'Plan around the conditions. Charging and wired accessories are for outside the hazardous location only, and it is not for Class I Division 1 or Zones 0, 1, 20, 21 or 22. There is no dedicated push-to-talk key, so push-to-talk runs through an app built on Apple’s Push to Talk framework, touch is standard capacitive, and the battery is not user-replaceable.',
      ],
    },
  ],
  pool: (p) => !!confirmedDivision(p),
  others: {
    filterLabel: 'Filter Division 1 and 2 phones',
    filterHref: '/phones/?div=2',
    tableLabel: 'Other current phones with a North American Class I Division rating',
    note: 'The filter also shows Division 1 phones, which can be used in Division 2. Discontinued models are left out; Find phones lists them. A North American rating is shown only where we could confirm it.',
    columns: ['type', 'division', 'gasGroup', 'tempClass', 'certification', 'os', 'weight'],
  },
  checklist: {
    lead: 'Your site’s hazardous location classification decides which of these matter. Confirm it with your safety engineer, then check each phone’s listing for your exact model.',
    items: [
      {
        title: 'Class',
        text: 'Class I covers flammable gases and vapors, Class II combustible dust and Class III ignitable fibers and flyings. Gas-only sites need Class I, but check whether dust or fibers are also present.',
      },
      {
        title: 'Division 1 or 2',
        text: 'Division 1 is where ignitable concentrations are likely in normal operation, and Division 2 where they appear only in abnormal conditions, such as a leak. Division 1 equipment can also be used in Division 2, but not the other way round.',
      },
      {
        title: 'Groups A to D',
        text: 'Class I gases are sorted into Groups A to D by how readily they ignite: A is acetylene, B hydrogen, C ethylene and D includes propane and gasoline vapor. Dust in Class II uses Groups E to G. Check that the listing names every group on your site.',
      },
      {
        title: 'Temperature code',
        text: 'Like the T class elsewhere, the code caps the surface temperature: T4 is 135 °C. Choose a code whose limit sits below the ignition temperature of the substances you handle.',
      },
      {
        title: 'Listing by a recognized lab',
        text: 'In North America, equipment must be approved or listed for the location by a recognized testing laboratory, with a file or certificate number you can check. An ATEX or IECEx certificate alone does not do this, and our phone pages show the listing where we found it.',
      },
    ],
  },
  faq: [
    {
      q: 'What is the best phone for Class I Division 1 and 2 locations?',
      a: 'On North American listing coverage, the BARTEC SP9EX1 ranks first: Class I Division 1 Groups A to D at T4, Class II and III, plus a Class I Zone 0 AEx rating. For lone workers and push-to-talk crews, the ecom Smart-Ex 03 DZ1 is our top pick.',
    },
    {
      q: 'Is an ATEX or IECEx certificate enough in North America?',
      a: 'No. The NEC and CEC require equipment approved or listed for the location, so look for a North American listing from a recognized testing laboratory, not just ATEX or IECEx. All five picks have a North American rating in our data, but check the listing for your exact model.',
    },
    {
      q: 'What is the difference between Division 1 and Division 2?',
      a: 'Division 1 is where ignitable gas or vapor is likely to be present in normal operation, and Division 2 is where it appears only in abnormal conditions, such as a leak. Division 1 equipment can also be used in Division 2, but a Division 2 phone is not for Division 1.',
    },
    {
      q: 'What is the difference between Division and Zone classification?',
      a: 'Division is the older system in NEC Article 500, with Divisions 1 and 2. The NEC 505 Zone system uses Zones 0, 1 and 2 as ATEX and IECEx do, and Zones 0 and 1 roughly match Division 1 while Zone 2 roughly matches Division 2. Check that a phone’s listing names the system your site uses: the BARTEC SP9EX1 and SC9EX1 list both Division 1 and Zone 0 AEx.',
    },
    {
      q: 'Can an iPhone be used in a Class I Division 2 location?',
      a: 'Only in a certified case or conversion that is listed for the location. In our data, the Xciel XCiPhone 17 is the only current-generation iPhone option with a North American rating: its Division 2 version is listed for Class I Division 2, Groups A to D. Xshielder and Atexxo have no North American approval in our data.',
    },
    {
      q: 'What do Groups A to D and T4 mean on a listing?',
      a: 'Groups A to D are the Class I gas groups, and T4 is the temperature code that caps the surface at 135 °C. The BARTEC, ecom and i.safe picks list Groups A to D at T4, and the Xciel XCiPhone 17’s Division 2 listing also covers Groups A to D.',
    },
  ],
  cta: {
    kind: 'neutral',
    heading: 'Need help matching a phone to your location?',
    text:
      'Your classification, gas groups and temperature code decide which phones qualify, and the listing for your exact model is what counts. Tell us about your site and we will help you compare phones impartially.',
  },
};

export default page;
