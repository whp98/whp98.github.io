import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.0cae56c7.js";const d=JSON.parse('{"title":"Nginx做cdn缓存","description":"","frontmatter":{},"headers":[],"relativePath":"Nginx/Nginx做cdn缓存.md","filePath":"Nginx/Nginx做cdn缓存.md","lastUpdated":1709291550000}'),l={name:"Nginx/Nginx做cdn缓存.md"},o=p(`<h1 id="nginx做cdn缓存" tabindex="-1">Nginx做cdn缓存 <a class="header-anchor" href="#nginx做cdn缓存" aria-label="Permalink to &quot;Nginx做cdn缓存&quot;">​</a></h1><p>配置文件如下</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 用户请求端口28080,反向代理转发到8080端口,并为请求设置缓存</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">proxy_cache_key </span><span style="color:#E1E4E8;">$host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#6A737D;"># 定义缓存区域</span></span>
<span class="line"><span style="color:#F97583;">proxy_cache_path </span><span style="color:#9ECBFF;">&quot;E:</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">DEV_ENV</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">nginx-1.21.6-blog</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">cache4h&quot;</span><span style="color:#E1E4E8;"> levels=1:2 keys_zone=cache_zone:256m max_size=2G inactive=4h use_temp_path=off;</span></span>
<span class="line"><span style="color:#F97583;">proxy_cache_path </span><span style="color:#9ECBFF;">&quot;E:</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">DEV_ENV</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">nginx-1.21.6-blog</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">cache1m&quot;</span><span style="color:#E1E4E8;"> levels=1:2 keys_zone=cache_zone_1m:256m max_size=2G inactive=1m use_temp_path=off;</span></span>
<span class="line"><span style="color:#6A737D;"># 服务器分组,如果有多台实例可以添加实现集群</span></span>
<span class="line"><span style="color:#F97583;">upstream</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">backend </span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">server</span><span style="color:#E1E4E8;"> 127.0.0.1:8080;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">server</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;"> listen </span><span style="color:#E1E4E8;">28080;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 使用 .cache_m 的url后缀实现1分钟缓存</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 例如：http://127.0.0.1:28080/api/public/stock_zh_index_spot.cache_m</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;"> </span><span style="color:#DBEDFF;">^/(.*)\\.cache_m$ </span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> add_header </span><span style="color:#E1E4E8;">X-Cache $upstream_cache_status;</span><span style="color:#6A737D;">#将缓存是否命中的结果返回</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> add_header </span><span style="color:#E1E4E8;">X-Via $server_addr;</span><span style="color:#6A737D;">#将缓存服务器IP返回</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 启用缓存,缓存到 keys_zone 指定的区域,空间大小为 1G</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> proxy_cache </span><span style="color:#E1E4E8;">cache_zone_1m; </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> proxy_cache_key </span><span style="color:#E1E4E8;">$host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> expires </span><span style="color:#E1E4E8;">1m;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 字符集</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> add_header </span><span style="color:#E1E4E8;">Content-Type </span><span style="color:#9ECBFF;">&quot;application/json; charset=utf-8&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> add_header </span><span style="color:#E1E4E8;">x-1 </span><span style="color:#9ECBFF;">&quot;cache_m&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 缓存时间</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> proxy_cache_valid </span><span style="color:#E1E4E8;">any </span><span style="color:#79B8FF;">1m</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> proxy_ignore_headers </span><span style="color:#E1E4E8;">X-Accel-Expires Expires Cache-Control Set-Cookie;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">rewrite</span><span style="color:#E1E4E8;"> </span><span style="color:#DBEDFF;">^/(.*)\\.cache_m$</span><span style="color:#E1E4E8;"> /$1 </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> proxy_pass </span><span style="color:#E1E4E8;">http://backend;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 默认4小时缓存</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 例如：http://127.0.0.1:28080/api/public/stock_zh_index_spot</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">/ </span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> add_header </span><span style="color:#E1E4E8;">X-Cache $upstream_cache_status;</span><span style="color:#6A737D;">#将缓存是否命中的结果返回</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> add_header </span><span style="color:#E1E4E8;">X-Via $server_addr;</span><span style="color:#6A737D;">#将缓存服务器IP返回</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 启用缓存,缓存到 keys_zone 指定的区域,空间大小为 1G</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> proxy_cache </span><span style="color:#E1E4E8;">cache_zone; </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> proxy_cache_key </span><span style="color:#E1E4E8;">$host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> expires </span><span style="color:#E1E4E8;">4h;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 字符集</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> add_header </span><span style="color:#E1E4E8;">Content-Type </span><span style="color:#9ECBFF;">&quot;application/json; charset=utf-8&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> add_header </span><span style="color:#E1E4E8;">x-1 </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 根据响应代码设置时间</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> proxy_cache_valid </span><span style="color:#E1E4E8;">200 </span><span style="color:#79B8FF;">302</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">4h</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> proxy_cache_valid </span><span style="color:#E1E4E8;">301 </span><span style="color:#79B8FF;">4h</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> proxy_cache_valid </span><span style="color:#E1E4E8;">any </span><span style="color:#79B8FF;">4h</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> proxy_ignore_headers </span><span style="color:#E1E4E8;">X-Accel-Expires Expires Cache-Control Set-Cookie;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> proxy_pass </span><span style="color:#E1E4E8;">http://backend;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 用户请求端口28080,反向代理转发到8080端口,并为请求设置缓存</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">proxy_cache_key </span><span style="color:#24292E;">$host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#6A737D;"># 定义缓存区域</span></span>
<span class="line"><span style="color:#D73A49;">proxy_cache_path </span><span style="color:#032F62;">&quot;E:</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">DEV_ENV</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">nginx-1.21.6-blog</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">cache4h&quot;</span><span style="color:#24292E;"> levels=1:2 keys_zone=cache_zone:256m max_size=2G inactive=4h use_temp_path=off;</span></span>
<span class="line"><span style="color:#D73A49;">proxy_cache_path </span><span style="color:#032F62;">&quot;E:</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">DEV_ENV</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">nginx-1.21.6-blog</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">cache1m&quot;</span><span style="color:#24292E;"> levels=1:2 keys_zone=cache_zone_1m:256m max_size=2G inactive=1m use_temp_path=off;</span></span>
<span class="line"><span style="color:#6A737D;"># 服务器分组,如果有多台实例可以添加实现集群</span></span>
<span class="line"><span style="color:#D73A49;">upstream</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">backend </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">server</span><span style="color:#24292E;"> 127.0.0.1:8080;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;"> listen </span><span style="color:#24292E;">28080;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 使用 .cache_m 的url后缀实现1分钟缓存</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 例如：http://127.0.0.1:28080/api/public/stock_zh_index_spot.cache_m</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">location</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">~</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^/(.*)\\.cache_m$ </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> add_header </span><span style="color:#24292E;">X-Cache $upstream_cache_status;</span><span style="color:#6A737D;">#将缓存是否命中的结果返回</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> add_header </span><span style="color:#24292E;">X-Via $server_addr;</span><span style="color:#6A737D;">#将缓存服务器IP返回</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 启用缓存,缓存到 keys_zone 指定的区域,空间大小为 1G</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> proxy_cache </span><span style="color:#24292E;">cache_zone_1m; </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> proxy_cache_key </span><span style="color:#24292E;">$host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> expires </span><span style="color:#24292E;">1m;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 字符集</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> add_header </span><span style="color:#24292E;">Content-Type </span><span style="color:#032F62;">&quot;application/json; charset=utf-8&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> add_header </span><span style="color:#24292E;">x-1 </span><span style="color:#032F62;">&quot;cache_m&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 缓存时间</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> proxy_cache_valid </span><span style="color:#24292E;">any </span><span style="color:#005CC5;">1m</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> proxy_ignore_headers </span><span style="color:#24292E;">X-Accel-Expires Expires Cache-Control Set-Cookie;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">rewrite</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^/(.*)\\.cache_m$</span><span style="color:#24292E;"> /$1 </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> proxy_pass </span><span style="color:#24292E;">http://backend;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 默认4小时缓存</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 例如：http://127.0.0.1:28080/api/public/stock_zh_index_spot</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">location</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">/ </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> add_header </span><span style="color:#24292E;">X-Cache $upstream_cache_status;</span><span style="color:#6A737D;">#将缓存是否命中的结果返回</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> add_header </span><span style="color:#24292E;">X-Via $server_addr;</span><span style="color:#6A737D;">#将缓存服务器IP返回</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 启用缓存,缓存到 keys_zone 指定的区域,空间大小为 1G</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> proxy_cache </span><span style="color:#24292E;">cache_zone; </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> proxy_cache_key </span><span style="color:#24292E;">$host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> expires </span><span style="color:#24292E;">4h;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 字符集</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> add_header </span><span style="color:#24292E;">Content-Type </span><span style="color:#032F62;">&quot;application/json; charset=utf-8&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> add_header </span><span style="color:#24292E;">x-1 </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 根据响应代码设置时间</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> proxy_cache_valid </span><span style="color:#24292E;">200 </span><span style="color:#005CC5;">302</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">4h</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> proxy_cache_valid </span><span style="color:#24292E;">301 </span><span style="color:#005CC5;">4h</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> proxy_cache_valid </span><span style="color:#24292E;">any </span><span style="color:#005CC5;">4h</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> proxy_ignore_headers </span><span style="color:#24292E;">X-Accel-Expires Expires Cache-Control Set-Cookie;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> proxy_pass </span><span style="color:#24292E;">http://backend;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,3),e=[o];function c(t,r,E,y,i,_){return a(),n("div",null,e)}const F=s(l,[["render",c]]);export{d as __pageData,F as default};
