import{_ as e,c as t,o as s,ag as i}from"./chunks/framework.Ds6Eueu6.js";const h=JSON.parse('{"title":"Git的路径变化后无法提交的情况处理unable to access ...","description":"","frontmatter":{},"headers":[],"relativePath":"Git版本管理/Git的路径变化后无法提交的情况处理.md","filePath":"Git版本管理/Git的路径变化后无法提交的情况处理.md","lastUpdated":1717397989000}'),n={name:"Git版本管理/Git的路径变化后无法提交的情况处理.md"};function o(c,a,l,r,p,d){return s(),t("div",null,a[0]||(a[0]=[i('<h1 id="git的路径变化后无法提交的情况处理unable-to-access" tabindex="-1">Git的路径变化后无法提交的情况处理<code>unable to access ...</code> <a class="header-anchor" href="#git的路径变化后无法提交的情况处理unable-to-access" aria-label="Permalink to &quot;Git的路径变化后无法提交的情况处理`unable to access ...`&quot;">​</a></h1><h2 id="报错内容" tabindex="-1">报错内容 <a class="header-anchor" href="#报错内容" aria-label="Permalink to &quot;报错内容&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fatal: unable to access &#39;https://github.com/Kiterepo/dns-over-https&#39;: error setting certificate verify locations:</span></span>\n<span class="line"><span>  CAfile: D:/ProgramFlie/Git/mingw64/libexec/ssl/certs/ca-bundle.crt</span></span>\n<span class="line"><span>  CApath: none</span></span></code></pre></div><h2 id="解决方式" tabindex="-1">解决方式 <a class="header-anchor" href="#解决方式" aria-label="Permalink to &quot;解决方式&quot;">​</a></h2><p>这个问题出现在我重装windows之后盘符变化的情况，git安装版本会把这个ca的路径写死</p><p>经过查找这个文件的路径在git的安装路径下</p><p><code>E:\\DEV_ENV\\Git\\etc\\gitconfig</code></p><p>打开文件将里面错误的路径直接删除就会好了 ,具体的位置应该在 <code>[http]</code>下面</p>',8)]))}const u=e(n,[["render",o]]);export{h as __pageData,u as default};
