# 用nvm管理node版本

## 1.下载[nvm免安装版](https://github.com/coreybutler/nvm-windows/releases/download/1.1.8/nvm-noinstall.zip)

## 2.下载之后直接解压管理员运行
`install.bat`

过程中输入你解压压缩包的根目录


## 3.修改配置文件

按需修改
```
root: F:\xxxxx\nvm
arch: 64
proxy: http://127.0.0.1:20003
originalpath: .
originalversion: 
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/

```

## 4.开始使用

下载node
安装一个版本的node并且会自动安装npm
```powershell
nvm install 14.18.2
```
切换node版本（需要使用管理员窗口执行）
```powershell
nvm use 14.18.2
```
卸载node版本
```powershell
nvm uninstall 14.18.2
```
列出安装的版本，可以查看当前使用的版本

```powershell
nvm list
```
设置npm代理
```powershell
npm config set proxy=http://127.0.0.1:20003
npm config set https-proxy http://127.0.0.1:20003
npm config set registry=http://registry.npmjs.org
```

为当前的环境安装yarn
```powershell
npm install yarn -g
```
