# Gaussdb使用docker运行

```shell
mkdir D:\gaussData
docker run --name opengauss --privileged=true -d -e GS_PASSWORD=Secretpassword@123 -v D:\gaussData:/var/lib/opengauss  -u root -p 15432:5432 enmotech/opengauss:latest
```
```shell
mkdir D:\gaussData
docker run --name opengauss --privileged=true -d -e GS_PASSWORD=Secretpassword@123   -u root -p 15432:5432 enmotech/opengauss:latest
```
