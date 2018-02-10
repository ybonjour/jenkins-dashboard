#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

"${dir}/dev-stop.sh" || true
"${dir}/dev-start.sh"
