# Doris安装部署

## 参考文档

https://doris.apache.org/zh-CN/docs/gettingStarted/quick-start?_highlight=docker#%E4%BD%BF%E7%94%A8-docker-%E5%BF%AB%E9%80%9F%E9%83%A8%E7%BD%B2

采用docker操作

## 所需目录结构

```text
.
├── data
│   ├── be-1
│   │   ├── log
│   │   ├── script
│   │   └── storage
│   ├── be-2
│   │   ├── log
│   │   ├── script
│   │   └── storage
│   ├── be-3
│   │   ├── log
│   │   ├── script
│   │   └── storage
│   ├── fe-1
│   │   ├── doris-meta
│   │   └── log
│   ├── fe-2
│   │   ├── doris-meta
│   │   └── log
│   └── fe-3
│       ├── doris-meta
│       └── log
├── docker-compose.yml
├── init.sh
└── start.sh
```
## 配置文件如下

init.sh脚本用于初始化数据目录用于挂载
```bash
#!/bin/bash

sudo rm -rf ./data
mkdir ./data/fe-1/doris-meta -p
mkdir ./data/fe-1/log -p
mkdir ./data/be-1/storage -p
mkdir ./data/be-1/script -p
mkdir ./data/be-1/log -p

mkdir ./data/fe-2/doris-meta -p
mkdir ./data/fe-2/log -p
mkdir ./data/be-2/storage -p
mkdir ./data/be-2/script -p
mkdir ./data/be-2/log -p

mkdir ./data/fe-3/doris-meta -p
mkdir ./data/fe-3/log -p
mkdir ./data/be-3/storage -p
mkdir ./data/be-3/script -p
mkdir ./data/be-3/log -p
```
docker-compose.yml包含集群信息
```yaml
services:
  fe1:
    image: apache/doris:fe-ubuntu-${DORIS_QUICK_START_VERSION}
    hostname: fe1
    container_name: fe1
    restart: unless-stopped
    environment:
     - FE_SERVERS=fe1:172.23.80.2:9010,fe2:172.23.80.3:9010,fe3:172.23.80.4:9010
     - FE_ID=1
    ports:
      - 9021:8030
      - 9022:9030
    volumes:
      - ./data/fe-1/doris-meta:/opt/apache-doris/fe/doris-meta
      - ./data/fe-1/log:/opt/apache-doris/fe/log
    networks:
      doris_net:
        ipv4_address: 172.23.80.2
  fe2:
    image: apache/doris:fe-ubuntu-${DORIS_QUICK_START_VERSION}
    hostname: fe2
    container_name: fe2
    restart: unless-stopped
    environment:
     - FE_SERVERS=fe1:172.23.80.2:9010,fe2:172.23.80.3:9010,fe3:172.23.80.4:9010
     - FE_ID=2
    ports:
      - 9023:8030
      - 9024:9030
    volumes:
      - ./data/fe-2/doris-meta:/opt/apache-doris/fe/doris-meta
      - ./data/fe-2/log:/opt/apache-doris/fe/log
    networks:
      doris_net:
        ipv4_address: 172.23.80.3
  fe3:
    image: apache/doris:fe-ubuntu-${DORIS_QUICK_START_VERSION}
    hostname: fe3
    container_name: fe3
    restart: unless-stopped
    environment:
     - FE_SERVERS=fe1:172.23.80.2:9010,fe2:172.23.80.3:9010,fe3:172.23.80.4:9010
     - FE_ID=3
    ports:
      - 9025:8030
      - 9026:9030
    volumes:
      - ./data/fe-3/doris-meta:/opt/apache-doris/fe/doris-meta
      - ./data/fe-3/log:/opt/apache-doris/fe/log
    networks:
      doris_net:
        ipv4_address: 172.23.80.4
  be1:
    image: apache/doris:be-ubuntu-${DORIS_QUICK_START_VERSION}
    hostname: be1
    container_name: be1
    environment:
     - FE_SERVERS=fe1:172.23.80.2:9010,fe2:172.23.80.3:9010,fe3:172.23.80.4:9010
     - BE_ADDR=172.23.80.5:9050
    volumes:
      - ./data/be-1/storage:/opt/apache-doris/be/storage
      - ./data/be-1/script:/docker-entrypoint-initdb.d
      - ./data/be-1/log:/opt/apache-doris/be/log
    ports:
      - 9041:8040
    depends_on:
      - fe1
      - fe2
      - fe3
    networks:
      doris_net:
        ipv4_address: 172.23.80.5
  be2:
    image: apache/doris:be-ubuntu-${DORIS_QUICK_START_VERSION}
    hostname: be2
    container_name: be2
    environment:
     - FE_SERVERS=fe1:172.23.80.2:9010,fe2:172.23.80.3:9010,fe3:172.23.80.4:9010
     - BE_ADDR=172.23.80.6:9050
    ports:
      - 9042:8040
    volumes:
      - ./data/be-2/storage:/opt/apache-doris/be/storage
      - ./data/be-2/script:/docker-entrypoint-initdb.d
      - ./data/be-2/log:/opt/apache-doris/be/log
    depends_on:
      - fe1
      - fe2
      - fe3
    networks:
      doris_net:
        ipv4_address: 172.23.80.6
  be3:
    image: apache/doris:be-ubuntu-${DORIS_QUICK_START_VERSION}
    hostname: be3
    container_name: be3
    environment:
     - FE_SERVERS=fe1:172.23.80.2:9010,fe2:172.23.80.3:9010,fe3:172.23.80.4:9010
     - BE_ADDR=172.23.80.7:9050
    ports:
      - 9043:8040
    volumes:
      - ./data/be-3/storage:/opt/apache-doris/be/storage
      - ./data/be-3/script:/docker-entrypoint-initdb.d
      - ./data/be-3/log:/opt/apache-doris/be/log
    depends_on:
      - fe1
      - fe2
      - fe3
    networks:
      doris_net:
        ipv4_address: 172.23.80.7
networks:
  doris_net:
    ipam:
      config:
        - subnet: 172.23.80.0/24
```
启动脚本用于启动docker-compose中管理的容器

```bash
#!/bin/bash
export DORIS_QUICK_START_VERSION=2.1.7

docker-compose up -d
```

启动脚本执行后，会启动3个FE节点，3个BE节点
## 使用

可以使用浏览器访问http://localhost:9041/打开web界面

mysql连接使用

jdbc:mysql://localhost:9022

用户使用root密码为空


## 使用后总结

测试使用6c12t 40G内存

1.数据插入性能
insert into select语句插入400万数据用时3秒

2.单表sum性能和count性能
查询一个全表count差不多1秒 数字字段全表sum差不多1秒

3.使用3字段关联一亿和一亿表本身性能5分钟没有出来

4.数据大量插入和数据关联的时候cpu处于爆满状态

5.猜测还是本机性能有限，如果使用多核cpu，可以提高性能

6.语法和mysql语法差不多，但是不完全相同

7.可以探索mysql自动同步数据到doris