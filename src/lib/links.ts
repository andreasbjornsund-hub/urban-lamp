/*
 * HAG network link policy for Astro pages (the legacy pages get the same treatment from
 * scripts/hag_link_policy.py; keep the competitor list in step with it and assets/hag-links.js).
 *  - xshielder.com: rel="sponsored noopener" + UTM tags
 *  - competitors: rel="nofollow noopener"
 */
const SITE_HOST = 'intrinsicallysafephones.com';

const COMPETITORS = [
  'xciel.com', 'atexxo.com', 'ecom-ex.com', 'pepperl-fuchs.com', 'isafe-mobile.com', 'bartec.com', 'bartec.de',
  'aegex.com', 'conquest-ex.com', 'getac.com', 'zebra.com', 'pixavi.com', 'atex-shop.de', 'atexshop.com',
  'intrinsicallysafestore.com', 'sonimtech.com', 'cyrus.com', 'cyrus-technology.de', 'smart-ex.com', 'tabex.com',
  'ruggedexphones.com',
];

const matches = (host: string, domain: string) => host === domain || host.endsWith(`.${domain}`);

export interface ExternalLink {
  href: string;
  rel: string;
  target: '_blank';
}

/** @param content where the link sits, used as utm_content (usually the page path) */
export function externalLink(url: string, content: string): ExternalLink {
  const u = new URL(url);
  const host = u.hostname.replace(/^www\./, '');

  if (matches(host, 'xshielder.com')) {
    if (!u.searchParams.has('utm_source')) {
      u.searchParams.set('utm_source', SITE_HOST);
      u.searchParams.set('utm_medium', 'referral');
      u.searchParams.set('utm_campaign', 'hag_network');
      u.searchParams.set('utm_content', content);
    }
    return { href: u.href, rel: 'sponsored noopener', target: '_blank' };
  }
  if (COMPETITORS.some((d) => matches(host, d))) {
    return { href: u.href, rel: 'nofollow noopener', target: '_blank' };
  }
  return { href: u.href, rel: 'noopener', target: '_blank' };
}

/** utm_content value for a page path: "/phones/x/" -> "phones/x", "/" -> "home" */
export const pageSlug = (pathname: string) => pathname.replace(/^\/|\/$/g, '') || 'home';
