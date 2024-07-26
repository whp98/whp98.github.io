# 我的世界开服-docker-compose

## 配置文件

`docker-compose.yml`

```yaml
services:
  web:
    image: itzg/rcon
    environment:
      RWA_USERNAME: admin
      RWA_PASSWORD: admin
      RWA_ADMIN: "TRUE"
      # is referring to the service name 'mc' declared below
      RWA_RCON_HOST: mc121
      # needs to match the password configured for the container, see RCON_PASSWORD below
      RWA_RCON_PASSWORD: "changethis!"
    ports:
      - "4326:4326"
      - "4327:4327"
  mc121:
    image: itzg/minecraft-server
    container_name: mc121
    ports:
      - "25575:25575"
      - "25565:25565"
    environment:
      VERSION: "1.21"
      EULA: "TRUE"
      ONLINE_MODE: "FALSE"
      MEMORY: "8G"
      MODE: "survival"
      DIFFICULTY: "normal"
      MAX_PLAYERS: "500"
      TYPE: SPIGOT
      ALLOW_FLIGHT: TRUE
      #RCON_CMDS_STARTUP:  |-
      RCON_PASSWORD: "changethis!"
    volumes:
      - ./mc121_java:/data
      - ./mc121_plugins:/plugins
      - ./mc121_mods:/mods
    stdin_open: true # equivalent to -it
    tty: true       # equivalent to -it
    restart: unless-stopped
```
## 配置文件解读：
1. 在`docker-compose.yml`文件中，添加一个名为`mc121_java`的容器，并设置其镜像为`itzg/minecraft-server:java`。
2. 为容器设置一些环境变量，如内存限制、游戏模式、难度、最大玩家数等。
3. 为容器挂载一个卷，用于保存游戏数据。

    `mc121_java` : 存储游戏数据的卷。

    `mc121_plugins`: 存储插件的卷。

    `mc121_mods`: 存储模组的卷。

4. 添加一个web rcon控制器，用于控制服务器，里面可以定时执行一些命令来实现个性化管理。


你可以使用`docker-compose up -d`命令来启动容器，使用`docker-compose down`命令来停止容器。

