# oracle云ubuntu-debian清除内部iptables拦截规则

oracle云内部有一套iptables拦截规则，这个是为了安全，但是docker容器会访问不到，执行下面代码清除即可。

```bash

# 临时清空 iptables 规则（测试是否为防火墙拦截）
sudo iptables -F
sudo iptables -X
sudo iptables -t nat -F
sudo iptables -t nat -X

# 如果希望永久保存（Ubuntu/Debian）
sudo netfilter-persistent save
```