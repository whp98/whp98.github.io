# npm安装yarn

## 参考官网

https://classic.yarnpkg.com/en/docs/install#debian-stable


## 安装pnpm

```bash
npm install -g yarn
which yarn
```

## 查看和设置镜像

查询下载源
```bash
yarn config get registry
```
设置为国内镜像
```bash
yarn config set registry https://registry.npmmirror.com
```
设置为官方镜像
```bash
yarn config set registry https://registry.yarnpkg.com
```