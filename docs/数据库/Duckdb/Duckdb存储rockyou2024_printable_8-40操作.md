# Duckdb存储rockyou2024_printable_8-40操作

## 数据去重

```sql

SELECT DISTINCT y
FROM read_csv('rockyou2024_printable_8-40.txt',
    header = true,
    columns = {
        'y': 'VARCHAR'
    }) t  
```

## 密码查询

```sql
SELECT DISTINCT y
FROM read_csv('rockyou2024_printable_8-40.txt',
    header = true,
    columns = {
        'y': 'VARCHAR'
    }) t  
WHERE y = 'password'
```
