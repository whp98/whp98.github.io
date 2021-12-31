# frp内网穿透后台服务相关

## 保持服务端后台运行的方式

### 1.直接后台运行

1. 运行
```bash
nohup ./frp_bin/frps -c ./frp_bin/frps.ini > /dev/null &
```
2. 查看运行状态

```bash
ps -ef | grep frp
```

### 2.安装为系统服务

```bash
vi /lib/systemd/system/frp.service
```
输入服务内容（替换执行内容）
```bash
[Unit]
Description=FRP: The nginx HTTP and reverse proxy server
After=network.target remote-fs.target nss-lookup.target

[Service]
Type=simple
ExecStart=/root/frp_bin/frps -c /root/frp_bin/frps.ini
KillSignal=SIGQUIT
TimeoutStopSec=5
KillMode=process
PrivateTmp=true
StandardOutput=syslog
StandardError=inherit

[Install]
WantedBy=multi-user.target
```
启动服务
```bash
systemctl start frp
```
查看服务状态
```bash
systemctl status frp
```