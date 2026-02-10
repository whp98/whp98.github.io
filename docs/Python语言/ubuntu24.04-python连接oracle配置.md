# ubuntu24.04-python连接oracle配置

## 步骤
1. 下载instantclient_23_26 https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html
2. 解压并配置 `export LD_LIBRARY_PATH=/home/w/DEV_ENV/instantclient_23_26:$LD_LIBRARY_PATH`
3. 安装依赖
ubuntu老版本
```bash
sudo apt-get install libaio1
```
ubuntu24
```bash
sudo apt-get install libaio1t64
sudo ln -s /usr/lib/x86_64-linux-gnu/libaio.so.1t64 /usr/lib/x86_64-linux-gnu/libaio.so.1
```
## python连接oracle配置

`conda install cx_Oracle`

```python
import cx_Oracle; 
print('cx_Oracle 版本:', cx_Oracle.__version__)
print('Client 版本:', cx_Oracle.clientversion())
```