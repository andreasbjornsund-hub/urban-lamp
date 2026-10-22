/*
 * Turns a guide's pasted HTML into what the template renders, without touching the copy:
 *  - outbound links get the HAG link policy (externalLink: rel, target and, for xshielder.com, UTM tags)
 *  - internal links to /phones/, /best/, /compare/ and /guides/ must point at a page that exists (the build fails otherwise)
 *  - h2, h3 and h4 headings get ids for anchor links and the contents list (unique across the page via opts.ids)
 *  - tables get a labelled, focusable horizontal scroll wrapper and scope="col" on header cells
 */
import { externalLink } from './links';

export interface GuideLinkTargets {
  phones: Set<string>;
  best: Set<string>;
  compare: Set<string>;
  guides: Set<string>;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const text = (html: string) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/** Checks an internal href and returns a readable error, or undefined when the page exists */
function checkInternal(href: string, targets: GuideLinkTargets): string | undefined {
  const m = href.match(/^\/(phones|best|compare|guides)\/([^/#?]+)\/(?:[#?].*)?$/);
  if (!m) return undefined;
  const [, section, slug] = m;
  return targets[section as keyof GuideLinkTargets].has(slug) ? undefined : `no page at ${href}`;
}

export function processGuideHtml(
  html: string,
  opts: { page: string; utmContent: string; targets: GuideLinkTargets; ids?: Set<string> },
): string {
  const errors: string[] = [];

  let out = html.replace(/<a\s+([^>]*?)>/g, (tag, attrs: string) => {
    const href = attrs.match(/href="([^"]+)"/)?.[1];
    if (!href) return tag;
    if (/^https?:\/\//.test(href)) {
      const link = externalLink(href, opts.utmContent);
      const rest = attrs.replace(/\s*(href|rel|target)="[^"]*"/g, '').trim();
      return `<a href="${link.href.replace(/&/g, '&amp;')}" rel="${link.rel}" target="${link.target}"${rest ? ` ${rest}` : ''}>`;
    }
    const error = checkInternal(href, opts.targets);
    if (error) errors.push(error);
    return tag;
  });

  const ids = opts.ids ?? new Set<string>();
  out = out.replace(/<h([234])>([\s\S]*?)<\/h\1>/g, (_, level: string, inner: string) => {
    const base = slugify(inner);
    let id = base;
    for (let n = 2; ids.has(id); n++) id = `${base}-${n}`;
    ids.add(id);
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  // Label each table after the heading above it, so screen-reader users know what the scroll region holds
  out = out.replace(/<table>([\s\S]*?)<\/table>/g, (table, inner: string, offset: number) => {
    const before = out.slice(0, offset);
    const headings = [...before.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)];
    const label = headings.length ? text(headings[headings.length - 1][1]) : 'Table';
    const head = inner.replace(/<thead>([\s\S]*?)<\/thead>/, (thead) => thead.replace(/<th>/g, '<th scope="col">'));
    return `<div class="table-scroll" tabindex="0" role="region" aria-label="${label.replace(/"/g, '&quot;')}"><table>${head}</table></div>`;
  });

  if (errors.length) throw new Error(`${opts.page}: ${errors.join('; ')}`);
  return out;
}
