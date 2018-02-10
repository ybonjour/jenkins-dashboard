#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

(cd "${dir}/src"; npm install)
docker build -t jenkins-dashboard "${dir}"
