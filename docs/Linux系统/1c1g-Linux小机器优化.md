# 1c1g-Linux小机器优化

## 检查SAWP并新增
```bash
free -h
```

如果没有或者太少新增

```bash
#【root用户】 创建一个 2GB 的 swap 文件
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile swap swap defaults 0 0' >> /etc/fstab
```
## 核心参数优化

```bash
sudo tee -a /etc/sysctl.conf <<EOF
# 增大 UDP 接收和发送缓冲区上限
net.core.rmem_max = 8388608
net.core.wmem_max = 8388608

# 增大默认的缓冲区大小
net.core.rmem_default = 262144
net.core.wmem_default = 262144

# 增加网络设备积压队列长度
net.core.netdev_max_backlog = 5000

# 2G Swap 后的关键设置：尽量使用物理内存，减少磁盘 I/O 带来的卡顿
vm.swappiness = 30

# 脏数据回写设置：让系统更频繁地将内存数据写入磁盘，防止大量数据堆积在内存中
vm.dirty_ratio = 10
vm.dirty_background_ratio = 5

# 恐慌机制：当内存完全耗尽且无法回收时，允许系统在 10 秒后自动重启，而不是无限期卡死
kernel.panic = 10
kernel.panic_on_oops = 1
vm.panic_on_oom = 0
# 开启 TCP 快速打开 (TFO)，减少握手延迟
net.ipv4.tcp_fastopen = 3

# 启用 BBR 拥塞控制算法（Oracle 默认内核通常已支持）
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr

# 优化连接回收，防止大量 TIME_WAIT 占用资源
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_fin_timeout = 30
net.ipv4.tcp_keepalive_time = 600

# 增大系统级文件句柄限制
fs.file-max = 65535
EOF
# 查看参数
cat /etc/sysctl.conf
# 使配置立即生效
sudo sysctl -p
```


## 修改进程级限制


```bash
sudo tee -a /etc/security/limits.conf <<EOF
* soft nofile 65535
* hard nofile 65535
root soft nofile 65535
root hard nofile 65535
EOF
# 查看参数
cat /etc/security/limits.conf
```