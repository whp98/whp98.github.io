# npm和yarn和代理设置和设置淘宝镜像源

原文地址 https://juejin.cn/post/6844903889087496200

## npm包管理器
### 设置和删除代理
```bash
npm config set proxy=http://127.0.0.1:8087
npm config set https-proxy http://127.0.0.1:8087
npm config delete proxy
npm config delete https-proxy
```
### 查看当前镜像地址
`npm config get registry`
### 设置淘宝镜像【不建议，影响其他指令】
`npm config set registry https://registry.npmmirror.com/`
### 还原地址
`npm config set registry https://registry.npmjs.org/`
### NPM镜像的管理工具[nrm]
安装：`npm install -g nrm`
bash复制代码# 查看所有镜像
`nrm ls`
#### 使用淘宝镜像
`nrm use taobao`

## yarn包管理器
### 设置和删除代理
```bash
yarn config set proxy http://127.0.0.1:8080
yarn config set https-proxy http://127.0.0.1:8080

yarn config delete proxy
yarn config delete https-proxy
```



查看当前地址
`yarn config get registry`
设置淘宝镜像
`yarn config set registry https://registry.npmmirror.com/`
还原地址
`yarn config set registry https://registry.yarnpkg.com`
### YARN镜像的管理工具[yrm]
`yarn global add yrm`
### 查看所有镜像
`yrm ls`

#### 使用淘宝镜像
`yrm use taobao`
## Electron镜像设置
***一定注意源地址不能带引号***

`yarn config set electron_mirror https://npmmirror.com/mirrors/electron/`

## nvm nodejs版本管理工具 镜像设置
设置镜像
`nvm node_mirror https://npmmirror.com/mirrors/node/`
`nvm npm_mirror  https://npmmirror.com/mirrors/npm/`

## n 是nodejs版本管理器
### 安装
`npm i -g n`

### 设置镜像
`export NODE_MIRROR=https://npmmirror.com/mirrors/node/`
#### 环境变量
n切换版本不生效，设置node路径
bash复制代码# 查找node安装目录
`which node`
显示
`# /usr/local/bin/node`
设置环境变量
`export N_PREFIX=/usr/local#node实际安装位置 `
`export PATH=$N_PREFIX/bin:$PATH`

