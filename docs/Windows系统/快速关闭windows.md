# 快速关闭windows

参考[知乎](https://zhuanlan.zhihu.com/p/346412552)

## 1.关机时删除分页文件

`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management\ClearPageFileAtShutdown`

0:不会删除

1:删除

## 2.设置强制停止服务的超时时间

`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control，双击WaitToKillServiceTimeout`

5000: 5秒

1000: 1秒


