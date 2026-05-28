# AI本地部署测试
> 测试时间 2026-05
## 部署硬件
4060TI 16GB
RAM 96GB

## 模型评价

## gemma-4-E4B-it-UD-Q8_K_XL.gguf

输出很快40T/S


比较适合使用cherry studio对话使用。

使用claudecode调用会自动停止输出


## Qwen3.5-9B-UD-Q4_K_XL.gguf
输出很快40T/S

使用claudecode 会在中英文路径中间加空格，其他还好。

长内容输出，会出现复读机现场。

基本是最强中文小模型

## Qwen3.6-35B-A3B-UD-Q4_K_M.gguf

短上下文还可以，修复了路径问题，但是长下文创建kv cache过程巨慢无比

必须使用内存来做混合部署才能运行，30T/s 长文 20T/s 

## gemma-4-26B-A4B-it-UD-Q8_K_XL.gguf

电脑运行很吃力，效果不好 13T/s

## glm-4-9b-chat-1m-Q4_K_L.gguf

输出30T/s  claudecode调用会自动停止，基本无法agent

## qwen3.5-9b-null-space-abliterated.Q8_0.gguf

尝试微调解决空格，但是实测没有效果。中文英文混合路径会被强制加空格。

## Qwen3.6-27B-UD-IQ2_XXS.gguf 

运行吃力，20T/s 速度很慢没法用。
claudecode/openclaw工具首次使用很慢。长达1分钟左右的初始化cache时间。

容易爆上下文


## 总结

目前我推荐qwen3.5 9B 目前没有可替代的。

docker compose 部署

```yaml
  llama-cpp:
    restart: unless-stopped
    image: ghcr.io/ggml-org/llama.cpp:full-cuda
    ports:
      - "58080:58080"
    volumes:
      - /home/w/DEV_ENV/llama-cpp-docker-compose/models/:/models
    environment:
      - LLAMA_API_KEY=${LLAMA_API_KEY}
    command: >
      --server
      --port 58080
      --host 0.0.0.0
      -ngl 99
      -c 262144
      -fa on
      --cache-type-k q4_0
      --cache-type-v q4_0
      -np 1
      --temp 0.7
      --top-p 0.8
      --top-k 20
      --min-p 0.05
      --spec-type draft-mtp
      --spec-draft-n-max 2
      --repeat-penalty 1.1
      --repeat-last-n 64
      --mmproj /models/Qwen3.5-9B-UD-Q4/mmproj-F16.gguf
      -m /models/Qwen3.5-9B-UD-Q4/Qwen3.5-9B-UD-Q4_K_XL.gguf
      --chat-template-kwargs '{"enable_thinking":false}'
      --keep -1
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
    # 可选：给容器 IPC 权限，有助于锁定共享内存
    ipc: private
    init: true   # 使用 tini 作为 PID 1，确保信号正确传播
```