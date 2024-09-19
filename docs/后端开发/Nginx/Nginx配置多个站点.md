# Nginx配置多个站点

配置子站点
https://jenkins.xxx.xxx

配置文件`jenkins.jsfr.xxx.xxx.conf`
配置文件路径`/etc/nginx/conf.d/`

配置文件内容
```nginx
server {
    # 服务器端口使用443，开启ssl, 这里ssl就是上面安装的ssl模块
    listen  443 ssl;
    # 域名，多个以空格分开
    server_name  jenkins.xxx.xxx;
    
    # ssl证书地址
    ssl_certificate     jenkins.xxx.xxx.pem;  # pem文件的路径
    ssl_certificate_key  jenkins.xxx.xxx.key; # key文件的路径
    
    # ssl验证相关配置
    ssl_session_timeout  5m;    #缓存有效期
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    #加密算法
    #ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;    #安全链接可选的加密协议
    ssl_protocols  TLSv1.3;    #安全链接可选的加密协议
    ssl_prefer_server_ciphers on;   #使用服务器端的首选算法

    location / {
        proxy_pass http://localhost:12345;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```