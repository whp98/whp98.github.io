# Hyper-V端口占用解决

## 情况
某一天tomcat起不来，提示端口被占用，但是找了半天没有找到是哪个程序占用了。

```txt
Caused by: java.net.BindException: Address already in use: bind

```


后来上网一查原来是windows占用了一些动态端口给hyper-v用，这个是可以设置的。

于是按照下面操作了一下解决了问题。

## 解决方案
分为三步
1. 关闭Hyper-V

管理员运行
```powershell
dism.exe /Online /Disable-Feature:Microsoft-Hyper-V
```


2. 设置保留端口范围

管理员运行
```powershell
netsh int ipv4 set dynamicport tcp start=30000 num=20000
netsh int ipv4 set dynamicport udp start=30000 num=20000
```

端口分配从三万开始最高两万个。


3. 开启Hyper-V

管理员运行

```powershell
dism.exe /Online /Enable-Feature:Microsoft-Hyper-V /All
```
## 查看成果

查看当前占用端口
```powershell
netsh interface ipv4 show excludedportrange protocol=tcp
```
经过我实测除了带星号的哪个其余的端口无法绑定，spring-boot无法绑定到这些占用的端口。


查看动态端口分配范围
```powershell
netsh int ipv4 show dynamicport tcp
```

## 总结
windows麻烦死了，不但学会使用，更要会维护。