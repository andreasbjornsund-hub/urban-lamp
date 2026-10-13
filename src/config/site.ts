export const SITE = {
  name: 'Hazardous Area Phones',
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

export const MAIN_NAV: NavLink[] = [
  { label: 'Explore phones', href: '/phones/' },
  { label: 'Buying guides', href: '/guides/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'About', href: '/about/' },
];

export const HEADER_CTA: NavLink = { label: 'Get guidance', href: '/contact/' };

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  { heading: 'Explore', links: MAIN_NAV },
  {
    heading: 'Helpful links',
    links: [
      { label: 'Guides and resources', href: '/guides/' },
      { label: 'FAQs', href: '/faq/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];

export const LEGAL_NAV: NavLink[] = [
  { label: 'Privacy', href: '/privacy.html' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Cookies', href: '/cookies/' },
];
