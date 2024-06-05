# ubuntu修改swap文件大小

## 查看swap

```shell
cat /proc/swaps
```
out
```text
Filename				Type		Size		Used	Priority
/swap.img                               file		8388604		0	-2
/swapfile                               file		33554428	0	-3

```

## 关闭swap并删除

```shell
sudo swapoff /swapfile
sudo rm /swapfile
cat /proc/swaps
```

```text
Filename				Type		Size		Used		Priority
/swap.img                               file		8388604		0		-2

```

## 修改fstab

```shell
sudo nano /etc/fstab
```
删除swap文件挂载即可

## 创建新的swap文件

### 创建文件
ext4可以使用
`sudo fallocate -l 8G /swapfile`
ntfs可以使用
`sudo dd if=/dev/zero of=/swapfile bs=8G count=8`

### 配置成swap

```shell
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 开启交换空间

全部启用
```shell
sudo swapon -a
sudo swapon --show
```

单文件启用

```shell
sudo swapon /swapfile
```
### 验证/etc/fstab

```shell
mount -a
```