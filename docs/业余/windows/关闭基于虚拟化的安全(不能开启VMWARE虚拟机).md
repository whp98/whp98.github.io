# Windows 关闭内核隔离 （解决VMware启动不了）

## 使用win+r运行命令查看是否开启
```
msinfo32.exe
```

重点关注基于虚拟化的安全这一项，如果是开启则需要关闭。

## 修改注册表

win+r  输入regedit

输入
```
计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios
```
该路径下有两个文件夹
CredentialGuard 和 HypervisorEnforcedCodeIntegrity
地下都有Enabled项目将值设置为0即可。

## 重启下电脑
重新
win+r运行 `msinfo32.exe`

查看基于虚拟化的安全选项。
应该是已关闭状态。
## 结果

完成上面步骤之后我的虚拟机即可开启使用了。