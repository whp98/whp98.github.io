# ubuntu24.04断网排查和修复

故障描述：

有线网卡图标找不到，无法上网，并且为wifi无法连接。

## 排查思路

### 1.查看网卡硬件信息

```shell
lspci | grep Ethernet
```

```shell
lshw -c network
```

如果能看到网卡信息，说明驱动正常。

### 2.NetworkManager 日志分析
先监控日志
```shell
sudo journalctl -u NetworkManager -f
```
之后重启服务
```shell
sudo systemctl restart NetworkManager
```
分析期间的日志信息如下：

```text
10月 11 15:18:14 没有 NetworkManager[45923]: <info>  [1728631094.5378] settings: Loaded settings plugin: keyfile (internal)
10月 11 15:18:14 mypc NetworkManager[45923]: <info>  [1728631094.5378] ifupdown: management mode: unmanaged
10月 11 15:18:14 mypc NetworkManager[45923]: <info>  [1728631094.5378] ifupdown: interfaces file /etc/network/interfaces doesn't exist
10月 11 15:18:14 mypc NetworkManager[45968]: /etc/netplan/90-NM-957ea871-bac8-4e88-bd7a-cd135541f3fc.yaml:10:19: Error in network definition: Invalid MAC address 'stable-ssid', must be XX:XX:XX:XX:XX:XX, XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX or one of 'permanent', 'random', 'stable', 'preserve'.
10月 11 15:18:14 mypc NetworkManager[45968]:       macaddress: "stable-ssid"
10月 11 15:18:14 mypc NetworkManager[45968]:                   ^
10月 11 15:18:15 mypc NetworkManager[45923]: <info>  [1728631095.2760] dhcp: init: Using DHCP client 'internal'
10月 11 15:18:15 mypc NetworkManager[45923]: <info>  [1728631095.2762] manager: (lo): new Loopback device (/org/freedesktop/NetworkManager/Devices/1)
10月 11 15:18:15 mypc NetworkManager[45923]: <info>  [1728631095.2766] device (br-0ad233ffab7c): carrier: link connected
```
这个应该是bug 

https://bugs.launchpad.net/ubuntu/+source/network-manager/+bug/2084234

日志分析：查看日志中是否有错误信息，或者提示信息。

这里看到了 "Invalid MAC address 'stable-ssid'"

这个错误信息表明了在配置文件中定义的 MAC 地址设置不正确。

这里是因为"stable-ssid"这个设置不再有效，可以手工修改配置文件，或者使用"随机"或者"稳定"等设置。
```shell
sudo nano /etc/netplan/90-NM-957ea871-bac8-4e88-bd7a-cd135541f3fc.yaml 
```

修改完成之后重启网络服务即可使用wifi。

重启网络服务
```shell
sudo systemctl restart NetworkManager
```

到这里wifi正常了，有线还是没有操作的地方。

### 3.排查NetworkManager管理状态

```shell
nmcli device status
```

输出显示有线网卡未托管。

查看排除文件

```shell
sudo cat /usr/lib/NetworkManager/conf.d/10-globally-managed-devices.conf
```
输出:

```shell
[keyfile]
unmanaged-devices=*,except:type:wifi,except:type:gsm,except:type:cdma
```

10-globally-managed-devices.conf 排除了*保留了wifi和gsm等设备，缺少了以太网。

解决办法：
```shell
sudo vim /usr/lib/NetworkManager/conf.d/10-globally-managed-devices.conf
```
修改成下面
```text
[keyfile]
unmanaged-devices=*,except:type:ethernet,except:type:wifi,except:type:gsm,except:type:cdma
```

重启网络服务

```shell
sudo systemctl restart NetworkManager
```

至此有线网卡状态已恢复。

