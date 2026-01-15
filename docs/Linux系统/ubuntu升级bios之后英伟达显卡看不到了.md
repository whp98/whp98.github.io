# ubuntu升级bios之后英伟达显卡看不到了

## 现象
`nvidia-smi`

NVIDIA-SMI has failed because it couldn't communicate with the NVIDIA driver. Make sure that the latest NVIDIA driver is installed and running.

## 检查和方案

这个错误提示说明你的 NVIDIA 驱动没有正常工作。在 Linux 中，如果驱动没挂载，系统就无法访问显卡的传感器，sensors 和 KDE 插件自然都看不到温度。
1. 为什么驱动失效了？
最常见的原因是：你安装了驱动，但由于开启了 Secure Boot (安全启动)，系统拒绝加载未经签名的第三方驱动。
2. 快速排查步骤
第一步：检查内核是否识别了驱动
在终端输入：
`lsmod | grep nvidia`


如果没有输出： 说明驱动根本没加载。
如果有输出： 说明驱动加载了但版本不匹配或存在冲突。
第二步：检查 Secure Boot 状态
输入以下命令查看安全启动是否开启：
`mokutil --sb-state`


如果显示 SecureBoot enabled，这通常就是罪魁祸首。
解决方法： 重启进入 BIOS，将 Secure Boot 设置为 Disabled，然后回到系统再试 nvidia-smi。


## 为何

为何显示 SecureBoot enabled就不能使用显卡
简单来说，这是因为 Secure Boot（安全启动） 的核心是一套“白名单”制度。
1. 为什么它会拦住 NVIDIA 驱动？
开源 vs 闭源： Linux 内核及其自带的驱动（如 amdgpu）通常都有发行版官方的数字签名，所以 Secure Boot 允许它们加载。
NVIDIA 的特殊性： NVIDIA 官方驱动是闭源的。当你安装驱动时，系统（通过 DKMS）会在你的本地电脑上现场编译驱动模块。
缺少签名： 现场编译出来的驱动是没有“数字签名”的。Secure Boot 发现这个驱动模块不在白名单内，担心它是恶意木马，就会强制禁止内核加载它。
2. 连锁反应
内核拒绝加载 NVIDIA 驱动模块。
显卡只能运行在极其基础的模式下（或者使用功能简单的开源 nouveau 驱动）。
驱动不工作，导致显卡内部的传感器接口没被打开。
所以 nvidia-smi 报错，sensors 和 KDE 也就拿不到温度。
3. 你该怎么办？
方案 A：最简单的方法（推荐）
进入 MSI BIOS，找到 Settings -> Advanced -> Windows OS Configuration -> Secure Boot，将其设置为 Disabled。
优点： 瞬间解决，NVIDIA 驱动会立即恢复工作。
风险： 理论上降低了系统启动时的安全性，但对普通用户影响微乎其微。
方案 B：硬核方法（给驱动签名）
如果你不想关闭 Secure Boot，你需要生成一个自己的密钥（MOK），给驱动签名，并将密钥导入 BIOS。
在 Ubuntu/Kubuntu 下，安装驱动时通常会弹出一个蓝色背景的界面要求你设置 "Enroll MOK" 密码。
如果你错过了那个界面，可以通过 Ubuntu 官方签名指南 重新签名。