import{_ as a,c as i,o as n,ag as l}from"./chunks/framework.Ds6Eueu6.js";const g=JSON.parse('{"title":"SeaTunnel安装部署","description":"","frontmatter":{},"headers":[],"relativePath":"数据库/seatunnel/SeaTunnel安装部署.md","filePath":"数据库/seatunnel/SeaTunnel安装部署.md","lastUpdated":1744686404000}'),e={name:"数据库/seatunnel/SeaTunnel安装部署.md"};function p(h,s,t,k,E,r){return n(),i("div",null,s[0]||(s[0]=[l(`<h1 id="seatunnel安装部署" tabindex="-1">SeaTunnel安装部署 <a class="header-anchor" href="#seatunnel安装部署" aria-label="Permalink to &quot;SeaTunnel安装部署&quot;">​</a></h1><h2 id="参考文档" tabindex="-1">参考文档 <a class="header-anchor" href="#参考文档" aria-label="Permalink to &quot;参考文档&quot;">​</a></h2><p><a href="https://seatunnel.apache.org/docs/" target="_blank" rel="noreferrer">https://seatunnel.apache.org/docs/</a></p><p><a href="https://seatunnel.apache.org/zh-CN/docs/2.3.10/about/" target="_blank" rel="noreferrer">https://seatunnel.apache.org/zh-CN/docs/2.3.10/about/</a></p><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>SeaTunnel 是一款非常易用、超高性能、支持海量数据实时同步的分布式数据集成平台，每天可以稳定高效地同步数百亿条数据，目前已有近百家公司投入生产使用。</p><h2 id="优点" tabindex="-1">优点 <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点&quot;">​</a></h2><p>支持的数据库多,支持oracle、mysql还包括达梦、kingbase、oceanbase等国产数据库。</p><h2 id="具体操作" tabindex="-1">具体操作 <a class="header-anchor" href="#具体操作" aria-label="Permalink to &quot;具体操作&quot;">​</a></h2><p>参考这部分 <a href="https://seatunnel.apache.org/zh-CN/docs/start-v2/docker/" target="_blank" rel="noreferrer">https://seatunnel.apache.org/zh-CN/docs/start-v2/docker/</a></p><p>docker-compose.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">services</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  master</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">apache/seatunnel</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">seatunnel_master</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    environment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ST_DOCKER_MEMBER_LIST=172.16.0.2,172.16.0.3,172.16.0.4</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    entrypoint</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      /bin/sh -c &quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      /opt/seatunnel/bin/seatunnel-cluster.sh -r master</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;    </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;5801:5801&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      seatunnel_network</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        ipv4_address</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">172.16.0.2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  worker1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">apache/seatunnel</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">seatunnel_worker_1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    environment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ST_DOCKER_MEMBER_LIST=172.16.0.2,172.16.0.3,172.16.0.4</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    entrypoint</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      /bin/sh -c &quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      /opt/seatunnel/bin/seatunnel-cluster.sh -r worker</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot; </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    depends_on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">master</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      seatunnel_network</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        ipv4_address</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">172.16.0.3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  worker2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">apache/seatunnel</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">seatunnel_worker_2</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    environment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ST_DOCKER_MEMBER_LIST=172.16.0.2,172.16.0.3,172.16.0.4</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    entrypoint</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      /bin/sh -c &quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      /opt/seatunnel/bin/seatunnel-cluster.sh -r worker</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot; </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    depends_on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">master</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      seatunnel_network</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        ipv4_address</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">172.16.0.4</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">networks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  seatunnel_network</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    driver</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bridge</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ipam</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">subnet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">172.16.0.0/24</span></span></code></pre></div>`,12)]))}const c=a(e,[["render",p]]);export{g as __pageData,c as default};
