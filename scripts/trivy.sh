#!/bin/bash

TRIVY_VERSION="0.69.2"

if ! command -v trivy >/dev/null 2>&1 || [ "$(trivy --version | grep '^Version:' | awk '{print $2}')" != "$TRIVY_VERSION" ]; then
  curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sudo sh -s -- -b /usr/local/bin v${TRIVY_VERSION}
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
