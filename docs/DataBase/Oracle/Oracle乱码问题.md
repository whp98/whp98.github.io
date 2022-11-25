# Oracle数据库乱码

Oracle数据库客户端需要设置环境变量作为编码的环境变量。

```bash
vi .bash_profile
```
追加

```text
NLS_LANG="SIMPLIFIED CHINESE_CHINA.ZHS16GBK"
export NLS_LANG
```

