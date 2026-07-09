# 彻底卸载snap的脚本

```bash
#!/bin/bash
set -e

echo "=== 开始彻底卸载 Snap ==="

# 1. 卸载所有已安装的 snap 包
echo "1. 卸载所有已安装的 Snap 软件包..."
# 循环卸载，直到 snap list 为空（排除标题行）
while true; do
    snaps=$(snap list 2>/dev/null | tail -n +2 | awk '{print $1}')
    if [ -z "$snaps" ]; then
        break
    fi
    for snapname in $snaps; do
        echo "正在卸载: $snapname"
        sudo snap remove --purge "$snapname" || true
    done
done

# 2. 停止并禁用 snapd 服务
echo "2. 停止并禁用 Snapd 服务..."
sudo systemctl stop snapd.service || true
sudo systemctl stop snapd.socket || true
sudo systemctl stop snapd.seeded.service || true
sudo systemctl disable snapd.service || true
sudo systemctl disable snapd.socket || true
sudo systemctl disable snapd.seeded.service || true

# 3. 彻底清除 snapd 软件包
echo "3. 清除 snapd 软件包..."
sudo apt-get purge -y snapd

# 4. 删除残留目录
echo "4. 清理残留的文件与目录..."
sudo rm -rf /var/cache/snapd/
sudo rm -rf /var/snap/
sudo rm -rf /var/lib/snapd/
sudo rm -rf ~/snap

# 5. 阻止 APT 自动重新安装 snapd
echo "5. 配置 APT 规则，防止 snapd 被作为依赖自动重新安装..."
sudo tee /etc/apt/preferences.d/nosnap.pref <<EOF
Package: snapd
Pin: release a=*
Pin-Priority: -10
EOF

echo "=== Snap 卸载及禁用完成！ ==="

```