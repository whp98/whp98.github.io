# windows搜索界面出现白屏

网上查询可好多方法基本没啥用，
动不动就重装，删除用户这种方法都想出来了。

我发现可以杀掉sreachApp的进程来临时恢复。

我把这个杀进程写成bat脚本，只要放在桌面上双击即可恢复搜索功能。


## 脚本

```bat
@echo off　
taskkill /im  SearchApp.exe  /f
```