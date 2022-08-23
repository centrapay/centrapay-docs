#!/bin/bash

set -euo pipefail

cd new-docs

yarn generate

rm .output/public/index.html

mv .output/public/* ../_site/
