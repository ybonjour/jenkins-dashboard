#!/usr/bin/env bash

set -o errexit
set -o pipefail

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)


jenkins_server="$1"

if [ -z ${jenkins_server} ]; then
	echo "USAGE: ./start.sh <jenkins_server>"
	exit 1
fi

docker run -p 80:80 -e "JENKINS_SERVER=${jenkins_server}" -d --rm --name jenkins-dashboard ybonjour/jenkins-dashboard
