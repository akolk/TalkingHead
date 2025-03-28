FROM nginx:latest

COPY . /etc/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

