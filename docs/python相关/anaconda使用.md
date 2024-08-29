# anaconda使用

## 查看设置代理

查看代理
```bash
conda config --show proxy_servers
```
```text
proxy_servers:
  http: http://127.0.0.1:20003
  https: http://127.0.0.1:20003
```
设置代理
```bash
conda config --set proxy_servers.http http://127.0.0.1:20003
conda config --set proxy_servers.https http://127.0.0.1:20003
```
取消代理

```bash
conda config --remove-key proxy_servers.http
conda config --remove-key proxy_servers.https
```

## 虚拟环境管理

### 创建不带python的环境

```bash
conda create --name myenv
conda activate myenv
```
这样会默认使用系统的python版本。
```bash
which python3
which python
```
安装指定版本的python
```bash
conda install python=3.8
```

验证python位置
```bash
which python
```

### 创建带python的环境
```bash
conda create --name myenv python=3.8
conda activate myenv
```
### 从现有环境复制到新的环境

```bash
conda create --name myclone --clone base
```

### 删除环境

```bash
conda env remove --name myenv
```

## conda 能解决啥问题 venv能代替他么

Conda 和 `venv` 都是用来管理 Python 虚拟环境的工具，但它们有不同的功能和适用场景。

### Conda 的功能和优势
1. 跨语言支持: Conda 不仅能管理 Python 环境，还能管理其他编程语言的环境，如 R、Java、C++ 等。这使得 Conda 在多语言项目中非常有用。

2. 依赖管理: Conda 可以管理非 Python 的库和工具，比如编译器、C 库等，这些依赖有时无法通过 `pip` 安装。

3. 更强的包管理: Conda 的包管理系统不仅限于 Python 包，还包括很多其他的工具和库。Conda 从 `Anaconda` 和 `Conda Forge` 两个主要渠道安装包，包含了大量科学计算和数据处理相关的软件包。

4. 预编译的包: Conda 提供的包都是预编译的，通常不需要用户再去处理依赖的编译和兼容性问题。

5. 环境隔离: Conda 提供了很好的环境隔离，可以在同一台机器上同时使用不同版本的 Python 及其依赖。

### venv 的功能和优势
1. 轻量级: `venv` 是 Python 自带的虚拟环境管理工具，简单、轻量级，只管理 Python 环境和 Python 包。

2. 集成度高: 因为是 Python 内置的工具，`venv` 使用和配置更加简单，不需要额外的安装和配置。

3. 适用于纯 Python 项目: 对于只依赖 Python 和 Python 包的项目来说，`venv` 是一个非常合适的选择。

### 总结
- Conda: 适用于需要跨语言管理、需要复杂依赖管理、或者使用科学计算、数据分析的项目。
- venv: 适用于只需要管理 Python 版本和包的轻量级项目。

在某些简单的 Python 项目中，`venv` 是可以替代 Conda 的。但如果项目有跨语言需求或者复杂依赖，Conda 则更为合适。