# Ollama安装和使用

Ollama 是一种用于在本地部署和运行大语言模型（LLM）的工具或平台。与OpenAI提供的云端API不同，Ollama允许用户在本地计算资源上运行模型，从而提供更高的隐私性和可控性。以下是关于Ollama的一些关键点：

### Ollama的作用
1. 本地运行LLM：Ollama允许用户在本地计算资源（如GPU）上运行大语言模型。这对于希望完全控制其数据隐私的用户来说非常有用。
  
2. 兼容性：Ollama通常与OpenAI的API兼容，这意味着如果你已经熟悉如何使用OpenAI的API，那么使用Ollama也会非常直观。

3. 自定义和优化：用户可以根据自身需求对模型进行微调、优化，甚至部署自己训练的模型。

### Ollama相关命令和API用法

Ollama 提供了一系列命令行工具和API，用于管理、部署和调用本地运行的模型。

#### 常见命令行用法
1. 安装Ollama：
   请看官网

   https://ollama.com/download/linux
   通过这个命令，你可以下载并安装Ollama。

2. 列出可用模型：
   ```
   ollama list
   ```
   这个命令会列出你本地已下载的所有模型。

3. 启动模型：
   ```
   ollama run [model_name]
   ```
   启动指定的模型，`[model_name]`是模型的名称。


### 端口和api

默认端口是11434，api是http://localhost:11434

兼容 OpenAI API 的 API 路径是：http://localhost:11434/v1/chat/completions

