import { defineConfig } from "vitepress";
import AutoSidebar from "vite-plugin-vitepress-auto-sidebar-whp98";
import AutoIndex from "vite-plugin-vitepress-auto-index";

const currentYear = new Date().getFullYear();

const SidebarItemFilter = (SidebarItemArr) => {
  const res = SidebarItemArr.filter((e) => {
    const flag1 = e.text !== "LICENSE";
    const flag2 = !/\.(md|txt|json|yml|yaml|png|jpg|jpeg|gif|svg|js|ts|css|html)$/i.test(
      e.text
    );
    return flag1 && flag2;
  });
  res.forEach((e) => {
    if (e.text === "README" || e.text === "index") {
      e.text = "内容";
    }
  });
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

export default defineConfig({
  lang: "zh-CN",
  title: "技术凡人",
  description: "技术凡人的个人站",
  base: "/",
  appearance: "dark",
  lastUpdated: true,
  sitemap: {
    hostname: "https://blog.261020.xyz",
  },
  ignoreDeadLinks: [/^https?:\/\/localhost/, /^\.\/public\/index$/],
  vite: {
    assetsInclude: ["**/*.PNG", "**/*.JPG"],
    build: {
      chunkSizeWarningLimit: 10240,
    },
    server: {
      port: 34561,
    },
    plugins: [
      {
        ...AutoIndex({}),
        enforce: "pre",
      },
      AutoSidebar({
        ignoreIndexItem: false,
        prefix: ".",
        collapsed: false,
        titleFromFile: true,
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
  markdown: {
    theme: {
      light: "github-light",
      dark: "material-theme-palenight",
    },
    lineNumbers: true,
    toc: { level: [1, 2, 3, 4, 5, 6] },
    attrs: { disable: true },
  },
  themeConfig: {
    logo: "/logo.png",
    lastUpdated: {
      text: "最后更新于",
    },
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                },
              },
            },
          },
        },
      },
    },
    footer: {
      message:
        '基于<a href="https://github.com/whp98/whp98.github.io/blob/main/LICENSE.txt">MIT License</a>发布',
      copyright: `Copyright © 2021-${currentYear} <a href="https://github.com/whp98">Roc</a>`,
    },
    nav: [
      { text: "主页", link: "/" },
      { text: "AI 相关", link: "/AI相关/" },
      {
        text: "开发技术",
        items: [
          { text: "前端开发", link: "/前端开发/" },
          { text: "后端开发", link: "/后端开发/" },
          { text: "安卓开发", link: "/安卓开发/" },
          { text: "数据库", link: "/数据库/" },
          { text: "系统架构", link: "/系统架构/" },
          { text: "算法面试", link: "/算法面试/" },
          { text: "嵌入式相关", link: "/嵌入式相关/" },
        ],
      },
      {
        text: "编程语言",
        items: [
          { text: "Python 语言", link: "/Python语言/" },
          { text: "Rust 语言", link: "/Rust语言/" },
        ],
      },
      {
        text: "系统与运维",
        items: [
          { text: "Linux 系统", link: "/Linux系统/" },
          { text: "Windows 系统", link: "/Windows系统/" },
          { text: "容器技术", link: "/容器技术/" },
          { text: "计算机网络", link: "/计算机网络/" },
          { text: "Git 版本管理", link: "/Git版本管理/" },
          { text: "SVN 版本管理", link: "/SVN版本管理/" },
        ],
      },
      {
        text: "工具与建站",
        items: [
          { text: "开发工具技巧", link: "/开发工具技巧/" },
          { text: "博客搭建", link: "/博客搭建/" },
        ],
      },
      {
        text: "随笔与认知",
        items: [
          { text: "生活记录", link: "/生活记录/" },
          { text: "奇思妙想", link: "/奇思妙想/" },
          { text: "金融知识", link: "/金融知识/" },
          { text: "健康科普", link: "/健康科普/" },
          { text: "社会认知", link: "/社会认知/" },
          { text: "小说", link: "/小说/" },
        ],
      },
      { text: "赞助和推广", link: "/赞助和推广/" },
    ],
  },
});
