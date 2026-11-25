#!/bin/bash

TRIVY_VERSION="0.69.2"
TRIVY_DIR="${XDG_CACHE_HOME:-$HOME/.cache}/trivy-bin/${TRIVY_VERSION}"
trivy="$TRIVY_DIR/trivy"

if [ ! -x "$trivy" ]; then
  # Download the release directly from GitHub. The upstream install.sh on `main`
  # now fetches from get.trivy.dev, which doesn't resolve, and fails silently.
  set -euo pipefail
  case "$(uname -s)-$(uname -m)" in
    Linux-x86_64) platform="Linux-64bit" ;;
    Linux-aarch64) platform="Linux-ARM64" ;;
    Darwin-x86_64) platform="macOS-64bit" ;;
    Darwin-arm64) platform="macOS-ARM64" ;;
    *) echo "❌ Unsupported platform: $(uname -s)-$(uname -m)"; exit 1 ;;
  esac
  tmp_dir=$(mktemp -d)
  tarball="trivy_${TRIVY_VERSION}_${platform}.tar.gz"
  base_url="https://github.com/aquasecurity/trivy/releases/download/v${TRIVY_VERSION}"
  curl -sfL -o "$tmp_dir/$tarball" "$base_url/$tarball"
  curl -sfL -o "$tmp_dir/checksums.txt" "$base_url/trivy_${TRIVY_VERSION}_checksums.txt"
  (cd "$tmp_dir" && grep " ${tarball}\$" checksums.txt | sha256sum -c -)
  mkdir -p "$TRIVY_DIR"
  tar -xzf "$tmp_dir/$tarball" -C "$TRIVY_DIR" trivy
  rm -rf "$tmp_dir"
  set +euo pipefail
  echo "Installed trivy ${TRIVY_VERSION}"
  echo
fi

echo "🔎 Starting Trivy filesystem scan in current directory..."

set +e

trivy_output=$("$trivy" fs . 2>&1)
trivy_exit_code=$?

set -e

if [ $trivy_exit_code -ne 0 ]; then
  echo "❌ Trivy scan encountered errors:"
  echo "$trivy_output"
else
  echo "✅ Trivy scan completed successfully"
fi

exit $trivy_exit_code
