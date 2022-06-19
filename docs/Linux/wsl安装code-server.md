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