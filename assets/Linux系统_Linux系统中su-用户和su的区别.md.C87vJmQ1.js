import{_ as a,c as e,o as i,ag as l}from"./chunks/framework.Ds6Eueu6.js";const p=JSON.parse('{"title":"Linux系统中su-用户和su的区别","description":"","frontmatter":{},"headers":[],"relativePath":"Linux系统/Linux系统中su-用户和su的区别.md","filePath":"Linux系统/Linux系统中su-用户和su的区别.md","lastUpdated":1721284579000}'),o={name:"Linux系统/Linux系统中su-用户和su的区别.md"};function t(n,s,h,d,r,u){return i(),e("div",null,s[0]||(s[0]=[l('<h1 id="linux系统中su-用户和su的区别" tabindex="-1">Linux系统中su-用户和su的区别 <a class="header-anchor" href="#linux系统中su-用户和su的区别" aria-label="Permalink to &quot;Linux系统中su-用户和su的区别&quot;">​</a></h1><p><code>su 用户</code> 和 <code>su - 用户</code>（也可以写成 <code>su --login 用户</code>）之间的主要区别在于它们如何处理用户环境和 shell 初始化文件：</p><h3 id="su-用户" tabindex="-1"><code>su 用户</code> <a class="header-anchor" href="#su-用户" aria-label="Permalink to &quot;`su 用户`&quot;">​</a></h3><ul><li><strong>加载环境</strong>：不完全切换到目标用户的环境。保持当前会话的大部分环境变量，只切换到目标用户的身份。</li><li><strong>适用场景</strong>：希望以另一个用户的身份运行命令，但保留当前会话的大部分环境设置。</li><li><strong>示例</strong>：<div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">su</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 用户名</span></span></code></pre></div>切换到 <code>用户名</code>，但环境变量如 <code>PATH</code> 等仍可能包含原用户的信息。</li></ul><h3 id="su-用户-1" tabindex="-1"><code>su - 用户</code> <a class="header-anchor" href="#su-用户-1" aria-label="Permalink to &quot;`su - 用户`&quot;">​</a></h3><ul><li><strong>加载环境</strong>：完全切换到目标用户的环境，就像直接登录该用户一样。这会加载目标用户的登录 shell 初始化文件（如 <code>.bash_profile</code> 或 <code>.profile</code>）以及环境变量。</li><li><strong>适用场景</strong>：希望完全模拟目标用户的登录环境，包括所有相关的环境变量和初始化脚本。</li><li><strong>示例</strong>：<div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">su</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> -</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 用户名</span></span></code></pre></div>切换到 <code>用户名</code>，并加载该用户的完整登录环境。</li></ul><h3 id="详细区别" tabindex="-1">详细区别 <a class="header-anchor" href="#详细区别" aria-label="Permalink to &quot;详细区别&quot;">​</a></h3><h4 id="环境变量" tabindex="-1">环境变量 <a class="header-anchor" href="#环境变量" aria-label="Permalink to &quot;环境变量&quot;">​</a></h4><ul><li><code>su 用户</code>：继承当前会话的大部分环境变量。</li><li><code>su - 用户</code>：重置环境变量，加载目标用户的环境设置。</li></ul><h4 id="初始化文件" tabindex="-1">初始化文件 <a class="header-anchor" href="#初始化文件" aria-label="Permalink to &quot;初始化文件&quot;">​</a></h4><ul><li><code>su 用户</code>：不会加载目标用户的登录 shell 初始化文件（如 <code>.bash_profile</code> 或 <code>.profile</code>）。</li><li><code>su - 用户</code>：加载目标用户的登录 shell 初始化文件。</li></ul><h4 id="工作目录" tabindex="-1">工作目录 <a class="header-anchor" href="#工作目录" aria-label="Permalink to &quot;工作目录&quot;">​</a></h4><ul><li><code>su 用户</code>：保持当前目录不变。</li><li><code>su - 用户</code>：切换到目标用户的 home 目录。</li></ul><h3 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h3><p>假设当前用户为 <code>user1</code>，希望切换到 <code>user2</code>：</p><h4 id="使用-su-user2" tabindex="-1">使用 <code>su user2</code> <a class="header-anchor" href="#使用-su-user2" aria-label="Permalink to &quot;使用 `su user2`&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user1@machine:~$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> su</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user2</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Password:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user2@machine:/home/user1$</span></span></code></pre></div><ul><li>保持 <code>/home/user1</code> 目录不变。</li><li>环境变量和 shell 初始化文件大部分保持与 <code>user1</code> 相同。</li></ul><h4 id="使用-su-user2-1" tabindex="-1">使用 <code>su - user2</code> <a class="header-anchor" href="#使用-su-user2-1" aria-label="Permalink to &quot;使用 `su - user2`&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user1@machine:~$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> su</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> -</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user2</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Password:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user2@machine:~$</span></span></code></pre></div><ul><li>切换到 <code>user2</code> 的 home 目录 <code>/home/user2</code>。</li><li>加载 <code>user2</code> 的环境变量和 shell 初始化文件。</li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><ul><li><strong><code>su 用户</code></strong>：适用于需要临时以其他用户身份运行命令，但保留当前环境变量的情况。</li><li><strong><code>su - 用户</code></strong>：适用于需要完全模拟目标用户的登录环境，包括加载其初始化脚本和环境变量的情况。</li></ul>',23)]))}const k=a(o,[["render",t]]);export{p as __pageData,k as default};
