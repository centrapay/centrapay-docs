#!/bin/sh

HUSKY_BIN="node_modules/.bin/husky"

if [ -x "$HUSKY_BIN" ]; then
  $HUSKY_BIN
fi
