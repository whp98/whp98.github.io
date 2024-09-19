# docker-compose-启动nacos

```yaml
services:
  nacos:
    restart: always
    image: nacos/nacos-server:v2.2.1
    # 容器名称
    container_name: nacos
    # 端口映射
    ports:
      - 8848:8848
      - 9848:9848
      - 9849:9849
    # 容器权限
    privileged: true
    # 参数设置
    environment:
      MODE: standalone
      NACOS_REPLICAS: 1
      PREFER_HOST_MODE: ip
      NACOS_AUTH_IDENTITY_KEY: serverIdentity
      NACOS_AUTH_IDENTITY_VALUE: security
      NACOS_AUTH_TOKEN: SecretKey012345678901234567890123456789012345678901234567890123456789
    volumes:
      - ./nacos_logs:/home/nacos/logs
      - ./nacos_plugins:/home/nacos/plugins
      - ./nacos_data:/home/nacos/data
      #- ./nacos_config/application.properties:/home/nacos/conf/application.properties
```