# 部署wordpress博客


## 安装docker
```shell
yum update 
yum -y install docker 
systemctl start docker.service 

```

## 安装docker-compose
```bash
yum install docker-compose 
```
编辑配置文件
```yaml
version: '3.3'
services:
   db:
     image: mysql:5.7
     volumes:
       - db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress
   wordpress:
     depends_on:
       - db
     image: wordpress:latest
     ports:
       - "9999:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
       WORDPRESS_DB_NAME: wordpress
volumes:
    db_data: {}

```
# 启动或删除服务

```bash
docker-compose -f wordpress.yml up -d  #部署
docker-compose -f wordpress.yml down #停止并删除
```
