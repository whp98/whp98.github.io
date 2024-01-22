# 常用的logback或log4j开发配置

## 设置打印pattern

log4j.xml

这样打印的行更短idea也能查找对应的类比较方便排查
```xml
<property name="LOG_PATTERN" value="%date{HH:mm:ss} %-5level %c{1.} - %msg%n"/>
```

logback-spring.xml

```xml
<property name="DEFAULT_PATTERN"
              value="%date{yyyy-MM-dd HH:mm:ss.SSS}-%-5level-[%thread]%logger{20}: %message %n%exception{full}"/>
```
## 打印特定模块的debug日志和durid的完整sql


durid配置: https://www.jsfr.work/Java语言相关/使用durid打印可执行sql.html

log4j.xml
```xml

<logger name="druid.sql.Statement" additivity="true">
    <level>DEBUG</level>
</logger>
<logger name="com.xcrop" additivity="false" level="debug">
    <appender-ref ref="Console"/>
</logger>
```

logback-spring.xml
```xml

<logger name="work.jsfr.playground.bot.manage" level="info" additivity="false">
    <appender-ref ref="CONSOLE"/>
</logger>
<logger name="druid.sql.Statement" level="DEBUG" additivity="false">
<appender-ref ref="CONSOLE"/>
</logger>
```
