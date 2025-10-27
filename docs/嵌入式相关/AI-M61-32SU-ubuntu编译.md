# AI-M61-32SU-ubuntu编译

## 安装编译相关的包

```bash
sudo apt-get install -y build-essential cmake ninja-build
```

## 配置PATH

`.bashrc`

```bash
#安信可开发
export PATH=/home/XXXXX/DEV_ENV/AI_PI/AiPi-Open-Kits/aithinker_Ai-M6X_SDK/toolchain_gcc_t-head_linux/bin:$PATH

```

## 命令验证

```bash
make -v
riscv64-unknown-elf-gcc -v
```

## 编译测试

测试一下
```bash
cd /home/XXXXX/DEV_ENV/AI_PI/AiPi-Open-Kits/AiPi-Eyes_weather
make clean
make
```

## 安装ch340驱动

下载
https://www.wch.cn/downloads/CH341SER_LINUX_ZIP.html

安装linux 内核头

```bash
sudo apt install build-essential linux-headers-$(uname -r)
```
```bash
unzip CH341SER_LINUX_ZIP.zip
cd driver
make
#允许访问串口
sudo usermod -a -G dialout $USER
# 重启下
reboot
```

重启后回到driver目录加载模块
```bash
sudo make load
```
## 开发板输出查看
### screen

```bash
sudo apt install screen    # For Debian/Ubuntu
screen /dev/ttyUSB0 2000000
```

