import{_ as s,o as n,c as e,Q as a}from"./chunks/framework.0cae56c7.js";const y=JSON.parse('{"title":"编译安装openssl-3","description":"","frontmatter":{},"headers":[],"relativePath":"Linux系统/编译安装openssl-3.md","filePath":"Linux系统/编译安装openssl-3.md","lastUpdated":1690537275000}'),l={name:"Linux系统/编译安装openssl-3.md"},p=a(`<h1 id="编译安装openssl-3" tabindex="-1">编译安装openssl-3 <a class="header-anchor" href="#编译安装openssl-3" aria-label="Permalink to &quot;编译安装openssl-3&quot;">​</a></h1><p>命令如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git clone https://github.com/openssl/openssl.git</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cd openssl</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">./Configure</span></span>
<span class="line"><span style="color:#e1e4e8;">make</span></span>
<span class="line"><span style="color:#e1e4e8;">make install</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;/usr/local/lib64&quot; &gt; /etc/ld.so.conf.d/openssl.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">mv /usr/local/bin/openssl /usr/local/bin/openssl_old</span></span>
<span class="line"><span style="color:#e1e4e8;">sudo ln -s /usr/local/bin/openssl /usr/bin/openssl</span></span>
<span class="line"><span style="color:#e1e4e8;">sudo ldconfig</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git clone https://github.com/openssl/openssl.git</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cd openssl</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">./Configure</span></span>
<span class="line"><span style="color:#24292e;">make</span></span>
<span class="line"><span style="color:#24292e;">make install</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;/usr/local/lib64&quot; &gt; /etc/ld.so.conf.d/openssl.conf</span></span>
<span class="line"><span style="color:#24292e;">mv /usr/local/bin/openssl /usr/local/bin/openssl_old</span></span>
<span class="line"><span style="color:#24292e;">sudo ln -s /usr/local/bin/openssl /usr/bin/openssl</span></span>
<span class="line"><span style="color:#24292e;">sudo ldconfig</span></span></code></pre></div>`,3),o=[p];function c(t,i,r,d,u,_){return n(),e("div",null,o)}const g=s(l,[["render",c]]);export{y as __pageData,g as default};
