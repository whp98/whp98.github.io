# WSL安装CODE-SERVER
安装步骤参考[开源项目](https://github.com/coder/code-server)的介绍

## 1. 给curl设置代理
```shell
# 编辑curl配置文件
vim ~/.curlrc
# 添加代理配置
socks5 = "127.0.0.1:20002"
```

## 2. 使用官方脚本安装
```shell
curl -fsSL https://code-server.dev/install.sh | sh
```

## 3. 安装好之后设置配置文件

```shell
vim ~/.config/code-server/config.yaml
```

我的配置文件如下

```yaml
bind-addr: 127.0.0.1:8080
auth: password
password: 532725be4b25xxxxxxx4be426
cert: false
```

可以编辑端口号和密码

## 4.启动code-SERVER
```shell
code-server
```

输入设置好的网址即可使用

## 5.使用frp转发端口

此处略过

## 6.nginx设置反向代理使用https访问

此处我本地wsl开启的端口是21001

所以可以使用 localhost:21001/proxy/21001/? 这个地址来使用

nginx设置一个反向代理即可使用网站的sub path来使用codeserver了

使用路径

https://网站/proxy/21001/?

配置文件如下
```nginx.conf
location ^~/proxy/21001/ {
                proxy_set_header Host $host;
                proxy_set_header  X-Real-IP        $remote_addr;
                proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_set_header X-NginX-Proxy true;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection upgrade;
                proxy_set_header Accept-Encoding gzip;
                rewrite ^/proxy/21001/(.*)$ /$1 break;
                proxy_pass http://127.0.0.1:30222;
        }
```

