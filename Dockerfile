FROM nginx:alpine

# Copy static website files to nginx html serving directory
COPY . /usr/share/nginx/html

# Replace default Nginx port 80 with port 8005 in default server configuration
RUN sed -i 's/listen       80;/listen       8005;/g' /etc/nginx/conf.d/default.conf

# Expose port 8005 for Easypanel routing
EXPOSE 8005

CMD ["nginx", "-g", "daemon off;"]
