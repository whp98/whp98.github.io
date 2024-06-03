# 开启windows的虚拟化功能

AMD 4650G 微星主板

想要玩VMware嵌套虚拟化就需要开启BIOS的SVM功能，在高级菜单中。

检测虚拟化是否完全开启的工具[LeoMoon CPU-V](https://leomoon.com/downloads/desktop-apps/leomoon-cpu-v/)


全绿色才可以


## 嵌套虚拟化关闭hvper-v

```text
dism /online /disable-feature /featurename:Microsoft-hyper-v-all
bcdedit /set hypervisorlaunchtype off
```
vmware和hyperv 不能同时开启

并且wsl1不依赖hyper-v 所以关闭


