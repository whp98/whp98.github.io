# MYSQL创建用户数据库并授权

## 创建用户

```sql
create user 'zhuzhu'@'%' identified by 'zhuzhu';
```
## 创建数据库

```sql
create database zhuzhudb;
```

## 数据库授权
```sql
use zhuzhudb;
grant all privileges  on zhuzhudb.*  to 'zhuzhu'@'%' identified by 'zhuzhu';
flush privileges ;
show grants for 'zhuzhu'@'%';
```
