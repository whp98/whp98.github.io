import{_ as n,c as a,a3 as e,o as p}from"./chunks/framework.DLXsHQLa.js";const d=JSON.parse('{"title":"编译安装openssl-3","description":"","frontmatter":{},"headers":[],"relativePath":"Linux系统/编译安装openssl-3.md","filePath":"Linux系统/编译安装openssl-3.md","lastUpdated":1717397989000}'),l={name:"Linux系统/编译安装openssl-3.md"};function i(o,s,r,t,c,u){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="编译安装openssl-3" tabindex="-1">编译安装openssl-3 <a class="header-anchor" href="#编译安装openssl-3" aria-label="Permalink to &quot;编译安装openssl-3&quot;">​</a></h1><p>命令如下</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light material-theme-palenight vp-code" tabindex="0"><code><span class="line"><span>git clone https://github.com/openssl/openssl.git</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd openssl</span></span>
<span class="line"><span></span></span>
<span class="line"><span>./Configure</span></span>
<span class="line"><span>make</span></span>
<span class="line"><span>make install</span></span>
<span class="line"><span>echo &quot;/usr/local/lib64&quot; &gt; /etc/ld.so.conf.d/openssl.conf</span></span>
<span class="line"><span>mv /usr/local/bin/openssl /usr/local/bin/openssl_old</span></span>
<span class="line"><span>sudo ln -s /usr/local/bin/openssl /usr/bin/openssl</span></span>
<span class="line"><span>sudo ldconfig</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div>`,3)]))}const m=n(l,[["render",i]]);export{d as __pageData,m as default};
