#!/bin/bash

set -euo pipefail

mode="production"

while [ $# -gt 0 ]; do
  case $1 in
    --mode)
      shift
      mode="$1"
    ;;
  esac
  shift
done

if [ "$mode" == "dev" ]; then
  yarn build --mode "$mode" --site "http://centrapay-docs.dev.s3-website-ap-southeast-1.amazonaws.com"
else
  yarn build
fi

cp CNAME dist
