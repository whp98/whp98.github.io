# Ubuntu 手把手指南：安装 Waydroid、开启 ARM 转译并流畅运行番茄小说

> **环境说明**：本文以主流 Linux（Ubuntu 24.04 / 26.04 LTS，Wayland 桌面环境，双显卡或独立显卡环境）为基准环境。文中所述步骤已在真机环境中完整实测验证，包含 **UFW 防火墙网络排障**、**32位/64位 ARM 转译崩溃修复** 以及 **NVIDIA 显卡窗口黑屏终极解法**。

---

## 1. 为什么选择 Waydroid？

在 Linux 桌面体验 Android 生态，常见方案包括 **传统虚拟机（Android-x86 / Genymotion）** 和 **容器化方案（Waydroid）**。

与传统虚拟机（通过 QEMU 进行指令虚拟化与硬件模拟）相比，**Waydroid** 具备巨大优势：
- **容器化原生运行**：基于 Linux LXC 容器技术，共享宿主机内核，内存开销与 CPU 占用远低于传统模拟器。
- **直接图形硬件渲染**：直接对接宿主系统的 Wayland 合成器（KWin / Mutter / Hyprland），实现近乎零损耗的高帧率渲染。
- **无缝窗口融合**：支持多窗口模式，每个 Android 应用以原生独立 Linux 窗口的形式运行，与宿主系统剪贴板、文件系统深度打通。

由于国内主流 Android 应用（如**番茄免费小说**、微信、小红书等）通常仅针对 ARM 架构编译底层动态库（`.so`），在 x86_64 电脑上需要**开启 ARM 转译层（LibNDK 或 LibHoudini）**方能正常运行。

---

## 2. 前置准备与环境检查

在开始安装前，请确认系统满足以下核心条件：

### 2.1 确认当前运行在 Wayland 会话
Waydroid 需要 Wayland 显示协议支持。在终端运行：
```bash
echo $XDG_SESSION_TYPE
```
* 输出为 `wayland`：符合要求，可直接使用。
* 输出为 `x11`：请注销并在登录界面齿轮设置中切换至 **Wayland** 会话，或配合 `weston` / `cage` 嵌套合成器运行。

### 2.2 检查内核 Binder 驱动支持
Waydroid 依赖 Android Binder IPC 机制。在终端运行：
```bash
lsmod | grep binder
# 或者检查内核支持
cat /proc/filesystems | grep binder
```
如果输出包含 `binder_linux` 或 `nodev binder`，说明内核已内置 Binder 支持（现代主流 Linux 内核默认开启）。

### 2.3 检查显卡与 DRM 设备
运行以下命令查看系统渲染节点：
```bash
ls -l /dev/dri/renderD*
```
> [!NOTE]
> 如果你的电脑配备了 **双显卡（例如 AMD/Intel 核显 + NVIDIA 独立显卡）**，或物理显示器直接接在 NVIDIA 显卡上，请务必关注本文第 7 节的“黑屏修复方案”。

---

## 3. 安装 Waydroid 核心组件

### 3.1 添加 Waydroid 官方软件源
Waydroid 提供了官方 APT 软件源。打开终端执行：

```bash
# 1. 导入官方 GPG 密钥
sudo curl -fsSL https://repo.waydro.id/waydroid.gpg -o /usr/share/keyrings/waydroid.gpg

# 2. 根据发行版代号配置软件源（如 resolute / noble / jammy）
export CODENAME=$(lsb_release -sc)
echo "deb [signed-by=/usr/share/keyrings/waydroid.gpg] https://repo.waydro.id/ ${CODENAME} main" | sudo tee /etc/apt/sources.list.d/waydroid.list

# 3. 更新源并安装 Waydroid 与 LXC
sudo apt update
sudo apt install -y waydroid lxc
```

验证安装版本：
```bash
waydroid -V
```

---

## 4. 初始化 Waydroid 系统镜像与容器服务

### 4.1 执行初始化
Waydroid 系统以独立的 Android 镜像形式挂载运行。推荐选择 **VANILLA（纯净版）**，启动更快、占用更低：

```bash
# 若直连顺畅直接执行：
sudo waydroid init -s VANILLA

# 若有本地代理，可显式指定环境变量：
sudo http_proxy=http://127.0.0.1:20003 https_proxy=http://127.0.0.1:20003 waydroid init -s VANILLA
```

初始化会将 `system.img` 和 `vendor.img` 下载并部署于 `/var/lib/waydroid/images/`。

### 4.2 启动容器系统服务
```bash
# 启动容器后台守护进程
sudo systemctl start waydroid-container

# 设置开机自启
sudo systemctl enable waydroid-container
```

---

## 5. 开启 ARM 转译支持（LibHoudini / LibNDK）

### 5.1 转译层选型与深度解析（避坑必读！）
目前主流转译层有两种：
1. **LibNDK**：由 ChromeOS 提取优化，对纯 64 位（`arm64-v8a`）应用效率极高。但在运行纯 32 位（`armeabi-v7a`）应用时，若 App 包含特定崩溃收集模块（如字节跳动系 App 调用的 Thumb 模式信号处理），会抛出 `Unknown Thumb sa_restorer in guest sigaction!` 致命异常导致闪退。
2. **LibHoudini**：由 Intel 为 x86 平台深度研发的转译层，对 32 位与 64 位 ARM 指令（Thumb/ARMv7/ARMv8）均有极为成熟的兼容性支持，**完美兼容各类国产 App（包括番茄小说 32 位及 64 位版本）**。

