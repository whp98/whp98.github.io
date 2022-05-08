import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
export default defineUserConfig<DefaultThemeOptions>({
    lang: 'zh-CN',
    title: '技术凡人',
    description: '记录成长和生活',
    base: '/',
    port: 34561,
    themeConfig: {
        logo: '/logo.png'
    }
})