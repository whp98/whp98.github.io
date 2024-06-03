# sudo命令免密操作

假如当前用户是 mylinux

1.创建一个权限文件`touch /etc/sudoers.d/mylinux`

2.编辑文件`vim /etc/sudoers.d/mylinux`

3.输入内容
```text
mylinux ALL=(ALL) NOPASSWD: NOPASSWD: ALL
```

新开一个会话即可使用免密的sudo了