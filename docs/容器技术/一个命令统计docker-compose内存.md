# 一个命令统计docker-compose内存

命令如下

```bash
docker stats --no-stream --format "{{.MemUsage}}" $(docker compose ps -q) | awk '{
  if ($1 ~ /GiB/) {
    val = $1; sub(/GiB/, "", val); sum += val * 1024; # GiB 转 MiB
  } else if ($1 ~ /MiB/) {
    val = $1; sub(/MiB/, "", val); sum += val;         # MiB
  }
} END {printf "总内存占用: %.2f MiB\n", sum}'
```
