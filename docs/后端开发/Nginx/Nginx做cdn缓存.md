# Nginx做cdn缓存

配置文件如下
```nginx
# 用户请求端口28080,反向代理转发到8080端口,并为请求设置缓存

proxy_cache_key $host$uri$is_args$args;
# 定义缓存区域
proxy_cache_path "E:\\DEV_ENV\\nginx-1.21.6-blog\\cache4h" levels=1:2 keys_zone=cache_zone:256m max_size=2G inactive=4h use_temp_path=off;
proxy_cache_path "E:\\DEV_ENV\\nginx-1.21.6-blog\\cache1m" levels=1:2 keys_zone=cache_zone_1m:256m max_size=2G inactive=1m use_temp_path=off;
# 服务器分组,如果有多台实例可以添加实现集群
upstream backend {
  server 127.0.0.1:8080;
}
server {
  listen 28080;
  # 使用 .cache_m 的url后缀实现1分钟缓存
  # 例如：http://127.0.0.1:28080/api/public/stock_zh_index_spot.cache_m
  location ~ ^/(.*)\.cache_m$ {
    add_header X-Cache $upstream_cache_status;#将缓存是否命中的结果返回
    add_header X-Via $server_addr;#将缓存服务器IP返回
    # 启用缓存,缓存到 keys_zone 指定的区域,空间大小为 1G
    proxy_cache cache_zone_1m; 
    proxy_cache_key $host$uri$is_args$args;
    expires 1m;
    # 字符集
    add_header Content-Type "application/json; charset=utf-8";
    add_header x-1 "cache_m";
    # 缓存时间
    proxy_cache_valid any 1m;
    proxy_ignore_headers X-Accel-Expires Expires Cache-Control Set-Cookie;
    rewrite ^/(.*)\.cache_m$ /$1 break;
    proxy_pass http://backend;
  }
  # 默认4小时缓存
  # 例如：http://127.0.0.1:28080/api/public/stock_zh_index_spot
  location / {
    add_header X-Cache $upstream_cache_status;#将缓存是否命中的结果返回
    add_header X-Via $server_addr;#将缓存服务器IP返回
    # 启用缓存,缓存到 keys_zone 指定的区域,空间大小为 1G
    proxy_cache cache_zone; 
    proxy_cache_key $host$uri$is_args$args;
    expires 4h;
    # 字符集
    add_header Content-Type "application/json; charset=utf-8";
    add_header x-1 "/";
    # 根据响应代码设置时间
    proxy_cache_valid 200 302 4h;
    proxy_cache_valid 301 4h;
    proxy_cache_valid any 4h;
    proxy_ignore_headers X-Accel-Expires Expires Cache-Control Set-Cookie;
    proxy_pass http://backend;
  }
}



```
