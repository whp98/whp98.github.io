# 编译安装openssl-3

```
git clone https://github.com/openssl/openssl.git

cd openssl

./Configure
make
make install
echo "/usr/local/lib64" > /etc/ld.so.conf.d/openssl.conf
mv /usr/local/bin/openssl /usr/local/bin/openssl_old
sudo ln -s /usr/local/bin/openssl /usr/bin/openssl
sudo ldconfig

```

