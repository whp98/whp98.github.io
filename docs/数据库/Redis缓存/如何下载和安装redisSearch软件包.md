# 如何下载和安装redisSearch软件包

## 下载redis >= 8.0.0版本


### 1.rpm包适用于rhel兼容系统

官方文档如下

https://redis.io/docs/latest/operate/oss_and_stack/install/install-stack/rpm/

这个需要自己看下架构和系统版本
比如x86_64 系统是centos8 （兼容rhel8）
那么需要寻找对应的rpm包为amd64+rhel8
官方提供的路径是
https://packages.redis.io/rpm/rockylinux8

这个s3的地址

我们需要具体包名称

包名可以在github action找到

https://github.com/redis/redis-rpm/actions


https://packages.redis.io/rpm/rockylinux8/redis-8.0.0-1.x86_64.rpm

安装方式
```bash
sudo rpm -i ./redis-8.0.0-1.x86_64.rpm
```

### 2.deb包适用于debian兼容系统 
官方文档如下
这个需要自己看下架构和系统版本
比如x86_64 系统是ubuntu24 Noble

官方deb下载路径前缀是这样的
https://packages.redis.io/deb

需要找到对应的deb包则在github action上找到

https://github.com/redis/redis-debian/actions

upload packages 部分可以找到

pool/noble/r/re/redis_8.0.0-1rl1~noble1_all.deb
pool/noble/r/re/redis-sentinel_8.0.0-1rl1~noble1_amd64.deb
pool/noble/r/re/redis-server_8.0.0-1rl1~noble1_amd64.deb
pool/noble/r/re/redis-tools_8.0.0-1rl1~noble1_amd64.deb

拼接好
```bash
wget https://packages.redis.io/deb/pool/noble/r/re/redis_8.0.0-1rl1~noble1_all.deb
wget https://packages.redis.io/deb/pool/noble/r/re/redis-sentinel_8.0.0-1rl1~noble1_amd64.deb
wget https://packages.redis.io/deb/pool/noble/r/re/redis-server_8.0.0-1rl1~noble1_amd64.deb
wget https://packages.redis.io/deb/pool/noble/r/re/redis-tools_8.0.0-1rl1~noble1_amd64.deb
sudo dpkg -i *.deb
redis-cli --version
redis-server --version
```
输出如下
```text
正在选中未选择的软件包 redis。
(正在读取数据库 ... 系统当前共安装有 663333 个文件和目录。)
准备解压 redis_8.0.0-1rl1~noble1_all.deb  ...
正在解压 redis (6:8.0.0-1rl1~noble1) ...
正在选中未选择的软件包 redis-sentinel。
准备解压 redis-sentinel_8.0.0-1rl1~noble1_amd64.deb  ...
正在解压 redis-sentinel (6:8.0.0-1rl1~noble1) ...
正在选中未选择的软件包 redis-server。
准备解压 redis-server_8.0.0-1rl1~noble1_amd64.deb  ...
正在解压 redis-server (6:8.0.0-1rl1~noble1) ...
正在选中未选择的软件包 redis-tools。
准备解压 redis-tools_8.0.0-1rl1~noble1_amd64.deb  ...
正在解压 redis-tools (6:8.0.0-1rl1~noble1) ...
正在设置 redis-tools (6:8.0.0-1rl1~noble1) ...
正在设置 redis-sentinel (6:8.0.0-1rl1~noble1) ...
Created symlink /etc/systemd/system/sentinel.service → /usr/lib/systemd/system/redis-sentinel.service.
Created symlink /etc/systemd/system/multi-user.target.wants/redis-sentinel.service → /usr/lib/systemd/system/redis-sentinel.service.
正在设置 redis-server (6:8.0.0-1rl1~noble1) ...
redis-server.service is a disabled or a static unit not running, not starting it.
正在设置 redis (6:8.0.0-1rl1~noble1) ...
正在处理用于 man-db (2.12.0-4build2) 的触发器 ...
redis-cli 8.0.0
Redis server v=8.0.0 sha=00000000:1 malloc=jemalloc-5.3.0 bits=64 build=e8e7b6d49d89a863

```

## 适用于小于8.0版本的redis-stack-server（包含搜索模块等的redis）

> 官方建议使用8.0版本 redis-stack-server 支持2025-12-31结束

### 1.压缩包安装方法
https://github.com/redis-stack/redis-stack/releases

找到适合的版本比如


Redis Stack 7.4.0-v4

最下面有各个系统的下载链接


包含了这些内容

macOS: x86_64, arm64
AppImage: x86_64
Ubuntu: Bionic x86_64, Bionic arm64, Focal x86_64, Focal arm64, Snap x86_64, Snap arm64, Jammy x86_64, Jammy arm64
Debian: Bullseye x86_64
RHEL 8/CentOS Linux 8: x86_64
RHEL 9/Rocky Linux 9/CentOS Linux 9: x86_64
Redis Stack on Dockerhub: x86_64 and arm64
Redis Stack server on Dockerhub: x86_64 and arm64


也就是最低适合的版本是centos8

redis-stack手动安装步骤使用方法

官方文档


https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-stack/binaries/

这个步骤操作还是比较麻烦的，需要复制二进制到系统目录，配置文件和启动脚本或systemd脚本都要配置好。



### 2.deb安装方法

https://github.com/redis-stack/redis-stack-deb


https://github.com/redis-stack/redis-stack-deb/actions


下载链接 示例
https://packages.redis.io/deb/pool/jammy/r/re/redis-stack-server-6.2.6-v19.jammy.amd64.deb

### 3.rpm安装方法

https://github.com/redis-stack/redis-stack-rpm

包名字参考action


下载链接示例
https://packages.redis.io/rpm/rhel8/x86_64/redis-stack-server-6.2.6-v20.rhel8.x86_64.rpm



```bash
dnf install jemalloc-devel -y
rpm -i redis-stack-server-6.2.6-v20.rhel8.x86_64.rpm
```

安装好之后启动服务

```bash
sudo systemctl start redis-stack-server
sudo systemctl status redis-stack-server
```