import type { ComparePage } from '../compare-pages';

const page: ComparePage = {
  phones: ['isafe-is440-1', 'xshielder-iphone-17'],
  title: 'i.safe MOBILE IS440.1 vs Xshielder iPhone 17 Compared',
  description:
    'i.safe MOBILE IS440.1 or Xshielder iPhone 17? A push-to-talk handheld or an iPhone for Zone 1: Division 1, temperature class, battery and cameras compared.',
  h1: 'i.safe MOBILE IS440.1 vs Xshielder iPhone 17',
  eyebrow: 'Compare · Radio-style handheld or iPhone',
  lead:
    'These two answer the Zone 1 question in different ways. The i.safe MOBILE IS440.1 is an intrinsically safe (Ex ib) radio-style handheld with a dedicated push-to-talk key and a battery you can swap. The Xshielder iPhone 17 is a flameproof (Ex db) case around a standard Apple iPhone 17, a full smartphone. Both are certified for Zone 1/21 under ATEX and IECEx, though for the Xshielder case IECEx covers the cemented-lid S02 version only. The differences that decide the choice are the job, North America, gas temperature class and the battery. Here is how they compare, and which we would choose for which team.',
  verdict: {
    summary: [
      'On the practical points, the i.safe MOBILE IS440.1 wins more of them: it has push-to-talk hardware, a North American Class I Division 1 listing, a higher ambient limit, glove and wet touch and a battery you can swap, so we would choose it for push-to-talk crews, North American sites, hot sites and gloved work. We would choose the Xshielder iPhone 17 for teams that want an iPhone in Zone 1: it is the one for substances that ignite below 135 °C, for photos and scanning with the cameras confirmed through the case, for Face ID and for fleets already managed through Apple Business.',
    ],
    choose: [
      {
        id: 'isafe-is440-1',
        reasons: [
          'You work in North America: it is approved for Class I Division 1 (Groups A to D, T4), Class II Division 1 and Class III, while our data does not list a North American approval for the Xshielder iPhone 17.',
          'Voice is the job: it has a dedicated push-to-talk key with PoC apps, a channel selector and M1 and M2 keys, where the Xshielder iPhone 17 uses the programmable Action Button on the cover and an app built on Apple’s Push to Talk framework.',
          'Your crews wear gloves or work with wet hands: it has glove and wet touch, where the Xshielder iPhone 17’s touchscreen is standard capacitive without glove touch.',
          'You want to swap a charged battery instead of waiting for a recharge: its battery is user-replaceable outside the hazardous area, while the Xshielder iPhone 17’s is not.',
          'Your sites run hot or include underground work: it is certified up to +55 °C ambient, against +50 °C, and the i.safe MOBILE IS440.M1 mining version keeps the Zone 1/21 rating.',
        ],
      },
      {
        id: 'xshielder-iphone-17',
        reasons: [
          'Your plant handles substances that ignite below 135 °C: it is rated T6 (≤ 85 °C) for gas and T80 °C for dust, against T4 and T135 °C.',
          'Inspection photos, camera scanning or Face ID unlock are part of the job: Xshielder confirms the 48 MP rear cameras, the 18 MP front camera and Face ID work through the case, and barcode scanning is not available on the i.safe MOBILE IS440.1.',
          'Your crews read, type and run iPhone apps: it has a 6.3-inch OLED display at 2622 × 1206, iOS 27, 8 GB of RAM and 256 GB or 512 GB of storage, against 2.4 inches at 240 × 320, 4 GB and 64 GB.',
          'Your fleet already runs iPhones: a standard iPhone 17 sits inside, enrolled through Apple Business, with security updates expected for 7+ years (based on previous model support).',
        ],
      },
    ],
  },
  differences: [
    {
      row: 'North America',
      note: 'An approval decides whether a phone may be used on a US or Canadian site at all. The i.safe MOBILE IS440.1 is listed for Class I Division 1 (Groups A to D, T4), Class II Division 1 and Class III. Our data does not list a North American approval for the Xshielder iPhone 17, so ask Xshielder before specifying it there.',
    },
    {
      row: 'Temperature class',
      title: 'Gas temperature class',
      note: 'T6 matters only where a substance ignites below 135 °C, and most hydrocarbons sit at T1 to T3. If yours does, the Xshielder iPhone 17 is the one that fits; for most gases, the i.safe MOBILE IS440.1’s T4 is enough.',
    },
    {
      row: 'Push-to-talk',
      note: 'The i.safe MOBILE IS440.1 has a dedicated push-to-talk key, PoC (push-to-talk over cellular) apps, a channel selector and M1 and M2 keys. The Xshielder iPhone 17 uses the programmable Action Button on the cover with apps built on Apple’s Push to Talk framework: there is no separate push-to-talk key, and you need such an app.',
    },
    {
      row: 'Display',
      note: 'The Xshielder iPhone 17 has a 6.3-inch OLED display at 2622 × 1206, with room to read, type and run iPhone apps. The i.safe MOBILE IS440.1 has a 2.4-inch display at 240 × 320, with glove and wet touch and keys for the main actions.',
    },
    {
      row: 'Replaceable battery',
      note: 'The i.safe MOBILE IS440.1 lets you swap a charged battery outside the hazardous area. The Xshielder iPhone 17’s battery is not user-replaceable and is charged wirelessly outside the hazardous area, so plan charging around the shift.',
    },
  ],
  sections: [
    {
      title: 'Certification and where you can work',
      edge: 'isafe-is440-1',
      text: [
        'On the core rating the two match. Both are certified for Zone 1/21 under ATEX and IECEx, with gas group IIC and protection levels Gb and Db, and for the Xshielder case IECEx covers the cemented-lid S02 version only. The i.safe MOBILE IS440.1 goes further on paper: it holds a Class I Division 1 listing in North America, with Class II Division 1 and Class III, lists approvals for Brazil, Korea, China, Japan and South Africa, and has a mining version. Our data lists no North American approval, other national approvals or mining version for the Xshielder iPhone 17.',
        'Heat and gas class pull in opposite directions. The i.safe MOBILE IS440.1 is certified from −20 °C to +55 °C ambient, against −20 °C to +50 °C for the Xshielder iPhone 17. The Xshielder iPhone 17 has the stricter T6 rating (maximum surface temperature 85 °C for gas, 80 °C for dust) against T4 and 135 °C. T6 matters only where a substance ignites below 135 °C. Its certificate also says the case was tested for low impact energy and should not be exposed to high impact risk, and gives IP6X (dust-tight) only, with no water rating in the documents we found, while the i.safe MOBILE IS440.1 is rated IP68 and MIL-STD-810H.',
      ],
    },
    {
      title: 'Push-to-talk, gloves and lone working',
      edge: 'isafe-is440-1',
      text: [
        'The i.safe MOBILE IS440.1 is built for gloved, radio-style work. It has a dedicated push-to-talk key with PoC apps, a channel selector, M1 and M2 keys and a programmable red key that i.safe lists for SOS and lone-worker use, and its touch works with gloves and wet hands. App World comes preinstalled with curated push-to-talk and MDM apps, and audio accessories connect through the 8-pin ISM interface. For crews in gloves and lone workers who want a hardware alarm, it is the better fit.',
        'The Xshielder iPhone 17 does this through the programmable Action Button on its cover, with apps built on Apple’s Push to Talk framework. There is no separate push-to-talk key, and you need such an app. Its touchscreen is usable through the Gorilla Glass window but standard capacitive, without glove touch. Headset audio is Bluetooth only, because the USB-C port is not accessible, and an Ex-certified Bluetooth headset is recommended; the microphones and speakers work through the cover, but output is reduced against a bare iPhone. Its emergency function is iOS Emergency SOS, and lone-worker cover comes from an app on both phones.',
      ],
    },
    {
      title: 'Cameras, display and apps',
      edge: 'xshielder-iphone-17',
      text: [
        'This is where the Xshielder iPhone 17 pulls ahead. Xshielder confirms that the 48 MP rear cameras, the 18 MP Center Stage front camera and Face ID work through the case, along with touch through the Gorilla Glass window and power and volume keys on the cover. There is no Camera Control button on the cover, though the Action Button can open the camera. The iPhone reads QR codes through the camera and 1D and 2D codes through an app. Our data has no rear camera figures for the i.safe MOBILE IS440.1, and barcode scanning is listed as not available on it, but its 8 MP front camera is usable as a bodycam.',
        'On screen and software, the Xshielder iPhone 17 has a 6.3-inch OLED at 2622 × 1206, iOS 27 on the Apple A19, 8 GB of RAM and 256 GB or 512 GB of storage, managed through Apple Business, and its security updates are expected for 7+ years (based on previous model support). The i.safe MOBILE IS440.1 runs ISM-OS 14 on the Qualcomm QCM6490 with a 2.4-inch display at 240 × 320, 4 GB of RAM and 64 GB of storage, and i.safe states security patches until Q4 2032. NFC reading is built in on the i.safe MOBILE IS440.1; on the iPhone it is not verified through a metal enclosure.',
      ],
    },
    {
      title: 'Battery, charging and carrying',
      edge: 'isafe-is440-1',
      text: [
        'The i.safe MOBILE IS440.1 has a 2400 mAh battery you can swap, so a crew can carry a charged spare and change it outside the hazardous area; for North America, i.safe specifies its PROTECTOR 2.0 USB-C cable for charging, also outside the hazardous area. The Xshielder iPhone 17 has the larger 3692 mAh battery, but it is not user-replaceable. Capacity is not run time: our data lists up to 30 hours of video playback for the iPhone and no run-time figure for the i.safe MOBILE IS440.1, so test battery life over a real shift.',
        'With the USB-C port not accessible, the Xshielder iPhone 17 charges wirelessly (MagSafe, up to 25 W) outside the hazardous area. Only Xshielder-authorized personnel may open the case, the S02 cemented-lid version must not be opened by the user, and the phone uses eSIM, with a physical SIM installed by Xshielder on request. On weight the two are close: the i.safe MOBILE IS440.1 weighs 307 g and the Xshielder iPhone 17 330 g including the phone, so the i.safe MOBILE IS440.1 is 23 g lighter. The bigger difference is the screen: 2.4 inches against 6.3.',
      ],
    },
  ],
  faq: [
    {
      q: 'Is the i.safe MOBILE IS440.1 better than the Xshielder iPhone 17?',
      a: 'Neither is better across the board, because they do different jobs. The i.safe MOBILE IS440.1 wins more of the practical points: push-to-talk hardware, a North American Class I Division 1 listing, +55 °C ambient, glove and wet touch and a swappable battery. The Xshielder iPhone 17 wins on gas temperature class (T6), cameras and Face ID confirmed through the case, and fit with an iPhone fleet. Both are certified for Zone 1/21.',
    },
    {
      q: 'Can an iPhone replace a push-to-talk radio in Zone 1?',
      a: 'It can for crews that use a push-to-talk app. On the Xshielder iPhone 17 the programmable Action Button on the cover acts as the push-to-talk key, with apps built on Apple’s Push to Talk framework: there is no separate push-to-talk key, and you need such an app. The i.safe MOBILE IS440.1 is the radio-style option, with a dedicated key, PoC apps, a channel selector and glove touch. Choose by how much of the shift your crew spends on voice and how much on data.',
    },
    {
      q: 'Which of the two is intrinsically safe?',
      a: 'The i.safe MOBILE IS440.1, which uses intrinsic safety (Ex ib). The Xshielder iPhone 17 is a flameproof (Ex db) case, with Ex tb protection for dust, and only Xshielder-authorized personnel may open it. Both are certified for Zone 1/21 under ATEX; for the Xshielder iPhone 17, IECEx covers the cemented-lid S02 version only.',
    },
    {
      q: 'Can either phone be used in Zone 0?',
      a: 'No. Both are certified to protection level Gb for gas, which covers Zone 1 and Zone 2, and Db for dust. Neither the i.safe MOBILE IS440.1 nor the Xshielder iPhone 17 is certified for Zone 0.',
    },
    {
      q: 'Are both phones approved for North America?',
      a: 'Our data confirms it for one. The i.safe MOBILE IS440.1 is approved for Class I Division 1, Groups A to D, with temperature code T4, and also lists Class II Division 1 and Class III (QPS certificate of compliance LR3081-6R2, dated 30 September 2025). Our data does not list a North American approval for the Xshielder iPhone 17, so ask Xshielder before specifying it for a US or Canadian site.',
    },
    {
      q: 'Can you charge either phone in the hazardous area?',
      a: 'No. Both must be charged outside the hazardous area. The i.safe MOBILE IS440.1’s battery must also be changed there, and for North America i.safe specifies its PROTECTOR 2.0 USB-C cable. The Xshielder iPhone 17 charges wirelessly with MagSafe because its USB-C port is not accessible.',
    },
    {
      q: 'How much do the i.safe MOBILE IS440.1 and Xshielder iPhone 17 cost?',
      a: 'Prices depend on volume, configuration and region, so both are on request. Contact us for a price.',
    },
  ],
  cta: {
    kind: 'xshielder',
    heading: 'The Xshielder iPhone 17 for Zone 1/21',
    text: 'The Xshielder iPhone 17 is a flameproof (Ex db) case around a standard Apple iPhone 17, rated IIC T6 for Zone 1/21 under ATEX, with IECEx for the cemented-lid S02 version only. The rear cameras, front camera and Face ID are confirmed to work through the cover. Tell us about your site and fleet size to get a quote.',
  },
};

export default page;
