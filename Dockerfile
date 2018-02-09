FROM nginx
LABEL maintainer="yves.bonjour@gmail.com"

COPY src /usr/share/nginx/html
