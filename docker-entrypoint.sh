#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

j2 /templates/jenkins-dashboard.conf.j2 > /etc/nginx/sites-enabled/jenkins-dashboard.conf
exec "$@"
