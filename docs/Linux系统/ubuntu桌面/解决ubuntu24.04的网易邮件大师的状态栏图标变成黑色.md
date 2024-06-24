# 解决ubuntu24.04的网易邮件大师的状态栏图标变成黑色

我发现开机启动就变黑，退出之后再启动就正常，
推测是启动太快,系统还没准备好。
于是我就把启动脚本改了一下。

cat /opt/mailmaster/launch.sh

```shell
sleep 3s
cd /opt/mailmaster && ./mailmaster $@
```

解释在启动前等待三秒，这样不影响手动启动和自动启动。


