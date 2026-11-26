#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
exceptions=scripts/images.exceptions

files() {
  git ls-files --cached --others --exclude-standard 'src/*.astro' 'src/*.mdoc' 'src/*.md' 'src/*.js' 'src/*.ts' 'src/*.css'
}

found=$(
  {
    files | xargs grep -lE '<img\b' 2>/dev/null | sed 's/^/img\t/' || true
    files | xargs grep -lE "astro:assets" 2>/dev/null | sed 's/^/astro-assets\t/' || true
    files | xargs grep -liE "url\(['\"]?[^)'\"]*\.(png|jpe?g|webp|gif|avif)" 2>/dev/null \
      | sed 's/^/css-image\t/' || true
  } | sort -u
)

expected=$(grep -vE '^\s*(#|$)' "$exceptions" | sort -u)

new=$(comm -13 <(echo "$expected") <(echo "$found") | grep -v '^$' || true)
stale=$(comm -23 <(echo "$expected") <(echo "$found") | grep -v '^$' || true)

status=0
if [ -n "$new" ]; then
  echo "Not allowed: render images with src/components/Image.astro so they are resized and served as WebP."
  echo "$new" | sed 's/^/  /'
  echo "Put the image in src/assets and use <Image src=\"/path/in/assets.png\" alt=\"…\" />,"
  echo "or pass an imported image. If it truly can't be optimised, add the line to $exceptions"
  echo "and explain why in the PR."
  status=1
fi
if [ -n "$stale" ]; then
  echo "Remove these now-fixed entries from $exceptions:"
  echo "$stale" | sed 's/^/  /'
  status=1
fi
[ "$status" -eq 0 ] && echo "image check passed"
exit "$status"
