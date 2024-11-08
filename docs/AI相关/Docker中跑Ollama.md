# Docker中跑Ollama

## 本人环境

    ubuntu 24.04 
    4060ti 16G

## 一、环境准备

 1. 安装docker-ce
   [安装docker-ce](https://docs.docker.com/engine/install/)
 2. 安装docker-compose
   https://docs.docker.com/compose/install/
 3. 配置安装docker gpu运行时
   https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html
   
   https://docs.docker.com/engine/containers/resource_constraints/#gpu
 4. 安装vscode
 5. 安装vscode docker 插件

## 二、准备docker-compose文件

新建一个目录 ollama-openwebui-docker-compose

在目录下新建`docker-compose.yaml` 内容如下
```yaml
services:
  ollama:
    volumes:
      - ./ollama_data:/root/.ollama
      # 修改这个路径为本地模型位置，可以换到大硬盘上
      - ./本地模型位置:/ollama_models
    container_name: ollama
    pull_policy: always
    ports:
      - "11434:11434"
    tty: true
    restart: unless-stopped
    image: ollama/ollama
    extra_hosts:
      - "host.docker.internal:host-gateway"
    environment:
      # - https_proxy=http://host.docker.internal:20003
      # - http_proxy=http://host.docker.internal:20003
      # - no_proxy=localhost,127.0.0.1,host.docker.internal,open-webui
      - OLLAMA_HOST=0.0.0.0
      - OLLAMA_MODELS=/ollama_models
      - OLLAMA_ORIGINS=*
    runtime: nvidia
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    pull_policy: always
    ports:
      - "28899:8080"
    volumes:
      - ./data:/app/backend/data
      - /home/w/MY_CODE/tts-test/pdf-to-markdown/output4:/data/docs
      - ./nltk_data:/root/nltk_data
    extra_hosts:
      - "host.docker.internal:host-gateway"
    restart: always
    environment:
      - https_proxy=http://host.docker.internal:7890
      - http_proxy=http://host.docker.internal:7890
      - no_proxy=localhost,127.0.0.1,host.docker.internal,open-webui
      - 'OLLAMA_BASE_URL=http://ollama:11434'
```

## 三、启动服务
```shell
docker-compose up -d
```
## 四、ollama 模型下载

vscode code 找到容器ollama 选择attach shell 

运行如下命令下载qwen2.5 7b模型 并运行测试

```shell
ollama pull qwen2.5:7b
ollama run qwen2.5:7b

#输入 /bye 结束测试
```

```text
root@6d7fdb9b0847:/# ollama pull qwen2.5:7b
pulling manifest 
pulling 2bada8a74506... 100% ▕█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 4.7 GB                         
pulling 66b9ea09bd5b... 100% ▕█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏   68 B                         
pulling eb4402837c78... 100% ▕█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 1.5 KB                         
pulling 832dd9e00a68... 100% ▕█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏  11 KB                         
pulling 2f15b3218f05... 100% ▕█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏  487 B                         
verifying sha256 digest 
writing manifest 
success 
root@6d7fdb9b0847:/# ollama run qwen2.5:7b
>>> hello 
Hello! How can I assist you today?

>>> 哈哈哈
哈哈，看来你很高兴！有什么有趣的事情想要和我分享吗？或者你需要帮助解决什么问题呢？

>>> exit
好的，再见！如果你需要任何帮助，随时欢迎回来咨询。祝你有一个愉快的一天！

>>> /bye
root@6d7fdb9b0847:/# 
```


## 五、访问服务

浏览器访问 http://localhost:28899 访问openchatui

配置ollama api地址为 http://host.docker.internal:11434

ollama 服务地址 http://localhost:11434 访问ollama api 可用于沉浸式翻译