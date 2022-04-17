# rustdesk服务端搭建

## 根据[官方文档](https://rustdesk.com/docs/zh-cn/self-host/)搭建

下载文件`rustdesk-server-linux-x64.zip`上传到服务器

unzip解压

运行以下两条命令

```bash
nohup ./hbbs -r 服务器ip -m demo >> hbbs.log &
nohup ./hbbr -m demo >> hbbr.log &
```

运行完毕之后查看密钥
`cat id_ed25519.pub`

## 使用
开启客户端
设置中继服务器
写入id服务器为你的服务器ip
key为密钥内容

被控端和控制端都设置好之后即可使用

## 实测感受
感觉效果很好，自用服务器就是稳定。

存在一个问题显示没有加密，不知道为啥。