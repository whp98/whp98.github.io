# ubuntu gnome切换kde

## 先切换好fc5输入法
因为kde 基本上就是fcitx5所以趁着还没开始进入kde环境先把输入法配置好，要不然进入kde的时候无法输入中文很难受。
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

点击fxitx5管理界面把拼音勾选上，去掉多余的内容。
然后测试下能不能输入中文就可以了。

## 安装系统

可以参考   https://www.sysgeek.cn/ubuntu-install-kde-plasma/
### kde标准版
包含很多的软件，如果是从ubuntu genome升级的话，不建议用这个版本。
```shell
sudo apt install kde-standard
```

### kde-plasma-desktop
我就是用的这个，大小比较小安装上就能用了。
```shell
sudo apt install kde-plasma-desktop
```
安装过程中选择sddm。

安装完毕之后重启系统即可使用。


## 评价
kde解决了nautils的问题，文件保存选择路径慢的问题。

桌面符合windows习惯。

自带剪切板管理，网速监控。

总之值得切换。