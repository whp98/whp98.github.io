# Git下载自动替换协议


## git协议用https下载 代理友好 
```powershell
git config --global url."https://github.com/".insteadOf git@github.com:
git config --global url."https://".insteadOf git://
git config --global url."https://".insteadOf git+ssh://
```
取消
```powershell
git config --global --unset url."https://github.com/".insteadOf
git config --global --unset url."https://".insteadOf
```

## https协议用git下载 可能更安全

```powershell
git config --global url."git@github.com:".insteadOf https://github.com/
git config --global url."git://".insteadOf https://
```
取消
```powershell
git config --global --unset url."git@github.com:".insteadOf
git config --global --unset url."git://".insteadOf
```
