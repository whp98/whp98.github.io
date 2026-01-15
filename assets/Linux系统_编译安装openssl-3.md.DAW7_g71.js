import{_ as n,c as a,o as p,ag as e}from"./chunks/framework.DWdSXOaE.js";const _=JSON.parse('{"title":"编译安装openssl-3","description":"","frontmatter":{},"headers":[],"relativePath":"Linux系统/编译安装openssl-3.md","filePath":"Linux系统/编译安装openssl-3.md","lastUpdated":1717397989000}'),l={name:"Linux系统/编译安装openssl-3.md"};function o(t,s,i,c,r,d){return p(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="编译安装openssl-3" tabindex="-1">编译安装openssl-3 <a class="header-anchor" href="#编译安装openssl-3" aria-label="Permalink to &quot;编译安装openssl-3&quot;">​</a></h1><p>命令如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git clone https://github.com/openssl/openssl.git</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd openssl</span></span>
<span class="line"><span></span></span>
<span class="line"><span>./Configure</span></span>
<span class="line"><span>make</span></span>
<span class="line"><span>make install</span></span>
<span class="line"><span>echo &quot;/usr/local/lib64&quot; &gt; /etc/ld.so.conf.d/openssl.conf</span></span>
<span class="line"><span>mv /usr/local/bin/openssl /usr/local/bin/openssl_old</span></span>
<span class="line"><span>sudo ln -s /usr/local/bin/openssl /usr/bin/openssl</span></span>
<span class="line"><span>sudo ldconfig</span></span></code></pre></div>`,3)])])}const h=n(l,[["render",o]]);export{_ as __pageData,h as default};
