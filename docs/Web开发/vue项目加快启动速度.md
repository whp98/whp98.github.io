# vue项目加快启动速度

0. 引入依赖

package.json
使用npm安装即可
```text
//版本任意
    "hard-source-webpack-plugin": "^0.13.1",
    "speed-measure-webpack-plugin": "^1.5.0",
```

1. 编辑项目的vue.config.js
引入两个插件

```js
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
module.exports = {
    chainWebpack: config => {
        
        config.plugin('speed').use(SpeedMeasurePlugin)
    config.plugin('xcCache').use(HardSourceWebpackPlugin) // 自定义插件名称
    }
}
```

实测第一次启动比较慢，第二次启动还是比较快的。