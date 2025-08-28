# windows-vue-node支持环境变量

linux 支持环境命令行
比如
NODE_OPTIONS=--max_old_space_size=4096 node app.js

但是windows上不支持这种命令行。
```bash
‘NODE_OPTIONS‘ 不是内部或外部命令，也不是可运行的程序或批处理文件。
```

这时候需要安装一个npm 包：win-node-env
```bash
npm install win-node-env -g
```
