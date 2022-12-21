#!/bin/bash

set -euo pipefail

cd legacy

bundle install
bundle exec jekyll build

cd ../

yarn generate

mv .output/public/api/_content _site/api
rm -r .output/public/api/
rsync -a .output/public/* _site/

cp CNAME _site
