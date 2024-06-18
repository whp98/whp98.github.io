# docker-desktop-无法和root共享的问题

## 问题

`sudo docker `和 `docker` 内容不一样

并且docker desktop 无法访问宿主ip的端口
## 解决

只需要加入当前用户到docker组即可

 `sudo usermod -aG docker ${USER}`