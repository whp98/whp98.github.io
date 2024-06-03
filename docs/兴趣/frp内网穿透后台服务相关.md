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
## 3.frp服务端客户端配置
  经过我使用,frp在windows远程桌面的时候有不稳定的状况。后来启用了kcp发现反应快多了，并且更稳定，就是有点费流量。

这是我的配置文件密码需要自己设置下。
frps
```ini
[common]
bind_port = 17000
kcp_bind_port = 17000
dashboard_port = 17500
token = adhksdhkajshdkashdkja
dashboard_user = admin
dashboard_pwd = sdadasdasdasdsavvfsfds
```

frpc
```ini
[common]
server_addr = 1.1.1.1
server_port = 17000
token = adhksdhkajshdkashdkja
protocol = kcp
[mypc_compTCP]
type = tcp
local_ip = 127.0.0.1
local_port = 3389
remote_port = 30250
[mypc_compUDP]
type = udp
local_ip = 127.0.0.1
local_port = 3389
remote_port = 30250
```