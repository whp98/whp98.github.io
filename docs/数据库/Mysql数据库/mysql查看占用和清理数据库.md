# mysql查看占用和清理数据库

## 1. 查看占用

```sql
SELECT
    table_schema AS '数据库',
    table_name AS '表名',
    concat('truncate table ',table_schema,'.' , table_name,' ;') AS 'SQL',
    round(((data_length + index_length) / 1024 / 1024), 2) AS '占用空间(MB)'
FROM information_schema.TABLES
WHERE table_schema = 'db1'
ORDER BY (data_length + index_length) DESC;
```

## 2. 释放

复制上面的SQL列脚本直接执行清理。注意数据无法回滚。

