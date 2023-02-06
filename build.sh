#!/bin/bash

set -euo pipefail

cd legacy

bundle install
bundle exec jekyll build

cd ../

yarn build

rsync -a dist/* _site/

cp CNAME _site
