# systemd示例-一次运行和后台运行

## 常用操作（可以复制参考）
编辑服务文件
```shell
sudo nano /etc/systemd/system/verysync.service
```
重新加载服务文件
```shell
sudo systemctl daemon-reload
```
查看服务状态
```shell
sudo systemctl status verysync.service 
```
重启服务

```shell
sudo systemctl restart verysync.service 
```
关闭服务
```shell
sudo systemctl stop verysync.service 
```
开机自启动

```shell
sudo systemctl enable verysync.service 
```
关闭开机自启动
```shell
sudo systemctl disable verysync.service 
```

## 一次运行
适用于开机自动运行一次后完成初始化的操作

下面的代码用于解决ubuntu 24 不能启动docker desktop的问题
```text
[Unit]
Description=Disable AppArmor Restriction on Unprivileged User Namespaces

[Service]
Type=oneshot
ExecStart=/sbin/sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
RemainAfterExit=true

[Install]
WantedBy=multi-user.target
```

## 后台运行

这个是启动后台服务

```text
[Unit]
Description=微力同步
After=network.target

[Service]
Type=simple
WorkingDirectory=/home/w/MY_PROGRAM/verysync
ExecStart=/home/w/MY_PROGRAM/verysync/verysync
Restart=on-failure
User=w
Group=w

[Install]
WantedBy=multi-user.target
Reload systemd and enable the service:
```
