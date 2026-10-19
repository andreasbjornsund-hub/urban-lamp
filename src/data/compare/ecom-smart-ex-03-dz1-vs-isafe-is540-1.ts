import type { ComparePage } from '../compare-pages';

const page: ComparePage = {
  phones: ['ecom-smart-ex-03-dz1', 'isafe-is540-1'],
  title: 'ecom Smart-Ex 03 DZ1 vs i.safe MOBILE IS540.1 Compared',
  description:
    'ecom Smart-Ex 03 DZ1 or i.safe MOBILE IS540.1? Zone 1 certification, push-to-talk, camera, scanning and updates compared, with our pick for each team.',
  h1: 'ecom Smart-Ex 03 DZ1 vs i.safe MOBILE IS540.1',
  eyebrow: 'Compare · Zone 1 Android phones',
  lead:
    'These are two of the best-known intrinsically safe Android phones for Zone 1, and on paper they are close. Both are certified for Zone 1/21 under ATEX and IECEx with a Class I Division 1 approval for North America, both run on the Qualcomm QCM6490 with 5G, and both have a 4400 mAh battery you can swap outside the hazardous area. The differences show up in the work: heat, push-to-talk, photos, scanning and storage. Here is how they compare, and which we would choose for which team.',
  verdict: {
    summary: [
      'Either phone will do the core Zone 1 job, so pick by the work your team does. For push-to-talk crews, lone workers and hot sites we would choose the ecom Smart-Ex 03 DZ1. For inspection photos, high-volume scanning and operations that also work underground, we would choose the i.safe MOBILE IS540.1.',
    ],
    choose: [
      {
        id: 'ecom-smart-ex-03-dz1',
        reasons: [
          'Your sites run hot: it is certified up to +60 °C ambient, against +55 °C for the i.safe MOBILE IS540.1.',
          'Your crews rely on push-to-talk and alarms, and you want ecom’s eSentinel alarm app ready to assign to the alarm key.',
          'You want the newer software and radio: it runs Android 15 and has Wi-Fi 6E.',
          'A client or site asks for UKCA-marked equipment: it has a UKEX certificate as well as ATEX and IECEx.',
        ],
      },
      {
        id: 'isafe-is540-1',
        reasons: [
          'Photos are part of the job: its 48 MP camera suits inspection records far better than a 13 MP camera tuned for scanning.',
          'You scan all day and want a hardware scan module rather than a camera app.',
          'You need storage on the device: it takes a microSD card of up to 128 GB.',
          'Some of your crews work underground: the i.safe MOBILE IS540.M1 mining version keeps the Zone 1/21 rating.',
        ],
      },
    ],
  },
  differences: [
    {
      row: 'Ambient temperature (Ta)',
      title: 'Maximum ambient temperature',
      note: 'The certificate decides whether a phone may be used on a hot site at all. The ecom Smart-Ex 03 DZ1 has 5 °C more headroom for plants and yards in hot climates; go by the ambient range in the certificate, not the operating range on a datasheet.',
    },
    {
      row: 'Rear camera',
      title: 'Camera',
      note: 'For inspection photos the i.safe MOBILE IS540.1 has the far higher-resolution camera. The ecom Smart-Ex 03 DZ1’s camera is tuned for scanning with ecom’s barcode app.',
    },
    {
      row: 'Barcode scanning',
      note: 'The i.safe MOBILE IS540.1 takes a hardware scan module through its ISM accessory interface, which suits all-day scanning. The ecom Smart-Ex 03 DZ1 scans with its camera and a paid app, which suits occasional scans and leaves nothing extra to carry.',
    },
    {
      row: 'Lone worker',
      title: 'Lone-worker alarm',
      note: 'ecom’s eSentinel alarm app comes installed on the ecom Smart-Ex 03 DZ1 and can be assigned to its dedicated alarm key. On the i.safe MOBILE IS540.1 you add the lone-worker app of your choice to the red key, so the gap closes if your safety team already runs a lone-worker platform.',
    },
  ],
  sections: [
    {
      title: 'Push-to-talk and lone working',
      edge: 'ecom-smart-ex-03-dz1',
      text: [
        'Both phones put push-to-talk and alarms on physical keys, and both work with third-party push-to-talk apps, so either will carry a radio-style workflow. The difference is in what comes ready to use. ecom installs its own eSentinel alarm app on the ecom Smart-Ex 03 DZ1, where it can be assigned to the dedicated alarm key, and the 3.5 mm audio socket supports push-to-talk accessories.',
        'On the i.safe MOBILE IS540.1 the red key and the left side key are programmable through i.safe’s Button App, typically for a lone-worker alarm and push-to-talk, and you bring the lone-worker app of your choice. Accessories in the hazardous area connect through the 16-pin ISM interface only. If your safety team already runs a lone-worker platform the gap closes; if not, the ecom Smart-Ex 03 DZ1 gets you there with less setup.',
      ],
    },
    {
      title: 'Inspection photos, scanning and data capture',
      edge: 'isafe-is540-1',
      text: [
        'This is where the i.safe MOBILE IS540.1 pulls ahead. Its 48 MP autofocus camera is the better tool for photographing corrosion, gauges and finished work, while the ecom Smart-Ex 03 DZ1’s 13 MP camera, with phase-detection autofocus and an LED flash, is optimized for scanning with ecom’s eBARCODE-ML app, a paid add-on.',
        'For scanning in volume, i.safe’s route is hardware: a barcode scan module that attaches through the ISM interface. Add the microSD slot for offline data and the i.safe MOBILE IS540.1 suits stores, logistics and asset-tagging rounds. Both read NFC tags, and both come in camera-free versions for sites that ban cameras.',
      ],
    },
    {
      title: 'Certification and where you can work',
      edge: 'even',
      text: [
        'On the core rating they match. Both are certified for Zone 1/21 under ATEX and IECEx, with IIC T4 for gas and IIIC T135 °C for dust, and both hold a Class I Division 1 approval for North America. T4 suits most gases, but not those that ignite below 135 °C. Both also list approvals for Brazil, Korea, South Africa and Japan.',
        'The ecom Smart-Ex 03 DZ1 edges it on heat: it is certified to +60 °C ambient against +55 °C. We also have the certificate number for its North American listing (Eurofins MET E115956) but have not found i.safe’s. The i.safe MOBILE IS540.1 answers with the more flexible mining version: the i.safe MOBILE IS540.M1 keeps Zone 1/21 alongside Group I, while the ecom Smart-Ex 03 DZ1M is rated for mining only.',
      ],
    },
    {
      title: 'Fleet management, updates and battery',
      edge: 'even',
      text: [
        'For IT teams there is little between them. Both are Android Enterprise Recommended and use the same Qualcomm QCM6490 processor with 8 GB of RAM and 5G. The ecom Smart-Ex 03 DZ1 runs Android 15 with Wi-Fi 6E and security updates until November 2032; the i.safe MOBILE IS540.1 runs Android 14 with Wi-Fi 6, and i.safe states security patches until Q4 2032.',
        'Both use a 4400 mAh battery the user can swap, and both must be charged, and have the battery changed, outside the hazardous area. ecom specifies charging at 0 to 45 °C and offers docking charge pads; i.safe requires its PROTECTOR 2.0 USB-C cable or other approved equipment. Operators on a Nokia private wireless network have one more reason to look at the i.safe MOBILE IS540.1: Nokia sells it in its portfolio, alongside apps such as Nokia Team Comms.',
      ],
    },
  ],
  faq: [
    {
      q: 'Is the ecom Smart-Ex 03 DZ1 better than the i.safe MOBILE IS540.1?',
      a: 'Neither is better across the board. The ecom Smart-Ex 03 DZ1 suits hot sites and push-to-talk or lone-worker crews. The i.safe MOBILE IS540.1 suits photo documentation, high-volume scanning and operators with both underground and surface sites. Both are certified for Zone 1/21 and Class I Division 1.',
    },
    {
      q: 'Can either phone be used in Zone 0?',
      a: 'No. Both are certified to protection level Gb, which covers Zone 1 and Zone 2. The ecom Smart-Ex 03 DZ1 uses Ex ia protection, but its certificate does not include Zone 0.',
    },
    {
      q: 'Are both phones approved for North America?',
      a: 'Yes. Both are approved for Class I, II and III, Division 1, with temperature code T4. The ecom Smart-Ex 03 DZ1 is listed by Eurofins MET (E115956); we have not found the certificate number for the i.safe MOBILE IS540.1’s listing.',
    },
    {
      q: 'Which gets security updates for longer?',
      a: 'They are almost level. Security updates for the ecom Smart-Ex 03 DZ1 are listed until November 2032. For the i.safe MOBILE IS540.1, i.safe states Q4 2032, while Google’s Android Enterprise directory lists 30 January 2032.',
    },
    {
      q: 'Can you charge either phone in the hazardous area?',
      a: 'No. Both must be charged, and have their batteries changed, outside the hazardous area. ecom specifies charging at 0 to 45 °C, and i.safe specifies its PROTECTOR 2.0 USB-C cable or other approved equipment.',
    },
    {
      q: 'Is there a Zone 2 version of each phone?',
      a: 'Yes. The ecom Smart-Ex 03 DZ2 and the i.safe MOBILE IS540.2 are the Zone 2/22 versions. They are not certified for Zone 1.',
    },
    {
      q: 'How much do the ecom Smart-Ex 03 DZ1 and i.safe MOBILE IS540.1 cost?',
      a: 'Prices depend on volume, configuration and region, so both are on request. Contact us for a price.',
    },
  ],
  cta: {
    kind: 'neutral',
    heading: 'Still deciding between the two?',
    text: 'Both phones are certified for Zone 1/21, so the choice comes down to your sites and the work your team does. Tell us about them and we will help you choose impartially, or check whether a Zone 2 version would do.',
  },
};

export default page;
