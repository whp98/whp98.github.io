import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.0cae56c7.js";const C=JSON.parse('{"title":"Java G1GC例子带注释","description":"","frontmatter":{},"headers":[],"relativePath":"Java语言相关/JavaG1GC例子.md","filePath":"Java语言相关/JavaG1GC例子.md","lastUpdated":1693236612000}'),p={name:"Java语言相关/JavaG1GC例子.md"},l=e(`<h1 id="java-g1gc例子带注释" tabindex="-1">Java G1GC例子带注释 <a class="header-anchor" href="#java-g1gc例子带注释" aria-label="Permalink to &quot;Java G1GC例子带注释&quot;">​</a></h1><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># gc设置 beg</span></span>
<span class="line"><span style="color:#e1e4e8;"># 初始化堆内存</span></span>
<span class="line"><span style="color:#e1e4e8;">-Xms10G</span></span>
<span class="line"><span style="color:#e1e4e8;"># 最大堆内存</span></span>
<span class="line"><span style="color:#e1e4e8;">-Xmx20G</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置新生代大小为5GB</span></span>
<span class="line"><span style="color:#e1e4e8;">-Xmn5G</span></span>
<span class="line"><span style="color:#e1e4e8;"># 使用G1垃圾收集器</span></span>
<span class="line"><span style="color:#e1e4e8;">-XX:+UseG1GC</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置GC最大停顿时间为200ms</span></span>
<span class="line"><span style="color:#e1e4e8;">-XX:MaxGCPauseMillis=200</span></span>
<span class="line"><span style="color:#e1e4e8;"># 开启字符串去重</span></span>
<span class="line"><span style="color:#e1e4e8;">-XX:+UseStringDeduplication</span></span>
<span class="line"><span style="color:#e1e4e8;"># 优化字符串连接</span></span>
<span class="line"><span style="color:#e1e4e8;">-XX:+OptimizeStringConcat</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置垃圾收集线程数为8</span></span>
<span class="line"><span style="color:#e1e4e8;">-XX:ParallelGCThreads=8</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置并发垃圾收集线程数为2</span></span>
<span class="line"><span style="color:#e1e4e8;">-XX:ConcGCThreads=2</span></span>
<span class="line"><span style="color:#e1e4e8;"># 使用线程本地分配缓冲区</span></span>
<span class="line"><span style="color:#e1e4e8;">-XX:+UseTLAB</span></span>
<span class="line"><span style="color:#e1e4e8;"># 优化NUMA架构的内存分配</span></span>
<span class="line"><span style="color:#e1e4e8;">-XX:+UseNUMA</span></span>
<span class="line"><span style="color:#e1e4e8;"># 不自动选择堆区大小</span></span>
<span class="line"><span style="color:#e1e4e8;">-XX:-UseAdaptiveSizePolicy</span></span>
<span class="line"><span style="color:#e1e4e8;"># 打印GC详细日志</span></span>
<span class="line"><span style="color:#e1e4e8;">-XX:+PrintGCDetails</span></span>
<span class="line"><span style="color:#e1e4e8;"># 打印GC时间戳</span></span>
<span class="line"><span style="color:#e1e4e8;">-XX:+PrintGCTimeStamps</span></span>
<span class="line"><span style="color:#e1e4e8;"># 打印GC日期戳</span></span>
<span class="line"><span style="color:#e1e4e8;">-XX:+PrintGCDateStamps</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置GC日志文件的输出路径</span></span>
<span class="line"><span style="color:#e1e4e8;">-Xloggc:gc.log</span></span>
<span class="line"><span style="color:#e1e4e8;">#设置内存dump文件的输出路径</span></span>
<span class="line"><span style="color:#e1e4e8;"># -XX:HeapDumpPath=heapdump.hprof</span></span>
<span class="line"><span style="color:#e1e4e8;"># -XX:+HeapDumpOnOutOfMemoryError</span></span>
<span class="line"><span style="color:#e1e4e8;"># gc设置 end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># gc设置 beg</span></span>
<span class="line"><span style="color:#24292e;"># 初始化堆内存</span></span>
<span class="line"><span style="color:#24292e;">-Xms10G</span></span>
<span class="line"><span style="color:#24292e;"># 最大堆内存</span></span>
<span class="line"><span style="color:#24292e;">-Xmx20G</span></span>
<span class="line"><span style="color:#24292e;"># 设置新生代大小为5GB</span></span>
<span class="line"><span style="color:#24292e;">-Xmn5G</span></span>
<span class="line"><span style="color:#24292e;"># 使用G1垃圾收集器</span></span>
<span class="line"><span style="color:#24292e;">-XX:+UseG1GC</span></span>
<span class="line"><span style="color:#24292e;"># 设置GC最大停顿时间为200ms</span></span>
<span class="line"><span style="color:#24292e;">-XX:MaxGCPauseMillis=200</span></span>
<span class="line"><span style="color:#24292e;"># 开启字符串去重</span></span>
<span class="line"><span style="color:#24292e;">-XX:+UseStringDeduplication</span></span>
<span class="line"><span style="color:#24292e;"># 优化字符串连接</span></span>
<span class="line"><span style="color:#24292e;">-XX:+OptimizeStringConcat</span></span>
<span class="line"><span style="color:#24292e;"># 设置垃圾收集线程数为8</span></span>
<span class="line"><span style="color:#24292e;">-XX:ParallelGCThreads=8</span></span>
<span class="line"><span style="color:#24292e;"># 设置并发垃圾收集线程数为2</span></span>
<span class="line"><span style="color:#24292e;">-XX:ConcGCThreads=2</span></span>
<span class="line"><span style="color:#24292e;"># 使用线程本地分配缓冲区</span></span>
<span class="line"><span style="color:#24292e;">-XX:+UseTLAB</span></span>
<span class="line"><span style="color:#24292e;"># 优化NUMA架构的内存分配</span></span>
<span class="line"><span style="color:#24292e;">-XX:+UseNUMA</span></span>
<span class="line"><span style="color:#24292e;"># 不自动选择堆区大小</span></span>
<span class="line"><span style="color:#24292e;">-XX:-UseAdaptiveSizePolicy</span></span>
<span class="line"><span style="color:#24292e;"># 打印GC详细日志</span></span>
<span class="line"><span style="color:#24292e;">-XX:+PrintGCDetails</span></span>
<span class="line"><span style="color:#24292e;"># 打印GC时间戳</span></span>
<span class="line"><span style="color:#24292e;">-XX:+PrintGCTimeStamps</span></span>
<span class="line"><span style="color:#24292e;"># 打印GC日期戳</span></span>
<span class="line"><span style="color:#24292e;">-XX:+PrintGCDateStamps</span></span>
<span class="line"><span style="color:#24292e;"># 设置GC日志文件的输出路径</span></span>
<span class="line"><span style="color:#24292e;">-Xloggc:gc.log</span></span>
<span class="line"><span style="color:#24292e;">#设置内存dump文件的输出路径</span></span>
<span class="line"><span style="color:#24292e;"># -XX:HeapDumpPath=heapdump.hprof</span></span>
<span class="line"><span style="color:#24292e;"># -XX:+HeapDumpOnOutOfMemoryError</span></span>
<span class="line"><span style="color:#24292e;"># gc设置 end</span></span></code></pre></div>`,2),o=[l];function c(t,i,r,y,X,G){return n(),a("div",null,o)}const m=s(p,[["render",c]]);export{C as __pageData,m as default};
