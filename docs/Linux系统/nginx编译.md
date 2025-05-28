# nginx编译

准备源代码
```bash
├── nginx-1.27.5
├── nginx-1.27.5.tar.gz
├── pcre2-10.45
├── pcre2-10.45.tar.gz
├── zlib-1.3.1
└── zlib-1.3.1.tar.gz
```

```bash
cd nginx-1.27.5
export NGINX_CONFIG_DIR=/home/xxxx/nginx-bin
./configure \
    --prefix=$NGINX_CONFIG_DIR \
    --sbin-path=$NGINX_CONFIG_DIR/nginx \
    --conf-path=$NGINX_CONFIG_DIR/nginx.conf \
    --pid-path=$NGINX_CONFIG_DIR/nginx.pid \
    --error-log-path=$NGINX_CONFIG_DIR/error.log \
    --http-log-path=$NGINX_CONFIG_DIR/access.log \
    --modules-path=$NGINX_CONFIG_DIR/modules \
    --with-pcre=../pcre2-10.45 \
    --with-zlib=../zlib-1.3.1 \
#    --with-http_ssl_module
```