# KDE桌面长时间运行出现黑窗口的解决方案

## 参考资料
[Black windows on Tumbleweed KDE](https://www.reddit.com/r/openSUSE/comments/12qm47a/black_windows_on_tumbleweed_kde/)
和Claude Ai



## 思路
在出现黑窗口的时候重启kwin可以解决,kwin重启似乎没有啥影响,所以直接配置成定时脚本.

单次解决(重启kwin)
```bash
kwin_x11 --replace >/dev/null 2>&1 & disown
```

## 完整方案

### 编写重启脚本

`nano ~/bin/restart_kwin.sh`

内容如下

```bash
#!/bin/bash
export DISPLAY="${DISPLAY:-:0}"
export DBUS_SESSION_BUS_ADDRESS="${DBUS_SESSION_BUS_ADDRESS:-unix:path=/run/user/$(id -u)/bus}"

kwin_x11 --replace >/dev/null 2>&1 & disown
```

`chmod +x ~/bin/restart_kwin.sh`

### 设置定时任务

`crontab -e`


```cron
# 每个小时重启一次kwin
0 * * * * ~/bin/restart_kwin.sh
```
