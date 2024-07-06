# ubuntu24.04增加老源的支持

比如网易邮件大师依赖老的ubuntu22.04的库libgconf-2-4，新版的ubuntu下不到就不兼容了。

ubuntu24的软件源歌格式已经变了:

`vim /etc/apt/sources.list`
你会看到类似这样的内容：

```text
# Ubuntu sources have moved to /etc/apt/sources.list.d/ubuntu.sources
```
`cat /etc/apt/sources.list.d/ubuntu.sources`
ubuntu24.04的源是如下格式的：

```text
Types: deb
URIs: http://archive.ubuntu.com/ubuntu
Suites: noble
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

Types: deb
URIs: http://security.ubuntu.com/ubuntu/
Suites: noble-security
Components: universe restricted multiverse main
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

可以看到更加简洁了。

同时在linux上 xxx.d 一般是自动包含的，所以只需要把老的源文件复制到xxx.d下并修改一下(noble->jammy)即可。

```shell
cd /etc/apt/sources.list.d/
sudo cp ubuntu.sources ubuntu22.04.sources
sudo vim ubuntu22.04.sources
```
我去除jammy-updates jammy-security，因为这个会影响其他软件比如snapd和系统。
输入以下内容：
```text
Types: deb
URIs: http://archive.ubuntu.com/ubuntu/
Suites: jammy jammy-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

修改完成之后直接安装网易邮件大师即可直接打开。