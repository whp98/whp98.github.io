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

## 后续

截止到2025年03日此问题已经解决

使用如下命令安装最新版本即可

```shell
sudo apt install zip
```
具体版本如下:

zip/noble-updates,now 3.0-13ubuntu0.2 amd64 [已安装]

