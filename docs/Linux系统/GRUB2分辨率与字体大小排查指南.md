# GRUB2 字体过大、分辨率偏低排查与设置指南

## 一、原因说明

GRUB2 界面字体显得很大、分辨率偏低，通常是因为 **GRUB 阶段工作在低分辨率显示模式下**（例如 `640x480`、`800x600` 或 `1024x768`），被高分辨率显示器全屏拉伸所致。

结合当前系统配置（UEFI 启动，存在 `/sys/firmware/efi`），主要原因如下：

1. **未显式指定分辨率**：`/etc/default/grub` 中 `#GRUB_GFXMODE=640x480` 目前处于注释状态，GRUB2 默认按 `auto` 直接沿用主板固件提供的默认显示模式。
2. **UEFI 固件默认 GOP 分辨率偏低**：GRUB 阶段尚未加载 Linux 显卡驱动，完全依赖主板 UEFI 固件的 GOP 输出。部分主板（尤其是开启了 CSM 兼容模式，或外接显示器握手异常时）默认只输出低分辨率。
3. **默认字体在低分辨率下占比大**：GRUB2 默认使用约 16px 的 `unicode.pf2` 点阵字体，在低分辨率下会显得非常大。

---

## 二、排查与解决步骤

### 1. 查看 GRUB 实际支持的分辨率

1. 重启电脑进入 GRUB 菜单。
   > **注意**：当前 `/etc/default/grub` 配置了 `GRUB_TIMEOUT_STYLE=hidden` 和 `GRUB_TIMEOUT=0`，开机时可能需要按住 `Shift` 或连按 `Esc` 才能唤出 GRUB 菜单。
2. 在 GRUB 菜单界面按 `c` 进入命令行，输入：
   ```text
   videoinfo
   ```
3. 记下输出列表中支持的分辨率（例如 `1920x1080x32`、`2560x1440x32` 等）。
4. 按 `Esc` 返回菜单继续启动系统。

### 2. 修改 `/etc/default/grub`

编辑配置文件：

```bash
sudo nano /etc/default/grub
```

取消 `GRUB_GFXMODE` 的注释并修改为 `videoinfo` 中确认支持的分辨率（建议末尾保留 `,auto` 作为兜底）：

```bash
GRUB_GFXMODE=1920x1080,auto
GRUB_GFXPAYLOAD_LINUX=keep
```

*(请将 `1920x1080` 替换为实际需要且 `videoinfo` 支持的分辨率)*

### 3. 更新 GRUB 配置

```bash
sudo update-grub
```

完成后重启即可生效。

---

## 三、补充排查与进阶调整

* **若 `videoinfo` 最高仅显示 `1024x768` 等低分辨率**：
  进入主板 BIOS/UEFI 设置，关闭 **CSM（Compatibility Support Module / 兼容支持模块）**，确保纯 UEFI 模式启动，通常即可恢复高分辨率 GOP 输出。
* **单独调整 GRUB 字体大小**：
  如果调高分辨率后觉得字体太小或仍需调整，可用 `grub-mkfont` 从系统字体生成指定像素大小的 `.pf2` 字体，并在 `/etc/default/grub` 中通过 `GRUB_FONT` 指定：
  ```bash
  sudo grub-mkfont -s 24 -o /boot/grub/fonts/custom.pf2 /usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf
  ```
  然后在 `/etc/default/grub` 中添加：
  ```bash
  GRUB_FONT=/boot/grub/fonts/custom.pf2
  ```
  修改后同样需要执行 `sudo update-grub`。
