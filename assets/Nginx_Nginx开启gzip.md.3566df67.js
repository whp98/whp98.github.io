import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.0cae56c7.js";const x=JSON.parse('{"title":"Nginx开始gzip","description":"","frontmatter":{},"headers":[],"relativePath":"Nginx/Nginx开启gzip.md","filePath":"Nginx/Nginx开启gzip.md","lastUpdated":1709291550000}'),l={name:"Nginx/Nginx开启gzip.md"},o=p(`<h1 id="nginx开始gzip" tabindex="-1">Nginx开始gzip <a class="header-anchor" href="#nginx开始gzip" aria-label="Permalink to &quot;Nginx开始gzip&quot;">​</a></h1><p>配置文件如下</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">gzip </span><span style="color:#E1E4E8;">on;</span></span>
<span class="line"><span style="color:#F97583;">gzip_comp_level </span><span style="color:#E1E4E8;">5;</span></span>
<span class="line"><span style="color:#F97583;">gzip_min_length </span><span style="color:#E1E4E8;">1k;</span></span>
<span class="line"><span style="color:#F97583;">gzip_buffers </span><span style="color:#E1E4E8;">4 </span><span style="color:#79B8FF;">16k</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">gzip_proxied </span><span style="color:#E1E4E8;">any;</span></span>
<span class="line"><span style="color:#F97583;">gzip_vary </span><span style="color:#E1E4E8;">on;</span></span>
<span class="line"><span style="color:#F97583;">gzip_types</span></span>
<span class="line"><span style="color:#E1E4E8;">  application/javascript</span></span>
<span class="line"><span style="color:#E1E4E8;">  application/x-javascript</span></span>
<span class="line"><span style="color:#E1E4E8;">  text/javascript</span></span>
<span class="line"><span style="color:#E1E4E8;">  text/css</span></span>
<span class="line"><span style="color:#E1E4E8;">  text/xml</span></span>
<span class="line"><span style="color:#E1E4E8;">  application/xhtml+xml</span></span>
<span class="line"><span style="color:#E1E4E8;">  application/xml</span></span>
<span class="line"><span style="color:#E1E4E8;">  application/atom+xml</span></span>
<span class="line"><span style="color:#E1E4E8;">  application/rdf+xml</span></span>
<span class="line"><span style="color:#E1E4E8;">  application/rss+xml</span></span>
<span class="line"><span style="color:#E1E4E8;">  application/geo+json</span></span>
<span class="line"><span style="color:#E1E4E8;">  application/json</span></span>
<span class="line"><span style="color:#E1E4E8;">  application/ld+json</span></span>
<span class="line"><span style="color:#E1E4E8;">  application/manifest+json</span></span>
<span class="line"><span style="color:#E1E4E8;">  application/x-web-app-manifest+json</span></span>
<span class="line"><span style="color:#E1E4E8;">  image/svg+xml</span></span>
<span class="line"><span style="color:#E1E4E8;">  text/x-cross-domain-policy;</span></span>
<span class="line"><span style="color:#F97583;">gzip_static </span><span style="color:#E1E4E8;">on;</span></span>
<span class="line"><span style="color:#F97583;">gzip_disable </span><span style="color:#9ECBFF;">&quot;MSIE [1-6]\\.&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置gzip压缩针对的HTTP协议版本，没做负载的可以不用</span></span>
<span class="line"><span style="color:#6A737D;"># gzip_http_version 1.0;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">gzip </span><span style="color:#24292E;">on;</span></span>
<span class="line"><span style="color:#D73A49;">gzip_comp_level </span><span style="color:#24292E;">5;</span></span>
<span class="line"><span style="color:#D73A49;">gzip_min_length </span><span style="color:#24292E;">1k;</span></span>
<span class="line"><span style="color:#D73A49;">gzip_buffers </span><span style="color:#24292E;">4 </span><span style="color:#005CC5;">16k</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">gzip_proxied </span><span style="color:#24292E;">any;</span></span>
<span class="line"><span style="color:#D73A49;">gzip_vary </span><span style="color:#24292E;">on;</span></span>
<span class="line"><span style="color:#D73A49;">gzip_types</span></span>
<span class="line"><span style="color:#24292E;">  application/javascript</span></span>
<span class="line"><span style="color:#24292E;">  application/x-javascript</span></span>
<span class="line"><span style="color:#24292E;">  text/javascript</span></span>
<span class="line"><span style="color:#24292E;">  text/css</span></span>
<span class="line"><span style="color:#24292E;">  text/xml</span></span>
<span class="line"><span style="color:#24292E;">  application/xhtml+xml</span></span>
<span class="line"><span style="color:#24292E;">  application/xml</span></span>
<span class="line"><span style="color:#24292E;">  application/atom+xml</span></span>
<span class="line"><span style="color:#24292E;">  application/rdf+xml</span></span>
<span class="line"><span style="color:#24292E;">  application/rss+xml</span></span>
<span class="line"><span style="color:#24292E;">  application/geo+json</span></span>
<span class="line"><span style="color:#24292E;">  application/json</span></span>
<span class="line"><span style="color:#24292E;">  application/ld+json</span></span>
<span class="line"><span style="color:#24292E;">  application/manifest+json</span></span>
<span class="line"><span style="color:#24292E;">  application/x-web-app-manifest+json</span></span>
<span class="line"><span style="color:#24292E;">  image/svg+xml</span></span>
<span class="line"><span style="color:#24292E;">  text/x-cross-domain-policy;</span></span>
<span class="line"><span style="color:#D73A49;">gzip_static </span><span style="color:#24292E;">on;</span></span>
<span class="line"><span style="color:#D73A49;">gzip_disable </span><span style="color:#032F62;">&quot;MSIE [1-6]\\.&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置gzip压缩针对的HTTP协议版本，没做负载的可以不用</span></span>
<span class="line"><span style="color:#6A737D;"># gzip_http_version 1.0;</span></span></code></pre></div>`,3),e=[o];function c(i,t,r,E,y,g){return n(),a("div",null,e)}const m=s(l,[["render",c]]);export{x as __pageData,m as default};
