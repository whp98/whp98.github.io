# Windows使用cygwin编译运行haproxy

[原文](https://www.jianshu.com/p/d436a3e73d2f)

## 1.安装 cygwin

1.1.下载cygwin(https://cygwin.com/install.html)

1.2.安装cygwin(如果你没用过cygwin,安装程序打开后默认下一步)

1.3.再设置下载源的时候简易使用网易源(http://mirrors.163.com/cygwin/):

1.4 点击devel 设置安装

1.5 搜索安装make工具

## 2.编译安装 haproxy
2.1.下载haproxy (http://www.haproxy.org/download/) , 我下载的是 haproxy-1.7.5.tar.gz

2.2.将下载包放在cygwin安装目录下任意位置,比如home目录下

2.3.解压haproxy-1.7.5.tar.gz
```shell
tar -zxvf haproxy-1.7.5.tar.gz
```
2.4.进入haproxy解压目录进行安装

```shell
make TARGET=cygwin
make install
```

## 3.打包运行**haproxy **
3.1.找到在cygwin安装目录中找到haproxy.exe、cyggcc_s-1.dll和cygwin1.dll,新建位置复制放在文件夹内(我的路径是D:/haproxy/下)

## 3.2.创建配置文件,设置对远程桌面端口转发
haproxy.cfg:

```shell
#haproxy 配置示例

global
  maxconn 1500
  nbproc  1
  daemon

defaults
        mode tcp
        retries 3
        option  abortonclose
        maxconn 32000
        timeout connect 300000ms
        timeout client  300000ms
        timeout server  300000ms
        log 127.0.0.1   local0 err

###
#监听局域网的192.168.1.17机子的默认远程端口
##
listen win_17 
        bind 0.0.0.0:10008 #绑定IP:端口
        mode    tcp #模式 
        server  s1 192.168.1.17:3389 weight 1 maxconn 2000 inter 60s #被监听服务器
```

3.3.使用以下命令运行

```shell
haproxy.exe -f haproxy.cfg -d
```
