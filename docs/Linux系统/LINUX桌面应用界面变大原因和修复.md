# Linux 桌面应用界面变大:原因排查与修复

## 现象

在 Linux(KDE + X11)上,用 Rust 写的 GUI 应用(基于 GPUI 的 Pure Clash,以及一个 Rust + Slint 应用)启动后界面整体放大,窗口尺寸没变,内容被截断、卡片文字重叠。

环境:

- 会话类型:X11(`echo $XDG_SESSION_TYPE` 输出 `x11`)
- 桌面环境:KDE
- 显卡:NVIDIA(启动时有无害的 `libEGL warning`)
- `xdpyinfo` 显示 DPI 为 92x94,看起来正常

## 排查过程

### 1. 先排除无关的东西

- **`libEGL warning: ... failed to create dri2 screen`**:Mesa 的 EGL 在 NVIDIA 显卡上尝试 dri2 驱动失败,随后回退到 NVIDIA 驱动,和缩放无关,可以忽略。
- **`GDK_SCALE` / `GDK_DPI_SCALE`**:这是 GTK 的变量,GPUI 和 Slint 都不用 GTK,设了没有效果。
- **`WAYLAND_DISPLAY=`**:本来就是 X11 会话,强制走 X11 没有意义。

### 2. 逐层检查系统缩放来源

| 检查项 | 命令 | 结果 |
| --- | --- | --- |
| `Xft.dpi` | `xrdb -query \| grep -i dpi` | 无输出(未设置) |
| 实际 DPI | `xdpyinfo \| grep -i resolution` | 92x94,约等于 96 |
| GNOME 缩放 | `gsettings get org.gnome.desktop.interface scaling-factor` | 1 |
| KDE 缩放 | `kreadconfig5 --file kdeglobals --group KScreen --key ScaleFactor` | 1 |

注意:Plasma 5 用 `kreadconfig5`,Plasma 6 用 `kreadconfig6`。本机没有 `kreadconfig6`,所以是 Plasma 5。

结论:系统层面的缩放设置都是 1,问题不在用户设置里。

### 3. 用框架的环境变量验证

```bash
GPUI_X11_SCALE_FACTOR=1 pure-clash
```

界面立刻恢复正常。这一步确认了:**应用读到的缩放因子不是 1,但系统设置里并没有这个值。**

## 原因分析

> 这一节的推断已经通过设置 `Xft.dpi: 96` 得到验证,见文末"验证结果"。

GPUI 和 Slint(默认 winit 后端)在 X11 下取缩放因子的顺序大致是:

1. 框架自己的环境变量(`GPUI_X11_SCALE_FACTOR`、`WINIT_X11_SCALE_FACTOR`、`SLINT_SCALE_FACTOR`)
2. `Xft.dpi`(XResources / XSETTINGS)
3. 都没有时,用 RandR 里显示器的像素数和物理毫米数算 DPI,再除以 96

本机 `Xft.dpi` 没有设置,所以落到了第 3 项。如果显示器(或转接线、KVM)通过 EDID 上报的物理尺寸偏小,算出的 DPI 就偏高,缩放因子大于 1,界面被放大。而 `xdpyinfo` 显示的 92x94 是 X 屏幕整体的值,和每个显示器上报的物理尺寸不一定一致,所以看上去"一切正常"。

这也解释了为什么两个不同的框架(GPUI 和 Slint)会同时出现同样的问题:它们共用同一套回退逻辑。

可以用下面的命令核对:

```bash
xrandr | grep -w connected
```

输出里的 `344mm x 194mm` 这类数字就是上报的物理尺寸。用像素宽度除以(毫米数 / 25.4),如果算出来明显高于 96,就是这个原因。

## 修复方法

### 方案 A:显式设置 `Xft.dpi`(推荐,一次解决所有应用)

```bash
echo "Xft.dpi: 96" >> ~/.Xresources
xrdb -merge ~/.Xresources
```

已经运行的应用需要重新打开才生效,不需要重启系统。

如果重新登录后失效,说明 KDE 会话没有自动加载 `~/.Xresources`,有两个办法:

```bash
# 办法 1:KDE 登录启动脚本
mkdir -p ~/.config/plasma-workspace/env
echo 'xrdb -merge ~/.Xresources' > ~/.config/plasma-workspace/env/xresources.sh
```

办法 2:系统设置 → 外观 → 字体 → 勾选"强制字体 DPI"并设为 96(Plasma 5 的位置,不同版本菜单名可能略有差异)。办法 2 更省事。

### 方案 B:给单个应用设环境变量(已验证对 GPUI 有效)

```bash
GPUI_X11_SCALE_FACTOR=1 pure-clash
SLINT_SCALE_FACTOR=1 your-app
WINIT_X11_SCALE_FACTOR=1 your-app
```

`VAR=1 command` 只对这一次命令有效,不会写进当前 shell。想长期生效有三种方式:

**shell 别名**(只对命令行启动有效):

```bash
echo "alias pure-clash='GPUI_X11_SCALE_FACTOR=1 pure-clash'" >> ~/.zshrc
source ~/.zshrc
```

**修改 `.desktop` 文件**(从应用菜单启动时生效):先复制到用户目录,避免软件更新时被覆盖,再把 `Exec=` 改成:

```
Exec=env GPUI_X11_SCALE_FACTOR=1 pure-clash
```

**全局环境变量**(所有 GPUI 应用都生效,包括 Zed,要留意影响范围),写入 `~/.config/plasma-workspace/env/gpui.sh`:

```bash
export GPUI_X11_SCALE_FACTOR=1
```

重新登录后生效。变量支持小数,觉得界面偏小可以试 `1.25`。

## 验证结果

执行下面两条命令后,**不需要重启系统**,重新启动应用就恢复了正常缩放:

```bash
echo "Xft.dpi: 96" >> ~/.Xresources
xrdb -merge ~/.Xresources
```

这说明原因确实是:X11 下没有设置 `Xft.dpi`,框架回退到用显示器上报的物理尺寸计算 DPI,算出了偏大的缩放因子。显式写入 `Xft.dpi` 之后,框架直接采用它,不再走回退逻辑。

两点补充:

- `xrdb -merge` 是立即写入当前 X 会话的,只需要重新打开应用,不用重启系统。
- 这个设置只在当前登录会话有效。如果下次登录后又变大了,说明 KDE 没有自动加载 `~/.Xresources`,按上面"方案 A"里的办法 1 或办法 2 做持久化即可。

没有再去核对 `xrandr` 里的物理尺寸,所以"EDID 上报尺寸偏小"这个具体细节只是最可能的解释,没有被单独证实。不过对修复来说,这一点已经不影响结论。

## 小结

- 界面突然变大,先别只盯着桌面环境的缩放设置,GTK 变量对非 GTK 框架没用。
- X11 下没有 `Xft.dpi` 时,很多框架会改用显示器物理尺寸算 DPI,EDID 数据不准就会放大。
- 排查顺序:`Xft.dpi` → 桌面环境缩放 → 框架环境变量 → `xrandr` 物理尺寸。
- 最稳妥的做法是显式写一个 `Xft.dpi`,不依赖自动检测。