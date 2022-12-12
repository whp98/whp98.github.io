# iptables端口转发

## 将40000~50000的端口流量转发到443端口

```shell
iptables -t nat -A PREROUTING -p tcp --dport 40000:50000 -j REDIRECT --to-ports 443
```

## 删除防火墙规则

查看规则和编号
```shell
iptables -t nat -nL
```

删除第一条 PREROUTING
```shell
iptables -t nat -D PREROUTING 1
```