# Oracle数据库恢复

原文 https://blog.csdn.net/u011595939/article/details/80052810



## 查询指定时间的数据快照

```SQL
-- 1、查询执行过SQL语句，确定快照的时间
SELECT R.FIRST_LOAD_TIME,R.SQL_TEXT,R.* FROM V$SQLAREA R 
WHERE R.SQL_TEXT LIKE '%ABOUT YOUR SQL%' ORDER BY R.FIRST_LOAD_TIME DESC
```

```SQL
-- 2、查询基于指定时间的数据快照
SELECT * FROM YOUR_TABLENAME AS OF TIMESTAMP 
TO_TIMESTAMP('2019-02-05 20:00:00', 'yyyy-mm-dd hh24:mi:ss');
```

```SQL
-- 以当前时间为准，125分钟之前的数据快照
SELECT * FROM YOUR_TABLENAME AS OF TIMESTAMP SYSDATE - 125 / 1440
```

## 恢复数据

>FLASHBACK时，如果不确定删除的具体时间，在没有太多操作这个表的情况下，闪回的时间稍微提前一点。

闪回表数据SQL语句：


```SQL
-- 1、启动表的row movement特性
ALTER TABLE YOUR_TABLENAME ENABLE ROW MOVEMENT;
-- 2、闪回指定时间的快照
FLASHBACK TABLE YOUR_TABLENAME TO TIMESTAMP 
TO_TIMESTAMP('2018-04-23 16:06:00','yyyy-mm-dd hh24:mi:ss');
-- 3、关闭表的row movement功能
ALTER TABLE YOUR_TABLENAME DISABLE ROW MOVEMENT;
```


闪回数据表的SQL语句：
```SQL
-- 闪回表（通过TRUNCATE语句删除的表无法闪回）
FLASHBACK TABLE YOUR_TABLENAME TO BEFORE DROP;```