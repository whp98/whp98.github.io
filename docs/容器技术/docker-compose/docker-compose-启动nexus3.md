# docker-compose-启动nexus3

## 说明

nexus3 可以用来自建docker npm maven 等许多 私有镜像服务

## 步骤

`mkdir ./nexus-data`

`chmod 777 ./nexus-data`

`vim docker-compose.yml`

配置文件如下

```yml
services:
  nexus:
    image: sonatype/nexus3:3.69.0-java8
    restart: always
    ports:
      - "8081:8081"
      - "8082:8082"
    volumes:
      - ./nexus-data:/nexus-data
    networks:
      gitlab_network:
        aliases:
          - nexus
networks:
  gitlab_network:
    external: true # 引用现有的gitlab_network

```

