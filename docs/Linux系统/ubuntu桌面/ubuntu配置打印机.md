# ubuntu配置打印机

本文参考

[少数派:终于可以在 Linux 下愉快打印了：Linux 发行版配置打印机攻略](https://sspai.com/post/90194)


## 安装软件包


```bash
sudo apt update
# 安装CPUS
sudo apt install cups cups-browsed bluez-cups cups-pdf
# 启用CUPS基本服务
sudo systemctl enable cups      # 启用CUPS服务
sudo systemctl start cups       # 立即启动CUPS服务

# 若安装了cups-browsed，你也要单独启用它，因为它是一个独立的服务
sudo systemctl enable cups-browsed
sudo systemctl start cups-browsed

# 安装打印机管理工具：system-config-printer
sudo apt install system-config-printer
```
## 配置打印机

```bash
# 启动打印机配置管理GUI
system-config-printer
```

1. 选择添加打印机

2. 查找网络打印机

3. 输入打印机ip或域名

4. 点击下一步

5. 选择驱动(可能要多测试几个协议)

6. 点击点击下一步

7. 打印测试页面(只要能打印出来就ok了)

8. 完成

## 总结

终于完成了linux打印机的拼图