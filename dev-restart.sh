#!/usr/bin/env bash

set -o errexit
set -o pipefail

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

jenkins_server="$1"

if [ -z ${jenkins_server} ]; then
	echo "USAGE: ./dev-restart.sh <jenkins_server>"
	exit 1
fi

"${dir}/dev-stop.sh" || true
"${dir}/dev-start.sh" ${jenkins_server}
