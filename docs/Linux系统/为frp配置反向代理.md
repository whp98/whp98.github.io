# 为frp配置反向代理


目的访问`https://www.jsfr.work/frp/static/#/proxies/tcp`即可使用frp面板。


重要的一步是
```
proxy_redirect / /frp/;  
```
可以将重定向修改成frp路径下的重定向。

```
location ^~/frp/ {
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass http://127.0.0.1:17500/;
                proxy_redirect / /frp/;
        }
```