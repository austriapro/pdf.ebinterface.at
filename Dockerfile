FROM nginx

ADD ./pdf-ebinterface-frontend/src/main/resources/client/build /usr/share/nginx/html
