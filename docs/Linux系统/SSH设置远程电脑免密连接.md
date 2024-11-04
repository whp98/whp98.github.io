# SSH设置远程电脑免密连接脚本


## 脚本
```bash
#将本机的公钥添加到远程服务器的authorized_keys中
#实现免密码登陆
#检测本地是否有公钥否则生成密钥对
IP='x.x.x.x'
USER='xrisk'
if [ -f ~/.ssh/id_rsa.pub ]; then
  echo "公钥已存在"
else
  echo "公钥不存在，开始生成"
  ssh-keygen -t rsa -f ~/.ssh/id_rsa -P ""
fi
ssh-copy-id -i ~/.ssh/id_rsa.pub ${USER}@${IP}
```

