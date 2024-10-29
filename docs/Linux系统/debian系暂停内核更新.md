# debian系暂停内核更新

## 标记内核为保持现状

```bash
sudo apt-mark hold linux-image-generic linux-headers-generic
```

## 查看标记
```bash
sudo apt-mark showhold
```

## 恢复标记
```bash
sudo apt-mark unhold linux-image-generic linux-headers-generic
```

## 作用
暂停内核更新，可以避免内核更新导致系统无法启动，尤其是英伟达显卡驱动导致的问题。

还可以避免内核升级之后需要重新编译内核模块的的软件，重新编译，比如vmware workstation。

## 参考资料

https://askubuntu.com/questions/678630/how-can-i-avoid-kernel-updates