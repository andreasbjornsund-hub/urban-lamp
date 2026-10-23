#!/usr/bin/env python3
"""Print the URLs to send to IndexNow: pages that are new, removed or have a new lastmod.

Compares the sitemap from the last deploy with the one just built. The deploy workflow runs it before
deploying and submits the list once the new site is live (see .github/workflows/deploy.yml).
Without a previous sitemap to compare against it prints nothing, rather than resubmitting every page.
Only lastmod changes count, so a change to a template alone (titles, layout) isn't submitted.

Usage: python3 scripts/indexnow_changed.py previous/sitemap.xml dist/sitemap.xml
"""
import re, sys


def entries(path):
    try:
        xml = open(path, encoding='utf-8').read()
    except FileNotFoundError:
        return {}
    out = {}
    for block in re.findall(r'<url>(.*?)</url>', xml, re.S):
        loc = re.search(r'<loc>(.*?)</loc>', block)
        lastmod = re.search(r'<lastmod>(.*?)</lastmod>', block)
        if loc:
            out[loc.group(1)] = lastmod.group(1) if lastmod else None
    return out


previous, built = entries(sys.argv[1]), entries(sys.argv[2])
if previous:
    changed = [loc for loc, lastmod in built.items() if loc not in previous or previous[loc] != lastmod]
    removed = [loc for loc in previous if loc not in built]
    # Nothing at all when nothing changed, so the workflow sees an empty list
    if changed or removed:
        print('\n'.join(changed + removed))
