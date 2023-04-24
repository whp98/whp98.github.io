import {createWriteStream} from 'node:fs'
import {resolve} from 'node:path'
import {SitemapStream} from 'sitemap'
import moment from "moment/moment";

const links = []
const currentYear = moment().format('YYYY');

export default {
    lang: 'zh-CN',
    title: '技术凡人',
    description: '技术凡人的个人站',
    base: '/',
    port: 34561,
    appearance: 'dark',
    head: [
        [
            'script',
            {async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-M87WHVJHWW'}
        ],
        [
            'script',
            {},
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-M87WHVJHWW');"
        ],
        ['script', {},
            "var _hmt = _hmt || [];\n(function() {\nvar hm = document.createElement('script');\nhm.src ='https://hm.baidu.com/hm.js?8b332f513007cd16a483b694bd2c5335';\nvar s = document.getElementsByTagName('script')[0]; \ns.parentNode.insertBefore(hm, s);\n})();"],
        ['meta', {name: 'sogou_site_verification', content: 'UFI5s8VKnD'}, {}],
        [
            'script',
            {async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-M87WHVJHWW', crossorigin: 'anonymous'}
        ]
    ],
    themeConfig: {
        logo: '/logo.png',
        footer: {
            message: '基于<a href="https://github.com/whp98/whp98.github.io/blob/main/LICENSE.txt">MIT License</a>发布',
            copyright: `Copyright © 2021-${currentYear} <a href="https://github.com/whp98">Roc</a>`
        },
        lastUpdated: true,
        markdown: {
            theme: 'material-palenight',
            lineNumbers: true
        },
        nav: [
            {text: '主页', link: '/index'},
            {text: 'Java', link: '/Java/'},
            {text: 'Android', link: '/Android/'},
            {text: '数据库', link: '/DataBase/'},
            {text: '网络', link: '/NetWork/'},
            {
                text: '操作系统', items: [
                    {text: 'Linux', link: '/Linux/'},
                    {text: 'Windows', link: '/Windows/'},
                ]
            },
            {text: '云服务推广', link: '/AFFMAN/'}
        ]
    },
    transformHtml: (_, id, {pageData}) => {
        if (!/[\\/]404\.html$/.test(id))
            links.push({
                // you might need to change this if not using clean urls mode
                url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
                lastmod: pageData.lastUpdated
            })
    },
    buildEnd: async ({outDir}) => {
        console.log("out", outDir);
        const sitemap = new SitemapStream({
            hostname: 'https://blog.jsfr.work/'
        })
        const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
        sitemap.pipe(writeStream)
        links.forEach((link) => sitemap.write(link))
        sitemap.end()
        await new Promise((r) => writeStream.on('finish', r))
    }
}