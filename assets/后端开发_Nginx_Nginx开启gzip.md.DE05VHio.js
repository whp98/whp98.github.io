import{_ as i,c as a,o as n,ag as p}from"./chunks/framework.DWdSXOaE.js";const d=JSON.parse('{"title":"Nginx开始gzip","description":"","frontmatter":{},"headers":[],"relativePath":"后端开发/Nginx/Nginx开启gzip.md","filePath":"后端开发/Nginx/Nginx开启gzip.md","lastUpdated":1726751071000}'),l={name:"后端开发/Nginx/Nginx开启gzip.md"};function t(h,s,k,e,E,g){return n(),a("div",null,[...s[0]||(s[0]=[p(`<h1 id="nginx开始gzip" tabindex="-1">Nginx开始gzip <a class="header-anchor" href="#nginx开始gzip" aria-label="Permalink to &quot;Nginx开始gzip&quot;">​</a></h1><p>配置文件如下</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">gzip </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">gzip_comp_level </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">gzip_min_length </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">gzip_buffers </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 16k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">gzip_proxied </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">any;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">gzip_vary </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">gzip_types</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  application/javascript</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  application/x-javascript</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  text/javascript</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  text/css</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  text/xml</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  application/xhtml+xml</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  application/xml</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  application/atom+xml</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  application/rdf+xml</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  application/rss+xml</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  application/geo+json</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  application/json</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  application/ld+json</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  application/manifest+json</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  application/x-web-app-manifest+json</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  image/svg+xml</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  text/x-cross-domain-policy;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">gzip_static </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">gzip_disable </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;MSIE [1-6]\\.&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置gzip压缩针对的HTTP协议版本，没做负载的可以不用</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># gzip_http_version 1.0;</span></span></code></pre></div>`,3)])])}const c=i(l,[["render",t]]);export{d as __pageData,c as default};
