# 迁移docker目录/var/lib/docker/

https://cloud.tencent.com/developer/article/2020334?pos=comment
假如迁移到 /home/docker_lib

1. 停止docker服务
   

```shell
sudo systemctl stop docker
sudo systemctl stop docker.socket
```

2.创建目标路径

```shell
sudo mkdir /home/docker_lib
```

3.同步数据

```shell
sudo rsync -avzP /var/lib/docker/ /home/docker_lib
```

4.修改docker服务
在ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock后添加--graph=/home/docker_lib
```shell
sudo vim /etc/docker/daemon.json
```

```json
{
     "data-root": "/home/docker_lib"
}
```

5.重启docker服务

```shell
sudo systemctl daemon-reload 
sudo systemctl restart docker
```