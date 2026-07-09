# flatpak-ubuntu安装配置

本指南详细记录了在 Ubuntu 24.04 LTS 系统中从零安装 Flatpak、配置 Flathub 应用源以及设置本地 HTTP 代理的完整步骤。

---

## 📋 目录
1. [第一步：安装 Flatpak](#step-1)
2. [第二步：添加 Flathub 镜像源](#step-2)
3. [第三步：配置本地 HTTP 代理](#step-3)
4. [第四步：常用 Flatpak 操作命令](#step-4)
5. [⚠️ 注意事项](#warnings)

---

<a name="step-1"></a>
## 1️⃣ 第一步：安装 Flatpak
Ubuntu 系统默认没有预装 Flatpak。你可以通过官方 APT 仓库直接安装它。

在终端中执行以下命令：
```bash
sudo apt update
sudo apt install -y flatpak
```

---

<a name="step-2"></a>
## 2️⃣ 第二步：添加 Flathub 镜像源
Flathub 是 Flatpak 最主要也是最丰富的应用商店。要想搜索和下载应用，必须要将 Flathub 仓库添加到系统中。

在终端中执行以下命令：
```bash
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
```

> [!IMPORTANT]  
> **关于系统菜单显示：**  
> 添加完源和安装 Flatpak 后，新安装的 Flatpak 应用可能在当前会话的系统应用菜单中无法显示。  
> **强烈建议：** 完成全部配置后，**重启电脑**（或注销并重新登录），使环境变量 `XDG_DATA_DIRS` 生效。

---

<a name="step-3"></a>
## 3️⃣ 第三步：配置本地 HTTP 代理
由于网络原因，直接连接 Flathub 可能会非常缓慢或连接超时。如果你有本地代理（例如：`http://127.0.0.1:20003`），可以通过以下方法为 Flatpak 配置代理。

### ⚙️ 方法：通过 systemd 为守护进程配置代理（推荐）
Flatpak 的实际下载工作是由后台的 `flatpak-system-helper` 守护进程完成的。直接在终端里设置代理变量在下载时可能无效，因此为 systemd 服务设置环境变量是最彻底、最稳定的解决方案。

1. **创建服务配置重写目录：**
   ```bash
   sudo mkdir -p /etc/systemd/system/flatpak-system-helper.service.d
   ```

2. **写入代理配置文件 `/etc/systemd/system/flatpak-system-helper.service.d/proxy.conf`：**
   ```ini
   [Service]
   Environment="HTTP_PROXY=http://127.0.0.1:20003"
   Environment="HTTPS_PROXY=http://127.0.0.1:20003"
   Environment="http_proxy=http://127.0.0.1:20003"
   Environment="https_proxy=http://127.0.0.1:20003"
   ```

3. **重新加载系统配置并重启 Flatpak 服务：**
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart flatpak-system-helper
   ```

---

<a name="step-4"></a>
## 4️⃣ 第四步：常用 Flatpak 操作命令
配置完成后，您可以使用以下命令开始畅享 Flatpak 生态：

* **搜索应用**（以 Steam 为例）：
  ```bash
  flatpak search steam
  ```
* **安装应用**：
  ```bash
  flatpak install flathub <应用ID>
  # 示例：flatpak install flathub org.mozilla.firefox
  ```
* **运行应用**：
  ```bash
  flatpak run <应用ID>
  # 示例：flatpak run org.mozilla.firefox
  ```
* **更新所有应用**：
  ```bash
  flatpak update
  ```
* **卸载应用**：
  ```bash
  flatpak uninstall <应用ID>
  ```

---

<a name="warnings"></a>
## ⚠️ 注意事项
1. **本地代理客户端必须开启**：请确保您的本地代理程序（如 V2Ray, Clash, Sing-box 等）已经启动且正在监听 `20003` 端口。
2. **用户级安装限制**：上述 systemd 代理配置对全局系统级安装有效（默认）。如果您使用的是 `flatpak install --user`（用户级安装），请确保您当前终端的会话环境已执行 `export http_proxy=http://127.0.0.1:20003`。
