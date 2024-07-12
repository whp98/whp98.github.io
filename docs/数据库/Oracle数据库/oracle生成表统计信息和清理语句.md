# oracle生成表统计信息和清理语句

## 1.查询
```sql
SELECT owner                                                   AS "数据库",
       segment_name                                              AS "表名",
       'truncate table ' || owner || '.' || segment_name || ' ;' AS "SQL",
       ROUND((data_length + index_length) / 1024 / 1024, 2)    AS "占用空间(MB)"
FROM (SELECT owner,
             segment_name,
             SUM(bytes) AS data_length,
             0          AS index_length -- 可以根据需要修改来计算索引大小
      FROM dba_segments
      WHERE segment_type = 'TABLE'
      GROUP BY owner, segment_name)
WHERE owner = 'db1'
ORDER BY data_length DESC;
```

## 2.执行清理

复制上面的SQL列脚本直接执行清理。注意数据无法回滚。

