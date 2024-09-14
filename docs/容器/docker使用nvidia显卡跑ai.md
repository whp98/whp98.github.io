# ubuntu docker使用nvidia显卡跑ai


## 参考文档

https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html


## 安装


### apt安装nvidia-container-toolkit
```shell
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list


sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit
```

### 配置容器运行时

```shell
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

## 验证

```shell
sudo docker run --rm --runtime=nvidia --gpus all ubuntu nvidia-smi
```

output
```text
Sat Sep 14 05:17:16 2024       
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 555.42.06              Driver Version: 555.42.06      CUDA Version: 12.5     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA GeForce RTX 4060 Ti     Off |   00000000:10:00.0  On |                  N/A |
|  0%   43C    P8             14W /  165W |    1279MiB /  16380MiB |     11%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+
                                                                                         
+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI        PID   Type   Process name                              GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
+-----------------------------------------------------------------------------------------+

```


## 使用nvidia-docker

### 用docker run运行

```shell
docker run -it --rm \
  --name comfyui \
  --runtime=nvidia \
  --gpus all \
  -p 8188:8188 \
  -v "$(pwd)"/storage:/home/runner \
  -e CLI_ARGS="" \
  yanwk/comfyui-boot:cu121
```
### 用docker-compose运行comfyui

```yaml
services:
  comfyui:
    image: yanwk/comfyui-boot:cu121
    container_name: comfyui
    restart: always
    ports:
      - "8188:8188"
    volumes:
      - ./storage:/home/runner
    extra_hosts:
      - "host.docker.internal:host-gateway"
    environment:
      - https_proxy=http://host.docker.internal:20003
      - http_proxy=http://host.docker.internal:20003
    runtime: nvidia
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
```