### 5.2 使用 waydroid_script 自动化部署

```bash
# 1. 克隆开源部署工具
git clone --depth=1 https://github.com/casualsnek/waydroid_script.git /tmp/waydroid_script

# 2. 安装 Python 依赖
cd /tmp/waydroid_script
python3 -m venv venv
./venv/bin/pip install -r requirements.txt

# 3. 安装 LibHoudini 转译层（完美支持 32位与64位 ARM）
sudo ./venv/bin/python3 main.py -a 13 install libhoudini
```

安装完成后，可检查 Android 架构支持属性：
```bash
sudo waydroid shell -- getprop ro.product.cpu.abilist
# 正常应输出：x86_64,x86,arm64-v8a,armeabi-v7a,armeabi
```

---

## 6. 配置网络与防火墙（解决无法联网问题）

Ubuntu 系统默认启用了 `ufw` 防火墙，其默认策略会拦截来自 `waydroid0` 虚拟网卡的流量和转发，导致 Android 容器内无法通过 DHCP 获取 IP 地址，打开应用卡在开屏加载页。

执行以下命令允许虚拟网卡通信：
```bash
# 允许 waydroid0 虚拟网卡的数据包进出与路由转发
sudo ufw route allow in on waydroid0
sudo ufw allow in on waydroid0
sudo ufw reload
```

测试容器网络连通性：
```bash
sudo waydroid shell -- ping -c 2 baidu.com
```
看到 ICMP 响应即表示网络已经彻底打通。

---

## 7. 解决双显卡 / NVIDIA 桌面窗口黑屏

### 7.1 黑屏原因
很多 Linux 用户（尤其是台式机或外接显示器笔记本）的主显示器由 **NVIDIA 独立显卡** 渲染驱动。在 Wayland 环境下，如果 Waydroid 默认使用开源 GPU 节点（如 AMD/Intel 核显），跨显卡的 DMA-BUF 缓冲区传递到 NVIDIA 专有驱动时会失败，表现为：**窗口正常弹出，但画面内容为全黑**。

### 7.2 终极解决方案：配置 SwiftShader 软件渲染
现代 CPU 多核性能极强，而阅读类应用（如番茄小说）对 3D 算力无极高要求。将渲染切换为 **SwiftShader（高性能 CPU 软件渲染）**，可以 100% 解决跨显卡兼容性黑屏：

```bash
# 1. 停止当前服务
sudo systemctl stop waydroid-container
systemctl --user stop waydroid-session

# 2. 修改 Waydroid 渲染配置文件
sudo sed -i 's/^gralloc.gbm.device/#gralloc.gbm.device/' /var/lib/waydroid/waydroid_base.prop
sudo sed -i 's/^ro.hardware.gralloc=gbm/ro.hardware.gralloc=default/' /var/lib/waydroid/waydroid_base.prop
sudo sed -i 's/^ro.hardware.egl=mesa/ro.hardware.egl=swiftshader/' /var/lib/waydroid/waydroid_base.prop
sudo sed -i 's/^ro.hardware.vulkan/#ro.hardware.vulkan/' /var/lib/waydroid/waydroid_base.prop

# 3. 重新启动服务
sudo systemctl start waydroid-container
systemctl --user start waydroid-session
```

---

## 8. 会话常驻与持久化（可选推荐）

为了避免关闭终端后 Waydroid 会话退出，推荐为普通用户配置 systemd 用户守护单元：

创建文件 `~/.config/systemd/user/waydroid-session.service`：
```ini
[Unit]
Description=Waydroid Session Manager
After=graphical-session.target

[Service]
Type=simple
ExecStart=/usr/bin/waydroid session start
Restart=always
RestartSec=3

[Install]
WantedBy=default.target
```

激活并启动用户会话：
```bash
systemctl --user daemon-reload
systemctl --user enable --now waydroid-session
```

---

## 9. 安装并流畅运行番茄小说

### 9.1 安装 APK
将下载好的番茄小说 APK 安装到容器：
```bash
waydroid app install /path/to/novelapp.apk
```
安装成功后，系统会在 `~/.local/share/applications/` 自动生成 `waydroid.com.dragon.read.desktop`，并在桌面开始菜单中注册「番茄免费小说」图标。

### 9.2 启动与阅读
直接通过终端命令或桌面快捷方式启动：
```bash
waydroid app launch com.dragon.read
```
或者唤起完整的平板风格 Android UI：
```bash
waydroid show-full-ui
```

首次打开番茄小说时，在弹出的个人信息保护指引窗口点击**「同意并继续」**，即可畅读百万正版好书！

---

## 10. 常用日常管理命令

| 操作 | 对应命令 |
| :--- | :--- |
| **启动番茄小说** | `waydroid app launch com.dragon.read` |
| **打开全屏安卓桌面** | `waydroid show-full-ui` |
| **强制停止番茄小说** | `sudo waydroid shell -- am force-stop com.dragon.read` |
| **进入 Android Shell** | `sudo waydroid shell` |
| **暂停/停止 Waydroid** | `waydroid session stop && sudo systemctl stop waydroid-container` |
| **调整窗口分辨率** | `waydroid prop set persist.waydroid.width 1080 && waydroid prop set persist.waydroid.height 1920` |
| **调整屏幕显示 DPI** | `waydroid prop set persist.waydroid.density 280` |

---

> 🎉 **大功告成！** 享受在 Linux 桌面利用大屏与鼠标滚轮畅读番茄小说的极致体验吧！
