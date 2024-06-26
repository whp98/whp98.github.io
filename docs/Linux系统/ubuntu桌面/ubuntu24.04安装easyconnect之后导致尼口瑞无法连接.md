# ubuntu24.04安装easyconnect之后导致尼扣瑞无法连接

## 报错
浏览器报 err_ssl_version_or_cipher_mismatch

## 解决

1.备份节点和路由规则
2.关闭软件打开配置目录并删除
```shell
cd ~/.config/尼口瑞/config/
rm -rf ~/.config/尼口瑞/config/*
```
3.打开软件导入节点和路由规则就好了