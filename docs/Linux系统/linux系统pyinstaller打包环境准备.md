# linux centos系统pyinstaller打包环境准备

## 使用源代码编译安装python

```shell
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
yum -y groupinstall "Development tools"
yum install libffi-devel -y
mkdir python_install
cd python_install/
wget https://www.python.org/ftp/python/3.9.20/Python-3.9.20.tar.xz
tar -xvJf Python-3.9.20.tar.xz 
mkdir /usr/local/python3
cd Python-3.9.20/
./configure --prefix=/usr/local/python3 --enable-shared --with-ssl
make && make install
cp libpython3.so libpython3.9.so.1.0 /usr/lib64/
which python3
which pip3
```

## 设置pip
```shell
python3 -m pip install --upgrade pip
pip3 config set global.index-url https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple
python3 -m venv ./venv
which python3
which pip3
```

