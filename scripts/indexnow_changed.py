#!/usr/bin/env python3
"""Print the URLs to send to IndexNow: pages that are new, removed or have a new lastmod.

Compares the live sitemap with the one just built. The deploy workflow runs it before deploying
and submits the list once the new site is live (see .github/workflows/deploy.yml).
Without a live sitemap to compare against it prints nothing, rather than resubmitting every page.

Usage: python3 scripts/indexnow_changed.py live-sitemap.xml dist/sitemap.xml
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


live, built = entries(sys.argv[1]), entries(sys.argv[2])
if live:
    changed = [loc for loc, lastmod in built.items() if loc not in live or live[loc] != lastmod]
    removed = [loc for loc in live if loc not in built]
    print('\n'.join(changed + removed))
