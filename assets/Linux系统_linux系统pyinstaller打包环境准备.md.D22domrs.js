import{_ as i,c as a,o as n,ag as l}from"./chunks/framework.Ds6Eueu6.js";const y=JSON.parse('{"title":"linux centos系统pyinstaller打包环境准备","description":"","frontmatter":{},"headers":[],"relativePath":"Linux系统/linux系统pyinstaller打包环境准备.md","filePath":"Linux系统/linux系统pyinstaller打包环境准备.md","lastUpdated":1729487134000}'),h={name:"Linux系统/linux系统pyinstaller打包环境准备.md"};function p(t,s,e,k,F,r){return n(),a("div",null,s[0]||(s[0]=[l(`<h1 id="linux-centos系统pyinstaller打包环境准备" tabindex="-1">linux centos系统pyinstaller打包环境准备 <a class="header-anchor" href="#linux-centos系统pyinstaller打包环境准备" aria-label="Permalink to &quot;linux centos系统pyinstaller打包环境准备&quot;">​</a></h1><h2 id="使用源代码编译安装python" tabindex="-1">使用源代码编译安装python <a class="header-anchor" href="#使用源代码编译安装python" aria-label="Permalink to &quot;使用源代码编译安装python&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/yum.repos.d/CentOS-Base.repo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://mirrors.aliyun.com/repo/Centos-7.repo</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zlib-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bzip2-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> openssl-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ncurses-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sqlite-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> readline-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tk-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gdbm-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> db4-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libpcap-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xz-devel</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> groupinstall</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Development tools&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libffi-devel</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python_install</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python_install/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://www.python.org/ftp/python/3.9.20/Python-3.9.20.tar.xz</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -xvJf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Python-3.9.20.tar.xz</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/python3</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Python-3.9.20/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./configure</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --prefix=/usr/local/python3</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --enable-shared</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --with-ssl</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libpython3.so</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libpython3.9.so.1.0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/lib64/</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">which</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">which</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pip3</span></span></code></pre></div><h2 id="设置pip" tabindex="-1">设置pip <a class="header-anchor" href="#设置pip" aria-label="Permalink to &quot;设置pip&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">python3</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --upgrade</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pip</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> global.index-url</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">python3</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> venv</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./venv</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">which</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">which</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pip3</span></span></code></pre></div>`,5)]))}const g=i(h,[["render",p]]);export{y as __pageData,g as default};
