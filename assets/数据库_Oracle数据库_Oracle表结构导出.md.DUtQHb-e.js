import{_ as i,c as a,o as h,ag as k}from"./chunks/framework.Ds6Eueu6.js";const d=JSON.parse('{"title":"Oracle表结构导出","description":"","frontmatter":{},"headers":[],"relativePath":"数据库/Oracle数据库/Oracle表结构导出.md","filePath":"数据库/Oracle数据库/Oracle表结构导出.md","lastUpdated":1717397989000}'),t={name:"数据库/Oracle数据库/Oracle表结构导出.md"};function n(l,s,p,E,e,r){return h(),a("div",null,s[0]||(s[0]=[k(`<h1 id="oracle表结构导出" tabindex="-1">Oracle表结构导出 <a class="header-anchor" href="#oracle表结构导出" aria-label="Permalink to &quot;Oracle表结构导出&quot;">​</a></h1><p>这是一个工具脚本</p><p>将TABLE_NAME替换成想要导出的表名即可导出</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> /*t.OWNER*/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;DB&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TABLE_NAME</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">COLUMN_ID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">COLUMN_NAME</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     , REGEXP_REPLACE(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">t1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">COMMENTS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;[\\(\\)\\（\\）\\的\\ \\n]&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> comments, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">data_type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;(&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">data_length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;)&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;数据类型&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     , </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CASE</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PK</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> WHEN</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Y&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> THEN</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PK</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ELSE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;N&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> END</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">     AS</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;是否主键&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nullable</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;是允许为空&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;N&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;代码表&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;N&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;代码表引用&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ALL_tab_columns t</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         LEFT JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ALL_col_comments t1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TABLE_NAME</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TABLE_NAME</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AND</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">COLUMN_NAME</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">COLUMN_NAME</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         LEFT JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> cu</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">OWNER</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CU</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TABLE_NAME</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CU</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">COLUMN_NAME</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Y&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PK</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ALL_cons_columns cu, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ALL_constraints</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> au</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    WHERE</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> cu</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">constraint_name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> au</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">constraint_name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AND</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> au</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">constraint_type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;P&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) t2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                   ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TABLE_NAME</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TABLE_NAME</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AND</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">OWNER</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">OWNER</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AND</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">COLUMN_NAME</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">COLUMN_NAME</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WHERE</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> UPPER</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Table_Name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> UPPER</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;TABLE_NAME&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ORDER BY</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">COLUMN_ID</span></span></code></pre></div>`,4)]))}const g=i(t,[["render",n]]);export{d as __pageData,g as default};
