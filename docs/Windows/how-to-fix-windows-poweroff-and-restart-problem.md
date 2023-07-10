# 如何排查和解决windows关机和重启慢的问题

问题描述:我最近发现我的电脑重启和关机变得很慢，但是我照着网上的操作弄了一遍不太好用。
最后用英语搜索才最终找到答案,下面是我的分享。

## 尝试1: 组策略[关闭辉阻止或取消关机的应用程序的自动终止功能:禁用]
计算机配置-管理模板-系统-关机选项-关闭辉阻止或取消关机的应用程序的自动终止功能
这一点网上比较常见，并且有网友说很管用，但是我试了不管用。

## 尝试2:注册表[调整服务被杀掉的超时时间]
计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control
或者
HKLM\SYSTEM\CurrentControlSet\Control
下面
WaitToKillServiceTimeout

调整了没有用。

上面这两个尝试属于无头苍蝇了，丢人了。

## 尝试3:开启开关机详细信息提示用于排查问题
这个是来自网上找到的信息
[https://www.thewindowsclub.com/enable-verbose-status-message-windows](https://www.thewindowsclub.com/enable-verbose-status-message-windows)

组策略[计算机配置-管理模板-系统-显示非常详细的状态信息]
开启后点击重启就会发现windows开始输出详细的关闭xx服务 关闭xx服务 正在关机等信息。
发现关闭redis很慢。

## 关机慢的原因
尝试3确实是非常管用，因为我发现我的电脑会在Redis服务关闭的时候停顿下。
正在关机也会变得很慢。
后来我把redis设置成手动服务，并停止，再次关机，这下2s直接关机。
然后开机后手动开启redis，再次关闭计算机又慢了，最终确定就是这玩意导致的。
于是我就卸载了redis服务，以后弄个bat随用随点吧。

这里分析大概原因可能是关机的时候redis在保存数据，不过我手动停止服务却很快，这就有点说不过去了，这个就不纠结了。
