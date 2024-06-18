# docker-compose-一键启动gitlab-包含runner


## 本文来源
https://github.com/lalatgithub/gitlab-in-docker/tree/master/4.%20auto-register-gitlab-runner-with-docker-executor

## 具体操作

创建一个文件夹容纳配置和数据

`mkdir gitlab-docker-compose`

创建以下文件

`docker-compose.yml`

```yaml
services:
  gitlab-server:
    # 使用token注册runner会弃用，锁定版本到17
    image: gitlab/gitlab-ce:17.0.2-ce.0
    container_name: gitlab-server
    restart: always
    # extra_hosts:
    #   - "w-x570:127.0.0.1"
    environment:
      # 界面端口设置8088
      # 设置默认密码
      # 关闭集群
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://w-x570:8088'
        nginx['listen_port'] = 8088
        gitlab_rails['initial_root_password'] = 'Abcd@0123456789'
        puma['worker_processes'] = 0 # disable cluster mode to avoid more memory usage
      GITLAB_SHARED_RUNNERS_REGISTRATION_TOKEN: r3g1str4t10n
    volumes:
      - ./gitlab/config:/etc/gitlab
      - ./gitlab/logs:/var/log/gitlab
      - ./gitlab/data:/var/opt/gitlab
    ports:
      - "8088:8088"
    healthcheck:
      test: curl --fail http://gitlab-server:8088/users/sign_in || exit 1
      interval: 60s
      timeout: 3s
      retries: 10
    networks:
      gitlab_network:
        aliases:
          - w-x570
  gitlab-runner:
    image: gitlab/gitlab-runner:v17.0.0
    container_name: gitlab-runner
    restart: always
    # extra_hosts:
    #   - "w-x570:127.0.0.1"
    entrypoint: [""]
    command: [
        "/bin/sh",
        "-c",
        "gitlab-runner register \
        --non-interactive \
        --url 'http://gitlab-server:8088' \
        --registration-token 'r3g1str4t10n' \
        --executor 'docker' \
        --docker-image 'python:alpine' \
        --docker-network-mode gitlab_network \
        && gitlab-runner run --user=gitlab-runner --working-directory=/etc/gitlab-runner",
      ]
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    depends_on:
      gitlab-server:
        condition: service_healthy
    networks:
      - gitlab_network
networks:
  gitlab_network:
    name: gitlab_network
```


`gitlab-ci.yml`

```yaml
build:
  image: python:alpine
  script:
    - python --version
```


使用命令启动即可

`docker-compose up -d`