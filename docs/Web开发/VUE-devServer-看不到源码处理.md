# VUE-devServer-看不到源码处理

需要修改
vue.config.js

```js
{
    configureWebpack: {
        devtool: 'source-map'
    }
}
```
生产打包的时候要关闭
