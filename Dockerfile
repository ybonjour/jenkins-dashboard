FROM nginx
LABEL maintainer="yves.bonjour@gmail.com"

RUN apt-get update && \
    apt-get install -y python-dev python-setuptools
RUN easy_install j2cli

COPY nginx-conf/nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /etc/nginx/sites-enabled

COPY src /var/www

COPY nginx-conf/jenkins-dashboard.conf.j2 /templates/jenkins-dashboard.conf.j2

COPY docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
