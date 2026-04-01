# Git删除全部提交记录-孤儿分支

```bash
# 1. 创建一个没有历史记录的新分支
git checkout --orphan new_branch
# 2. 添加所有文件
git add -A
# 3. 提交
git commit -m "Initial commit"
# 4. 删除旧分支（如 main 或 master）
git branch -D main
# 5. 将当前分支重命名为 main
git branch -m main
# 6. 强制推送到远程
git push -f origin main
```