# 一键开启Redis容器


## 带配置文件

`/etc/redis/redis.conf`

```text
requirepass redis123
bind 0.0.0.0
protection-mode no
```


```bash
docker run -d --name redis-server -p 6379:6379 --restart=always -v /etc/redis/redis.conf:/etc/redis/redis.conf -v /usr/redis/data/:/data redis:latest --appendonly yes --requirepass "redis123"
```

## 不带配置文件

```shell
docker pull redis
docker run -d --name redis -p 6479:6379 redis --requirepass xxx --restart=always
```

