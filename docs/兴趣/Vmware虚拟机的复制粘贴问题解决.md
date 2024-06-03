# Vmware虚拟机的复制粘贴问题解决

## open-vm-tools 对比 VMware-vm-tools 的区别

open-vm-tools 和 VMware-vm-tools 都是用于虚拟机中的虚拟化工具，但它们有一些区别，主要涉及开源性质、功能支持和性能等方面。

开源性质：

open-vm-tools 是开源工具，由 VMware 社区开发和维护。它是作为开放源代码项目在 GitHub 上托管的。
VMware-vm-tools 是由 VMware 公司提供的专有工具。这意味着其源代码不对外公开，并且可能有一些闭源的组件。
支持的功能：

open-vm-tools 提供了一些基本的功能，如增强的虚拟化驱动、时间同步、文件共享等。它的功能主要关注于提高虚拟机在 VMware 虚拟化环境中的性能和兼容性。
VMware-vm-tools 提供了更多高级功能，可能包括一些专有的 VMware 特性，如 vMotion 支持、vSphere 客户端集成、VMware Tools 的自动升级等。这些功能可能在特定的 VMware 管理环境中非常有用。
支持的平台：

open-vm-tools 在多个平台上都可以使用，因为它是开源的，可以被社区适配到不同的虚拟化平台。
VMware-vm-tools 主要用于 VMware 虚拟化平台，因此在其他虚拟化平台上的支持可能有限。
性能和稳定性：

由于 open-vm-tools 是由社区维护的开源项目，其更新可能会更频繁，但由于社区参与，可能也存在一些稳定性和性能方面的变化。
VMware-vm-tools 由 VMware 公司提供和维护，可能更专注于稳定性和性能，但更新可能较为保守。
在选择使用哪个工具时，通常建议根据具体的需求和使用场景来做出决定。如果你主要使用 VMware 虚拟化平台，并需要高级的专有功能，那么使用 VMware-vm-tools 可能更合适。如果你更关注开源性质，或者在其他虚拟化平台上使用虚拟机，那么 open-vm-tools 可能是更好的选择。


## 银河麒麟操作系统安装默认的Vmware tools会遇到的问题

1.关机速度变慢

这个我不知道为啥但是卸载后关闭速度快很多

2.复制粘贴无法使用

无法在宿主机和虚拟机之间进行复制粘贴。不过分辨率是可以正常随窗口调整的。


## 我是如何解决的

1.卸载官方的tools工具

`sudo vmware-uninstall-tools.pl`


2.安装桌面版开源虚拟机工具

`yum install open-vm-tools-desktop`

或者

`apt install open-vm-tools-desktop`
