# ubuntu实用脚本-软件更新脚本

为了防止脑子不清醒（更新副作用影响工作），特意增加了二次确认功能。

软件更新常见副作用

- docker容器被停止
- 系统需要重启
- 部分最新版本有bug影响使用


确认之后自动更新apt包+flatpak包。

```bash
#!/bin/bash

# 1. 获取当前日期，格式为 YYYYMMDD（例如 20260528）
CURRENT_DATE=$(date +%Y%m%d)
EXPECTED_PASS="update${CURRENT_DATE}"

# 2. 提示用户输入二次确认码
echo "提示：请输入确认码以继续更新（今天的确认码为: $EXPECTED_PASS）"
read -p "请输入确认码: " USER_INPUT

# 3. 检查输入是否正确
if [ "$USER_INPUT" != "$EXPECTED_PASS" ]; then
    echo "确认码不正确，跳过更新，脚本退出。"
    exit 0
fi

# 4. 验证通过，执行更新
echo '更新apt包'
sudo apt update
sudo apt upgrade -y
echo '更新flatpak包'
flatpak upgrade -y
echo '全部更新完毕！'
```