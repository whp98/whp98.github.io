# 解决unacceptable-SSL

## 分析原因

应该是我手动删除了/etc/ssl/certs/ca-certificates.crt导致的

## 重新配置
```bash
dpkg -s ca-certificates
```

## 总结
删除证书之后，需要重新配置证书缓存，重新配置之后，问题解决。
即使全部删除根证书也可以通过重新安装来恢复证书
```bash
sudo apt-get update
sudo apt-get install --reinstall ca-certificates
sudo update-ca-certificates
```
