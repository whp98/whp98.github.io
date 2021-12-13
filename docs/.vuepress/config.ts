import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
    lang: 'zh-CN',
    title: 'HAIPENG_BLOG',
    description: 'Just write it.',
    base: '/',
    themeConfig: {
        logo:'/logo.png'
    }
})