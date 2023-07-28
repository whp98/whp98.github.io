# Frp使用心得

## 前言

最近因为工作需要，使用frp作为内网穿透工具进行windows远程桌面连接。
期间遇到不少问题，采用了不少方法调优，于是写下此文总结下。


## 环境介绍

我的服务器是腾讯云轻量香港。系统是Ubuntu 20.04

Frp 版本用了 0.44.0

## 1.KCP使用

我之前使用的是TCP，用的不多没感觉有问题，但是我最近不知道是不是网络不好，经常断开。于是使用KCP来尝试优化。

启用KCP之后我发现效果并不是那么好。经常内部错误还长时间无法恢复，很坑。

这个有个特点是确实感受到延迟的降低。

期间还用了三方的花生壳和神着互联左临时替代。其实三方其实也挺好了的比较稳定。


## 2.STCP使用

STCP是被控端和使用端都安装一个frpc由FRP来为隧道进行实现，这个方案比之前的直连香港要稳定，但是实际体验还是有长时间断链并且无法恢复的情况发生。

## 3.XTCP使用

这个是打洞，可惜失败了。

## 4.STCP加代理

这个是我目前使用的方案，可能frp本身通信能力有问题，我用将使用端配置上了http代理，当然代理实现是v2实现的，相当于

frpc(控制端) -> v2隧道 -> frps -> frpc(被控端)

这个方案有很厉害的地方
1. 比较稳定
2. 可以把带宽拉上去（直接远程看视频也可）
3. 偶尔卡顿（原先是有的直接跳重连，现在大多情况卡几秒就恢复了）


## 5.多实例+HA负载均衡

这个方案比较暴力

在被控机上开四个frpc配置好不同的服务端口，服务器开启四个frps端口和客户端对应。

控制端开启四个frpc配置好stcp协议，然后使用haproxy配置文件弄好本地四个端口的rdp。

使用的时候就使用haproxy提供的端口即可，每次断开连接，ha会自动切换端口，能快速恢复服务。

我的haproxy配置文件可以参考下。

```
#logging options
global
    log 127.0.0.1 local0 info
    maxconn 1500
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
    bind 127.0.0.1:32000
    #配置TCP模式
    mode tcp
    tcp-request inspect-delay 5s
    tcp-request content accept if RDP_COOKIE
    persist rdp-cookie
    balance leastconn
    option tcpka
    option tcplog
    server one45671	127.0.0.1:45671 check inter 1000 rise 2 fall 2
    server one45672	127.0.0.1:45672 check inter 1000 rise 2 fall 2
    server one45673	127.0.0.1:45673 check inter 5000 rise 2 fall 2
    server one45674	127.0.0.1:45674 check inter 5000 rise 2 fall 2
    option redispatch
        
#配置haproxy web监控，查看统计信息
listen stats
    bind 127.0.0.1:8990
    mode http
    option httplog
    stats enable
    #设置haproxy监控地址为http://localhost:8990/frp-stats
    stats uri /frp-stats
    stats refresh 200ms
```

使用可以打开 `http://localhost:8990/frp-stats` 查看服务状态。

本地使用 127.0.0.1:32000 连接即可




## 总结
以上就是我目前的体会和经验
要是frp有升级我再尝试优化