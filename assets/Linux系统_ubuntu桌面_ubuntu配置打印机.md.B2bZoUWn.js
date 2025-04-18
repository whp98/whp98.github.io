import{_ as i,c as a,o as n,ag as t}from"./chunks/framework.Ds6Eueu6.js";const u=JSON.parse('{"title":"ubuntu配置打印机","description":"","frontmatter":{},"headers":[],"relativePath":"Linux系统/ubuntu桌面/ubuntu配置打印机.md","filePath":"Linux系统/ubuntu桌面/ubuntu配置打印机.md","lastUpdated":1743645884000}'),l={name:"Linux系统/ubuntu桌面/ubuntu配置打印机.md"};function p(e,s,h,k,r,d){return n(),a("div",null,s[0]||(s[0]=[t(`<h1 id="ubuntu配置打印机" tabindex="-1">ubuntu配置打印机 <a class="header-anchor" href="#ubuntu配置打印机" aria-label="Permalink to &quot;ubuntu配置打印机&quot;">​</a></h1><p>本文参考</p><p><a href="https://sspai.com/post/90194" target="_blank" rel="noreferrer">少数派:终于可以在 Linux 下愉快打印了：Linux 发行版配置打印机攻略</a></p><h2 id="安装软件包" tabindex="-1">安装软件包 <a class="header-anchor" href="#安装软件包" aria-label="Permalink to &quot;安装软件包&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装CPUS</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cups</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cups-browsed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bluez-cups</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cups-pdf</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启用CUPS基本服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cups</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # 启用CUPS服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cups</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       # 立即启动CUPS服务</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 若安装了cups-browsed，你也要单独启用它，因为它是一个独立的服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cups-browsed</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cups-browsed</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装打印机管理工具：system-config-printer</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> system-config-printer</span></span></code></pre></div><h2 id="配置打印机" tabindex="-1">配置打印机 <a class="header-anchor" href="#配置打印机" aria-label="Permalink to &quot;配置打印机&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动打印机配置管理GUI</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">system-config-printer</span></span></code></pre></div><ol><li><p>选择添加打印机</p></li><li><p>查找网络打印机</p></li><li><p>输入打印机ip或域名</p></li><li><p>点击下一步</p></li><li><p>选择驱动(可能要多测试几个协议)</p></li><li><p>点击点击下一步</p></li><li><p>打印测试页面(只要能打印出来就ok了)</p></li><li><p>完成</p></li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>终于完成了linux打印机的拼图</p>`,10)]))}const o=i(l,[["render",p]]);export{u as __pageData,o as default};
