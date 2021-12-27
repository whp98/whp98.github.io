import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import  path = require("path")
export default defineUserConfig<DefaultThemeOptions>({
    templateDev: path.join(__dirname, 'templates', 'index.dev.html'),
	templateSSR: path.join(__dirname, 'templates', 'index.ssr.html'),
    lang: 'zh-CN',
    title: 'HAIPENG_BLOG',
    description: 'Just write it.',
    base: '/',
    themeConfig: {
        logo:'/logo.png'
    }
})