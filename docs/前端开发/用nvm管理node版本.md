# 用nvm管理node版本

## 1.下载[nvm免安装版](https://github.com/coreybutler/nvm-windows/releases/download/1.1.8/nvm-noinstall.zip)

## 2.下载之后直接解压管理员运行
`install.bat`

过程中输入你解压压缩包的根目录


## 3.修改配置文件

按需修改
```
root: F:\xxxxx\nvm
arch: 64
proxy: http://127.0.0.1:20003
originalpath: .
originalversion: 
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/

```

## 4.开始使用

下载node
安装一个版本的node并且会自动安装npm
```powershell
nvm install 14.18.2
```
切换node版本（需要使用管理员窗口执行）
```powershell
nvm use 14.18.2
```
卸载node版本
```powershell
nvm uninstall 14.18.2
```
列出安装的版本，可以查看当前使用的版本

```powershell
nvm list
```
设置npm代理
```powershell
npm config set proxy=http://127.0.0.1:20003
npm config set https-proxy http://127.0.0.1:20003
npm config set registry=http://registry.npmjs.org
```

为当前的环境安装yarn
```powershell
npm install yarn -g
```
## 5.nvm根据`.nvmrc`中的文件配置切换node版本

在项目根目录下创建`.nvmrc`文件，内容如下：
```text
18
```
编辑`~/.bashrc`文件，添加如下内容：
```bash
cdnvm() {
    command cd "$@" || return $?
    nvm_path="$(nvm_find_up .nvmrc | command tr -d '\n')"

    # If there are no .nvmrc file, use the default nvm version
    if [[ ! $nvm_path = *[^[:space:]]* ]]; then

        declare default_version
        default_version="$(nvm version default)"

        # If there is no default version, set it to `node`
        # This will use the latest version on your machine
        if [ $default_version = 'N/A' ]; then
            nvm alias default node
            default_version=$(nvm version default)
        fi

        # If the current version is not the default version, set it to use the default version
        if [ "$(nvm current)" != "${default_version}" ]; then
            nvm use default
        fi
    elif [[ -s "${nvm_path}/.nvmrc" && -r "${nvm_path}/.nvmrc" ]]; then
        declare nvm_version
        nvm_version=$(<"${nvm_path}"/.nvmrc)

        declare locally_resolved_nvm_version
        # `nvm ls` will check all locally-available versions
        # If there are multiple matching versions, take the latest one
        # Remove the `->` and `*` characters and spaces
        # `locally_resolved_nvm_version` will be `N/A` if no local versions are found
        locally_resolved_nvm_version=$(nvm ls --no-colors "${nvm_version}" | command tail -1 | command tr -d '\->*' | command tr -d '[:space:]')

        # If it is not already installed, install it
        # `nvm install` will implicitly use the newly-installed version
        if [ "${locally_resolved_nvm_version}" = 'N/A' ]; then
            nvm install "${nvm_version}";
        elif [ "$(nvm current)" != "${locally_resolved_nvm_version}" ]; then
            nvm use "${nvm_version}";
        fi
    fi
}

alias cd='cdnvm'
cdnvm "$PWD" || exit
```
完成之后cd到一个目录就会自动切换node版本了

