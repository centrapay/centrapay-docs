#!/bin/bash

set -euo pipefail
cd "$(dirname "$0")"

cache_key=
restore_key=

while [[ $# -gt 0 ]]; do
  case $1 in
    --cache-key)
      shift
      cache_key="$1"
    ;;
    --restore-key)
      shift
      restore_key="$1"
    ;;
  esac
  shift
done

base_dir="$(cd ../ && pwd)"

paths="
  $(yarn config get cacheFolder)
  $(yarn config get installStatePath)
  $(yarn config get patchFolder)
  ${base_dir}/node_modules
"

echo -n config=
jq \
  --null-input \
  --compact-output \
  --monochrome-output \
  --arg paths "${paths}" \
  --arg cacheKey "${cache_key}" \
  --arg restoreKey "${restore_key}" \
  '{
    path: $paths,
    key: $cacheKey,
    "restore-keys": $restoreKey
  }'
