# Ngrok使用方式

Ngrok是一种内网穿透软件。
1.x版本是开源的
2.x版本是商业的版本也就是Ngrok官网提供的版本，并未开源。

软件是go语言编写的所以编译还是比较简单的。

## Ngrok编译
以下脚本是来自[简书](https://www.jianshu.com/p/80bdc98d1786)的原创，
作者使用gitee做镜像加速github，经过尝试效果很不错，本人在Ubuntu wsl编译成功。
```shell
export NGROK_DOMAIN="二级域名"
git clone https://gitee.com/OtherCopy/ngrok.git
cd ngrok

# 为域名生成证书
openssl genrsa -out rootCA.key 2048
openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=$NGROK_DOMAIN" -days 5000 -out rootCA.pem
openssl genrsa -out server.key 2048
openssl req -new -key server.key -subj "/CN=$NGROK_DOMAIN" -out server.csr
openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 5000

# copy生成的证书到指定目录，编译需要
cp rootCA.pem assets/client/tls/ngrokroot.crt
cp server.crt assets/server/tls/snakeoil.crt
cp server.key assets/server/tls/snakeoil.key


# 生成客户端配置文件
mkdir bin
echo server_addr: "$NGROK_DOMAIN:4443" > bin/ngrok.cfg
echo trust_host_root_certs: false>> bin/ngrok.cfg

# 采用国内gitee镜像，提升编译速度
git clone -- https://gitee.com/mirrors/log4go.git src/github.com/alecthomas/log4go
git clone -- https://gitee.com/ngrok-install/websocket.git src/github.com/gorilla/websocket
git clone -- https://gitee.com/ngrok-install/go-vhost.git src/github.com/inconshreveable/go-vhost
git clone -- https://gitee.com/ngrok-install/mousetrap.git src/github.com/inconshreveable/mousetrap
git clone -- https://gitee.com/ngrok-install/go-bindata.git src/github.com/jteeuwen/go-bindata
git clone -- https://gitee.com/mirrors_addons/osext.git src/github.com/kardianos/osext
git clone -- https://gitee.com/ngrok-install/binarydist.git src/github.com/kr/binarydist
git clone -- https://gitee.com/GoLibs/go-runewidth.git src/github.com/mattn/go-runewidth
git clone -- https://gitee.com/ngrok-install/termbox-go.git src/github.com/nsf/termbox-go
git clone -- https://gitee.com/mirrors/go-metrics.git src/github.com/rcrowley/go-metrics

#linux server
GOOS=linux GOARCH=amd64 make release-server

#linux client
GOOS=linux GOARCH=amd64 make release-client
#window client
GOOS=windows GOARCH=amd64 make release-client
```

## Ngrok服务端
编译后的bin目录的ngrokd就是linux的服务脚本
```shell
sudo ./ngrokd -log=stdout -domain="二级域名" -httpAddr=":40000" -httpsAddr=":40001" -tunnelAddr=":40002"
```

在服务器上运行这个程序，并添加a记录指向这个服务器的ip
一般用二级域名做主域名
三级域名做app的域名


## Ngrok客户端

使用配置文件`config.yaml`
```yaml
server_addr: "域名:40002"
trust_host_root_certs: false
tunnels:
    webapp:
        proto:
            http: 9090
        subdomain: test
    tcp3389:
        remote_port: 43389
        proto:
            tcp: 3389

```

windows启动用的bat脚本（实测powershell脚本不好使）
```bat
ngrok -subdomain test -config=ngrok.yml start tcp3389
pause
```

开启之后就可以使用。

实测效果是并没有比frp效果好。并且由于其程序依赖图形界面运行，后台运行还要使用nssm来配合。
所以总体上本人并不推荐。
