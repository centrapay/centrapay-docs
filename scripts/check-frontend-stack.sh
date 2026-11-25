#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
exceptions=scripts/frontend-stack.exceptions

found=$(
  {
    git ls-files 'src/*.vue' | sed 's/^/vue-file\t/'
    git ls-files 'src/*.astro' | xargs grep -lE 'client:(load|idle|visible|media|only)' 2>/dev/null \
      | sed 's/^/client-island\t/' || true
    git ls-files 'src/*.astro' 'src/*.mdoc' 'src/*.md' | xargs grep -l '<script' 2>/dev/null \
      | sed 's/^/script\t/' || true
    grep -oE '"(vue|react|react-dom|preact|svelte|solid-js|lit|alpinejs|@astrojs/(vue|react|preact|svelte|solid-js|lit|alpinejs)|@headlessui/[a-z-]+|eslint-plugin-vue)"' package.json \
      | tr -d '"' | sed 's/^/framework-dep\t/' || true
  } | sort -u
)

expected=$(grep -vE '^\s*(#|$)' "$exceptions" | sort -u)

new=$(comm -13 <(echo "$expected") <(echo "$found") | grep -v '^$' || true)
stale=$(comm -23 <(echo "$expected") <(echo "$found") | grep -v '^$' || true)

status=0
if [ -n "$new" ]; then
  echo "Not allowed: this site uses only HTML, Astro and Tailwind (no JS unless critically needed)."
  echo "$new" | sed 's/^/  /'
  echo "Use plain Astro components, <details>/<dialog> and CSS instead. If JS is truly needed,"
  echo "add the line to $exceptions and explain why in the PR."
  status=1
fi
if [ -n "$stale" ]; then
  echo "Remove these now-fixed entries from $exceptions:"
  echo "$stale" | sed 's/^/  /'
  status=1
fi
[ "$status" -eq 0 ] && echo "frontend stack check passed"
exit "$status"
