# 前端开发的axios的promise封装

## request.js
```js
import axios from 'axios'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
export const post = (url, data) => {
    return service({
        url: url,
        method: 'post',
        data: data
    })
}
export const get = (url, data) => {
    return service({
        url: url,
        method: 'get',
        params: data
    })
}
export default service
```

## sysApi.js

```js
import { get, post } from '@/utils/request'

export default {
  /* 登录相关api*/
  login_useCaptcha: data => get('/captcha/useCaptcha', data),
  login_login: data => post('/sign/login', data),
  /*省略*/
}
```

## src/apis/index.js

```js
import sysApi from '@/apis/sysApi'

export default {
  ...sysApi
}
```

## main.js

```js
import Vue from 'vue'
import apis from '@/apis'
Vue.prototype.$apis = apis
```
