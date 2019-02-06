---
title: CenterOS7部署静态博客
copyright: true
date: 2018-02-19 20:09:59
tags: 服务器
categories: 服务器
---

```bash
yum install nginx       安装nginx 
yum install git         安装git （git clone ...） 静态文放在/usr/src/blog下
```

```bash
systemctl enable nginx  系统启动时运行nginx
service nginx start     启动nginx服务
service nginx stop	    停止nginx服务
service nginx reload    重启nginx服务
```

```bash
pwd                     查看当前目录
ll/dir                  查看目录下文件和文件夹
mv 文件名 新文件名       修改文件夹名称
vi nginx.conf           编辑文件
```

```nginx
user  nginx;
worker_processes  1;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {
    worker_connections  1024;
}
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
	log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                  	  '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    #include /etc/nginx/conf.d/*.conf;  #关闭默认的配置

    #自定义监听端口，指定静态站点所在目录
    server {
        listen  80;
        server_name  localhost;
        root   /usr/src/blog;
        index  index.html index.htm;
    }
}
```
开启`https`时`nginx`配置

```nginx
user  nginx;
worker_processes  1;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;
    sendfile        on;
    \#tcp_nopush     on;
    keepalive_timeout  65;

    \#gzip  on;
    \#include /etc/nginx/conf.d/*.conf;
    server {
        listen 443;
        server_name www.xxx.cn; #填写绑定证书的域名
        ssl on;
        ssl_certificate ./conf.d/1_www.xxx.cn_bundle.crt;
        ssl_certificate_key ./conf.d/2_www.xxx.cn.key;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #按照这个协议配置
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;#按照这个套件配置
        ssl_prefer_server_ciphers on;
        location / {
            root   /usr/src/blog; #站点目录
            index  index.html index.htm;
        }
    }  

    server {
    	listen  80;
    	server_name  localhost; 
      	location / {
         	root   /usr/src/blog; #站点目录
         	index  index.html index.htm;
          	rewrite ^(.*) https://$host$1 permanent;  // 80端口请求重定向到https
      	}
    }
}
```