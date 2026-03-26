# rhel关闭selinux

```bash
sudo vi /etc/selinux/config
```

```text

# 将此行：
SELINUX=enforcing

# 修改为：
SELINUX=disabled
```