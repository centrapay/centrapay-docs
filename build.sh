#!/bin/bash

set -euo pipefail

mode="development"

while [ $# -gt 0 ]; do
  case $1 in
    --mode)
      shift
      mode="$1"
    ;;
  esac
  shift
done

cd legacy

bundle install
bundle exec jekyll build

cd ../

if [ "$mode" == "development" ]; then
  yarn build --mode "$mode" --site "http://centrapay-docs.dev.s3-website-ap-southeast-1.amazonaws.com"
else
  yarn build --mode "$mode"
fi

rsync -a dist/* _site/

cp CNAME _site
