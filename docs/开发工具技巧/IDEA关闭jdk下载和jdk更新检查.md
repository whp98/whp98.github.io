# IDEA关闭jdk下载和jdk更新检查

## 关闭jdk更新检查

https://youtrack.jetbrains.com/issue/IJPL-150090/how-to-turn-off-the-update-prompt-for-jdk-I-didnt-find-it-in-the-settings


idea的启动配置文件`bin/idea.properties`添加如下参数:

```text
-jdk.updater=false
```

根据官方描述2024.2会添加UI配置项

## 关闭jdk

https://youtrack.jetbrains.com/issue/IDEA-268726/Stop-autodownload-of-JDK

idea的启动配置文件`bin/idea.properties`添加如下参数:

```text
-jdk.downloader=false
```
