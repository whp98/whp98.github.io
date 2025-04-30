# Duckdb存储parquet测试

## 准备数据
数据大小25GB 17亿个泄露密码

```text
25G  4月 30 14:37 rockyou2024_printable_8-40_distinct.csv*
```

## csv转parquet 压缩模式uncompressed
```sql
copy(SELECT y
FROM read_csv('rockyou2024_printable_8-40_distinct.csv',
    header = true,
    columns = {
        'y': 'VARCHAR'
    }) t  
) to 'rockyou2024_printable_8-40_distinct-uncompressed.parquet' (COMPRESSION uncompressed)
;
```
结果

```text
30G  4月 30 15:14 rockyou2024_printable_8-40_distinct-uncompressed.parquet*
```


## csv转parquet 压缩模式snappy

```sql
copy(SELECT y
FROM read_csv('rockyou2024_printable_8-40_distinct.csv',
    header = true,
    columns = {
        'y': 'VARCHAR'
    }) t  
) to 'rockyou2024_printable_8-40_distinct-snappy.parquet' (COMPRESSION snappy)
;
```
结果

```text
20G  4月 30 15:20 rockyou2024_printable_8-40_distinct-snappy.parquet*
```

## csv转parquet 压缩模式gzip
```sql
copy(SELECT y
FROM read_csv('rockyou2024_printable_8-40_distinct.csv',
    header = true,
    columns = {
        'y': 'VARCHAR'
    }) t  
) to 'rockyou2024_printable_8-40_distinct-gzip.parquet' (COMPRESSION gzip)
;
```
结果

```text
13G  4月 30 15:25 rockyou2024_printable_8-40_distinct-gzip.parquet*
```
## csv转parquet 压缩模式zstd
```sql
copy(SELECT y
FROM read_csv('rockyou2024_printable_8-40_distinct.csv',
    header = true,
    columns = {
        'y': 'VARCHAR'
    }) t  
) to 'rockyou2024_printable_8-40_distinct-zstd.parquet' (COMPRESSION zstd)
;
```
结果

```text
14G  4月 30 16:15 rockyou2024_printable_8-40_distinct-zstd.parquet*
```
## csv转parquet 压缩模式brotli
卡死
## csv转parquet 压缩模式lz4

```sql
copy(SELECT y
FROM read_csv('rockyou2024_printable_8-40_distinct.csv',
    header = true,
    columns = {
        'y': 'VARCHAR'
    }) t  
) to 'rockyou2024_printable_8-40_distinct-lz4.parquet' (COMPRESSION lz4)
;
```

lz4 20GB
```text
20G  4月 30 14:56 rockyou2024_printable_8-40_distinct-lz4.parquet*
```
## csv转parquet 压缩模式lz4_raw

```sql
copy(SELECT y
FROM read_csv('rockyou2024_printable_8-40_distinct.csv',
    header = true,
    columns = {
        'y': 'VARCHAR'
    }) t  
) to 'rockyou2024_printable_8-40_distinct-lz4_raw.parquet' (COMPRESSION lz4_raw)
;
```

```text
20G  4月 30 16:05 rockyou2024_printable_8-40_distinct-lz4_raw.parquet*
```

