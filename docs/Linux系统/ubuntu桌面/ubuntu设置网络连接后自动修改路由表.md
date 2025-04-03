# ubuntu设置网络连接后自动修改路由表

## dispatcher脚本实现


NetworkManager 的 dispatcher 脚本在网络状态发生变化时（如连接、断开、IP 地址变更等）自动运行。

脚本路径`/etc/NetworkManager/dispatcher.d/`



```bash
## 新建脚本
nano /etc/NetworkManager/dispatcher.d/90-wifi-connected.sh
```

脚本内容

```bash

#!/bin/bash

INTERFACE="$1"
STATUS="$2"
echo "动作开始" >> /home/x x x x x/桌面/wifi.log
date +"%Y-%m-%d %H:%M:%S" >> /home/xxxxx/桌面/wifi.log
echo "$INTERFACE $STATUS "  >> /home/xxxxx/桌面/wifi.log
if [[  "$STATUS" == "up" ||  "$STATUS" == "down" ]] ; then
    echo "满足判断条件!" >> /home/xxxxx/桌面/wifi.log
    echo "开始执行脚本" >> /home/xxxxx/桌面/wifi.log
    ## 修改路由表操作
    echo "结束执行脚本" >> /home/xxxxx/桌面/wifi.log
else
    echo "不满足判断条件!" >> /home/xxxxx/桌面/wifi.log
fi
echo "动作结束" >> /home/xxxxx/桌面/wifi.log

```

