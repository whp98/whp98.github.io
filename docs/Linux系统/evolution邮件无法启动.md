# evolution邮件无法启动

ubuntu升级之后evolution无法启动

## 命令行运行报错如下
```text
Can't find source path /root/.cache/at-spi: Permission denied
```

## 运行如下命令即可
```bash
sudo su
chmod o+rx /root
chmod o+rx /root/.cache
chmod o+rx /root/.cache/at-spi
```

## 建议更换为flatpak版本

flatpak安装evolution
```bash
flatpak install flathub org.gnome.Evolution
flatpak run org.gnome.Evolution
```
从apt版本备份数据然后恢复到flatpak版本
