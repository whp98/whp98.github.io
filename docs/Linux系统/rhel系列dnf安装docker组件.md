# rhel系列dnf安装docker组件 

## 移除旧的包

```bash
sudo dnf remove -y docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
```

## 安装必要的前置依赖
```bash
sudo dnf install -y yum-utils
```

## 配置官方软件源并安装

```bash
sudo yum-config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo systemctl enable --now docker
```
## 测试

```bash
docker --version
docker compose version
sudo docker run hello-world
```

## 用户组添加并重启

```bash
sudo sh && sudo usermod -aG docker $USER && newgrp docker
sudo reboot
```