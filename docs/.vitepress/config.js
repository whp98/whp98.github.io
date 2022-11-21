export default {
    lang: 'zh-CN',
    title: '技术凡人',
    description: '记录成长和生活',
    base: '/',
    port: 34561,
    themeConfig: {
        logo: '/logo.png',
        footer: {
            message: '基于<a href="https://github.com/whp98/whp98.github.io/blob/main/LICENSE.txt">MIT License</a>发布',
            copyright: 'Copyright © 2019-present <a href="https://github.com/whp98">whp98</a>'
        },
        lastUpdated: true,
        markdown: {
            theme: 'material-palenight',
            lineNumbers: true
        },
        nav: [
            { text: '主页', link: '/index' },
            { text: 'Java', link: '/Java/' },
            { text: '数据库', link: '/数据库/' },
            { text: '网络', link: '/网络/' },
            {
                text: '操作系统', items: [
                    { text: 'Linux', link: '/Linux/' },
                    { text: 'Windows', link: '/windows/' },
                ]
            }
        ]
    }
}