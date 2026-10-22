#!/bin/bash
# Render scripts/og-image.html to public/og-image.png (1200x630) with headless Chrome.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp -d)"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=8000 \
  --screenshot="$TMP/og.png" "file://$PWD/scripts/og-image.html" >/dev/null 2>&1
node --input-type=module -e "import sharp from 'sharp'; await sharp(process.argv[1]).png({ compressionLevel: 9 }).toFile('public/og-image.png');" "$TMP/og.png"
rm -rf "$TMP"
echo "public/og-image.png updated"
