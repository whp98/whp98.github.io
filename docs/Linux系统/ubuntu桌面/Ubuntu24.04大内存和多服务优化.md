# Ubuntu24.04大内存和多服务优化

参考文档：

https://askubuntu.com/questions/1049058/how-to-increase-max-open-files-limit-on-ubuntu-18-04

如果你的电脑开了Docker部署了不少容器，并且安装了各种系统服务，
可以使用如下的优化方案来优化Ubuntu系统。

## 优化内核参数:
主要是保证系统能有足够的进程数量，避免进程被杀。允许打开更多文件。

查看当前限制:
```bash
ulimit -a
```
## 这是我改好的
```text
real-time non-blocking time  (microseconds, -R) unlimited
core file size              (blocks, -c) 0
data seg size               (kbytes, -d) unlimited
scheduling priority                 (-e) 0
file size                   (blocks, -f) unlimited
pending signals                     (-i) unlimited
max locked memory           (kbytes, -l) unlimited
max memory size             (kbytes, -m) unlimited
open files                          (-n) 524288
pipe size                (512 bytes, -p) 8
POSIX message queues         (bytes, -q) 819200
real-time priority                  (-r) 0
stack size                  (kbytes, -s) unlimited
cpu time                   (seconds, -t) unlimited
max user processes                  (-u) unlimited
virtual memory              (kbytes, -v) unlimited
file locks                          (-x) unlimited
```
## 修改限制

编辑文件 `/etc/security/limits.conf`

```bash
sudo nano /etc/security/limits.conf
```
增加,表示所有用户除了root不限制这些
```bash
*       -       nofile  unlimited
*       -       nproc   unlimited
*       -       stack   unlimited
*       -       memlock unlimited
*       -       sigpending unlimited
```
## 配置pam_limits.so

`pam_limits.so` 是 Linux 等类 Unix 操作系统中的一个 PAM（可插入身份验证模块）模块。PAM 系统负责管理与身份验证相关的任务，比如登录、设置用户环境和处理密码更改等。

`pam_limits.so` 模块的主要作用是对用户会话强制执行资源限制。这些资源限制包括：

1. **最大打开文件数**：限制用户可以打开的文件描述符数量。
2. **最大核心文件大小**：限制用户生成的核心转储文件的大小。
3. **CPU 时间**：限制用户可以使用的 CPU 时间量。
4. **最大内存使用量**：限制用户可以使用的内存大小。

通过在 PAM 配置文件中使用 `session required pam_limits.so`，系统会在用户登录时应用这些资源限制。这些限制通常配置在 `/etc/security/limits.conf` 文件或 `/etc/security/limits.d/` 目录中的配置文件中。

将这个模块添加到 `/etc/pam.d/common-session` ,`/etc/pam.d/common-session-noninteractive` 文件中，用于登陆的时候加载配置文件中的限制，如下所示：
```text
session required pam_limits.so
```