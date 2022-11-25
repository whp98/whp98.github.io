# Centos使用

## 使用dhcp联网
```shell
nmcli connection show
```
返回值
```text
name uuid type device
enp0s3 xxx-xxx ethernet --
```
## 显示指定设备信息
```
nmcli connection show enp0s3
```
## 设置自动联网
```shell
nmcli connection modify enp0s3 connection.autoconnect yes ipv4.method auto
```
## 查看ip
```shell
ip addr
```
