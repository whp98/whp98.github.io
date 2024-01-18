# 引入durid连接池并配置完整sql打印


## 1.引入数据库相关依赖

```xml
<!-- druid -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
</dependency>
```
## 2.设置数据源
注意我用的是toml格式配置

相关文章
https://www.jsfr.work/Java语言相关/Spring/use-toml-config-in-spring-boot.html

```toml
[spring.datasource.druid]
driver-class-name = "com.mysql.cj.jdbc.Driver"
url = "jdbc:mysql://127.0.0.1:13306/DB1?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=GMT"
username = "user"
password = "xxxx"
max-active = 20
initial-size = 5
min-idle = 5
min-evictable-idle-time-millis = 300000
max-wait = 60000
validation-query = "select 1 from dual"
test-on-borrow = false
test-on-return = false
test-while-idle = true
time-between-eviction-runs-millis = 60000
filter.slf4j.enabled = true
filter.slf4j.statement-prepare-after-log-enabled = false
filter.slf4j.statementCreateAfterLogEnabled = false
filter.slf4j.statementExecuteQueryAfterLogEnabled = false
filter.slf4j.statementExecuteAfterLogEnabled = false
filter.slf4j.statementParameterSetLogEnabled = false
filter.slf4j.statementCloseAfterLogEnabled = false
filter.slf4j.statementExecuteBatchAfterLogEnabled = false
filter.slf4j.statementExecuteUpdateAfterLogEnabled = false
filter.slf4j.statementPrepareCallAfterLogEnabled = false
filter.slf4j.statementExecutableSqlLogEnable = true
filter.slf4j.statementLogEnabled = true
```
## 3.设置log
logback-spring.xml
```xml
    <logger name="druid.sql.Statement" level="DEBUG" additivity="false">
        <appender-ref ref="CONSOLE" />
    </logger>
```

## 4.查看日志

```text
2024-01-18 20:00:41.554-DEBUG-[main]xxx.aclass: ==>  Preparing: select fanhao from av_job limit 1 
2024-01-18 20:00:41.582-DEBUG-[main]xxx.aclass: ==> Parameters:  
2024-01-18 20:00:41.585-DEBUG-[main]druid.sql.Statement: {conn-10005, pstmt-20000} executed. select col1
        from table1 limit 1 
2024-01-18 20:00:41.605-DEBUG-[main]xxx.aclass: <==      Total: 1 
2024-01-18 20:00:41.609-INFO -[main]xxx.aclass: 1111
```

## 5.总结
使用durid可以简单实现完整的sql打印,debug效果很好。
