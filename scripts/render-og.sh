#!/usr/bin/env bash
# Renders scripts/og.html to public/og.png (1200x630) with any Chromium/Chrome binary.
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="${CHROME:-$(command -v chromium || command -v google-chrome || command -v chrome-headless-shell)}"
"$CHROME" --headless --no-sandbox --hide-scrollbars --allow-file-access-from-files \
  --window-size=1200,630 --virtual-time-budget=3000 --screenshot="$PWD/public/og.png" "file://$PWD/scripts/og.html"
