import json, re, os

# Load plan
with open('/tmp/cross-domain-link-plan.json') as f:
    plan = json.load(f)

REPOS = {
    'intrinsicallysafephones.com': '/tmp/urban-lamp',
    'explosionprooftablets.com': '/tmp/intrinsically-safe-tablets',
}

results = []

for action in plan['actions']:
    aid = action['id']
    source = action['source_url']
    target = action['target_url']
    anchor = action['anchor_text']
    hint = action['placement_hint']
    disclosure = action.get('requires_ownership_disclosure', False)
    
    # Parse domain and path from source_url
    from urllib.parse import urlparse
    parsed = urlparse(source)
    domain = parsed.netloc
    path = parsed.path
    
    # Map to local file
    repo_base = REPOS.get(domain)
    if not repo_base:
        results.append(f"{aid}: SKIP - no repo for {domain}")
        continue
    
    # Convert URL path to file path
    if path == '/' or path == '':
        filepath = os.path.join(repo_base, 'index.html')
    elif path.endswith('/'):
        filepath = os.path.join(repo_base, path.lstrip('/'), 'index.html')
    else:
        filepath = os.path.join(repo_base, path.lstrip('/'))
    
    if not os.path.exists(filepath):
        results.append(f"{aid}: FAIL - file not found: {filepath}")
        continue
    
    with open(filepath, 'r') as f:
        html = f.read()
    
    # Extract key phrase from placement_hint for searching
    # The hint format is: "paragraph containing 'TEXT...'"
    hint_match = re.search(r"containing '(.+)'", hint)
    if not hint_match:
        results.append(f"{aid}: FAIL - could not parse placement_hint")
        continue
    
    search_text = hint_match.group(1)
    # Unescape HTML entities in the search text for matching
    search_plain = search_text.replace('&amp;', '&').replace('&nbsp;', '\u00a0').replace('&#39;', "'")
    
    # Find the text in the HTML (decode entities in HTML too for matching)
    html_decoded = html.replace('&amp;', '&').replace('&nbsp;', '\u00a0').replace('&#39;', "'")
    
    # Try to find the hint text
    idx = html_decoded.find(search_plain[:60])  # Use first 60 chars
    if idx == -1:
        # Try shorter substring
        idx = html_decoded.find(search_plain[:40])
    if idx == -1:
        idx = html_decoded.find(search_plain[:25])
    
    if idx == -1:
        results.append(f"{aid}: FAIL - placement text not found: '{search_plain[:50]}...'")
        continue
    
    # Find the enclosing paragraph or section
    # Look for the end of the current paragraph/section to append the link
    # Strategy: find the closing tag after the hint text
    
    # Build the link HTML
    link_html = f'<a href="{target}" target="_blank" rel="noopener">{anchor}</a>'
    
    # Check if link already exists
    if anchor in html:
        results.append(f"{aid}: SKIP - anchor text already present")
        continue
    
    # For body section links, find a good insertion point near the hint text
    # Look for the next </p> or </h1> or </div> after the found index (in original html)
    # We need to work with original html positions
    
    # Re-find in original html using a flexible approach
    # Try finding key parts of the search text in original HTML
    search_parts = search_plain[:40]
    for variant in [search_parts, 
                    search_parts.replace('&', '&amp;'),
                    search_parts.replace('\u00a0', '&nbsp;'),
                    search_parts.replace("'", '&#39;').replace('&', '&amp;')]:
        orig_idx = html.find(variant)
        if orig_idx != -1:
            break
    
    if orig_idx == -1:
        # Last resort: search for unique substring
        for length in [30, 20, 15]:
            orig_idx = html.find(search_plain[:length].replace('&', '&amp;'))
            if orig_idx != -1:
                break
            orig_idx = html.find(search_plain[:length])
            if orig_idx != -1:
                break
    
    if orig_idx == -1:
        results.append(f"{aid}: FAIL - could not locate in original HTML")
        continue
    
    # Find the next paragraph end </p> after the hint
    p_end = html.find('</p>', orig_idx)
    if p_end == -1:
        # Try </div> or </section>
        p_end = html.find('</div>', orig_idx)
    
    if p_end == -1:
        results.append(f"{aid}: FAIL - no paragraph end found after hint")
        continue
    
    # Insert link just before the closing </p>
    # Add a sentence with the link
    insert_text = f' See also: {link_html}.'
    
    new_html = html[:p_end] + insert_text + html[p_end:]
    
    with open(filepath, 'w') as f:
        f.write(new_html)
    
    # Re-read for next iteration (positions shift)
    results.append(f"{aid}: OK - inserted link to {target} with anchor '{anchor}' in {os.path.basename(filepath)}")

print("\n=== LINK INSERTION RESULTS ===")
for r in results:
    print(f"  {r}")
