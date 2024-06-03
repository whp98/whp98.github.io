# Oracle数据库导入 impdp

## 创建数据文件夹

```sql
create directory DPDATA1 as 'E:\WIN_HOME\Desktop\DMP';
```

## 创建表空间

```sql
drop TABLESPACE "DEV_TEST_DAT" INCLUDING CONTENTS;
CREATE  TABLESPACE "DEV_TEST_DAT" DATAFILE
    'D:\app\DXDXD\oradata\orcl\DEV_TEST_DAT01.dbf' SIZE 4G REUSE autoextend on next 100m,
    'D:\app\DXDXD\oradata\orcl\DEV_TEST_DAT02.dbf' SIZE 4G REUSE autoextend on next 100m
    LOGGING EXTENT MANAGEMENT LOCAL SEGMENT SPACE MANAGEMENT AUTO;

drop TABLESPACE "DEV_TEST_IDX" INCLUDING CONTENTS;
CREATE  TABLESPACE "DEV_TEST_IDX" DATAFILE
    'D:\app\DXDXD\oradata\orcl\DEV_TEST_IDX01.dbf' SIZE 2G REUSE autoextend on next 100m,
    'D:\app\DXDXD\oradata\orcl\DEV_TEST_IDX02.dbf' SIZE 2G REUSE autoextend on next 100m
    LOGGING EXTENT MANAGEMENT LOCAL SEGMENT SPACE MANAGEMENT AUTO;

```


## 创建用户

```sql
drop user DEV_TEST cascade;
create user DEV_TEST identified by dev_test;
grant connect,resource,dba to DEV_TEST;
grant select any table, update any table, insert any table, delete any table,create synonym,create materialized view,create view  to DEV_TEST;
alter user DEV_TEST default tablespace DEV_TEST_DAT;
```

## 导入

DMP文件放在 directory=DPDATA1 路径下

```powershell
impdp DEV_TEST/dev_test@orcl directory= 'DPDATA1' dumpfile=dev_test20220606.dmp ;
```
