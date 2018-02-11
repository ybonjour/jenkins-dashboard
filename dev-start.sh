#!/usr/bin/env bash

set -o errexit
set -o pipefail

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

jenkins_server="$1"

if [ -z ${jenkins_server} ]; then
	echo "USAGE: ./dev-start.sh <jenkins_server>"
	exit 1
fi

rm -f "${dir}/nginx-conf/jenkins-dashboard.conf"

docker run -i -v ${dir}/nginx-conf:/data -e "TEMPLATE=jenkins-dashboard.conf.j2" pinterb/jinja2 JENKINS_SERVER=${jenkins_server} > ${dir}/nginx-conf/jenkins-dashboard.conf

docker run --rm -d --name dev-server \
-v "${dir}/src":/var/www \
-v "${dir}/nginx-conf/nginx.conf":/etc/nginx/nginx.conf \
-v "${dir}/nginx-conf/jenkins-dashboard.conf":/etc/nginx/sites-enabled/jenkins-dashboard.conf \
-p 8080:80 nginx
