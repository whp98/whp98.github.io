# liunx的sudo环境变量的传递
今天发现linux系统用普通用户下载，sudo就不行。

发现是代理的环境变量没有传递给sudo。

添加代理环境变量到sudoers文件。
```bash
sudo visudo
# 添加如下
```
默认保留的环境变量
```bash
Defaults env_keep += "http_proxy https_proxy ftp_proxy"
```