# 解决浏览器经常error-network-changed报错

主要症状:网页ai对话经常异常断开。


思路就是找到电脑上变化的ip地址是啥原因造成的。


输入如下监控名称监控ip地址变化

`ip monitor address link`

然后我看到


```txt
24108: veth282cd39@enp38s0: <BROADCAST,MULTICAST> mtu 1500 master br-aa86935cd65a state DOWN
    link/ether 0e:28:9e:e0:65:96
24108: veth282cd39@if2: <BROADCAST,MULTICAST> mtu 1500 qdisc noop master br-aa86935cd65a state DOWN group default
    link/ether ea:28:06:0d:22:cd brd ff:ff:ff:ff:ff:ff link-netnsid 16
```

也就是有容器在启停，然后我修改了一下容器就好了。