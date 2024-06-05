# 解决ubuntu24-docker-desktop-不能启动


## 参考

https://askubuntu.com/questions/1511725/ubuntu-24-04-docker-desktop-is-not-starting


## 解决

Creating a new systemd service file:
```shell
sudo nano /etc/systemd/system/set-apparmor-restrict.service
```
Add the following content:
```text
[Unit]
Description=Disable AppArmor Restriction on Unprivileged User Namespaces

[Service]
Type=oneshot
ExecStart=/sbin/sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
RemainAfterExit=true

[Install]
WantedBy=multi-user.target
Reload systemd and enable the service:
```

```shell
sudo systemctl daemon-reload
sudo systemctl enable set-apparmor-restrict.service
```
Start the service immediately (optional):

sudo systemctl start set-apparmor-restrict.service
For deleting the service:
Disable the service:

sudo systemctl disable set-apparmor-restrict.service
Remove the service file:

`sudo rm /etc/systemd/system/set-apparmor-restrict.service`

Reload systemd:

`sudo systemctl daemon-reload`