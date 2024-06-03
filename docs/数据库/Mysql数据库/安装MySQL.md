# 安装MySQL

## 1.下载mysql

去官网下载最新版 zip文件

https://dev.mysql.com/downloads/mysql/


下载之后解压到一个目录
比如  `E:\mysql-5.7.31-winx64`
## 2.新建并修改配置文件

解压后的目录并没有的my.ini文件，没关系可以自行创建在安装根目录下添加的my.ini（新建文本文件，将文件类型改为的.ini），写入基本配置：
```ini
[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=E:\mysql-5.7.31-winx64
# 设置mysql数据库的数据的存放目录
datadir=E:\mysql-5.7.31-winx64\Data
# 允许最大连接数
max_connections=200
# 允许连接失败的次数。
#max_connect_errors=10
# 服务端使用的字符集默认为utf8mb4
character-set-server=utf8mb4
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
#mysql_native_password
default_authentication_plugin=mysql_native_password
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8mb4

```

## 3.初始化数据目录

下面两条命令任选其一用于初始化mysql的基础数据目录
```powershell
mysqld --initialize --console   #使用随机密码
mysqld --initialize-insecure --console  #不设置密码（不推荐）
```

来自 <https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/data-directory-initialization.html#data-directory-initialization-procedure> 

输出示例

2021-04-01T10:49:17.976269Z 0 [System] [MY-013169] [Server] E:\mysql-8.0.21-winx64\bin\mysqld.exe (mysqld 8.0.21) initializing of server in progress as process 13836
2021-04-01T10:49:18.149005Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2021-04-01T10:49:34.293553Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2021-04-01T10:49:56.962209Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: aSj0BmD;68#s

## 4.安装服务并尝试启动
可以参考[MySQL服务启停](./MYSQL的服务安装和启停脚本.md)

## 5.使用初始密码登录mysql
```powershell
.\bin\mysql.exe -uroot -p
```
```text
PS D:\mysql57\mysql-5.7.43-winx64> .\bin\mysql.exe -uroot -p
Enter password: ************
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.43

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>

```


## 6.修改默认的root密码
使用默认密码登录root用户后可以使用如下命令修改root用户的密码。

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
```
