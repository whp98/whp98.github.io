import{_ as s,c as i,o as t,ag as n}from"./chunks/framework.Ds6Eueu6.js";const c=JSON.parse('{"title":"npm安装yarn","description":"","frontmatter":{},"headers":[],"relativePath":"前端开发/npm安装yarn设置镜像.md","filePath":"前端开发/npm安装yarn设置镜像.md","lastUpdated":1726643017000}'),e={name:"前端开发/npm安装yarn设置镜像.md"};function p(h,a,l,r,d,k){return t(),i("div",null,a[0]||(a[0]=[n(`<h1 id="npm安装yarn" tabindex="-1">npm安装yarn <a class="header-anchor" href="#npm安装yarn" aria-label="Permalink to &quot;npm安装yarn&quot;">​</a></h1><h2 id="参考官网" tabindex="-1">参考官网 <a class="header-anchor" href="#参考官网" aria-label="Permalink to &quot;参考官网&quot;">​</a></h2><p><a href="https://classic.yarnpkg.com/en/docs/install#debian-stable" target="_blank" rel="noreferrer">https://classic.yarnpkg.com/en/docs/install#debian-stable</a></p><h2 id="安装pnpm" tabindex="-1">安装pnpm <a class="header-anchor" href="#安装pnpm" aria-label="Permalink to &quot;安装pnpm&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -g</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yarn</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">which</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yarn</span></span></code></pre></div><h2 id="查看和设置镜像" tabindex="-1">查看和设置镜像 <a class="header-anchor" href="#查看和设置镜像" aria-label="Permalink to &quot;查看和设置镜像&quot;">​</a></h2><p>查询下载源</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> registry</span></span></code></pre></div><p>设置为国内镜像</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> registry</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://registry.npmmirror.com</span></span></code></pre></div><p>设置为官方镜像</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> registry</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://registry.yarnpkg.com</span></span></code></pre></div>`,12)]))}const g=s(e,[["render",p]]);export{c as __pageData,g as default};
