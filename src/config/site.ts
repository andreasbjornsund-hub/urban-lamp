export const SITE = {
  name: 'Intrinsically Safe Phones',
  url: 'https://intrinsicallysafephones.com',
  description:
    'Independent guidance on intrinsically safe and explosion-proof phones for hazardous workplaces.',
  locale: 'en_GB',
  ogImage: '/og-image.png',
  analytics: { ga4: 'G-H5CXD10JVJ', gtm: 'GTM-MFSPF6PH' },
  web3formsKey: '930572e9-b94e-4d18-9c2b-25999a09ef0f',
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  heading?: string;
  links: NavLink[];
}

/** A top-level nav entry: a plain link, or a dropdown made of one or more groups. */
export type NavItem =
  | (NavLink & { menu?: undefined })
  | { label: string; href: string; menu: NavGroup[]; footerLink?: NavLink };

export const FIND_PHONES: NavLink = { label: 'Find phones', href: '/phones/' };
export const BUYING_GUIDE: NavLink = { label: 'Read the buying guide', href: '/guides/buying-guide/' };
export const CONTACT: NavLink = { label: 'Contact us', href: '/contact/' };

const BEST_BY_ZONE: NavGroup = {
  heading: 'By zone',
  links: [
    { label: 'Zone 1 phones', href: '/best/zone-1-phones/' },
    { label: 'Zone 2 phones', href: '/best/zone-2-phones/' },
    { label: 'Zone 0 phones', href: '/best/zone-0-phones/' },
    { label: 'Class I Division 1 & 2', href: '/best/division-1-phones/' },
  ],
};

export const BEST_BY_INDUSTRY: NavGroup = {
  heading: 'By industry',
  links: [
    { label: 'Oil & gas', href: '/best/oil-and-gas/' },
    { label: 'Offshore', href: '/best/offshore/' },
    { label: 'Chemical processing', href: '/best/chemical-processing/' },
    { label: 'Pharmaceutical', href: '/best/pharmaceutical/' },
    { label: 'Manufacturing', href: '/best/manufacturing/' },
    { label: 'Utilities', href: '/best/utilities/' },
  ],
};

const BEST_BY_NEED: NavGroup = {
  heading: 'By need',
  links: [
    { label: 'iPhone & iOS', href: '/best/iphone/' },
    { label: 'Push-to-talk', href: '/best/push-to-talk/' },
    { label: '5G', href: '/best/5g/' },
    { label: 'Best camera', href: '/best/camera/' },
    { label: 'Lightest', href: '/best/lightest/' },
    { label: 'Budget', href: '/best/budget/' },
  ],
};

export const MAIN_NAV: NavItem[] = [
  {
    label: 'Best for',
    href: '/best/',
    menu: [BEST_BY_ZONE, BEST_BY_INDUSTRY, BEST_BY_NEED],
    footerLink: { label: 'See all use cases', href: '/best/' },
  },
  { label: 'Compare', href: '/compare/' },
  {
    label: 'Guides',
    href: '/guides/',
    menu: [
      {
        links: [
          { label: 'Buying guide', href: '/guides/buying-guide/' },
          { label: 'What is an intrinsically safe phone?', href: '/what-is-an-intrinsically-safe-phone.html' },
          { label: 'ATEX zones explained', href: '/guides/atex-zones-explained/' },
          { label: 'Gas groups & temperature classes', href: '/guides/gas-groups-temperature-classes/' },
          { label: 'ATEX vs IECEx', href: '/guides/atex-vs-iecex/' },
          { label: 'iPhone Ex case vs dedicated phone', href: '/iphone-ex-case-vs-dedicated-atex-phone.html' },
          { label: 'Glossary', href: '/guides/glossary/' },
        ],
      },
    ],
    footerLink: { label: 'All guides', href: '/guides/' },
  },
  { label: 'About', href: '/about/' },
];

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Explore',
    links: [
      FIND_PHONES,
      { label: 'Compare phones', href: '/compare/' },
      { label: 'Brands', href: '/brands/' },
      { label: 'Guides', href: '/guides/' },
    ],
  },
  {
    heading: 'Best for',
    links: [
      { label: 'Zone 1 phones', href: '/best/zone-1-phones/' },
      { label: 'Zone 2 phones', href: '/best/zone-2-phones/' },
      { label: 'Oil & gas', href: '/best/oil-and-gas/' },
      { label: 'iPhone & iOS', href: '/best/iphone/' },
      { label: 'All use cases', href: '/best/' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'About us', href: '/about/' },
      { label: 'How we rate', href: '/how-we-rate/' },
      { label: 'Disclosure', href: '/disclosure/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];

export const LEGAL_NAV: NavLink[] = [
  { label: 'Privacy', href: '/privacy.html' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Cookies', href: '/cookies/' },
];
