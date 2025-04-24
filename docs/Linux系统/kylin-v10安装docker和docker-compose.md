# kylin-v10安装docker和docker-compose

## 预先检查下linux上是否有docker和docker-compose还有podman

```bash
which docker
which docker-compose
which podman
```
podman会导致docker无法运行，需要卸载podman

当然也要确认podman没有被使用
```bash
podman ps -a
```
```bash
yum remove podman -y
```
查看cpu类型
```bash
arch
```



## 安装docker和docker-compose

首先去下载docker和docker-compose
根据cpu类型下载
https://download.docker.com/linux/static/stable/

本次选择x86_64


https://github.com/docker/compose/releases

选择linux 64的

获取之后将文件上传到服务器上



## 将二进制复制到系统的bin目录下
解压docker安装包并将二进制复制到系统bin目录下

```bash
tar -zxvf docker-20.10.17.tgz
mv docker/* /usr/bin/
```

```bash
mv docker-compose-linux-x86_64 /usr/bin/docker-compose
chmod +x /usr/bin/docker-compose
```

## 编辑systemd文件
```bash
vi  /usr/lib/systemd/system/docker.service
```

```text
[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target nss-lookup.target docker.socket firewalld.service containerd.service time-set.target
Wants=network-online.target containerd.service
Requires=docker.socket

[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
ExecReload=/bin/kill -s HUP $MAINPID
TimeoutStartSec=0
RestartSec=2
Restart=always

# Note that StartLimit* options were moved from "Service" to "Unit" in systemd 229.
# Both the old, and new location are accepted by systemd 229 and up, so using the old location
# to make them work for either version of systemd.
StartLimitBurst=3

# Note that StartLimitInterval was renamed to StartLimitIntervalSec in systemd 230.
# Both the old, and new name are accepted by systemd 230 and up, so using the old name to make
# this option work for either version of systemd.
StartLimitInterval=60s

# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNPROC=infinity
LimitCORE=infinity

# Comment TasksMax if your systemd version does not support it.
# Only systemd 226 and above support this option.
TasksMax=infinity

# set delegate yes so that systemd does not reset the cgroups of docker containers
Delegate=yes

# kill only the docker process, not all processes in the cgroup
KillMode=process
OOMScoreAdjust=-500

[Install]
WantedBy=multi-user.target
```

## 添加docker用户组
```bash
groupadd docker
usermod -aG docker 用户1 用户2
usermod -aG docker root
```
## 创建daemon.json文件
```bash
vi /etc/daemon.json
```
内容如下
```json
{
    "registry-mirrors": ["https://registry.docker-cn.com"],
    "exec-opts": ["native.cgroupdriver=systemd"]
}
```

##  启动docker

```bash
systemctl daemon-reload
systemctl enable docker
systemctl start docker
systemctl status docker
```

## 测试docker是否安装成功
```bash
docker run hello-world
```

