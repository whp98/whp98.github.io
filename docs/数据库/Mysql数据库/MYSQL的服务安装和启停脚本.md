# MYSQL的服务安装和启停脚本

## 安装服务.bat
```bat
D:\mysql57\mysql-5.7.31-winx64\bin\mysqld --install mysql57
pause
```

## 卸载服务.bat
```bat
sc delete mysql57
pause
```
## 启动服务.bat
```bat
net start mysql57
pause
```
## 停止服务.bat

```bat
net stop mysql57
pause
```
