# rustdesk服务端搭建

## rustdesk介绍

rustdesk是使用rust开发的远程控制软件，其客户端全部开源，软件非常小巧，小于10M，
并且支持自建服务器，本文主要介绍我自己怎么搭建的服务端，并且介绍下使用体验。

官方表示可以自行实现一个服务端，来取代其服务端，但是目前只有官方的服务端，我准备使用官方的demo来搭建。

官方应该是想要做企业服务，所以服务端是收费的，由于软件刚出来，都没做好，所以提供了一个demo账号，还没有付费购买客户端授权的地方。

demo账号可以使用，但是有有速度限制，并且必须使用最新的服务端二进制程序，官方的服务端并不开源。不知道以后会不会对个人使用免费。

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