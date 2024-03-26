import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.0cae56c7.js";const u=JSON.parse('{"title":"如何发布jar包到Maven Central仓库","description":"","frontmatter":{},"headers":[],"relativePath":"Java语言相关/Spring/how-to-public-jar-to-maven-central.md","filePath":"Java语言相关/Spring/how-to-public-jar-to-maven-central.md","lastUpdated":1706176680000}'),l={name:"Java语言相关/Spring/how-to-public-jar-to-maven-central.md"},o=p(`<h1 id="如何发布jar包到maven-central仓库" tabindex="-1">如何发布jar包到Maven Central仓库 <a class="header-anchor" href="#如何发布jar包到maven-central仓库" aria-label="Permalink to &quot;如何发布jar包到Maven Central仓库&quot;">​</a></h1><p>本文参考 <a href="https://blog.csdn.net/u011943534/article/details/120168285" target="_blank" rel="noreferrer">https://blog.csdn.net/u011943534/article/details/120168285</a></p><h2 id="_1-注册issues-sonatype-org并开工单" tabindex="-1">1.注册issues.sonatype.org并开工单 <a class="header-anchor" href="#_1-注册issues-sonatype-org并开工单" aria-label="Permalink to &quot;1.注册issues.sonatype.org并开工单&quot;">​</a></h2><p><a href="https://issues.sonatype.org/secure/Signup!default.jspa" target="_blank" rel="noreferrer">https://issues.sonatype.org/secure/Signup!default.jspa</a></p><p>账号注册好之后点击创建，Project选择 社区支持，Issue Type选择New Project</p><p>输入你的项目信息即可</p><p>需要注意的是公司或者个人的小网站需要创建一个可以验证所有权的dns解析。</p><p>如果使用github或gitee会要求创建一个临时空仓库验证账号所有权。</p><p>过程中需要和机器人进行对话，所以处理速度还是很快的。</p><p><a href="https://issues.sonatype.org/browse/OSSRH-98551" target="_blank" rel="noreferrer">https://issues.sonatype.org/browse/OSSRH-98551</a> 可以查看我的对话</p><p>验证所有权之后就可以使用刚注册的用户和密码登录<a href="https://s01.oss.sonatype.org/" target="_blank" rel="noreferrer">仓库管理器</a></p><h2 id="_2-使用仓库管理器生成user-token" tabindex="-1">2.使用仓库管理器生成user token <a class="header-anchor" href="#_2-使用仓库管理器生成user-token" aria-label="Permalink to &quot;2.使用仓库管理器生成user token&quot;">​</a></h2><p>右上角用户名-&gt;profile-&gt;user token</p><p>就可以获取用于发布项目的用户名和密码了。</p><h2 id="_3-设置windows的opengpg" tabindex="-1">3.设置windows的opengpg <a class="header-anchor" href="#_3-设置windows的opengpg" aria-label="Permalink to &quot;3.设置windows的opengpg&quot;">​</a></h2><p>下载 <a href="https://gpg4win.org/thanks-for-download.html" target="_blank" rel="noreferrer">https://gpg4win.org/thanks-for-download.html</a> 直接安装</p><p>输入以下命令生成gpg密钥对</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">gpg </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">gen</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">key</span></span>
<span class="line"><span style="color:#6A737D;"># 生成完毕后可以使用查看8位数的密钥ID</span></span>
<span class="line"><span style="color:#E1E4E8;">gpg </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">list</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">keys </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">keyid</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">format short</span></span>
<span class="line"><span style="color:#6A737D;"># 导出gradle签名使用的私钥文件</span></span>
<span class="line"><span style="color:#E1E4E8;">gpg </span><span style="color:#F97583;">--</span><span style="color:#79B8FF;">export-secret</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">keys </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">o X:\\MY_PGP\\secring.gpg</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">gpg </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">gen</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">key</span></span>
<span class="line"><span style="color:#6A737D;"># 生成完毕后可以使用查看8位数的密钥ID</span></span>
<span class="line"><span style="color:#24292E;">gpg </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">list</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">keys </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">keyid</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">format short</span></span>
<span class="line"><span style="color:#6A737D;"># 导出gradle签名使用的私钥文件</span></span>
<span class="line"><span style="color:#24292E;">gpg </span><span style="color:#D73A49;">--</span><span style="color:#005CC5;">export-secret</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">keys </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">o X:\\MY_PGP\\secring.gpg</span></span></code></pre></div><h2 id="_4-设置gradle项目的脚本" tabindex="-1">4.设置gradle项目的脚本 <a class="header-anchor" href="#_4-设置gradle项目的脚本" aria-label="Permalink to &quot;4.设置gradle项目的脚本&quot;">​</a></h2><p>build.gradle</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">plugins {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id </span><span style="color:#9ECBFF;">&#39;java-library&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    id </span><span style="color:#9ECBFF;">&#39;maven-publish&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    id </span><span style="color:#9ECBFF;">&#39;signing&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">group </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;io.github.whp98&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">version </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;1.1.9&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">repositories {</span></span>
<span class="line"><span style="color:#E1E4E8;">    mavenLocal()</span></span>
<span class="line"><span style="color:#E1E4E8;">    mavenCentral()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getRepositoryUsername</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> hasProperty(</span><span style="color:#9ECBFF;">&quot;sonatypeUsername&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> sonatypeUsername </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getRepositoryPassword</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> hasProperty(</span><span style="color:#9ECBFF;">&quot;sonatypePassword&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> sonatypePassword </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">dependencies {</span></span>
<span class="line"><span style="color:#E1E4E8;">    implementation(</span><span style="color:#9ECBFF;">&#39;org.tomlj:tomlj:1.1.0&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    compileOnly(</span><span style="color:#9ECBFF;">&quot;org.springframework.boot:spring-boot:2.7.18&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    testImplementation(</span><span style="color:#9ECBFF;">&quot;org.springframework.boot:spring-boot-starter-test:2.7.18&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    implementation(</span><span style="color:#9ECBFF;">&quot;com.google.code.findbugs:annotations:3.0.1&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">tasks</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">withType(</span><span style="color:#F97583;">JavaCompile</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">configureEach {</span></span>
<span class="line"><span style="color:#E1E4E8;">    options</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">encoding </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">tasks</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">withType(</span><span style="color:#F97583;">Javadoc</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">configureEach {</span></span>
<span class="line"><span style="color:#E1E4E8;">    options</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">encoding </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">test {</span></span>
<span class="line"><span style="color:#E1E4E8;">    useJUnitPlatform()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">jar {</span></span>
<span class="line"><span style="color:#E1E4E8;">    enabled </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    archiveClassifier </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//jar包名禁止生成plain</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">tasks</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">register(</span><span style="color:#9ECBFF;">&#39;sourcesJar&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Jar</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    from sourceSets</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">main</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">allJava</span></span>
<span class="line"><span style="color:#E1E4E8;">    archiveClassifier </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;sources&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">tasks</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">register(</span><span style="color:#9ECBFF;">&#39;javadocJar&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Jar</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    from javadoc</span></span>
<span class="line"><span style="color:#E1E4E8;">    archiveClassifier </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;javadoc&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">//java {</span></span>
<span class="line"><span style="color:#6A737D;">//    withJavadocJar()</span></span>
<span class="line"><span style="color:#6A737D;">//    withSourcesJar()</span></span>
<span class="line"><span style="color:#6A737D;">//}</span></span>
<span class="line"><span style="color:#E1E4E8;">sourceSets</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">main</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">resources</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">srcDirs </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&quot;src/main/java&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;src/main/resources&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">publishing {</span></span>
<span class="line"><span style="color:#E1E4E8;">    publications {</span></span>
<span class="line"><span style="color:#E1E4E8;">        mavenJava(</span><span style="color:#F97583;">MavenPublication</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            artifactId </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;tomlj-spring-boot-starter&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            from components</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">java</span></span>
<span class="line"><span style="color:#E1E4E8;">            artifact sourcesJar</span></span>
<span class="line"><span style="color:#E1E4E8;">            artifact javadocJar</span></span>
<span class="line"><span style="color:#E1E4E8;">            pom {</span></span>
<span class="line"><span style="color:#E1E4E8;">                name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;tomlj-spring-boot-starter&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                description </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;tomlj-spring-boot-starter&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://github.com/whp98/tomlj-spring-boot-starter&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                licenses {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    license {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;The MIT License (MIT)&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                        url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://opensource.org/license/mit/&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                developers {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    developer {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;whp98&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                        name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;whp98&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                        email </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;whp98@foxmail.com&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                scm {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    connection </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;scm:git:https://github.com/whp98/tomlj-spring-boot-starter.git&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    developerConnection </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;scm:git:https://github.com/whp98/tomlj-spring-boot-starter.git&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://github.com/whp98/tomlj-spring-boot-starter&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 定义发布到哪里</span></span>
<span class="line"><span style="color:#E1E4E8;">    repositories {</span></span>
<span class="line"><span style="color:#E1E4E8;">        maven {</span></span>
<span class="line"><span style="color:#E1E4E8;">            name </span><span style="color:#9ECBFF;">&#39;maven-center&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            url </span><span style="color:#9ECBFF;">&quot;https://s01.oss.sonatype.org/service/local/staging/deploy/maven2/&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            credentials {</span></span>
<span class="line"><span style="color:#E1E4E8;">                username </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> getRepositoryUsername()</span></span>
<span class="line"><span style="color:#E1E4E8;">                password </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> getRepositoryPassword()</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">signing {</span></span>
<span class="line"><span style="color:#E1E4E8;">    required { gradle</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">taskGraph</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">hasTask(</span><span style="color:#9ECBFF;">&quot;publish&quot;</span><span style="color:#E1E4E8;">) }</span></span>
<span class="line"><span style="color:#E1E4E8;">    sign publishing</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">publications</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">mavenJava</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">test {</span></span>
<span class="line"><span style="color:#E1E4E8;">    useJUnitPlatform()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">javadoc {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">JavaVersion.</span><span style="color:#E1E4E8;">current()</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">isJava9Compatible()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        options</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">addBooleanOption(</span><span style="color:#9ECBFF;">&#39;html5&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">plugins {</span></span>
<span class="line"><span style="color:#24292E;">    id </span><span style="color:#032F62;">&#39;java-library&#39;</span></span>
<span class="line"><span style="color:#24292E;">    id </span><span style="color:#032F62;">&#39;maven-publish&#39;</span></span>
<span class="line"><span style="color:#24292E;">    id </span><span style="color:#032F62;">&#39;signing&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">group </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;io.github.whp98&#39;</span></span>
<span class="line"><span style="color:#24292E;">version </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;1.1.9&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">repositories {</span></span>
<span class="line"><span style="color:#24292E;">    mavenLocal()</span></span>
<span class="line"><span style="color:#24292E;">    mavenCentral()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getRepositoryUsername</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> hasProperty(</span><span style="color:#032F62;">&quot;sonatypeUsername&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> sonatypeUsername </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getRepositoryPassword</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> hasProperty(</span><span style="color:#032F62;">&quot;sonatypePassword&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> sonatypePassword </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">dependencies {</span></span>
<span class="line"><span style="color:#24292E;">    implementation(</span><span style="color:#032F62;">&#39;org.tomlj:tomlj:1.1.0&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    compileOnly(</span><span style="color:#032F62;">&quot;org.springframework.boot:spring-boot:2.7.18&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    testImplementation(</span><span style="color:#032F62;">&quot;org.springframework.boot:spring-boot-starter-test:2.7.18&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    implementation(</span><span style="color:#032F62;">&quot;com.google.code.findbugs:annotations:3.0.1&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">tasks</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">withType(</span><span style="color:#D73A49;">JavaCompile</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">configureEach {</span></span>
<span class="line"><span style="color:#24292E;">    options</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">encoding </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;UTF-8&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">tasks</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">withType(</span><span style="color:#D73A49;">Javadoc</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">configureEach {</span></span>
<span class="line"><span style="color:#24292E;">    options</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">encoding </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;UTF-8&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">test {</span></span>
<span class="line"><span style="color:#24292E;">    useJUnitPlatform()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">jar {</span></span>
<span class="line"><span style="color:#24292E;">    enabled </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    archiveClassifier </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//jar包名禁止生成plain</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">tasks</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">register(</span><span style="color:#032F62;">&#39;sourcesJar&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Jar</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    from sourceSets</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">main</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">allJava</span></span>
<span class="line"><span style="color:#24292E;">    archiveClassifier </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;sources&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">tasks</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">register(</span><span style="color:#032F62;">&#39;javadocJar&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Jar</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    from javadoc</span></span>
<span class="line"><span style="color:#24292E;">    archiveClassifier </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;javadoc&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">//java {</span></span>
<span class="line"><span style="color:#6A737D;">//    withJavadocJar()</span></span>
<span class="line"><span style="color:#6A737D;">//    withSourcesJar()</span></span>
<span class="line"><span style="color:#6A737D;">//}</span></span>
<span class="line"><span style="color:#24292E;">sourceSets</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">main</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">resources</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">srcDirs </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;src/main/java&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;src/main/resources&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">publishing {</span></span>
<span class="line"><span style="color:#24292E;">    publications {</span></span>
<span class="line"><span style="color:#24292E;">        mavenJava(</span><span style="color:#D73A49;">MavenPublication</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            artifactId </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;tomlj-spring-boot-starter&#39;</span></span>
<span class="line"><span style="color:#24292E;">            from components</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">java</span></span>
<span class="line"><span style="color:#24292E;">            artifact sourcesJar</span></span>
<span class="line"><span style="color:#24292E;">            artifact javadocJar</span></span>
<span class="line"><span style="color:#24292E;">            pom {</span></span>
<span class="line"><span style="color:#24292E;">                name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;tomlj-spring-boot-starter&#39;</span></span>
<span class="line"><span style="color:#24292E;">                description </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;tomlj-spring-boot-starter&#39;</span></span>
<span class="line"><span style="color:#24292E;">                url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://github.com/whp98/tomlj-spring-boot-starter&#39;</span></span>
<span class="line"><span style="color:#24292E;">                licenses {</span></span>
<span class="line"><span style="color:#24292E;">                    license {</span></span>
<span class="line"><span style="color:#24292E;">                        name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;The MIT License (MIT)&#39;</span></span>
<span class="line"><span style="color:#24292E;">                        url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://opensource.org/license/mit/&#39;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                developers {</span></span>
<span class="line"><span style="color:#24292E;">                    developer {</span></span>
<span class="line"><span style="color:#24292E;">                        id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;whp98&#39;</span></span>
<span class="line"><span style="color:#24292E;">                        name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;whp98&#39;</span></span>
<span class="line"><span style="color:#24292E;">                        email </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;whp98@foxmail.com&#39;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                scm {</span></span>
<span class="line"><span style="color:#24292E;">                    connection </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;scm:git:https://github.com/whp98/tomlj-spring-boot-starter.git&#39;</span></span>
<span class="line"><span style="color:#24292E;">                    developerConnection </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;scm:git:https://github.com/whp98/tomlj-spring-boot-starter.git&#39;</span></span>
<span class="line"><span style="color:#24292E;">                    url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://github.com/whp98/tomlj-spring-boot-starter&#39;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 定义发布到哪里</span></span>
<span class="line"><span style="color:#24292E;">    repositories {</span></span>
<span class="line"><span style="color:#24292E;">        maven {</span></span>
<span class="line"><span style="color:#24292E;">            name </span><span style="color:#032F62;">&#39;maven-center&#39;</span></span>
<span class="line"><span style="color:#24292E;">            url </span><span style="color:#032F62;">&quot;https://s01.oss.sonatype.org/service/local/staging/deploy/maven2/&quot;</span></span>
<span class="line"><span style="color:#24292E;">            credentials {</span></span>
<span class="line"><span style="color:#24292E;">                username </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> getRepositoryUsername()</span></span>
<span class="line"><span style="color:#24292E;">                password </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> getRepositoryPassword()</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">signing {</span></span>
<span class="line"><span style="color:#24292E;">    required { gradle</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">taskGraph</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">hasTask(</span><span style="color:#032F62;">&quot;publish&quot;</span><span style="color:#24292E;">) }</span></span>
<span class="line"><span style="color:#24292E;">    sign publishing</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">publications</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">mavenJava</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">test {</span></span>
<span class="line"><span style="color:#24292E;">    useJUnitPlatform()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">javadoc {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">JavaVersion.</span><span style="color:#24292E;">current()</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">isJava9Compatible()) {</span></span>
<span class="line"><span style="color:#24292E;">        options</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">addBooleanOption(</span><span style="color:#032F62;">&#39;html5&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>密码和账号设置单独放到配置文件中 gradle.properties</p><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 签名密钥ID</span></span>
<span class="line"><span style="color:#F97583;">signing.keyId</span><span style="color:#E1E4E8;">=XXXXXXXX</span></span>
<span class="line"><span style="color:#6A737D;"># 签名密钥密码</span></span>
<span class="line"><span style="color:#F97583;">signing.password</span><span style="color:#E1E4E8;">=XXXXXX</span></span>
<span class="line"><span style="color:#6A737D;"># pgp私钥路径</span></span>
<span class="line"><span style="color:#F97583;">signing.secretKeyRingFile</span><span style="color:#E1E4E8;">=X:\\\\MY_PGP\\\\secring.gpg</span></span>
<span class="line"><span style="color:#6A737D;"># sonatypeUserToken</span></span>
<span class="line"><span style="color:#F97583;">sonatypeUsername</span><span style="color:#E1E4E8;">=xxx</span></span>
<span class="line"><span style="color:#F97583;">sonatypePassword</span><span style="color:#E1E4E8;">=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 签名密钥ID</span></span>
<span class="line"><span style="color:#D73A49;">signing.keyId</span><span style="color:#24292E;">=XXXXXXXX</span></span>
<span class="line"><span style="color:#6A737D;"># 签名密钥密码</span></span>
<span class="line"><span style="color:#D73A49;">signing.password</span><span style="color:#24292E;">=XXXXXX</span></span>
<span class="line"><span style="color:#6A737D;"># pgp私钥路径</span></span>
<span class="line"><span style="color:#D73A49;">signing.secretKeyRingFile</span><span style="color:#24292E;">=X:\\\\MY_PGP\\\\secring.gpg</span></span>
<span class="line"><span style="color:#6A737D;"># sonatypeUserToken</span></span>
<span class="line"><span style="color:#D73A49;">sonatypeUsername</span><span style="color:#24292E;">=xxx</span></span>
<span class="line"><span style="color:#D73A49;">sonatypePassword</span><span style="color:#24292E;">=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span></span></code></pre></div><h2 id="_5-执行gradle-publish任务进行发布" tabindex="-1">5.执行gradle publish任务进行发布 <a class="header-anchor" href="#_5-执行gradle-publish任务进行发布" aria-label="Permalink to &quot;5.执行gradle publish任务进行发布&quot;">​</a></h2><p>执行任务后jar包会自动签名和发布</p><h2 id="_6-仓库管理界面点击关闭和发布" tabindex="-1">6.仓库管理界面点击关闭和发布 <a class="header-anchor" href="#_6-仓库管理界面点击关闭和发布" aria-label="Permalink to &quot;6.仓库管理界面点击关闭和发布&quot;">​</a></h2><p>进入stagingProfiles</p><p><a href="https://s01.oss.sonatype.org/#stagingProfiles" target="_blank" rel="noreferrer">https://s01.oss.sonatype.org/#stagingProfiles</a></p><p>选中刚刚发布的jar包,点击Close关闭,检查完毕后再选中点击Release进行发布</p><p>点击release之后预计两个小时内就会同步到中央仓库中</p><p><a href="https://repo.maven.apache.org/maven2/io/github/whp98/tomlj-spring-boot-starter/" target="_blank" rel="noreferrer">https://repo.maven.apache.org/maven2/io/github/whp98/tomlj-spring-boot-starter/</a></p><h2 id="_7-maven-central公告迁移到全新的central-sonatype-org" tabindex="-1">7.maven central公告迁移到全新的central.sonatype.org <a class="header-anchor" href="#_7-maven-central公告迁移到全新的central-sonatype-org" aria-label="Permalink to &quot;7.maven central公告迁移到全新的central.sonatype.org&quot;">​</a></h2><p><a href="https://central.sonatype.org/register/legacy/" target="_blank" rel="noreferrer">https://central.sonatype.org/register/legacy/</a></p><p><a href="https://central.sonatype.org/register/central-portal/" target="_blank" rel="noreferrer">https://central.sonatype.org/register/central-portal/</a></p><p>以上页面说2024-02-01之后注册工作会在新的页面进行，原因是jira那边要停止维护。以后的注册流程可能会简化。</p>`,35),e=[o];function t(r,c,E,y,i,g){return n(),a("div",null,e)}const h=s(l,[["render",t]]);export{u as __pageData,h as default};
