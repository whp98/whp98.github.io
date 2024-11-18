# ubuntu24.04-zip中文报错解决


## 报错信息

```shell
*** buffer overflow detected ***: terminated
```

## 解决办法

降级安装旧版的zip包即可

```shell
sudo apt install zip=3.0-12build2
```

