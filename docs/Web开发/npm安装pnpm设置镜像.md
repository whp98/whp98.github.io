# npm安装pnpm

## 参考官网

https://pnpm.io/installation#using-npm

版本兼容性

pnpm7 >= node14

pnpm8 >= node16

pnpm9 >= node18

## 安装pnpm

```bash
pnpm install -g pnpm@8
which pnpm
```

## 查看和设置镜像

查询下载源
```bash
pnpm get registry
```
设置为国内镜像
```bash
pnpm config set registry https://registry.npmmirror.com
```
设置为官方镜像
```bash
pnpm config set registry https://registry.npmjs.org/
```
