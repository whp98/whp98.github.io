# Nginx开始gzip


配置文件如下
```conf
gzip on;
gzip_comp_level 5;
gzip_min_length 1k;
gzip_buffers 4 16k;
gzip_proxied any;
gzip_vary on;
gzip_types
  application/javascript
  application/x-javascript
  text/javascript
  text/css
  text/xml
  application/xhtml+xml
  application/xml
  application/atom+xml
  application/rdf+xml
  application/rss+xml
  application/geo+json
  application/json
  application/ld+json
  application/manifest+json
  application/x-web-app-manifest+json
  image/svg+xml
  text/x-cross-domain-policy;
gzip_static on;
gzip_disable "MSIE [1-6]\.";

# 设置gzip压缩针对的HTTP协议版本，没做负载的可以不用
# gzip_http_version 1.0;


```
