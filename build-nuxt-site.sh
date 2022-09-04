#!/bin/bash

set -euo pipefail

yarn generate

mv .output/public/* _site/
