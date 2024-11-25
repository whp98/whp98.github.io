# ubuntu 如何在网络连接变化后自动执行脚本

## 原理ubuntu在网络连接的时候会自动执行`/etc/NetworkManager/dispatcher.d/`中的脚本

脚本会传入两个参数，第一个是接口名，第二个是状态
下面是如何利用这个功能来实现自动执行特定脚本的目的，比如实现连接特定网络之后，自动配置路由表或者自动配置DNS服务器。

## 创建你的脚本

```shell
cd /etc/NetworkManager/dispatcher.d/
sudo vi 99-auto-connect-wifi.sh
```
脚本内容如下
```bash
#!/bin/bash

INTERFACE="$1"
STATUS="$2"
echo "$INTERFACE $STATUS "  >> /home/xxx/桌面/wifi.log
if [[ ("$INTERFACE" == "wlo1" && "$STATUS" == "up") || ("$INTERFACE" == "enp38s0" && "$STATUS" == "up") ]]; then
    echo 111 >> /home/xxx/桌面/wifi.log
    bash /xxxx/日常脚本/你的网络脚本.sh | tee -a /home/xxx/桌面/wifi.log
    echo 222 >> /home/xxx/桌面/wifi.log
fi
echo 333 >> /home/xxx/桌面/wifi.log
```

这个脚本的作用是，当你连接上网络后自动执行你的日常脚本。

