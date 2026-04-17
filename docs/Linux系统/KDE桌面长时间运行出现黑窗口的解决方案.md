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
# 获取当前用户的 UID 和用户名
USER_ID=$(id -u)
USER_NAME=$(whoami)

# 基础环境
export HOME="/home/$USER_NAME"
export PATH="/usr/local/bin:/usr/bin:/bin"
export DISPLAY="${DISPLAY:-:1}" # 注意：通常物理显示器是 :0
export XAUTHORITY="$HOME/.Xauthority"

# 关键：XDG 运行时与配置路径
export XDG_RUNTIME_DIR="/run/user/$USER_ID"
export XDG_CONFIG_HOME="$HOME/.config"
export XDG_DATA_HOME="$HOME/.local/share"
export XDG_DATA_DIRS="/usr/local/share:/usr/share"

# 关键：告诉程序当前处于 KDE 环境
export XDG_CURRENT_DESKTOP="KDE"
export KDE_FULL_SESSION="true"
export KDE_SESSION_VERSION="5" # 如果是 Plasma 6 请改为 6

# DBus 地址
export DBUS_SESSION_BUS_ADDRESS="unix:path=$XDG_RUNTIME_DIR/bus"
# --- NVIDIA & 渲染 核心变量 ---
export KWIN_COMPOSE=O2
export KWIN_OPENGL_INTERFACE=glx
export __GL_VENDOR_LIBRARY_NAME=nvidia
# 执行替换
kwin_x11 --replace > /tmp/kwin_restart.log 2>&1 &
disown
```

`chmod +x ~/bin/restart_kwin.sh`

### 设置定时任务

`crontab -e`


```cron
# 每个小时重启一次kwin
0 * * * * ~/bin/restart_kwin.sh
```
