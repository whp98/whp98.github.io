# ubuntu切换kde

## 先切换好fc5输入法
可以参考
https://fotianmoyin.com/other/docs/9_Ubuntu%E5%AE%89%E8%A3%9DFcitx5/#kim


### 安装fcitx5

```shell
sudo apt install fcitx5 \
fcitx5-chinese-addons \
fcitx5-frontend-gtk4 fcitx5-frontend-gtk3 fcitx5-frontend-gtk2 \
fcitx5-frontend-qt5
```

### 配置输入法为fcitx5

在【系统设置】->【区域与语言】->【管理已安装的语言】
点击切换输入法系统为fcitx5

## 安装系统

可以参考   https://www.sysgeek.cn/ubuntu-install-kde-plasma/
### kde标准版
包含很多的软件，如果是从ubuntu切换不建议。
```shell
sudo apt install kde-standard
```

### kde-plasma-desktop
我就是用的这个，大小比较小安装上就能用了。
```shell
sudo apt install kde-plasma-desktop
```
