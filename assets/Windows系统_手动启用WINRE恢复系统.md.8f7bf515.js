import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.0cae56c7.js";const F=JSON.parse('{"title":"手动启用WINRE恢复系统","description":"","frontmatter":{},"headers":[],"relativePath":"Windows系统/手动启用WINRE恢复系统.md","filePath":"Windows系统/手动启用WINRE恢复系统.md","lastUpdated":1709291098000}'),p={name:"Windows系统/手动启用WINRE恢复系统.md"},o=l(`<h1 id="手动启用winre恢复系统" tabindex="-1">手动启用WINRE恢复系统 <a class="header-anchor" href="#手动启用winre恢复系统" aria-label="Permalink to &quot;手动启用WINRE恢复系统&quot;">​</a></h1><p>本文参考 <a href="https://blog.xen.lol/2020/04/26/windows-recovery/" target="_blank" rel="noreferrer">https://blog.xen.lol/2020/04/26/windows-recovery/</a></p><h2 id="步骤" tabindex="-1">步骤 <a class="header-anchor" href="#步骤" aria-label="Permalink to &quot;步骤&quot;">​</a></h2><ol><li>压缩C盘2G并新建NTFS分区</li></ol><p>使用Windows磁盘管理工具</p><p>压缩C盘 2048M</p><p>在空闲分区新建磁盘并格式化，这里盘符是G盘</p><ol start="2"><li>复制恢复镜像并注册</li></ol><p>使用 如下的操作</p><div class="language-cmd vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Microsoft Windows [版本 </span><span style="color:#79B8FF;">10.0.19045.4123</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">(c) Microsoft Corporation。保留所有权利。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">C:\\Windows\\system32</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">mkdir G:\\Recovery\\WindowsRE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">C:\\Windows\\system32</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">xcopy /h C:\\Recovery\\WindowsRE\\winre.wim G:\\Recovery\\WindowsRE</span></span>
<span class="line"><span style="color:#E1E4E8;">C:\\Recovery\\WindowsRE\\winre.wim</span></span>
<span class="line"><span style="color:#E1E4E8;">复制了 </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> 个文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">C:\\Windows\\system32</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">C:\\Windows\\System32\\Reagentc /setreimage /path G:\\Recovery\\WindowsRE</span></span>
<span class="line"><span style="color:#E1E4E8;">目录设置为: \\\\?\\GLOBALROOT\\device\\harddisk2\\partition5\\Recovery\\WindowsRE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">REAGENTC.EXE: 操作成功。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Microsoft Windows [版本 </span><span style="color:#005CC5;">10.0.19045.4123</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">(c) Microsoft Corporation。保留所有权利。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">C:\\Windows\\system32</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">mkdir G:\\Recovery\\WindowsRE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">C:\\Windows\\system32</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">xcopy /h C:\\Recovery\\WindowsRE\\winre.wim G:\\Recovery\\WindowsRE</span></span>
<span class="line"><span style="color:#24292E;">C:\\Recovery\\WindowsRE\\winre.wim</span></span>
<span class="line"><span style="color:#24292E;">复制了 </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> 个文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">C:\\Windows\\system32</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">C:\\Windows\\System32\\Reagentc /setreimage /path G:\\Recovery\\WindowsRE</span></span>
<span class="line"><span style="color:#24292E;">目录设置为: \\\\?\\GLOBALROOT\\device\\harddisk2\\partition5\\Recovery\\WindowsRE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">REAGENTC.EXE: 操作成功。</span></span></code></pre></div><ol start="3"><li>取消挂载2G的恢复分区并启用winre</li></ol><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">PS C:\\Windows\\system3</span><span style="color:#F97583;">2&gt;</span><span style="color:#E1E4E8;"> reagentc </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">info</span></span>
<span class="line"><span style="color:#E1E4E8;">Windows Recovery Environment (Windows RE) and system reset configuration</span></span>
<span class="line"><span style="color:#E1E4E8;">Information:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Windows RE status:         Disabled</span></span>
<span class="line"><span style="color:#E1E4E8;">    Windows RE location:</span></span>
<span class="line"><span style="color:#E1E4E8;">    Boot Configuration </span><span style="color:#F97583;">Data</span><span style="color:#E1E4E8;"> (BCD) identifier: 3b8d20ae</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">532c</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">11ec</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">974d</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">da6acdd4c584</span></span>
<span class="line"><span style="color:#E1E4E8;">    Recovery image location:</span></span>
<span class="line"><span style="color:#E1E4E8;">    Recovery image index:      </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">    Custom image location:</span></span>
<span class="line"><span style="color:#E1E4E8;">    Custom image index:        </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">REAGENTC.EXE</span><span style="color:#E1E4E8;">: Operation Successful.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">PS C:\\Windows\\system3</span><span style="color:#F97583;">2&gt;</span><span style="color:#E1E4E8;"> diskpart</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Microsoft DiskPart version </span><span style="color:#79B8FF;">10.0</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">19041.3636</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Copyright (C) Microsoft Corporation.</span></span>
<span class="line"><span style="color:#E1E4E8;">On computer: ABCX</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">PC</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">DISKPART</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> select disk </span><span style="color:#79B8FF;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Disk </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> is now the selected disk.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">DISKPART</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> list disk</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  Disk </span><span style="color:#6A737D;">###  Status         Size     Free     Dyn  Gpt</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">--------</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-------------</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-------</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-------</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">---</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">---</span></span>
<span class="line"><span style="color:#E1E4E8;">  Disk </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">    Online         </span><span style="color:#79B8FF;">1863</span><span style="color:#E1E4E8;"> GB      </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> B        </span><span style="color:#F97583;">*</span></span>
<span class="line"><span style="color:#E1E4E8;">  Disk </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">    Online         </span><span style="color:#79B8FF;">1863</span><span style="color:#E1E4E8;"> GB      </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> B        </span><span style="color:#F97583;">*</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> Disk </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">    Online          </span><span style="color:#79B8FF;">953</span><span style="color:#E1E4E8;"> GB  </span><span style="color:#79B8FF;">2048</span><span style="color:#E1E4E8;"> KB        </span><span style="color:#F97583;">*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">DISKPART</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> list partition</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  Partition </span><span style="color:#6A737D;">###  Type              Size     Offset</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-------------</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">----------------</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-------</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-------</span></span>
<span class="line"><span style="color:#E1E4E8;">  Partition </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">    Reserved            </span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;"> MB  </span><span style="color:#79B8FF;">1024</span><span style="color:#E1E4E8;"> KB</span></span>
<span class="line"><span style="color:#E1E4E8;">  Partition </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">    System             </span><span style="color:#79B8FF;">350</span><span style="color:#E1E4E8;"> MB    </span><span style="color:#79B8FF;">17</span><span style="color:#E1E4E8;"> MB</span></span>
<span class="line"><span style="color:#E1E4E8;">  Partition </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">    Primary            </span><span style="color:#79B8FF;">253</span><span style="color:#E1E4E8;"> GB   </span><span style="color:#79B8FF;">367</span><span style="color:#E1E4E8;"> MB</span></span>
<span class="line"><span style="color:#E1E4E8;">  Partition </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">    Primary           </span><span style="color:#79B8FF;">2047</span><span style="color:#E1E4E8;"> MB   </span><span style="color:#79B8FF;">254</span><span style="color:#E1E4E8;"> GB</span></span>
<span class="line"><span style="color:#E1E4E8;">  Partition </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">    Primary            </span><span style="color:#79B8FF;">697</span><span style="color:#E1E4E8;"> GB   </span><span style="color:#79B8FF;">256</span><span style="color:#E1E4E8;"> GB</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">DISKPART</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> select partition </span><span style="color:#79B8FF;">5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Partition </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> is now the selected partition.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">DISKPART</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> remove</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">DiskPart successfully removed the drive letter or mount point.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">DISKPART</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> set id</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">de94bba4</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">06d1</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">4d40</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">a16a</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">bfd50179d6ac</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">DiskPart successfully set the partition ID.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">DISKPART</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> gpt attributes</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0x8000000000000001</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">DiskPart successfully assigned the attributes to the selected GPT partition.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">DISKPART</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">exit</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Leaving DiskPart...</span></span>
<span class="line"><span style="color:#E1E4E8;">PS C:\\Windows\\system3</span><span style="color:#F97583;">2&gt;</span><span style="color:#E1E4E8;"> C:\\Windows\\System32\\Reagentc </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">info</span></span>
<span class="line"><span style="color:#E1E4E8;">Windows Recovery Environment (Windows RE) and system reset configuration</span></span>
<span class="line"><span style="color:#E1E4E8;">Information:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Windows RE status:         Disabled</span></span>
<span class="line"><span style="color:#E1E4E8;">    Windows RE location:</span></span>
<span class="line"><span style="color:#E1E4E8;">    Boot Configuration </span><span style="color:#F97583;">Data</span><span style="color:#E1E4E8;"> (BCD) identifier: 3b8d20ae</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">532c</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">11ec</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">974d</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">da6acdd4c584</span></span>
<span class="line"><span style="color:#E1E4E8;">    Recovery image location:</span></span>
<span class="line"><span style="color:#E1E4E8;">    Recovery image index:      </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">    Custom image location:</span></span>
<span class="line"><span style="color:#E1E4E8;">    Custom image index:        </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">REAGENTC.EXE</span><span style="color:#E1E4E8;">: Operation Successful.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">PS C:\\Windows\\system3</span><span style="color:#F97583;">2&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">PS C:\\Windows\\system3</span><span style="color:#F97583;">2&gt;</span><span style="color:#E1E4E8;"> C:\\Windows\\System32\\Reagentc </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">enable</span></span>
<span class="line"><span style="color:#79B8FF;">REAGENTC.EXE</span><span style="color:#E1E4E8;">: Operation Successful.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">PS C:\\Windows\\system3</span><span style="color:#F97583;">2&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">PS C:\\Windows\\system3</span><span style="color:#D73A49;">2&gt;</span><span style="color:#24292E;"> reagentc </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">info</span></span>
<span class="line"><span style="color:#24292E;">Windows Recovery Environment (Windows RE) and system reset configuration</span></span>
<span class="line"><span style="color:#24292E;">Information:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Windows RE status:         Disabled</span></span>
<span class="line"><span style="color:#24292E;">    Windows RE location:</span></span>
<span class="line"><span style="color:#24292E;">    Boot Configuration </span><span style="color:#D73A49;">Data</span><span style="color:#24292E;"> (BCD) identifier: 3b8d20ae</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">532c</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">11ec</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">974d</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">da6acdd4c584</span></span>
<span class="line"><span style="color:#24292E;">    Recovery image location:</span></span>
<span class="line"><span style="color:#24292E;">    Recovery image index:      </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">    Custom image location:</span></span>
<span class="line"><span style="color:#24292E;">    Custom image index:        </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">REAGENTC.EXE</span><span style="color:#24292E;">: Operation Successful.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">PS C:\\Windows\\system3</span><span style="color:#D73A49;">2&gt;</span><span style="color:#24292E;"> diskpart</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Microsoft DiskPart version </span><span style="color:#005CC5;">10.0</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">19041.3636</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Copyright (C) Microsoft Corporation.</span></span>
<span class="line"><span style="color:#24292E;">On computer: ABCX</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">PC</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">DISKPART</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> select disk </span><span style="color:#005CC5;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Disk </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> is now the selected disk.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">DISKPART</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> list disk</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  Disk </span><span style="color:#6A737D;">###  Status         Size     Free     Dyn  Gpt</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">--------</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">-------------</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">-------</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">-------</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">---</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">---</span></span>
<span class="line"><span style="color:#24292E;">  Disk </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">    Online         </span><span style="color:#005CC5;">1863</span><span style="color:#24292E;"> GB      </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> B        </span><span style="color:#D73A49;">*</span></span>
<span class="line"><span style="color:#24292E;">  Disk </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">    Online         </span><span style="color:#005CC5;">1863</span><span style="color:#24292E;"> GB      </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> B        </span><span style="color:#D73A49;">*</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> Disk </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">    Online          </span><span style="color:#005CC5;">953</span><span style="color:#24292E;"> GB  </span><span style="color:#005CC5;">2048</span><span style="color:#24292E;"> KB        </span><span style="color:#D73A49;">*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">DISKPART</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> list partition</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  Partition </span><span style="color:#6A737D;">###  Type              Size     Offset</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">-------------</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">----------------</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">-------</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">-------</span></span>
<span class="line"><span style="color:#24292E;">  Partition </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">    Reserved            </span><span style="color:#005CC5;">16</span><span style="color:#24292E;"> MB  </span><span style="color:#005CC5;">1024</span><span style="color:#24292E;"> KB</span></span>
<span class="line"><span style="color:#24292E;">  Partition </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">    System             </span><span style="color:#005CC5;">350</span><span style="color:#24292E;"> MB    </span><span style="color:#005CC5;">17</span><span style="color:#24292E;"> MB</span></span>
<span class="line"><span style="color:#24292E;">  Partition </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">    Primary            </span><span style="color:#005CC5;">253</span><span style="color:#24292E;"> GB   </span><span style="color:#005CC5;">367</span><span style="color:#24292E;"> MB</span></span>
<span class="line"><span style="color:#24292E;">  Partition </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">    Primary           </span><span style="color:#005CC5;">2047</span><span style="color:#24292E;"> MB   </span><span style="color:#005CC5;">254</span><span style="color:#24292E;"> GB</span></span>
<span class="line"><span style="color:#24292E;">  Partition </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">    Primary            </span><span style="color:#005CC5;">697</span><span style="color:#24292E;"> GB   </span><span style="color:#005CC5;">256</span><span style="color:#24292E;"> GB</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">DISKPART</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> select partition </span><span style="color:#005CC5;">5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Partition </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> is now the selected partition.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">DISKPART</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> remove</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">DiskPart successfully removed the drive letter or mount point.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">DISKPART</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> set id</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">de94bba4</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">06d1</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">4d40</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">a16a</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">bfd50179d6ac</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">DiskPart successfully set the partition ID.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">DISKPART</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> gpt attributes</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0x8000000000000001</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">DiskPart successfully assigned the attributes to the selected GPT partition.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">DISKPART</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">exit</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Leaving DiskPart...</span></span>
<span class="line"><span style="color:#24292E;">PS C:\\Windows\\system3</span><span style="color:#D73A49;">2&gt;</span><span style="color:#24292E;"> C:\\Windows\\System32\\Reagentc </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">info</span></span>
<span class="line"><span style="color:#24292E;">Windows Recovery Environment (Windows RE) and system reset configuration</span></span>
<span class="line"><span style="color:#24292E;">Information:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Windows RE status:         Disabled</span></span>
<span class="line"><span style="color:#24292E;">    Windows RE location:</span></span>
<span class="line"><span style="color:#24292E;">    Boot Configuration </span><span style="color:#D73A49;">Data</span><span style="color:#24292E;"> (BCD) identifier: 3b8d20ae</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">532c</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">11ec</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">974d</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">da6acdd4c584</span></span>
<span class="line"><span style="color:#24292E;">    Recovery image location:</span></span>
<span class="line"><span style="color:#24292E;">    Recovery image index:      </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">    Custom image location:</span></span>
<span class="line"><span style="color:#24292E;">    Custom image index:        </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">REAGENTC.EXE</span><span style="color:#24292E;">: Operation Successful.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">PS C:\\Windows\\system3</span><span style="color:#D73A49;">2&gt;</span></span>
<span class="line"><span style="color:#24292E;">PS C:\\Windows\\system3</span><span style="color:#D73A49;">2&gt;</span><span style="color:#24292E;"> C:\\Windows\\System32\\Reagentc </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">enable</span></span>
<span class="line"><span style="color:#005CC5;">REAGENTC.EXE</span><span style="color:#24292E;">: Operation Successful.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">PS C:\\Windows\\system3</span><span style="color:#D73A49;">2&gt;</span></span></code></pre></div>`,12),e=[o];function t(c,r,E,i,y,d){return n(),a("div",null,e)}const D=s(p,[["render",t]]);export{F as __pageData,D as default};
