# maven高版本使用http协议仓库


使用如下的xml文件配置即可
```xml
<?xml version="1.0" encoding="UTF-8"?>

<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <pluginGroups>
    </pluginGroups>
    <servers>
    </servers>
    <mirrors>
        <mirror>
            <id>maven-default-http-blocker</id>
            <mirrorOf>!*</mirrorOf>
            <url>http://0.0.0.0/</url>
        </mirror>
        <mirror>
            <id>nexus</id>
            <mirrorOf>*</mirrorOf>
            <url>http://host.docker.internal:8081/repository/maven-central/</url>
        </mirror>
    </mirrors>
</settings>

```