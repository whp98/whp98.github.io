# 达梦dmfldr操作

## 官方文档

https://eco.dameng.com/document/dm/zh-cn/pm/getting-started-dmfldr.html

## 安装部署

使用达梦数据库安装包

选择自定义，选控制台工具，交互式查询工具，驱动程序

直接安装即可


设置环境变量


`vim ~/.bashrc`

追加如下
```bash
export PATH="/home/user1/dmdbms/bin:$PATH"
export PATH="/home/user1/dmdbms/tool:$PATH"
```
环境变量生效
`source ~/.bashrc`


验证使用`dmfldr help`


## 准备控制文件和脚本

控制文件  test_abc.ctl

```txt
LOAD DATA
INFILE *
REPLACE
INTO TABLE test_abc
FIELDS '|'
(
c_name "trim()",
c_id "trim()",
f_mv "trim()"
) 
```
导入文件exec_import.sh脚本

```bash
#!/bin/bash

#脚本接收参数date
DATE=$1
# 检查是否提供了参数
if [ -z "$DATE" ]; then
  echo "错误：请提供日期参数。"
  echo "用法: $0 <YYYYMMDD>"
  exit 1
fi
#定义全局数据库连接串
USER_ID='username/passwd@127.0.0.1:5236'
#定义全局日志目录
LOG_DIR=log/$DATE
mkdir -p $LOG_DIR
#定义全局数据文件目录
DATA_DIR=data/$DATE
#导入test_abc数据
dmfldr userid=$USER_ID control=\'test_abc.ctl\' mode=\'in\' data=\'"$DATA_DIR"/test_abc.dat\' badfile=\'"$LOG_DIR"/test_abc.bad\' log=\'"$LOG_DIR"/test_abc.log\'
# 检查上一个命令的退出状态 ($?)
if [ $? -ne 0 ]; then
  echo "上一个命令执行失败，退出。"
  exit 1
fi
# 如果上一个命令返回 0，则继续执行后续操作
echo "上一个命令执行成功，继续执行。"
```

导出文件exec_export.sh脚本
```bash
#!/bin/bash

#定义全局数据库连接串
USER_ID='username/passwd@127.0.0.1:5236'
#全局导出目录
OUT_DIR='./out'

#导出test_abc数据
echo dmfldr userid=$USER_ID control=\'test_abc.ctl\' mode=\'out\' data=\'"$OUT_DIR"/abc.dat\'
dmfldr userid=$USER_ID control=\'test_abc.ctl\' mode=\'out\' data=\'"$OUT_DIR"/abc.dat\' log=\'"$OUT_DIR"/test_abc.log\'
# 错误1成功0
RES=$?
echo $RES

```