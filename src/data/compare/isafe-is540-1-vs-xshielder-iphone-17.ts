import type { ComparePage } from '../compare-pages';

const page: ComparePage = {
  phones: ['isafe-is540-1', 'xshielder-iphone-17'],
  title: 'i.safe MOBILE IS540.1 vs Xshielder iPhone 17 Compared',
  description:
    'i.safe MOBILE IS540.1 or Xshielder iPhone 17? Zone 1 certification, battery, weight, camera, push-to-talk and updates compared, with our pick for each team.',
  h1: 'i.safe MOBILE IS540.1 vs Xshielder iPhone 17',
  eyebrow: 'Compare · iPhone or Android for Zone 1',
  lead:
    'These two answer the same Zone 1 question in different ways. The i.safe MOBILE IS540.1 is a dedicated intrinsically safe (Ex ib) Android phone. The Xshielder iPhone 17 is a flameproof (Ex db) case around a standard Apple iPhone 17. Both are certified for Zone 1/21 under ATEX and IECEx, though for the Xshielder case IECEx covers the cemented-lid S02 version only. The differences that decide the choice are practical: North America, gas temperature class, the battery and weight. Here is how they compare, and which we would choose for which team.',
  verdict: {
    summary: [
      'On the practical points, the i.safe MOBILE IS540.1 wins more of them: it has a North American approval in our data, a higher ambient limit, glove touch and a battery you can swap, so we would choose it for North American sites, hot sites, gloved crews and long shifts. We would choose the Xshielder iPhone 17 for teams that want an iPhone in Zone 1: it is the one for substances that ignite below 135 °C, for crews who carry the phone all shift at 330 g against 422 g, for photo work with two 48 MP rear cameras confirmed through the case, and for fleets already managed through Apple Business.',
    ],
    choose: [
      {
        id: 'isafe-is540-1',
        reasons: [
          'You work in North America: it is approved for Class I, II and III Division 1 (T4), while our data does not list a North American approval for the Xshielder iPhone 17.',
          'Your crews wear gloves and rely on push-to-talk or an alarm: it has glove touch, a programmable red key and a programmable left side key.',
          'Shifts outrun one charge: its 4400 mAh battery is user-replaceable, so you swap it outside the hazardous area instead of waiting for a recharge.',
          'Your sites run hot or wet: it is certified up to +55 °C ambient, against +50 °C for the Xshielder iPhone 17, and it is rated IP68, while the Xshielder iPhone 17’s Ex certificate gives IP6X (dust-tight) only.',
          'Some of your crews work underground: the i.safe MOBILE IS540.M1 mining version keeps the Zone 1/21 rating.',
        ],
      },
      {
        id: 'xshielder-iphone-17',
        reasons: [
          'Your plant handles substances that ignite below 135 °C: it is rated T6 (≤ 85 °C) for gas and T80 °C for dust, against T4 and T135 °C.',
          'Crews carry the phone all shift: it weighs 330 g including the phone, against 422 g for the i.safe MOBILE IS540.1.',
          'Inspection and survey teams document the work: it has two 48 MP rear cameras and an 18 MP front camera, all confirmed through the case, where i.safe’s datasheet lists one 48 MP autofocus camera and a 5 MP front camera.',
          'Your fleet already runs iPhones: a standard iPhone 17 sits inside, enrolled through Apple Business, with security updates expected for 7+ years (based on previous model support).',
        ],
      },
    ],
  },
  differences: [
    {
      row: 'North America',
      note: 'An approval decides whether a phone may be used on a US or Canadian site at all. The i.safe MOBILE IS540.1 is approved for Class I, II and III Division 1 (we have not found its certificate number). Our data does not list a North American approval for the Xshielder iPhone 17, so ask Xshielder before specifying it there.',
    },
    {
      row: 'Temperature class',
      title: 'Gas temperature class',
      note: 'T6 matters only where a substance ignites below 135 °C, and most hydrocarbons sit at T1 to T3. If yours does, the Xshielder iPhone 17 is the one that fits; for most gases, the i.safe MOBILE IS540.1’s T4 is enough.',
    },
    {
      row: 'Replaceable battery',
      note: 'The i.safe MOBILE IS540.1 lets you swap a charged battery outside the hazardous area. The Xshielder iPhone 17’s battery is not user-replaceable and is charged wirelessly outside the hazardous area, so plan charging around the shift.',
    },
    {
      row: 'Weight',
      note: 'The Xshielder iPhone 17 weighs 330 g including the phone, against 422 g for the i.safe MOBILE IS540.1. For crews who carry the phone for a full shift, that is 92 g less to carry.',
    },
  ],
  sections: [
    {
      title: 'Certification and where you can work',
      edge: 'isafe-is540-1',
      text: [
        'On the core rating the two match. Both are certified for Zone 1/21 under ATEX and IECEx, with gas group IIC and protection levels Gb and Db, and for the Xshielder case IECEx covers the cemented-lid S02 version only. The i.safe MOBILE IS540.1 goes further on paper: it is approved for Class I, II and III Division 1 in North America, lists approvals for Brazil, Korea, South Africa and Japan, and has a mining version. Our data does not list a North American or other national approval, or a mining version, for the Xshielder iPhone 17. On water protection, the i.safe MOBILE IS540.1 is rated IP68, while the Xshielder iPhone 17’s Ex certificate gives IP6X (dust-tight) only and we found no Xshielder document that states a water rating.',
        'Heat and gas class pull in opposite directions. The i.safe MOBILE IS540.1 is certified from −20 °C to +55 °C ambient, against −20 °C to +50 °C for the Xshielder case. The Xshielder iPhone 17 has the stricter T6 rating (maximum surface temperature 85 °C for gas, 80 °C for dust) against T4 and 135 °C. T6 matters only where a substance ignites below 135 °C; most hydrocarbons sit at T1 to T3. Its conditions of use also say the enclosure was tested for low impact energy and should not be exposed to high impact risk, where the i.safe MOBILE IS540.1 lists MIL-STD-810H.',
      ],
    },
    {
      title: 'Push-to-talk, gloves and lone working',
      edge: 'isafe-is540-1',
      text: [
        'The i.safe MOBILE IS540.1 is built for gloved, radio-style work. It has glove touch, a programmable red key and a programmable left side key, assigned through i.safe’s Button App: typically the red key for a lone-worker alarm and the side key for push-to-talk. The red key is also its built-in emergency key, and push-to-talk runs through a third-party app. For crews in thick gloves and lone workers who want a hardware alarm, it is the better fit.',
        'The Xshielder iPhone 17 does this through the programmable Action Button on its cover, with apps built on Apple’s Push to Talk framework. There is no separate push-to-talk key, and you need such an app. Its touchscreen is standard capacitive, without glove touch. Headset audio is Bluetooth only, because the USB-C port is not accessible, and an Ex-certified Bluetooth headset is recommended; the speakers and microphones work through the cover, but output is reduced against a bare iPhone. Its emergency function is iOS Emergency SOS, and lone-worker cover comes from an app.',
      ],
    },
    {
      title: 'Inspection photos, scanning and data capture',
      edge: 'even',
      text: [
        'On photos, the Xshielder iPhone 17 has more confirmed hardware. Its two 48 MP rear cameras, a main and an ultra wide, with 2x optical-quality zoom, are confirmed through the case, and so are the 18 MP Center Stage front camera and Face ID; video is 4K60 with Dolby Vision. i.safe’s datasheet lists one 48 MP autofocus camera (a distributor sheet lists 40 MP) and a 5 MP front camera, and our data lists no video specification. For inspection records and corrosion photos the iPhone is the stronger tool. There is no Camera Control button on the cover, though the Action Button can open the camera.',
        'Scanning in volume tips the other way. i.safe’s route is hardware: a barcode scan module that attaches through the 16-pin ISM interface, which suits all-day stock and asset rounds. The Xshielder iPhone 17 reads QR codes with its camera and handles 1D and 2D codes through an app. The i.safe MOBILE IS540.1 reads NFC tags built in and takes a microSD card of up to 128 GB, with only approved cards in the hazardous area; our data does not confirm NFC reading through Xshielder’s metal enclosure. A camera-free version of the i.safe MOBILE IS540.1 exists for sites that ban cameras, and our data lists none for the Xshielder iPhone 17.',
      ],
    },
    {
      title: 'Battery, weight and fleet management',
      edge: 'isafe-is540-1',
      text: [
        'Power is the clearest practical gap. The i.safe MOBILE IS540.1 has a 4400 mAh battery you can swap, so a crew can carry a charged spare and change it outside the hazardous area; it charges with i.safe’s PROTECTOR 2.0 USB-C cable or other approved equipment, also outside the hazardous area. The Xshielder iPhone 17 has a 3692 mAh battery that is not user-replaceable, and with the USB-C port not accessible it charges wirelessly (MagSafe, up to 25 W), again outside the hazardous area. Capacity is not runtime, and our data lists a battery life only for the iPhone, so we do not compare how long each lasts. Weight goes the other way: the Xshielder iPhone 17 weighs 330 g including the phone, against 422 g for the i.safe MOBILE IS540.1.',
        'For IT teams, the choice is mostly about what you already run. The Xshielder iPhone 17 is a standard iPhone inside, so it works with the same apps and management as other iPhones, through Apple Business, and its security updates are expected for 7+ years (based on previous model support). Only Xshielder-authorized personnel may open the case. The i.safe MOBILE IS540.1 runs Android 14, is Android Enterprise Recommended, and i.safe states security patches until Q4 2032. Operators on a Nokia private wireless network have one more reason to look at it: Nokia sells it in its private wireless portfolio.',
      ],
    },
  ],
  faq: [
    {
      q: 'Is the i.safe MOBILE IS540.1 better than the Xshielder iPhone 17?',
      a: 'Neither is better across the board. The i.safe MOBILE IS540.1 wins more of the practical points: a North American approval, +55 °C ambient, glove touch and a swappable battery. The Xshielder iPhone 17 wins on gas temperature class (T6), weight (330 g against 422 g) and fit with an iPhone fleet. Both are certified for Zone 1/21.',
    },
    {
      q: 'Can either phone be used in Zone 0?',
      a: 'No. Both are certified to protection level Gb for gas, which covers Zone 1 and Zone 2, and Db for dust. Neither the i.safe MOBILE IS540.1 nor the Xshielder iPhone 17 is certified for Zone 0.',
    },
    {
      q: 'Are both phones approved for North America?',
      a: 'Our data confirms it for one. The i.safe MOBILE IS540.1 is approved for Class I, II and III Division 1, with temperature code T4; we have not found its certificate number. Our data does not list a North American approval for the Xshielder iPhone 17, so ask Xshielder before specifying it for a US or Canadian site.',
    },
    {
      q: 'Which gets security updates for longer?',
      a: 'They look close. For the i.safe MOBILE IS540.1, i.safe states security patches until Q4 2032, while Google’s Android Enterprise directory lists 30 January 2032. Apple does not publish an end date for the iPhone 17 inside the Xshielder case; previous iPhone models have had security updates for seven years or more.',
    },
    {
      q: 'Can you charge either phone in the hazardous area?',
      a: 'No. Both must be charged outside the hazardous area. The i.safe MOBILE IS540.1 also needs its battery changed there, and i.safe specifies its PROTECTOR 2.0 USB-C cable or other approved equipment. The Xshielder iPhone 17 charges wirelessly with MagSafe because its USB-C port is not accessible.',
    },
    {
      q: 'Do both phones support push-to-talk?',
      a: 'Yes, with an app. The i.safe MOBILE IS540.1 has programmable keys, its red key and left side key, and push-to-talk runs through a third-party app. On the Xshielder iPhone 17 it uses the programmable Action Button on the cover with apps built on Apple’s Push to Talk framework: there is no separate push-to-talk key, and you need such an app.',
    },
    {
      q: 'How much do the i.safe MOBILE IS540.1 and Xshielder iPhone 17 cost?',
      a: 'Prices depend on volume, configuration and region, so both are on request. Contact us for a price.',
    },
  ],
  cta: {
    kind: 'xshielder',
    heading: 'The Xshielder iPhone 17 for Zone 1/21',
    text: 'The Xshielder iPhone 17 is a flameproof (Ex db) case around a standard Apple iPhone 17, rated IIC T6 for Zone 1/21 under ATEX, with IECEx for the cemented-lid S02 version only. Tell us about your site and fleet size to get a quote.',
  },
};

export default page;
