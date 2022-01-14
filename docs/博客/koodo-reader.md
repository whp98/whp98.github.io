# Koodo Reader 阅读器容器化部署

拉取
```bash
docker pull jxzzlfh/koodo-reader
```

启动
```bash
docker run -d \
  --name=koodo-reader \
  --restart=unless-stopped \
  -p 9999:80 \
  jxzzlfh/koodo-reader:latest
  
```