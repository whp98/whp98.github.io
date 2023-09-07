# vbox虚拟机开机关闭bat

无界面启动

```bat
VBoxManage startvm oracle-19c-lg-good -type headless
```

向虚拟机发送关机信号

```bat
VBoxManage controlvm oracle-19c-lg-good acpipowerbutton
```

