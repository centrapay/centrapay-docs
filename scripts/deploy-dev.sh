#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")/.."

dist=dist/
find $dist || exit 1

find $dist -type f -exec gzip -9 {} \; -exec mv {}.gz {} \;

aws s3 cp $dist s3://centrapay-docs.dev/ --recursive --content-encoding gzip

echo "Centrapay Docs preview deployed to: http://centrapay-docs.dev.s3-website-ap-southeast-1.amazonaws.com"
