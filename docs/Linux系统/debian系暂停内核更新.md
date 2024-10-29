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
