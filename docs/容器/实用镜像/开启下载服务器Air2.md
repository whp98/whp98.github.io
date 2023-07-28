# 开启下载服务器Air2
```bash
docker run --restart=always --name aria2 -d  -p 6060:端口  -p 6800:6800  -e SECRET=密码  -v /air2/down:下载路径  -v /air2/conf:/conf  onisuly/aria2-with-webui
```