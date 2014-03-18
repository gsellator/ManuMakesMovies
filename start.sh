#!/bin/bash

# Create user pre
#ssh root@91.121.177.78
#sudo useradd ManuMakesMovies-prod
#sudo passwd ManuMakesMovies-prod
#sudo mkdir /home/ManuMakesMovies-prod
#sudo adduser ManuMakesMovies-prod sudo
#cd /home/ManuMakesMovies-prod/
#sudo chown -Rv ManuMakesMovies-prod /home/ManuMakesMovies-prod/
#sudo mkdir /home/ManuMakesMovies-prod/ManuMakesMovies
#sudo chown -Rv ManuMakesMovies-prod /home/ManuMakesMovies-prod/ManuMakesMovies/ 
#ssh ManuMakesMovies-prod@91.121.177.78

sudo vi /etc/nginx/sites-available/ManuMakesMovies-prod
sudo ln -s /etc/nginx/sites-available/ManuMakesMovies-prod /etc/nginx/sites-enabled/





# Run pre
cd /home/ManuMakesMovies-prod/ManuMakesMovies/
npm install --production
pkill node
nohup node app.js &




//NGINX
upstream www.manumakesmovies.com {
    server 127.0.0.1:3020;
}

server {
        listen 80;
        server_name www.manumakesmovies.com;
        #access_log /var/log/nginx/yourdomain.log;

        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;
                proxy_redirect off;
        }
}