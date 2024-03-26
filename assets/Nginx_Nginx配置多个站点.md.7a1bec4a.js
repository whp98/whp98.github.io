import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.0cae56c7.js";const d=JSON.parse('{"title":"Nginx配置多个站点","description":"","frontmatter":{},"headers":[],"relativePath":"Nginx/Nginx配置多个站点.md","filePath":"Nginx/Nginx配置多个站点.md","lastUpdated":1709291550000}'),p={name:"Nginx/Nginx配置多个站点.md"},o=l(`<h1 id="nginx配置多个站点" tabindex="-1">Nginx配置多个站点 <a class="header-anchor" href="#nginx配置多个站点" aria-label="Permalink to &quot;Nginx配置多个站点&quot;">​</a></h1><p>配置子站点 <a href="https://jenkins.xxx.xxx" target="_blank" rel="noreferrer">https://jenkins.xxx.xxx</a></p><p>配置文件<code>jenkins.jsfr.xxx.xxx.conf</code> 配置文件路径<code>/etc/nginx/conf.d/</code></p><p>配置文件内容</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">server</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 服务器端口使用443，开启ssl, 这里ssl就是上面安装的ssl模块</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> listen </span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">443</span><span style="color:#E1E4E8;"> ssl;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 域名，多个以空格分开</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> server_name </span><span style="color:#E1E4E8;"> jenkins.xxx.xxx;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># ssl证书地址</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_certificate </span><span style="color:#E1E4E8;">    jenkins.xxx.xxx.pem;  </span><span style="color:#6A737D;"># pem文件的路径</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_certificate_key </span><span style="color:#E1E4E8;"> jenkins.xxx.xxx.key; </span><span style="color:#6A737D;"># key文件的路径</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># ssl验证相关配置</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_session_timeout </span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5m</span><span style="color:#E1E4E8;">;    </span><span style="color:#6A737D;">#缓存有效期</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_ciphers </span><span style="color:#E1E4E8;">ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    </span><span style="color:#6A737D;">#加密算法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;    #安全链接可选的加密协议</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_protocols </span><span style="color:#E1E4E8;"> TLSv1.3;    </span><span style="color:#6A737D;">#安全链接可选的加密协议</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_prefer_server_ciphers </span><span style="color:#E1E4E8;">on;   </span><span style="color:#6A737D;">#使用服务器端的首选算法</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">/ </span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_pass </span><span style="color:#E1E4E8;">http://localhost:12345;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_set_header </span><span style="color:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_set_header </span><span style="color:#E1E4E8;">X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_set_header </span><span style="color:#E1E4E8;">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_set_header </span><span style="color:#E1E4E8;">X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 服务器端口使用443，开启ssl, 这里ssl就是上面安装的ssl模块</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> listen </span><span style="color:#24292E;"> </span><span style="color:#005CC5;">443</span><span style="color:#24292E;"> ssl;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 域名，多个以空格分开</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> server_name </span><span style="color:#24292E;"> jenkins.xxx.xxx;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># ssl证书地址</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_certificate </span><span style="color:#24292E;">    jenkins.xxx.xxx.pem;  </span><span style="color:#6A737D;"># pem文件的路径</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_certificate_key </span><span style="color:#24292E;"> jenkins.xxx.xxx.key; </span><span style="color:#6A737D;"># key文件的路径</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># ssl验证相关配置</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_session_timeout </span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5m</span><span style="color:#24292E;">;    </span><span style="color:#6A737D;">#缓存有效期</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_ciphers </span><span style="color:#24292E;">ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    </span><span style="color:#6A737D;">#加密算法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;    #安全链接可选的加密协议</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_protocols </span><span style="color:#24292E;"> TLSv1.3;    </span><span style="color:#6A737D;">#安全链接可选的加密协议</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_prefer_server_ciphers </span><span style="color:#24292E;">on;   </span><span style="color:#6A737D;">#使用服务器端的首选算法</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">location</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">/ </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_pass </span><span style="color:#24292E;">http://localhost:12345;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_set_header </span><span style="color:#24292E;">Host $host;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_set_header </span><span style="color:#24292E;">X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_set_header </span><span style="color:#24292E;">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_set_header </span><span style="color:#24292E;">X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,5),e=[o];function c(r,t,E,y,i,x){return n(),a("div",null,e)}const A=s(p,[["render",c]]);export{d as __pageData,A as default};
