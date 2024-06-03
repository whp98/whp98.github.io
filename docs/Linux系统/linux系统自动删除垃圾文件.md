# linux系统自动删除垃圾文件

代码仓库: https://github.com/whp98/linux-clean-sh

本脚本已经测试过可以使用。
脚本功能:
- 自动删除工作目录中的垃圾文件夹
- 跳过以skip_keywords中定义字符串结尾的文件夹
- 只删除文件夹不会删除文件
- 生成脚本运行的日志

## 脚本本体

### 使用`Ubuntu`和`Oracle Linux`系统测试通过
```sh
#!/bin/bash
workdir='/mnt/e/WIN_HOME/Desktop/linux-rm-sh'
logfile="$workdir"/rm-dir.log
skip_keywords=("0331" "0630" "0930" "1231")
for item in "$workdir"/*; do
    # 检查是否是目录
    if [ -d "$item" ]; then
        # 检查是否包含关键字
        skip=0
        for str in "${skip_keywords[@]}"; do
            if [[ $item == *$str ]]; then
                echo "$(date '+%Y-%m-%d %H:%M:%S'): skip  $item" | tee -a $logfile
                skip=1
                break
            fi
        done
        # 删除目录
        if [[ $skip -eq 0  && $item != $workdir && $item == "$workdir"* ]]; then
            #rm -rf "$item"
            echo "$(date '+%Y-%m-%d %H:%M:%S'): rm -rf $item" | tee -a $logfile
        fi
    fi
done
```
脚本运行输出
```txt
[oracle@oracle-19c-vagrant test]$ ./rm-dir.sh
2023-11-12 17:23:49: skip  /home/oracle/test/20221231
2023-11-12 17:23:49: skip  /home/oracle/test/20230331
2023-11-12 17:23:49: skip  /home/oracle/test/20230630
2023-11-12 17:23:49: rm -rf /home/oracle/test/20230630 - 副本
2023-11-12 17:23:49: skip  /home/oracle/test/20230930
2023-11-12 17:23:49: skip  /home/oracle/test/20231231
```

## 使用`crontab`命令来设置自动运行
- 编辑定时任务 `crontab -e`输入（和vi一样操作）:
    ```txt
    18 17 * * *  /home/oracle/test/rm-dir.sh
    ```
    含义：分 时 日 月 周 执行的命令

    上方的意思是每天17:18执行清理脚本
- 查看定时任务 `crontab -l`
- 删除定时任务 `crontab -r`