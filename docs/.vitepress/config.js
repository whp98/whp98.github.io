import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { SitemapStream } from "sitemap";
import moment from "moment/moment";
import AutoSidebar from "vite-plugin-vitepress-auto-sidebar-whp98";
import AutoIndex from "vite-plugin-vitepress-auto-index";
const links = [];
const currentYear = moment().format("YYYY");

const SidebarItemFilter = (SidebarItemArr) => {
  const res = SidebarItemArr.filter((e) => {
    const flag1 = e.text !== "LICENSE";
    const flag2 = e.text.indexOf(".") === -1;
    return flag1 && flag2;
  });
  res.forEach((e) => {
    if (e.text === "README" || e.text === "index") {
      e.text = "内容";
    }
    return e;
  });
  //console.log(res);
  for (let index = 0; index < res.length; index++) {
    const element = res[index];
    if (element.items && element.items.length === 1) {
      res[index] = element.items[0];
    }
  }
  res.sort((e1, e2) => {
    if (e1.link && !e2.link) {
      return -1;
    } else if (!e1.link && e2.link) {
      return 1;
    } else if (!e1.link && !e2.link) {
      return 0;
    } else if (
      e1.link &&
      e2.link &&
      e1.link.split("/").length > e2.link.split("/").length
    ) {
      return 1;
    } else if (
      e1.link &&
      e2.link &&
      e1.link.split("/").length < e2.link.split("/").length
    ) {
      return -1;
    } else if (
      e1.link &&
      e2.link &&
      e1.link.split("/").length === e2.link.split("/").length &&
      e1.link.endsWith("index.html")
    ) {
      return -1;
    } else if (
      e1.link &&
      e2.link &&
      e1.link.split("/").length === e2.link.split("/").length &&
      e2.link.endsWith("index.html")
    ) {
      return 1;
    } else if (e1.link && e2.link && e1.link.length - e2.link.length > 0) {
      return 1;
    } else if (e1.link && e2.link && e1.link.length - e2.link.length < 0) {
      return -1;
    } else {
      return e1.link.localeCompare(e2.link);
    }
  });
  return res;
};

export default {
  lang: "zh-CN",
  title: "技术凡人",
  description: "技术凡人的个人站",
  base: "/",
  port: 34561,
  appearance: "dark",
  vite: {
    plugins: [
      {
        ...AutoIndex({}),
        enforce: "pre",
      },
      // add plugin
      AutoSidebar({
        // You can also set options to adjust sidebar data
        // see option document below
        // ignoreList: ['index.md'],
        ignoreIndexItem: false,
        prefix: ".",
        collapsed: false,
        titleFromFile: true,
        // sideBarItemsResolved: SidebarItemFilter,
        sideBarItemsResolved: SidebarItemFilter,
      }),
    ],
  },
  head: [
    [
      "script",
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-M87WHVJHWW",
        crossorigin: "anonymous",
      },
    ],
    [
      "script",
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-M87WHVJHWW');",
    ],
    [
      "script",
      {},
      "var _hmt = _hmt || [];\n(function() {\nvar hm = document.createElement('script');\nhm.src ='https://hm.baidu.com/hm.js?8b332f513007cd16a483b694bd2c5335';\nvar s = document.getElementsByTagName('script')[0]; \ns.parentNode.insertBefore(hm, s);\n})();",
    ],
    [
      "meta",
      {
        name: "sogou_site_verification",
        content: "UFI5s8VKnD",
      },
      {},
    ],
    [
      "script",
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-M87WHVJHWW",
        crossorigin: "anonymous",
      },
    ],
    [
      "script",
      {
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7612861739271816",
        crossorigin: "anonymous",
      },
    ],
  ],
  themeConfig: {
    logo: "/logo.png",
    search: {
      provider: "local",
    },
    footer: {
      message:
        '基于<a href="https://github.com/whp98/whp98.github.io/blob/main/LICENSE.txt">MIT License</a>发布',
      copyright: `Copyright © 2021-${currentYear} <a href="https://github.com/whp98">Roc</a>`,
    },
    lastUpdated: true,
    markdown: {
      theme: "material-palenight",
      lineNumbers: true,
    },
    nav: [
      { text: "主页", link: "/" },
      { text: "Java", link: "/Java语言相关/" },
      { text: "Android", link: "/安卓/" },
      { text: "数据库", link: "/数据库/" },
      { text: "Git", link: "/Git版本管理/" },
      {
        text: "操作系统",
        items: [
          { text: "Linux", link: "/Linux系统/" },
          { text: "Windows", link: "/Windows系统/" },
        ],
      },
      { text: "云服务推广", link: "/赞助和推广/" },
    ],
  },
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"),
        lastmod: pageData.lastUpdated,
      });
  },
  // 生成sitemap.xml
  buildEnd: async ({ outDir }) => {
    console.log("out", outDir);
    const sitemap = new SitemapStream({
      hostname: "https://blog.jsfr.work/",
    });
    const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
    await new Promise((r) => writeStream.on("finish", r));
  },
  markdown: {
    // options for @mdit-vue/plugin-toc
    // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
    toc: { level: [1, 2, 3, 4, 5, 6, 7] },
    attrs: { disable: true },
  },
  // 忽略死链
  ignoreDeadLinks: true,
};
