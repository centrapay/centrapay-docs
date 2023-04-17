#!/bin/bash

set -euo pipefail

url="${1:-}"

cd legacy

bundle install
bundle exec jekyll build

cd ../

if [[ -n "$url" ]]; then
  yarn build --site "$url"
else
  yarn build
fi

rsync -a dist/* _site/

cp CNAME _site
