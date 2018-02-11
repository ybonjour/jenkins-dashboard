#!/usr/bin/env bash

set -o errexit
set -o pipefail

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

jenkins_server="$1"

if [ -z ${jenkins_server} ]; then
	echo "USAGE: ./restart.sh <jenkins_server>"
	exit 1
fi

"${dir}/stop.sh" || true
"${dir}/start.sh" ${jenkins_server}
