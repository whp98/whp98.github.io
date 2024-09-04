# mysql统一全库字符集和排序规则

## 修改原因
字符集不统一会导致索引失效

可以通过下面的语句验证是否是字符集和排序规则导致的问题，可以尝试把字段设置一下字符集和排序规则

```sql
-- 单表
SELECT * from table_name WHERE field_name collate utf8mb4_0900_ai_ci = '值';
-- 关联表
SELECT * from table_name1 A
  left join table_name2 B on A.id  collate utf8mb4_0900_ai_ci = B.id
WHERE field_name = '值';
```

## 批量修改数据库字符集
```sql
-- 批量修改数据库字符集
-- ALTER DATABASE db_name CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
SELECT CONCAT('ALTER DATABASE ', SCHEMA_NAME, ' CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;') as 'sql_str'
FROM information_schema.`SCHEMATA`
WHERE DEFAULT_CHARACTER_SET_NAME RLIKE 'utf8mb4'
  AND SCHEMA_NAME IN ('db_name');
```
## 批量修改表字符集

```sql
-- 批量修改表字符集
-- ALTER TABLE `db_name`.`table` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
SELECT CONCAT('ALTER TABLE `', TABLE_SCHEMA, '`.`', TABLE_NAME,
              '` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;') AS sql_str
FROM information_schema.`TABLES`
WHERE TABLE_SCHEMA IN (SELECT SCHEMA_NAME
                       FROM information_schema.`SCHEMATA`
                       WHERE DEFAULT_CHARACTER_SET_NAME RLIKE 'utf8mb4'
                         AND SCHEMA_NAME IN ('db_name'))
  AND TABLE_TYPE = "BASE TABLE";
```
## 批量修改字段字符集和排序规则

```sql
-- 批量修改字段字符集和排序规则
-- ALTER TABLE db_name.table_name MODIFY COLUMN column_name varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '注释';
SELECT CONCAT('ALTER TABLE ', TABLE_SCHEMA, '.', TABLE_NAME, ' MODIFY COLUMN ', COLUMN_NAME, ' ', COLUMN_TYPE,
              ' CHARACTER SET utf8mb4 COLLATE utf8mb4_bin', ' ', IF(IS_NULLABLE = 'NO', 'NOT NULL', 'NULL'),
              IF(ISNULL(COLUMN_DEFAULT), '', CONCAT(' DEFAULT \'', COLUMN_DEFAULT, '\'')),
              IF(ISNULL(COLUMN_COMMENT), '', CONCAT(' COMMENT \'', COLUMN_COMMENT, '\';'))) AS 'sql_str'
FROM information_schema.`COLUMNS`
WHERE TABLE_SCHEMA IN (SELECT SCHEMA_NAME
                       FROM information_schema.`SCHEMATA`
                       WHERE DEFAULT_CHARACTER_SET_NAME RLIKE 'utf8mb4'
                         AND SCHEMA_NAME IN ('db_name'))
  and COLLATION_NAME RLIKE 'utf8mb4';
```


