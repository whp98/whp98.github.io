import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
export default defineUserConfig<DefaultThemeOptions>({
    lang: 'zh-CN',
    title: '大猪Blog',
    description: '记录成长和生活',
    base: '/',
    themeConfig: {
        logo:'/logo.png'
    }
})