import{_ as s,c as a,o as t,ag as e}from"./chunks/framework.Ds6Eueu6.js";const o=JSON.parse('{"title":"开启下载服务器Air2","description":"","frontmatter":{},"headers":[],"relativePath":"容器技术/实用镜像/开启下载服务器Air2.md","filePath":"容器技术/实用镜像/开启下载服务器Air2.md","lastUpdated":1726751071000}'),n={name:"容器技术/实用镜像/开启下载服务器Air2.md"};function h(r,i,l,p,k,d){return t(),a("div",null,i[0]||(i[0]=[e('<h1 id="开启下载服务器air2" tabindex="-1">开启下载服务器Air2 <a class="header-anchor" href="#开启下载服务器air2" aria-label="Permalink to &quot;开启下载服务器Air2&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --restart=always</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> aria2</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 6060:端口</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 6800:6800</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SECRET=密码</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -v</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /air2/down:下载路径</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -v</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /air2/conf:/conf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  onisuly/aria2-with-webui</span></span></code></pre></div>',2)]))}const C=s(n,[["render",h]]);export{o as __pageData,C as default};
