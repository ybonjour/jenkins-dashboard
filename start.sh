#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

docker run -p 80:80 -d --rm --name jenkins-dashboard jenkins-dashboard
