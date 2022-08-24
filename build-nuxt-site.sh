#!/bin/bash

set -euo pipefail

cd new-docs

yarn generate

mv .output/public/* ../_site/
