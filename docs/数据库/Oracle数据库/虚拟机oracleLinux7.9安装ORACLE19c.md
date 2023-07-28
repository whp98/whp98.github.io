#  虚拟机 oracle linux 7.9 安装ORACLE 19c 


由于手动装太麻烦容易弄出问题浪费大量时间所以本次使`vagrant`来快速弄。


为了节省时间本文不讲细节。

## 1. 安装vbox
[oracle vbox 官网](https://www.virtualbox.org/) 下载安装即可


## 2. 安装vagrant

[vagrant 官网](https://developer.hashicorp.com/vagrant/downloads) 下载安装即可

## 3. 使用oracle官方的vagrantfile直接启动

[oracle vagrant-projects](https://github.com/oracle/vagrant-projects/tree/main/OracleDatabase/19.3.0)

这个项目是oracle官方弄得比野路子靠谱我就是用的这个项目的 19c文件夹下的实测安装没有幺蛾子出现。

基本方式是打包下载git仓库进去想要安装的目录下直接输入下面的代码即可自动下载并启动虚拟机。
```powershell
# windows防止编码报错
chcp 936
# 使用vagrantfile配置启动虚拟机
vagrant up

# 启动之后连接ssh改密码
vagrant ssh
```
建议开启ssh的密码登录，我第一件事就是su root把vagrant oracle 和 root密码改了


## 4. 配置本地连接网络

由于使用vagrant不方便我就是创建用，所以我给虚拟机添加了本地网络用于ssh和数据库连接。
方法是添加仅主机网络，并使用`NetworkManager` 工具配置网络,这个默认没有的需要自己安装。
命令是 nmcli

## 5. 添加数据盘扩容


虚拟机默认只有37G不够用建议添加虚拟盘进行挂载扩容。

默认的虚拟机的磁盘使用lvm加密直接调整磁盘大小会导致分区丢失无法开机。

如果数据文件全放挂载盘上应该不需要对系统盘扩容。

## 总结

vagrant是开发者的福音。安装配置新环境建议优先使用。