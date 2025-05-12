# 关闭apt的阶段更新

本文参考https://askubuntu.com/questions/1431940/what-are-phased-updates-and-why-does-ubuntu-use-them


```bash
sudo nano /etc/apt/apt.conf.d/99-Phased-Updates
```

```text
Update-Manager::Always-Include-Phased-Updates true;
APT::Get::Always-Include-Phased-Updates true;
```