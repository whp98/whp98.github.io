import{_ as a,c as n,o as p,ag as e}from"./chunks/framework.DWdSXOaE.js";const X=JSON.parse('{"title":"Java G1GC例子带注释","description":"","frontmatter":{},"headers":[],"relativePath":"后端开发/JavaG1GC例子.md","filePath":"后端开发/JavaG1GC例子.md","lastUpdated":1726751071000}'),l={name:"后端开发/JavaG1GC例子.md"};function i(c,s,t,r,o,d){return p(),n("div",null,[...s[0]||(s[0]=[e(`<h1 id="java-g1gc例子带注释" tabindex="-1">Java G1GC例子带注释 <a class="header-anchor" href="#java-g1gc例子带注释" aria-label="Permalink to &quot;Java G1GC例子带注释&quot;">​</a></h1><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># gc设置 beg</span></span>
<span class="line"><span># 初始化堆内存</span></span>
<span class="line"><span>-Xms10G</span></span>
<span class="line"><span># 最大堆内存</span></span>
<span class="line"><span>-Xmx20G</span></span>
<span class="line"><span># 设置新生代大小为5GB</span></span>
<span class="line"><span>-Xmn5G</span></span>
<span class="line"><span># 使用G1垃圾收集器</span></span>
<span class="line"><span>-XX:+UseG1GC</span></span>
<span class="line"><span># 设置GC最大停顿时间为200ms</span></span>
<span class="line"><span>-XX:MaxGCPauseMillis=200</span></span>
<span class="line"><span># 开启字符串去重</span></span>
<span class="line"><span>-XX:+UseStringDeduplication</span></span>
<span class="line"><span># 优化字符串连接</span></span>
<span class="line"><span>-XX:+OptimizeStringConcat</span></span>
<span class="line"><span># 设置垃圾收集线程数为8</span></span>
<span class="line"><span>-XX:ParallelGCThreads=8</span></span>
<span class="line"><span># 设置并发垃圾收集线程数为2</span></span>
<span class="line"><span>-XX:ConcGCThreads=2</span></span>
<span class="line"><span># 使用线程本地分配缓冲区</span></span>
<span class="line"><span>-XX:+UseTLAB</span></span>
<span class="line"><span># 优化NUMA架构的内存分配</span></span>
<span class="line"><span>-XX:+UseNUMA</span></span>
<span class="line"><span># 不自动选择堆区大小</span></span>
<span class="line"><span>-XX:-UseAdaptiveSizePolicy</span></span>
<span class="line"><span># 打印GC详细日志</span></span>
<span class="line"><span>-XX:+PrintGCDetails</span></span>
<span class="line"><span># 打印GC时间戳</span></span>
<span class="line"><span>-XX:+PrintGCTimeStamps</span></span>
<span class="line"><span># 打印GC日期戳</span></span>
<span class="line"><span>-XX:+PrintGCDateStamps</span></span>
<span class="line"><span># 设置GC日志文件的输出路径</span></span>
<span class="line"><span>-Xloggc:gc.log</span></span>
<span class="line"><span>#设置内存dump文件的输出路径</span></span>
<span class="line"><span># -XX:HeapDumpPath=heapdump.hprof</span></span>
<span class="line"><span># -XX:+HeapDumpOnOutOfMemoryError</span></span>
<span class="line"><span># gc设置 end</span></span></code></pre></div>`,2)])])}const m=a(l,[["render",i]]);export{X as __pageData,m as default};
