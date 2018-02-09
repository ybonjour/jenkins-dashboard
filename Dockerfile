FROM nginx
LABEL maintainer="yves.bonjour@gmail.com"

COPY nginx-conf/nginx.conf /etc/nginx/nginx.conf
COPY nginx-conf/sites-available/jenkins-dashboard.conf /etc/nginx/sites-available/jenkins-dashboard.conf
RUN mkdir -p /etc/nginx/sites-enabled
RUN ln -s /etc/nginx/sites-available/jenkins-dashboard.conf /etc/nginx/sites-enabled/jenkins-dashboard.conf

COPY src /var/www
