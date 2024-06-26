# gitlab的cicd部署项目

本次部署有来的admin项目

项目结构
```text
├── README.md
├── vue3-element-admin
└── youlai-boot
```

```yaml
stages:
  - build-backend
  - build-frontend
  - deploy

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=$CI_PROJECT_DIR/.m2/repository"
  MAVEN_CLI_OPTS: "-B -DskipTests --settings ./.m2/settings.xml"
  NODE_CACHE_DIR: "$CI_PROJECT_DIR/.npm"
cache:
  key:
    files:
      - youlai-boot/pom.xml
      - vue3-element-admin/pnpm-lock.yaml
  paths:
    - .m2/repository
    - .npm
    - vue3-element-admin/node_modules

# Backend build job
build-backend:
  stage: build-backend
  image: maven:3.8.4-openjdk-17
  script:
    - cd youlai-boot
    - mvn clean install $MAVEN_CLI_OPTS
  artifacts:
    paths:
      - youlai-boot/target/youlai-boot.jar

# Frontend build job
build-frontend:
  stage: build-frontend
  image: node:16
  before_script:
    - npm config set cache $NODE_CACHE_DIR --global
  script:
    - cd vue3-element-admin
    - npm set registry http://host.docker.internal:8081/repository/taobao/
    - npm install -g pnpm@latest-7
    - pnpm set registry http://host.docker.internal:8081/repository/taobao/
    - pnpm install
    - pnpm build:prod
  artifacts:
    paths:
      - vue3-element-admin/dist/

# Deploy job
deploy:
  stage: deploy
  image: instrumentisto/rsync-ssh
  script:
    - mkdir -p ~/.ssh
    - echo "HOST *" > ~/.ssh/config
    - echo "StrictHostKeyChecking no" >> ~/.ssh/config
    - echo "$SSH_KEY_ID" | tr -d '\r' > ~/.ssh/id_rsa
    - chmod 600 ~/.ssh/id_rsa
    - ssh -T root@$DEPLOY_HOST 'echo "SSH 登录成功"'
    - rsync -avz --delete youlai-boot/target/youlai-boot.jar root@$DEPLOY_HOST:/root/youlai/back-end/youlai-boot.jar
    - rsync -avz --delete vue3-element-admin/dist/ root@$DEPLOY_HOST:/root/youlai/front-end/
  only:
    - main
```