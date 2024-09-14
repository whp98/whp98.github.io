# ubuntu安装nvidia 4060ti驱动

## 使用系统软件更新器安装

打开`软件和更新` 选择 `附加驱动` 选择 `nvidia-driver-555`

安装完成重启

验证：
```shell
cat /proc/driver/nvidia/version
nvidia-smi
```

## 安装cuda


https://developer.nvidia.com/cuda-12-5-1-download-archive?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=24.04&target_type=deb_local


## 安装cudnn


https://docs.nvidia.com/deeplearning/cudnn/latest/installation/linux.html


