# 快速部署frp


部署多个端口有利于高可用
以下脚本用于部署4套FRP

```sh
#!/bin/sh
token=adsasdasdasd
passwd=sdasdasdl
account=admin
path=`pwd`
wget https://github.com/fatedier/frp/releases/download/v0.44.0/frp_0.44.0_linux_amd64.tar.gz -O frp_temp.tar.gz

tar -xvzf frp_temp.tar.gz
mv frp_0.44.0_linux_amd64 frp_temp
rm frp_temp.tar.gz
cp frp_temp -r frp1
cp frp_temp -r frp2
cp frp_temp -r frp3
cp frp_temp -r frp4
rm -rf frp_temp

echo "
[common]
bind_port = 15000
bind_udp_port = 15001
kcp_bind_port = 15000
dashboard_port = 15500
token = ${token}
dashboard_user = ${account}
dashboard_pwd = ${passwd}
max_pool_count = 15
" | tee frp1/frps.ini

echo "
[common]
bind_port = 16000
bind_udp_port = 16001
kcp_bind_port = 16000
dashboard_port = 16500
token = ${token}
dashboard_user = ${account}
dashboard_pwd = ${passwd}
max_pool_count = 15
" | tee frp2/frps.ini
echo "
[common]
bind_port = 17000
bind_udp_port = 17001
kcp_bind_port = 17000
dashboard_port = 17500
token = ${token}
dashboard_user = ${account}
dashboard_pwd = ${passwd}
max_pool_count = 15
" | tee frp3/frps.ini
echo "
[common]
bind_port = 18000
bind_udp_port = 18001
kcp_bind_port = 18000
dashboard_port = 18500
token = ${token}
dashboard_user = ${account}
dashboard_pwd = ${passwd}
max_pool_count = 15
" | tee frp4/frps.ini

echo "
[Unit]
Description=FRP: The nginx HTTP and reverse proxy server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=simple
ExecStart=${path}/frp1/frps -c ${path}/frp1/frps.ini
KillSignal=SIGQUIT
TimeoutStopSec=5
KillMode=process
PrivateTmp=true
StandardOutput=syslog
StandardError=inherit
[Install]
WantedBy=multi-user.target
" | tee /lib/systemd/system/frp1.service
echo "
[Unit]
Description=FRP: The nginx HTTP and reverse proxy server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=simple
ExecStart=${path}/frp2/frps -c ${path}/frp2/frps.ini
KillSignal=SIGQUIT
TimeoutStopSec=5
KillMode=process
PrivateTmp=true
StandardOutput=syslog
StandardError=inherit
[Install]
WantedBy=multi-user.target
" | tee /lib/systemd/system/frp2.service
echo "
[Unit]
Description=FRP: The nginx HTTP and reverse proxy server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=simple
ExecStart=${path}/frp3/frps -c ${path}/frp3/frps.ini
KillSignal=SIGQUIT
TimeoutStopSec=5
KillMode=process
PrivateTmp=true
StandardOutput=syslog
StandardError=inherit
[Install]
WantedBy=multi-user.target
" | tee /lib/systemd/system/frp3.service
echo "
[Unit]
Description=FRP: The nginx HTTP and reverse proxy server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=simple
ExecStart=${path}/frp4/frps -c ${path}/frp4/frps.ini
KillSignal=SIGQUIT
TimeoutStopSec=5
KillMode=process
PrivateTmp=true
StandardOutput=syslog
StandardError=inherit
[Install]
WantedBy=multi-user.target
" | tee /lib/systemd/system/frp4.service
```

上面弄好之后设置开机启动

```sh 
#!/bin/sh
systemctl daemon-reload
systemctl start frp1
systemctl status frp1
systemctl enable frp1
systemctl start frp2
systemctl status frp2
systemctl enable frp2
systemctl start frp3
systemctl status frp3
systemctl enable frp3
systemctl start frp4
systemctl status frp4
systemctl enable frp4
```

重启
```sh
systemctl daemon-reload
systemctl restart frp1
systemctl restart frp2
systemctl restart frp3
systemctl restart frp4
```
查看情况
```sh 
systemctl status frp1
systemctl status frp2
systemctl status frp3
systemctl status frp4
```




删除
```sh 
#!/bin/sh
systemctl stop frp1
systemctl disable frp1
systemctl stop frp2
systemctl disable frp2
systemctl stop frp3
systemctl disable frp3
systemctl stop frp4
systemctl disable frp4
rm /lib/systemd/system/frp1.service
rm /lib/systemd/system/frp2.service
rm /lib/systemd/system/frp3.service
rm /lib/systemd/system/frp4.service

rm -r frp1
rm -r frp2
rm -r frp3
rm -r frp4
systemctl daemon-reload
```

## 实现一般程度上的高可用
在需要高可用服务的机器上，分别开启四个frpc的stcp服务分别连接上面四个frps。

完成之后试用haproxy开启四个端口的集群代理。

这样每次服务断开之后可以立即切换到另一个端口从而能实现一定程度的高可用。

我自己本人在windows上使用ha的配置文件如下：
```
#logging options
global
    log 127.0.0.1 local0 info
    maxconn 1500
    daemon
    quiet
    nbproc 1

defaults
    log global
    #使用4层代理模式，”mode http”为7层代理模式
    mode tcp
    #if you set mode to tcp,then you nust change tcplog into httplog
    option tcplog
    option dontlognull
    retries 3
    option redispatch
    maxconn 2000
    timeout connect 10s
     ##客户端空闲超时时间为 60秒 则HA 发起重连机制
    timeout client 10s
     ##服务器端链接超时时间为 15秒 则HA 发起重连机制
    timeout server 10s 
#front-end IP for consumers and producters

listen RDP
    bind 0.0.0.0:32000
    #配置TCP模式
    mode tcp
    tcp-request inspect-delay 5s
    tcp-request content accept if RDP_COOKIE
    persist rdp-cookie
    balance leastconn
    option tcpka
    option tcplog
    server one30351	127.0.0.1:30351 check inter 5000 rise 2 fall 2
    server one30352	127.0.0.1:30352 check inter 5000 rise 2 fall 2
    server one30353	127.0.0.1:30353 check inter 5000 rise 2 fall 2
    server one30354	127.0.0.1:30354 check inter 5000 rise 2 fall 2
    option redispatch
        
#配置haproxy web监控，查看统计信息
listen stats
    bind 127.0.0.1:8990
    mode http
    option httplog
    stats enable
    #设置haproxy监控地址为http://localhost:8990/frp-stats
    stats uri /frp-stats
    stats refresh 1s
```

可以参考一下