#!/bin/bash

set -euo pipefail

cd new-docs

yarn install --frozen-lock-file

yarn generate

rm .output/public/index.html

mv .output/public/* ../_site/
