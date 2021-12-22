# 给服务器添加公钥，拒绝忘记密码


在电脑命令行运行`ssh-keygen`命令生成公钥和私钥,带pub的就是公钥,另一个就是私钥.

在网页登录服务器操作服务器添加ssh公钥。




```bash
sudo su
cd
vi .ssh/authorized_keys # 编辑信任列表追加内容,将   xxx.pub中的字符追加到后面
systemctl restart sshd  # 重启ssh服务
```

祝你一切顺利，到这里你应该可以使用你的私钥链接服务器了

连接服务器
```shell
ssh root@x.x.x.x  -i      ./xxx.key
```

