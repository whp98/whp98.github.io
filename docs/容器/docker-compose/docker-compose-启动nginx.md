# docker-compose-启动nginx

```yaml
services:
   web:
     #定义主机名
     container_name: mynginx
     #使用的镜像
     image: nginx:1.27.0
     #容器的映射端口
     ports:
       - 18081:8081
     #定义挂载点         
     volumes:
       - /home/w/MY_CODE/xinsu_Release/com-xquant-xinsu-web/dist:/usr/share/nginx/html
       #- ./conf/nginx.conf:/etc/nginx/nginx.conf
       - ./conf.d:/etc/nginx/conf.d
       - ./logs:/var/log/nginx
     #docker 重启后，容器自启动
     restart: always
```