# Wayland 下钉钉、WPS Office 等应用中文输入法环境变量原理解析与配置

## 一、问题背景

在 Linux 的 Wayland 桌面环境下，许多原生应用无需额外配置就能正常使用中文输入法（如 Fcitx5）。但部分闭源或跨平台应用（例如**钉钉 DingTalk**、**WPS Office** 等），往往需要加上以下环境变量才能正常调出中文输入法：

```bash
XMODIFIERS=@im=fcitx
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
```

与此同时，很多新版本的桌面环境（如 KDE Plasma 6、GNOME）又会提示“Wayland 下不建议全局设置 `GTK_IM_MODULE` 和 `QT_IM_MODULE`”。本文将解释背后的原因，并给出兼顾兼容性的最佳配置方案。

---

## 二、核心原因：Wayland 原生协议与传统通道的差异

### 1. Wayland 原生输入法路径

在理想的纯 Wayland 架构中，输入法由**合成器（Compositor，如 KWin、Mutter、Hyprland）**统一调度，通过 Wayland 原生的 `text-input` 协议（如 `text-input-v3`、`text-input-v1`）直接与应用通信。

只要桌面合成器和应用框架（如较新的 GTK4、Qt6）都支持这套原生协议，应用就可以直接通过合成器使用输入法，**不需要**配置 `GTK_IM_MODULE` 或 `QT_IM_MODULE`。

### 2. 闭源与跨平台应用的现实限制

像 WPS Office、钉钉这类应用通常存在以下特点：

1. **运行在 XWayland 中**：它们尚未完整适配 Wayland，默认仍以 X11 客户端的身份运行在 XWayland（X11 兼容层）里，无法直接使用 Wayland 原生的 `text-input` 协议。
2. **自带运行时库（Bundled Libraries）**：例如 WPS Office 自带了一套打包好的 Qt 动态库，未必包含或启用完整的 Wayland 输入法支持。
3. **跨版本协议碎片化**：Wayland 的 `text-input-v1`（Chromium/Electron 常用）与 `text-input-v3`（GTK/Qt 常用）在不同桌面环境下的实现存在差异，部分版本 Electron/Chromium 在 Wayland 下的输入法仍有候选框定位异常、无法触发等兼容问题。

因此，这类应用无法依赖合成器托管，必须显式通过环境变量走传统的 **XIM** 或 **IM 模块（DBus）** 通道来连接 Fcitx。

---

## 三、三个环境变量各自的作用

| 环境变量 | 适用对象 | 作用说明 |
| :--- | :--- | :--- |
| `XMODIFIERS=@im=fcitx` | X11 / XWayland 底层应用 | X11 标准变量，指示基于 Xlib / **XIM（X Input Method）** 的程序连接名为 `fcitx` 的输入法服务。对跑在 XWayland 里的程序起兜底作用。 |
| `QT_IM_MODULE=fcitx` | Qt 应用（如 WPS Office） | 强制 Qt 加载 Fcitx 的输入法插件（通过 DBus 与 Fcitx 通信），绕过 Wayland 合成器的输入法协议限制。 |
| `GTK_IM_MODULE=fcitx` | GTK / Electron 应用（如钉钉） | 强制 GTK 及依赖 GTK 的 Electron/Chromium 应用通过 Fcitx 的 GTK IM 模块通信，避免 Wayland 原生协议兼容性问题。 |

---

## 四、为什么不建议全局设置所有变量？

如果在使用 **Fcitx5 + 现代 Wayland 桌面**时，将 `GTK_IM_MODULE=fcitx` 和 `QT_IM_MODULE=fcitx` 写入全局环境变量：

* 本来已经良好支持 Wayland 原生 `text-input` 协议的应用，会被强制退回到传统的 IM 模块通道；
* 在部分合成器下，这可能导致输入法候选框位置错乱、重复上屏，或者触发桌面环境的警告提示。

因此，更合理的做法是：**全局只做最小兜底，对顽固应用单独覆盖环境变量**。

---

## 五、最佳实践：全局兜底 + 按需单独配置

### 1. 全局兜底配置（仅保留 `XMODIFIERS`）

推荐使用 systemd 的用户级环境变量目录 `~/.config/environment.d/`，无论是从应用启动器（GUI）还是终端启动的程序都能读取到。

新建或编辑 `~/.config/environment.d/im.conf`（文件名以 `.conf` 结尾即可）：

```ini
XMODIFIERS=@im=fcitx
```

> **提示**：
> * 修改 `~/.config/environment.d/*.conf` 后，需要**注销重新登录**（或重启）才会生效。
> * 不建议只写在 `~/.bashrc` 或 `~/.zshrc` 中，因为通过桌面图标或快捷方式启动的 GUI 应用通常不会读取 shell 配置文件。
> * 如果使用的是 Hyprland 等平铺式合成器，也可以在 `~/.config/hypr/hyprland.conf` 中添加 `env = XMODIFIERS,@im=fcitx`。

### 2. 针对特定应用单独配置（修改 `.desktop` 文件）

将 `GTK_IM_MODULE=fcitx` 和 `QT_IM_MODULE=fcitx` 仅注入到钉钉、WPS Office 等特定应用的启动器中。

#### 第一步：复制系统 `.desktop` 文件到用户目录

不要直接修改 `/usr/share/applications/` 下的文件（软件更新时会被覆盖），而是复制到 `~/.local/share/applications/`：

```bash
# 查找对应的 .desktop 文件名
ls /usr/share/applications/ | grep -iE "wps|dingtalk"

# 复制到用户目录（文件名以实际查到的为准）
cp /usr/share/applications/wps-office-wps.desktop ~/.local/share/applications/
cp /usr/share/applications/com.alibabainc.DingTalk.desktop ~/.local/share/applications/
```

#### 第二步：修改 `Exec=` 行

编辑 `~/.local/share/applications/` 下对应的 `.desktop` 文件，在 `Exec=` 原有命令之前加上 `env ...`：

* **WPS Office 示例**（主要是 Qt 应用；若有 `et`、`wpp` 等多个组件图标需一并修改）：
  ```ini
  Exec=env QT_IM_MODULE=fcitx XMODIFIERS=@im=fcitx /usr/bin/wps %F
  ```

* **钉钉示例**（Electron / GTK + Qt 混合）：
  ```ini
  Exec=env GTK_IM_MODULE=fcitx QT_IM_MODULE=fcitx XMODIFIERS=@im=fcitx <原启动命令> %U
  ```

#### 第三步：刷新桌面数据库（可选）

通常保存后即可生效；如果桌面启动器缓存未及时更新，可执行：

```bash
update-desktop-database ~/.local/share/applications
```

---

## 六、总结

1. 钉钉、WPS 等应用在 Wayland 下依赖这些环境变量，本质上是**未完整接入 Wayland 原生 `text-input` 协议**（多运行在 XWayland 或使用自带旧版 UI 库）。
2. 全局环境只需保留 `XMODIFIERS=@im=fcitx`（写在 `~/.config/environment.d/im.conf`）作为 XWayland 兜底。
3. 针对特定闭源应用，通过 `~/.local/share/applications/*.desktop` 单独注入 `QT_IM_MODULE=fcitx` 和 `GTK_IM_MODULE=fcitx`，即可在不干扰其他原生 Wayland 应用的前提下正常使用中文输入法。
