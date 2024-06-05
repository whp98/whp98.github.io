# vmware-workstation在ubuntu24上安装报错

## 安装包下载

注册博通账号
然后下载

https://support.broadcom.com/group/ecx/productfiles?subFamily=VMware%20Workstation%20Pro&displayGroup=VMware%20Workstation%20Pro%2017.0%20for%20Personal%20Use%20(Linux)&release=17.5.2&os=&servicePk=520450&language=EN

## 安装教程
https://systemweakness.com/guide-to-installing-vmware-workstation-pro-on-ubuntu-22-04-in-2023-76bb5e2a242a

## 安装完成之后报错


Unable to install all modules.See log /tmp/vmware/vmware-{Host}-vmware-14067.log for details.(Exit code1)


## 解决方案
https://superuser.com/questions/1713277/unable-to-install-all-modules-see-log-tmp-vmware-vmware-host-vmware-14067-log


## 具体的版本和操作

版本 VMware-Workstation-17.5.2-23775571.x86_64.bundle

操作步骤

```shell
cd /usr/lib/vmware/modules/source
git clone https://github.com/mkubecek/vmware-host-modules
cd vmware-host-modules
git checkout workstation-17.5.1
make
ls
tar -cf vmnet.tar vmnet-only
tar -cf vmmon.tar vmmon-only
ls
mv vmnet.tar /usr/lib/vmware/modules/source/
mv vmmon.tar /usr/lib/vmware/modules/source/
vmware-modconfig --console --install-all
```