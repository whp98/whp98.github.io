# SonarQube代码扫描

## 使用Docker-compose安装服务器

```yaml
version: "3"

services:
  sonarqube:
    image: sonarqube:9.9.2-community
    container_name: sonarqube
    restart: 'no'
    networks:
      - sonarnet
    environment:
      - sonar.jdbc.username=sonar
      - sonar.jdbc.password=sonar
      - sonar.jdbc.url=jdbc:postgresql://sonarqube-postgre:5432/sonarqube
      - sonar.search.javaOpts=-Xms256m -Xmx256m
    ports:
      - "9010:9000"
      - "9011:9092"
    depends_on:
      - sonarqube-postgre
    links:
      - sonarqube-postgre
    volumes:
      - sonarqube_data:/opt/sonarqube/data
      - ./sonarqube_extensions:/opt/sonarqube/extensions
      - sonarqube_bundled-plugins:/opt/sonarqube/lib/bundled-plugins
      - ./pdf-files:/opt/sonarqube/pdf-files

  sonarqube-postgre:
    image: postgres:12.3
    container_name: sonarqube-postgre
    restart: 'no'
    networks:
        - sonarnet
    environment:
      - POSTGRES_USER=sonar
      - POSTGRES_PASSWORD=sonar
      - POSTGRES_DB=sonarqube
    volumes:
      - sonarqube_postgre_db:/var/lib/postgresql
      - sonarqube_postgre_data:/var/lib/postgresql/data

volumes:
  sonarqube_bundled-plugins:
  sonarqube_data:
  sonarqube_extensions:
  sonarqube_postgre_db:
  sonarqube_postgre_data:

networks:
  sonarnet:
    driver: bridge
```

## 本地放好插件啥的就可以启动使用了

### 首次启动

```shell
docker-compose up -d
```

### 删除容器

```shell
docker-compose down
```

### 停止服务

```shell
docker-compose stop
```

### 启动服务

```shell
docker-compose start
```
## 关闭权限设置
http://localhost:9010/admin/settings?category=security

最后一项关闭

`Force user authentication`

## 关闭代码blame传感器
http://localhost:9010/admin/settings?category=scm

开启选项

`Disable the SCM Sensor`


## 本地使用扫描器简易扫描

### 下载
https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/sonarscanner/

### 下载后解压配置bin到path目录
修改conf 设置源码编码和服务器地址
```text
#Configure here general information about the environment, such as SonarQube server connection details for example
#No information about specific project should appear here

#----- Default SonarQube server
sonar.host.url=http://localhost:9010

#----- Default source code encoding
sonar.sourceEncoding=UTF-8


```
### 到代码路径下直接运行
projectKey 这个后面是扫描的项目名称可以随意指定
```shell
sonar-scanner -D sonar.projectKey=XKJ -D sonar.java.binaries=*/target/classes
```
