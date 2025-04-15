# SeaTunnel安装部署

## 参考文档
https://seatunnel.apache.org/docs/


https://seatunnel.apache.org/zh-CN/docs/2.3.10/about/

## 介绍

SeaTunnel 是一款非常易用、超高性能、支持海量数据实时同步的分布式数据集成平台，每天可以稳定高效地同步数百亿条数据，目前已有近百家公司投入生产使用。

## 优点

支持的数据库多,支持oracle、mysql还包括达梦、kingbase、oceanbase等国产数据库。


## 具体操作

参考这部分
https://seatunnel.apache.org/zh-CN/docs/start-v2/docker/


docker-compose.yaml
```yaml

version: '3.8'

services:
  master:
    image: apache/seatunnel
    container_name: seatunnel_master
    environment:
      - ST_DOCKER_MEMBER_LIST=172.16.0.2,172.16.0.3,172.16.0.4
    entrypoint: >
      /bin/sh -c "
      /opt/seatunnel/bin/seatunnel-cluster.sh -r master
      "    
    ports:
      - "5801:5801"
    networks:
      seatunnel_network:
        ipv4_address: 172.16.0.2

  worker1:
    image: apache/seatunnel
    container_name: seatunnel_worker_1
    environment:
      - ST_DOCKER_MEMBER_LIST=172.16.0.2,172.16.0.3,172.16.0.4
    entrypoint: >
      /bin/sh -c "
      /opt/seatunnel/bin/seatunnel-cluster.sh -r worker
      " 
    depends_on:
      - master
    networks:
      seatunnel_network:
        ipv4_address: 172.16.0.3

  worker2:
    image: apache/seatunnel
    container_name: seatunnel_worker_2
    environment:
      - ST_DOCKER_MEMBER_LIST=172.16.0.2,172.16.0.3,172.16.0.4
    entrypoint: >
      /bin/sh -c "
      /opt/seatunnel/bin/seatunnel-cluster.sh -r worker
      " 
    depends_on:
      - master
    networks:
      seatunnel_network:
        ipv4_address: 172.16.0.4

networks:
  seatunnel_network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.16.0.0/24

```
