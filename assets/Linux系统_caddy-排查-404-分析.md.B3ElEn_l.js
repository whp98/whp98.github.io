import{_ as a,o as n,c as p,a3 as i}from"./chunks/framework.fntC-tS-.js";const k=JSON.parse('{"title":"记一次 Caddy 反向代理“偶尔 404”诡异故障排查与底层原理剖析","description":"","frontmatter":{},"headers":[],"relativePath":"Linux系统/caddy-排查-404-分析.md","filePath":"Linux系统/caddy-排查-404-分析.md","lastUpdated":1794281955000}'),e={name:"Linux系统/caddy-排查-404-分析.md"};function l(t,s,d,o,c,h){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="记一次-caddy-反向代理-偶尔-404-诡异故障排查与底层原理剖析" tabindex="-1">记一次 Caddy 反向代理“偶尔 404”诡异故障排查与底层原理剖析 <a class="header-anchor" href="#记一次-caddy-反向代理-偶尔-404-诡异故障排查与底层原理剖析" aria-label="Permalink to &quot;记一次 Caddy 反向代理“偶尔 404”诡异故障排查与底层原理剖析&quot;">​</a></h1><h2 id="_1-背景与现象" tabindex="-1">1. 背景与现象 <a class="header-anchor" href="#_1-背景与现象" aria-label="Permalink to &quot;1. 背景与现象&quot;">​</a></h2><p>在现代轻量化运维中，很多团队和个人开发者喜欢使用 Docker Compose 部署 Caddy 作为主网关，反向代理后端的多个微服务（如密码管理服务 Vaultwarden、个人网盘、面板工具等）。</p><p>在一次常规维护后，一个非常诡异的现象出现了：</p><ul><li>访问特定子域名（例如 <code>https://xxx.sss.example.com</code>）时，<strong>偶尔能正常打开（HTTP 200），偶尔却直接报错 404 Not Found</strong>。</li><li>同一台电脑上，在无痕模式打开可能正常，普通窗口报错；或者刷新几次之后忽然变好，过一会儿又变成 404。</li><li>后端服务运行平稳，无任何崩溃或重启记录。</li></ul><p>这种“薛定谔的 404”往往最令人头疼。它既不是完全不通，也不像常规的后端宕机。</p><hr><h2 id="_2-排查定位过程" tabindex="-1">2. 排查定位过程 <a class="header-anchor" href="#_2-排查定位过程" aria-label="Permalink to &quot;2. 排查定位过程&quot;">​</a></h2><h3 id="_2-1-确认后端容器健康状态" tabindex="-1">2.1 确认后端容器健康状态 <a class="header-anchor" href="#_2-1-确认后端容器健康状态" aria-label="Permalink to &quot;2.1 确认后端容器健康状态&quot;">​</a></h3><p>首先直连后端容器暴露的端口，或者进入 Caddy 容器内部直接探测后端：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 从网关容器内部探测后端服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -I</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://host.docker.internal:9445</span></span></code></pre></div><p>返回完全正常的 <code>HTTP/1.1 200 OK</code>，且页面 HTML 完整返回。这说明：<strong>后端应用本身完全健康，问题必然出在反向代理（Caddy）层</strong>。</p><hr><h3 id="_2-2-抓取-404-响应详情" tabindex="-1">2.2 抓取 404 响应详情 <a class="header-anchor" href="#_2-2-抓取-404-响应详情" aria-label="Permalink to &quot;2.2 抓取 404 响应详情&quot;">​</a></h3><p>在服务器上通过命令行直接请求出现故障的域名：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -ik</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://xxx.sss.example.com</span></span></code></pre></div><p>响应头和响应体如下：</p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">HTTP/2 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">404</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">alt-svc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> h3=&quot;:443&quot;; ma=2592000</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">content-type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> text/plain; charset=utf-8</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">server</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Caddy</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">content-length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 13</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">date</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Tue, 10 Nov 2026 01:37:10 GMT</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">404 not found</span></span></code></pre></div><p>注意到关键细节：</p><ol><li><code>server: Caddy</code> —— 404 并不是后端应用返回的，而是 <strong>Caddy 直接生成的</strong>。</li><li>响应体内容是纯文本 <code>404 not found</code>。</li></ol><hr><h3 id="_2-3-查看-caddyfile-配置结构" tabindex="-1">2.3 查看 Caddyfile 配置结构 <a class="header-anchor" href="#_2-3-查看-caddyfile-配置结构" aria-label="Permalink to &quot;2.3 查看 Caddyfile 配置结构&quot;">​</a></h3><p>回看 Caddyfile 中的配置，发现存在一条用于未匹配域名的<strong>泛域名兜底规则</strong>：</p><div class="language-caddy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">caddy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 泛域名兜底 404</span></span>
<span class="line"><span>*.sss.example.com {</span></span>
<span class="line"><span>    tls {</span></span>
<span class="line"><span>        dns cloudflare {env.CF_API_TOKEN}</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    encode gzip zstd</span></span>
<span class="line"><span>    bind 0.0.0.0</span></span>
<span class="line"><span>    respond * &quot;404 not found&quot; 404</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 其它应用站点</span></span>
<span class="line"><span>xx1.sss.example.com {</span></span>
<span class="line"><span>    bind 0.0.0.0</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    reverse_proxy host.docker.internal:58881</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 密码管理站点</span></span>
<span class="line"><span>xxx.sss.example.com {</span></span>
<span class="line"><span>    encode zstd gzip</span></span>
<span class="line"><span>    tls {</span></span>
<span class="line"><span>        dns cloudflare {env.CF_API_TOKEN}</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    header {</span></span>
<span class="line"><span>        ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    reverse_proxy host.docker.internal:9445</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>从 Caddy 的设计规范来看，在同一个上下文中，<strong>具体域名（如 <code>xxx.sss.example.com</code>）的优先级必然高于通配符泛域名（<code>*.s.example.com</code>）</strong>。 为什么这次泛域名规则会把具体的 <code>xxx</code> 拦截掉，而且还是“间歇性拦截”？</p><hr><h3 id="_2-4-查看-caddy-内部的配置转换-json-视角" tabindex="-1">2.4 查看 Caddy 内部的配置转换（JSON 视角） <a class="header-anchor" href="#_2-4-查看-caddy-内部的配置转换-json-视角" aria-label="Permalink to &quot;2.4 查看 Caddy 内部的配置转换（JSON 视角）&quot;">​</a></h3><p>Caddyfile 最终会被适配编译为底层 JSON 配置。执行配置校验并观察内部生成的服务器配置：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">caddy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> validate</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/caddy/Caddyfile</span></span></code></pre></div><p>在输出的底层 JSON 中发现了蛛丝马迹：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;http&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;servers&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;srv1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;listen&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0.0.0.0:443&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;routes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          /* 包含了所有的业务子域名，以及 *.s.example.com (兜底404) */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;srv2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;listen&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;:443&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;routes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          /* 只有 xxx.s.example.com */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>注意两者的 <code>listen</code> 字段：</p><ul><li><code>srv1</code> 监听的是 <code>0.0.0.0:443</code>。</li><li><code>srv2</code> 监听的是 <code>:443</code>。</li></ul><p>仔细比对配置才发现：<strong>整个 Caddyfile 中，其他几十个域名全部写了 <code>bind 0.0.0.0</code>，唯独 <code>xxx.sss.example.com</code> 漏写了这一行！</strong></p><hr><h2 id="_3-底层原理解析-为什么漏写-bind-会导致-偶尔正常" tabindex="-1">3. 底层原理解析：为什么漏写 <code>bind</code> 会导致“偶尔正常”？ <a class="header-anchor" href="#_3-底层原理解析-为什么漏写-bind-会导致-偶尔正常" aria-label="Permalink to &quot;3. 底层原理解析：为什么漏写 \`bind\` 会导致“偶尔正常”？&quot;">​</a></h2><p>这里涉及到两个核心机制的交织作用：<strong>Caddy 的虚拟主机聚合策略</strong>与 <strong>Linux 内核的 <code>SO_REUSEPORT</code> 套接字端口复用机制</strong>。</p><h3 id="_3-1-caddy-的-server-聚合逻辑" tabindex="-1">3.1 Caddy 的 Server 聚合逻辑 <a class="header-anchor" href="#_3-1-caddy-的-server-聚合逻辑" aria-label="Permalink to &quot;3.1 Caddy 的 Server 聚合逻辑&quot;">​</a></h3><p>Caddy 解析 Caddyfile 时，会按照<strong>绑定的监听地址与端口</strong>对站点进行分组：</p><ul><li>指定了 <code>bind 0.0.0.0</code> 的站点（包含泛域名 <code>*.s.example.com</code>）被合并归纳到名为 <code>srv1</code> 的 HTTP Server 中。</li><li>漏写了 <code>bind</code> 的 <code>xxx</code> 采取默认监听（<code>:443</code>），被 Caddy 判定为不同的监听目标，因而单独创建了一个独立的 HTTP Server <code>srv2</code>。</li></ul><hr><h3 id="_3-2-linux-内核-so-reuseport-负载均衡" tabindex="-1">3.2 Linux 内核 <code>SO_REUSEPORT</code> 负载均衡 <a class="header-anchor" href="#_3-2-linux-内核-so-reuseport-负载均衡" aria-label="Permalink to &quot;3.2 Linux 内核 \`SO_REUSEPORT\` 负载均衡&quot;">​</a></h3><p>Caddy 为了保证配置重载（Reload）时不掉连接，底层创建网络 Socket 监听时普遍启用了 <code>SO_REUSEPORT</code> / <code>SO_REUSEADDR</code> 标志。</p><p>在 Linux 网络子系统中：</p><ul><li><code>srv1</code> 监听在 <code>0.0.0.0:443</code>。</li><li><code>srv2</code> 监听在 <code>[::]:443</code>。</li></ul><p>当外界客户端发起 TCP 握手到达 443 端口时，Linux 内核允许两个套接字共享同一个端口，并根据四元组 <code>(源IP, 源端口, 目的IP, 目的端口)</code> 进行哈希计算分发连接：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                    客户端请求 (TCP SYN)</span></span>
<span class="line"><span>                           │</span></span>
<span class="line"><span>                 四元组哈希 (Linux Kernel)</span></span>
<span class="line"><span>                     /           \\</span></span>
<span class="line"><span>                    /             \\</span></span>
<span class="line"><span>        [哈希落入 srv1]        [哈希落入 srv2]</span></span>
<span class="line"><span>       (监听 0.0.0.0:443)       (监听 :443)</span></span>
<span class="line"><span>              │                     │</span></span>
<span class="line"><span>       路由表中无具体 host    路由表中正好有</span></span>
<span class="line"><span>       命中 *.s.example.com   xxx 规则</span></span>
<span class="line"><span>              │                     │</span></span>
<span class="line"><span>          返回 404              返回 200 OK</span></span></code></pre></div><ol><li><strong>当连接被分配到 <code>srv2</code> 时</strong>： <ul><li><code>srv2</code> 内部恰好只有 <code>xxx.s.example.com</code> 的路由，代理成功，<strong>返回 200 OK</strong>。</li></ul></li><li><strong>当连接被分配到 <code>srv1</code> 时</strong>： <ul><li><code>srv1</code> 的路由表中没有 <code>xxx</code>，但存在 <code>*.s.example.com</code> 泛域名规则。</li><li>泛域名规则被成功匹配，触发 <code>respond * &quot;404 not found&quot; 404</code>，<strong>返回 404</strong>。</li></ul></li></ol><hr><h3 id="_3-3-为什么客户端会感知到-偶发-间歇" tabindex="-1">3.3 为什么客户端会感知到“偶发/间歇”？ <a class="header-anchor" href="#_3-3-为什么客户端会感知到-偶发-间歇" aria-label="Permalink to &quot;3.3 为什么客户端会感知到“偶发/间歇”？&quot;">​</a></h3><ul><li><strong>HTTP/2 链路复用（Connection Reuse）</strong>：一旦某个客户端连接落在了 <code>srv2</code> 上，HTTP/2 长连接复用机制会使得后续该域名的所有请求都走同一条 TCP 连接，此时一切正常；而一旦长连接超时断开，或者客户端建立了新的连接，重新哈希后落到 <code>srv1</code>，就会瞬间变成 404。</li><li><strong>客户端源端口变化</strong>：刷新页面如果复用了旧连接就一直正常，一旦重新打开无痕窗口、切换网络（Wi-Fi/移动数据）、更换设备，操作系统分配了新的客户端源端口，四元组哈希结果随之改变，故障再次复现。</li></ul><hr><h2 id="_4-解决方案与最佳实践" tabindex="-1">4. 解决方案与最佳实践 <a class="header-anchor" href="#_4-解决方案与最佳实践" aria-label="Permalink to &quot;4. 解决方案与最佳实践&quot;">​</a></h2><h3 id="_4-1-治标方案-补齐缺失的配置" tabindex="-1">4.1 治标方案：补齐缺失的配置 <a class="header-anchor" href="#_4-1-治标方案-补齐缺失的配置" aria-label="Permalink to &quot;4.1 治标方案：补齐缺失的配置&quot;">​</a></h3><p>最直接的解决方式就是给漏掉的配置块加上 <code>bind 0.0.0.0</code>：</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xxx.s.example.com {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+   bind 0.0.0.0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    encode zstd gzip</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ...</span></span></code></pre></div><p>重启 Caddy 后，所有站点监听统一归并到 <code>srv1</code>。在同一个 Server 内部，精确域名匹配优先级高于泛域名匹配，404 彻底消失。</p><hr><h3 id="_4-2-治本方案-使用-caddy-代码块-snippet-彻底杜绝配置漂移" tabindex="-1">4.2 治本方案：使用 Caddy 代码块（Snippet）彻底杜绝配置漂移 <a class="header-anchor" href="#_4-2-治本方案-使用-caddy-代码块-snippet-彻底杜绝配置漂移" aria-label="Permalink to &quot;4.2 治本方案：使用 Caddy 代码块（Snippet）彻底杜绝配置漂移&quot;">​</a></h3><p>手动在每个域名块中写 <code>bind 0.0.0.0</code>、<code>tls</code>、<code>encode</code>、<code>log</code> 极其容易漏写或产生配置漂移。 Caddy 提供了强大的 <strong>Snippet（代码片段）与参数化引用机制</strong>，可以通过抽取公共块实现极限精简。</p><h4 id="重构后的-caddyfile" tabindex="-1">重构后的 Caddyfile <a class="header-anchor" href="#重构后的-caddyfile" aria-label="Permalink to &quot;重构后的 Caddyfile&quot;">​</a></h4><div class="language-caddy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">caddy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># ==================== 1. 全局与公共代码块定义 ====================</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 基础公共块：绑定IP、启用压缩、DNS-01 泛域名TLS、统一控制台日志</span></span>
<span class="line"><span>(base) {</span></span>
<span class="line"><span>    bind 0.0.0.0</span></span>
<span class="line"><span>    encode zstd gzip</span></span>
<span class="line"><span>    tls {</span></span>
<span class="line"><span>        dns cloudflare {env.CF_API_TOKEN}</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    log {</span></span>
<span class="line"><span>        output stdout</span></span>
<span class="line"><span>        format console</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 认证公共块：统一提取 Basic Auth</span></span>
<span class="line"><span>(auth_admin) {</span></span>
<span class="line"><span>    basic_auth {</span></span>
<span class="line"><span>        admin &quot;$2b$12$...password_hash...&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 快捷反向代理块：引入基础块 + 动态参数代理到后端</span></span>
<span class="line"><span>(proxy) {</span></span>
<span class="line"><span>    import base</span></span>
<span class="line"><span>    reverse_proxy {args[0]}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 快捷带认证反向代理块：引入基础块 + 认证 + 动态参数代理</span></span>
<span class="line"><span>(proxy_auth) {</span></span>
<span class="line"><span>    import base</span></span>
<span class="line"><span>    import auth_admin</span></span>
<span class="line"><span>    reverse_proxy {args[0]}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ==================== 2. 特殊站点与基础服务 ====================</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:80 {</span></span>
<span class="line"><span>    redir * https://{host}{uri} permanent</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 泛域名 404 兜底</span></span>
<span class="line"><span>*.s.example.com {</span></span>
<span class="line"><span>    import base</span></span>
<span class="line"><span>    respond * &quot;404 not found&quot; 404</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 静态资源博客</span></span>
<span class="line"><span>blog.example.com {</span></span>
<span class="line"><span>    import base</span></span>
<span class="line"><span>    root * /blog</span></span>
<span class="line"><span>    file_server</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 多域名共用同一规则</span></span>
<span class="line"><span>s.example.com, index.s.example.com {</span></span>
<span class="line"><span>    import base</span></span>
<span class="line"><span>    import auth_admin</span></span>
<span class="line"><span>    root * /html</span></span>
<span class="line"><span>    file_server</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ==================== 3. 业务服务反向代理 ====================</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 普通反代站点：一行即可搞定</span></span>
<span class="line"><span>openchatui.s.example.com {</span></span>
<span class="line"><span>    import proxy host.docker.internal:58881</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>portainer.s.example.com {</span></span>
<span class="line"><span>    import proxy host.docker.internal:58884</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 带鉴权的反代站点</span></span>
<span class="line"><span>comfyui.s.example.com {</span></span>
<span class="line"><span>    import proxy_auth host.docker.internal:58882</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 具备个性化安全响应头的站点</span></span>
<span class="line"><span>xxx.s.example.com {</span></span>
<span class="line"><span>    import base</span></span>
<span class="line"><span>    header {</span></span>
<span class="line"><span>        Strict-Transport-Security &quot;max-age=31536000; includeSubDomains&quot;</span></span>
<span class="line"><span>        X-Content-Type-Options &quot;nosniff&quot;</span></span>
<span class="line"><span>        X-Frame-Options &quot;SAMEORIGIN&quot;</span></span>
<span class="line"><span>        Referrer-Policy &quot;same-origin&quot;</span></span>
<span class="line"><span>        -Server</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    reverse_proxy host.docker.internal:9445</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_5-总结与经验教训" tabindex="-1">5. 总结与经验教训 <a class="header-anchor" href="#_5-总结与经验教训" aria-label="Permalink to &quot;5. 总结与经验教训&quot;">​</a></h2><ol><li><strong>警惕隐式多 Server 割裂</strong>：在 Caddy 中，任何监听属性（如 <code>bind</code>、端口协议等）的不一致，都会导致 Caddy 在底层生成不同的 Listener。不同 Listener 之间互不共享路由表，无法进行精准匹配覆盖。</li><li><strong>理解内核端口复用行为</strong>：<code>SO_REUSEPORT</code> 虽然带来了平滑重启和多核并发收益，但当多个不同语义的 Server 同时监听同一端口时，内核层面的连接哈希分流会导致极难排查的“偶发性”故障。</li><li><strong>贯彻 DRY（Don&#39;t Repeat Yourself）原则</strong>：在编写反代网关配置时，充分利用 Snippet 抽象共有逻辑（<code>bind</code>、<code>tls</code>、<code>log</code>），既能使配置文件行数缩减 40% 以上，也能从源头上防止复制粘贴造成的低级疏漏。</li></ol>`,65)])])}const u=a(e,[["render",l]]);export{k as __pageData,u as default};
