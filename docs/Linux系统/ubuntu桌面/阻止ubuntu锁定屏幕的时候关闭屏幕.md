# 阻止ubuntu锁定屏幕的时候关闭屏幕 dpms

ubuntu 系统上锁定屏幕会立即关闭显示器，如何关闭。

## 解决方法

临时解决
```shell
xset -dpms
```
永久解决

```shell
echo "xset -dpms" >> ~/.xinitrc
```


## 参考文档

https://askubuntu.com/questions/696738/prevent-monitor-from-losing-signal-after-screen-saver-lock-activates

https://wiki.archlinux.org/title/Display_Power_Management_Signaling


## 上面的在ubuntu24上不好用

使用shell扩展解决

安装浏览器扩展管理插件的连接器
```shell
sudo apt-get install gnome-browser-connector
```
安装浏览器扩展

https://chrome.google.com/webstore/detail/gphhapmejobijbbhgpjhcjognlahblep


安装这个插件即可

https://extensions.gnome.org/extension/1414/unblank/