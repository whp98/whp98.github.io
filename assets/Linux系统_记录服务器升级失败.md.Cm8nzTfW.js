import{_ as e,c as t,o as p,ag as s}from"./chunks/framework.Ds6Eueu6.js";const u=JSON.parse('{"title":"记录服务器升级失败","description":"","frontmatter":{},"headers":[],"relativePath":"Linux系统/记录服务器升级失败.md","filePath":"Linux系统/记录服务器升级失败.md","lastUpdated":1717397989000}'),n={name:"Linux系统/记录服务器升级失败.md"};function o(i,a,d,_,r,c){return p(),t("div",null,a[0]||(a[0]=[s(`<h1 id="记录服务器升级失败" tabindex="-1">记录服务器升级失败 <a class="header-anchor" href="#记录服务器升级失败" aria-label="Permalink to &quot;记录服务器升级失败&quot;">​</a></h1><p>我有一台腾讯云轻量，是ubuntu系统，版本20.04每次登录的时候会提示22.04可用输入 <code>do-upgeade-release</code>， 来升级。</p><p>正好之前我换了源添加了微软的ubuntu的jammy xxx的源，后来我查了这个22.04的源。</p><p>然后一顿操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt update</span></span>
<span class="line"><span>apt upgrade</span></span></code></pre></div><p>安装了上千个包，安装完成之后，一重启结果进不去了。</p><p>后台vnc一登陆看到系统无限重启。</p><p>无语了。</p><p>还好系统上没有重要资料，重装之。</p><p>提醒各位不要手贱升级云服务器的系统。</p>`,10)]))}const h=e(n,[["render",o]]);export{u as __pageData,h as default};
