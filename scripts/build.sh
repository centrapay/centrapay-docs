#!/bin/bash

set -euo pipefail

cd legacy

bundle install
bundle exec jekyll build

cd ../

yarn generate
mv .output/public/* _site/

cp CNAME _site
