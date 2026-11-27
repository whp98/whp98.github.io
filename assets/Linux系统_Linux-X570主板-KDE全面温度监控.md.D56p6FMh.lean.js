import{_ as s,c as a,a3 as p,o as e}from"./chunks/framework.DLXsHQLa.js";const o=JSON.parse('{"title":"Linux-X570主板-KDE全面温度监控","description":"","frontmatter":{},"headers":[],"relativePath":"Linux系统/Linux-X570主板-KDE全面温度监控.md","filePath":"Linux系统/Linux-X570主板-KDE全面温度监控.md","lastUpdated":1768442526000}'),l={name:"Linux系统/Linux-X570主板-KDE全面温度监控.md"};function i(r,n,c,m,b,t){return e(),a("div",null,n[0]||(n[0]=[p(`<h1 id="linux-x570主板-kde全面温度监控" tabindex="-1">Linux-X570主板-KDE全面温度监控 <a class="header-anchor" href="#linux-x570主板-kde全面温度监控" aria-label="Permalink to &quot;Linux-X570主板-KDE全面温度监控&quot;">​</a></h1><h2 id="编辑-grub-配置文件" tabindex="-1">编辑 GRUB 配置文件 <a class="header-anchor" href="#编辑-grub-配置文件" aria-label="Permalink to &quot;编辑 GRUB 配置文件&quot;">​</a></h2><p>编辑 GRUB 配置文件：<code>sudo nano /etc/default/grub</code> 找到 GRUB_CMDLINE_LINUX_DEFAULT 行，在引号内添加 <code>acpi_enforce_resources=lax</code>。 更新 GRUB 并重启： Ubuntu/Debian: <code>sudo update-grub</code> Fedora/Arch: <code>sudo grub-mkconfig -o /boot/grub/grub.cfg</code></p><h2 id="加载微星常用芯片组内核模块" tabindex="-1">加载微星常用芯片组内核模块 <a class="header-anchor" href="#加载微星常用芯片组内核模块" aria-label="Permalink to &quot;加载微星常用芯片组内核模块&quot;">​</a></h2><p><code>sudo modprobe nct6775</code> 永久生效 <code>echo &quot;nct6775&quot; | sudo tee -a /etc/module</code></p><h2 id="查看传感器读数" tabindex="-1">查看传感器读数 <a class="header-anchor" href="#查看传感器读数" aria-label="Permalink to &quot;查看传感器读数&quot;">​</a></h2><p><code>sensor</code></p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light material-theme-palenight vp-code" tabindex="0"><code><span class="line"><span>nct6797-isa-0a20</span></span>
<span class="line"><span>Adapter: ISA adapter</span></span>
<span class="line"><span>in0:                     1.19 V  (min =  +0.00 V, max =  +1.74 V)</span></span>
<span class="line"><span>in1:                   968.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>in2:                     3.33 V  (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>in3:                     3.25 V  (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>in4:                     1.01 V  (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>in5:                   144.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>in6:                   792.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>in7:                     3.33 V  (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>in8:                     3.23 V  (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>in9:                     1.78 V  (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>in10:                  912.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>in11:                  712.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>in12:                  840.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>in13:                  600.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>in14:                    1.50 V  (min =  +0.00 V, max =  +0.00 V)  ALARM</span></span>
<span class="line"><span>fan1:                     0 RPM  (min =    0 RPM)</span></span>
<span class="line"><span>fan2:                  1443 RPM  (min =    0 RPM)</span></span>
<span class="line"><span>fan3:                  1425 RPM  (min =    0 RPM)</span></span>
<span class="line"><span>fan4:                     0 RPM  (min =    0 RPM)</span></span>
<span class="line"><span>fan5:                     0 RPM  (min =    0 RPM)</span></span>
<span class="line"><span>fan6:                     0 RPM  (min =    0 RPM)</span></span>
<span class="line"><span>fan7:                  4340 RPM  (min =    0 RPM)</span></span>
<span class="line"><span>SYSTIN:                 +33.0°C  (high = +80.0°C, hyst = +75.0°C)  sensor = CPU diode</span></span>
<span class="line"><span>CPUTIN:                 +34.0°C  (high = +115.0°C, hyst = +90.0°C)  sensor = thermistor</span></span>
<span class="line"><span>AUXTIN0:                +37.5°C  (high = +115.0°C, hyst = +90.0°C)  sensor = thermistor</span></span>
<span class="line"><span>AUXTIN1:                +31.0°C    sensor = thermistor</span></span>
<span class="line"><span>AUXTIN2:                +42.0°C    sensor = thermistor</span></span>
<span class="line"><span>AUXTIN3:                 -1.0°C    sensor = thermistor</span></span>
<span class="line"><span>SMBUSMASTER 0:          +43.5°C  </span></span>
<span class="line"><span>PCH_CHIP_CPU_MAX_TEMP:   +0.0°C  </span></span>
<span class="line"><span>PCH_CHIP_TEMP:           +0.0°C  </span></span>
<span class="line"><span>PCH_CPU_TEMP:            +0.0°C  </span></span>
<span class="line"><span>PCH_MCH_TEMP:            +0.0°C  </span></span>
<span class="line"><span>Agent0 Dimm0:            +0.0°C  </span></span>
<span class="line"><span>TSI0_TEMP:              +43.8°C  </span></span>
<span class="line"><span>intrusion0:            ALARM</span></span>
<span class="line"><span>intrusion1:            ALARM</span></span>
<span class="line"><span>beep_enable:           disabled</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><p>然后重启就可以使用系统资源监视器使用这个传感器了。</p>`,9)]))}const d=s(l,[["render",i]]);export{o as __pageData,d as default};
