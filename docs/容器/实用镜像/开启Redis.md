# 开启Redis

```bash
docker run -d --name redis-server -p 6379:6379 -v /usr/redis/redis.conf:/etc/redis/redis.conf -v /usr/redis/data/:/data redis:latest /etc/redis/redis.conf --appendonly yes --requirepass "redis123"
```