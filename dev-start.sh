#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

docker run --rm -d --name dev-server \
-v "${dir}/src":/var/www \
-v "${dir}/nginx-conf/nginx.conf":/etc/nginx/nginx.conf \
-v "${dir}/nginx-conf/sites-available/jenkins-dashboard.conf":/etc/nginx/sites-enabled/jenkins-dashboard.conf \
-p 8080:80 nginx
