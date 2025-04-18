import{_ as i,c as a,o as p,ag as e}from"./chunks/framework.Ds6Eueu6.js";const c=JSON.parse('{"title":"Mapper文件idea爆红解决","description":"","frontmatter":{},"headers":[],"relativePath":"后端开发/mybatis/Mapper文件idea爆红解决.md","filePath":"后端开发/mybatis/Mapper文件idea爆红解决.md","lastUpdated":1726751071000}'),n={name:"后端开发/mybatis/Mapper文件idea爆红解决.md"};function l(t,s,h,k,r,d){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="mapper文件idea爆红解决" tabindex="-1">Mapper文件idea爆红解决 <a class="header-anchor" href="#mapper文件idea爆红解决" aria-label="Permalink to &quot;Mapper文件idea爆红解决&quot;">​</a></h1><p>本文参考<a href="https://wenku.baidu.com/view/fbfc1d6a306c1eb91a37f111f18583d049640fe9.html" target="_blank" rel="noreferrer">知识拂柳玉龙00</a></p><p>解决<code>@Autowired</code>爆红的⽅案有四个：</p><ol><li><p>mapper加⼊@Mapper注解（启动类可省去@MapperScan）,因为@Mapper的⽂件会被去⾃动扫描注⼊，但是需要全体Mapper⽂件都加</p></li><li><p>mapper加⼊@Repository注解（启动类必须加@MapperScan）</p></li><li><p>mapper加⼊@Component注解（启动类必须加@MapperScan）</p></li><li><p>改@Autowired为@Resource,但程序运⾏报不报错还取决于mapper注⼊正确与否（看mapper⽂件⽤了什么注解以及启动类是否配了@MapperScan）</p></li></ol><p>简单来说就是两种情况：</p><ul><li>启动类配置了@MapperScan且路径正确，mapper接口可以不配任何注解（当然你也可以随意写上@Mapper，@Respository,@Component注解，不会有任何影响）</li><li>启动类未配置了@MapperScan，则Mapper接口必须配置@Mapper注解</li></ul><p>我的解决方案如下：</p><p>启动类加@MapperScan 配合使⽤ @Resource （替换@Autowired）</p><p>将注入组件的方式改成通过setter方式是比较推荐的做法，最后贴上我的配置如下​：</p><p>启动类</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SpringBootApplication</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*这里的mapper扫描路径不要扫描到通用mapper*/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">MapperScan</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">basePackages</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;xyz.intellij.shopdev.mapper.custom&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Application</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        SpringApplication.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Application.class, args);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>使用mapper</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Service</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> UserServiceImpl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> implements</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> UserService</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> UsersMapper usersMapper;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Resource</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setUsersMapper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(UsersMapper </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">usersMapper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.usersMapper </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> usersMapper;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">... ...</span></span></code></pre></div>`,13)]))}const g=i(n,[["render",l]]);export{c as __pageData,g as default};
