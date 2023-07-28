# Linux一键换源

脚本来自[开源项目](https://supermanito.github.io/LinuxMirrors/)，可以实现多钟linux一键换源。

具体最新脚本请参考上面的开源项目。

## Linux一键换源
```bash
bash <(curl -sSL https://gitee.com/SuperManito/LinuxMirrors/raw/main/ChangeMirrors.sh)

```
## Docker安装脚本并换源
```bash
bash <(curl -sSL https://gitee.com/SuperManito/LinuxMirrors/raw/main/DockerInstallation.sh)
```

## 实测结果
再windows上使用以上脚本在Ubuntu中安装docker正常。
脚本中使用systemctl启动docker会失败。
windows子系统中需要使用 `service start docker`来启动docker