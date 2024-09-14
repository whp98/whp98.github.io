# docker-compose中如何访问宿主机的网络

## 对于需要访问宿主机器的容器
可以看如下的应用配置：
```yaml
services:
  my_service:
    extra_hosts:
      - "host.docker.internal:host-gateway"
    environment:
      - https_proxy=http://host.docker.internal:20003
      - http_proxy=http://host.docker.internal:20003
```
`host-gateway`是docker默认提供的一个网关，通过这个网关，可以访问宿主机的网卡。
`host.docker.internal`是docker-desktop默认提供的一个域名，通过这个域名，可以访问宿主机的端口。
`extra_hosts`可以添加一些自定义的域名让docker的容器访问特定端口，通过这个域名，可以访问宿主机的端口。
`environment`可以设置一些环境变量，包括代理等。

上面的配置，配置容器使用宿主机器的代理，并且可以访问宿主机的端口。

