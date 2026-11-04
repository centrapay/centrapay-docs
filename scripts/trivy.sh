#!/bin/bash

TRIVY_VERSION="0.69.2"

if ! command -v trivy >/dev/null 2>&1 || [ "$(trivy --version | grep '^Version:' | awk '{print $2}')" != "$TRIVY_VERSION" ]; then
  # Download the release directly from GitHub. The upstream install.sh on `main`
  # now fetches from get.trivy.dev, which doesn't resolve, and fails silently.
  set -euo pipefail
  tmp_dir=$(mktemp -d)
  tarball="trivy_${TRIVY_VERSION}_Linux-64bit.tar.gz"
  base_url="https://github.com/aquasecurity/trivy/releases/download/v${TRIVY_VERSION}"
  curl -sfL -o "$tmp_dir/$tarball" "$base_url/$tarball"
  curl -sfL -o "$tmp_dir/checksums.txt" "$base_url/trivy_${TRIVY_VERSION}_checksums.txt"
  (cd "$tmp_dir" && grep " ${tarball}\$" checksums.txt | sha256sum -c -)
  tar -xzf "$tmp_dir/$tarball" -C "$tmp_dir" trivy
  sudo install -m 0755 "$tmp_dir/trivy" /usr/local/bin/trivy
  rm -rf "$tmp_dir"
  set +euo pipefail
  echo "Installed trivy ${TRIVY_VERSION}"
  echo
fi

echo "🔎 Starting Trivy filesystem scan in current directory..."

set +e

trivy_output=$(trivy fs . 2>&1)
trivy_exit_code=$?

set -e

if [ $trivy_exit_code -ne 0 ]; then
  echo "❌ Trivy scan encountered errors:"
  echo "$trivy_output"
else
  echo "✅ Trivy scan completed successfully"
fi

exit $trivy_exit_code
