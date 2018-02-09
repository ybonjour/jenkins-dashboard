#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

docker run --rm -d --name dev-server -p 8080:80 -v "${dir}/src":/usr/share/nginx/html nginx
