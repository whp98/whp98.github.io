# 一键启动Redis容器

```shell
docker pull redis
docker run -d --name redis -p 6479:6379 redis --requirepass xxx --restart=always
```
