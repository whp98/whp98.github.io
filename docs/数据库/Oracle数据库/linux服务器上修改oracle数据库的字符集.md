# linux服务器上修改oracle数据库的字符集

## linux服务器上以dba身份进入:
sqlplus / as sysdba;

## 依次执行以下命令：
shutdown immediate;
startup mount;
alter system enable restricted session;
alter system set job_queue_processes=0;
alter system set aq_tm_processes=0;
alter database open;
alter database character set internal_use utf8;
shutdown immediate;
startup;


## 查看数据库字符集，看是否已经修改过来：
select userenv('language') from dual;