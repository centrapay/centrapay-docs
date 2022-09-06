#!/bin/bash

set -euo pipefail

./scripts/build.sh

cd legacy

bundle exec jekyll serve --skip-initial-build --no-watch
