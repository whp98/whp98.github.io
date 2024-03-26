import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.0cae56c7.js";const C=JSON.parse('{"title":"快速部署frp","description":"","frontmatter":{},"headers":[],"relativePath":"Linux系统/快速部署frp.md","filePath":"Linux系统/快速部署frp.md","lastUpdated":1690537275000}'),l={name:"Linux系统/快速部署frp.md"},o=p(`<h1 id="快速部署frp" tabindex="-1">快速部署frp <a class="header-anchor" href="#快速部署frp" aria-label="Permalink to &quot;快速部署frp&quot;">​</a></h1><p>部署多个端口有利于高可用 以下脚本用于部署4套FRP</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/bin/sh</span></span>
<span class="line"><span style="color:#E1E4E8;">token</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">adsasdasdasd</span></span>
<span class="line"><span style="color:#E1E4E8;">passwd</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">sdasdasdl</span></span>
<span class="line"><span style="color:#E1E4E8;">account</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">admin</span></span>
<span class="line"><span style="color:#E1E4E8;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">\`</span><span style="color:#79B8FF;">pwd</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/fatedier/frp/releases/download/v0.44.0/frp_0.44.0_linux_amd64.tar.gz</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp_temp.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-xvzf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp_temp.tar.gz</span></span>
<span class="line"><span style="color:#B392F0;">mv</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp_0.44.0_linux_amd64</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp_temp</span></span>
<span class="line"><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp_temp.tar.gz</span></span>
<span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp_temp</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp1</span></span>
<span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp_temp</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp2</span></span>
<span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp_temp</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp3</span></span>
<span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp_temp</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp4</span></span>
<span class="line"><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-rf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp_temp</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">[common]</span></span>
<span class="line"><span style="color:#9ECBFF;">bind_port = 15000</span></span>
<span class="line"><span style="color:#9ECBFF;">bind_udp_port = 15001</span></span>
<span class="line"><span style="color:#9ECBFF;">kcp_bind_port = 15000</span></span>
<span class="line"><span style="color:#9ECBFF;">dashboard_port = 15500</span></span>
<span class="line"><span style="color:#9ECBFF;">token = \${</span><span style="color:#E1E4E8;">token</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">dashboard_user = \${</span><span style="color:#E1E4E8;">account</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">dashboard_pwd = \${</span><span style="color:#E1E4E8;">passwd</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">max_pool_count = 15</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp1/frps.ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">[common]</span></span>
<span class="line"><span style="color:#9ECBFF;">bind_port = 16000</span></span>
<span class="line"><span style="color:#9ECBFF;">bind_udp_port = 16001</span></span>
<span class="line"><span style="color:#9ECBFF;">kcp_bind_port = 16000</span></span>
<span class="line"><span style="color:#9ECBFF;">dashboard_port = 16500</span></span>
<span class="line"><span style="color:#9ECBFF;">token = \${</span><span style="color:#E1E4E8;">token</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">dashboard_user = \${</span><span style="color:#E1E4E8;">account</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">dashboard_pwd = \${</span><span style="color:#E1E4E8;">passwd</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">max_pool_count = 15</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp2/frps.ini</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">[common]</span></span>
<span class="line"><span style="color:#9ECBFF;">bind_port = 17000</span></span>
<span class="line"><span style="color:#9ECBFF;">bind_udp_port = 17001</span></span>
<span class="line"><span style="color:#9ECBFF;">kcp_bind_port = 17000</span></span>
<span class="line"><span style="color:#9ECBFF;">dashboard_port = 17500</span></span>
<span class="line"><span style="color:#9ECBFF;">token = \${</span><span style="color:#E1E4E8;">token</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">dashboard_user = \${</span><span style="color:#E1E4E8;">account</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">dashboard_pwd = \${</span><span style="color:#E1E4E8;">passwd</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">max_pool_count = 15</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp3/frps.ini</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">[common]</span></span>
<span class="line"><span style="color:#9ECBFF;">bind_port = 18000</span></span>
<span class="line"><span style="color:#9ECBFF;">bind_udp_port = 18001</span></span>
<span class="line"><span style="color:#9ECBFF;">kcp_bind_port = 18000</span></span>
<span class="line"><span style="color:#9ECBFF;">dashboard_port = 18500</span></span>
<span class="line"><span style="color:#9ECBFF;">token = \${</span><span style="color:#E1E4E8;">token</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">dashboard_user = \${</span><span style="color:#E1E4E8;">account</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">dashboard_pwd = \${</span><span style="color:#E1E4E8;">passwd</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">max_pool_count = 15</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp4/frps.ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=FRP: The nginx HTTP and reverse proxy server</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network.target remote-fs.target nss-lookup.target</span></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">Type=simple</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=\${</span><span style="color:#E1E4E8;">path</span><span style="color:#9ECBFF;">}/frp1/frps -c \${</span><span style="color:#E1E4E8;">path</span><span style="color:#9ECBFF;">}/frp1/frps.ini</span></span>
<span class="line"><span style="color:#9ECBFF;">KillSignal=SIGQUIT</span></span>
<span class="line"><span style="color:#9ECBFF;">TimeoutStopSec=5</span></span>
<span class="line"><span style="color:#9ECBFF;">KillMode=process</span></span>
<span class="line"><span style="color:#9ECBFF;">PrivateTmp=true</span></span>
<span class="line"><span style="color:#9ECBFF;">StandardOutput=syslog</span></span>
<span class="line"><span style="color:#9ECBFF;">StandardError=inherit</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/lib/systemd/system/frp1.service</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=FRP: The nginx HTTP and reverse proxy server</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network.target remote-fs.target nss-lookup.target</span></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">Type=simple</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=\${</span><span style="color:#E1E4E8;">path</span><span style="color:#9ECBFF;">}/frp2/frps -c \${</span><span style="color:#E1E4E8;">path</span><span style="color:#9ECBFF;">}/frp2/frps.ini</span></span>
<span class="line"><span style="color:#9ECBFF;">KillSignal=SIGQUIT</span></span>
<span class="line"><span style="color:#9ECBFF;">TimeoutStopSec=5</span></span>
<span class="line"><span style="color:#9ECBFF;">KillMode=process</span></span>
<span class="line"><span style="color:#9ECBFF;">PrivateTmp=true</span></span>
<span class="line"><span style="color:#9ECBFF;">StandardOutput=syslog</span></span>
<span class="line"><span style="color:#9ECBFF;">StandardError=inherit</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/lib/systemd/system/frp2.service</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=FRP: The nginx HTTP and reverse proxy server</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network.target remote-fs.target nss-lookup.target</span></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">Type=simple</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=\${</span><span style="color:#E1E4E8;">path</span><span style="color:#9ECBFF;">}/frp3/frps -c \${</span><span style="color:#E1E4E8;">path</span><span style="color:#9ECBFF;">}/frp3/frps.ini</span></span>
<span class="line"><span style="color:#9ECBFF;">KillSignal=SIGQUIT</span></span>
<span class="line"><span style="color:#9ECBFF;">TimeoutStopSec=5</span></span>
<span class="line"><span style="color:#9ECBFF;">KillMode=process</span></span>
<span class="line"><span style="color:#9ECBFF;">PrivateTmp=true</span></span>
<span class="line"><span style="color:#9ECBFF;">StandardOutput=syslog</span></span>
<span class="line"><span style="color:#9ECBFF;">StandardError=inherit</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/lib/systemd/system/frp3.service</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=FRP: The nginx HTTP and reverse proxy server</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network.target remote-fs.target nss-lookup.target</span></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">Type=simple</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=\${</span><span style="color:#E1E4E8;">path</span><span style="color:#9ECBFF;">}/frp4/frps -c \${</span><span style="color:#E1E4E8;">path</span><span style="color:#9ECBFF;">}/frp4/frps.ini</span></span>
<span class="line"><span style="color:#9ECBFF;">KillSignal=SIGQUIT</span></span>
<span class="line"><span style="color:#9ECBFF;">TimeoutStopSec=5</span></span>
<span class="line"><span style="color:#9ECBFF;">KillMode=process</span></span>
<span class="line"><span style="color:#9ECBFF;">PrivateTmp=true</span></span>
<span class="line"><span style="color:#9ECBFF;">StandardOutput=syslog</span></span>
<span class="line"><span style="color:#9ECBFF;">StandardError=inherit</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/lib/systemd/system/frp4.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/bin/sh</span></span>
<span class="line"><span style="color:#24292E;">token</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">adsasdasdasd</span></span>
<span class="line"><span style="color:#24292E;">passwd</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">sdasdasdl</span></span>
<span class="line"><span style="color:#24292E;">account</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">admin</span></span>
<span class="line"><span style="color:#24292E;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">\`</span><span style="color:#005CC5;">pwd</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/fatedier/frp/releases/download/v0.44.0/frp_0.44.0_linux_amd64.tar.gz</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp_temp.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-xvzf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp_temp.tar.gz</span></span>
<span class="line"><span style="color:#6F42C1;">mv</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp_0.44.0_linux_amd64</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp_temp</span></span>
<span class="line"><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp_temp.tar.gz</span></span>
<span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp_temp</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp1</span></span>
<span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp_temp</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp2</span></span>
<span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp_temp</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp3</span></span>
<span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp_temp</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp4</span></span>
<span class="line"><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-rf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp_temp</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">[common]</span></span>
<span class="line"><span style="color:#032F62;">bind_port = 15000</span></span>
<span class="line"><span style="color:#032F62;">bind_udp_port = 15001</span></span>
<span class="line"><span style="color:#032F62;">kcp_bind_port = 15000</span></span>
<span class="line"><span style="color:#032F62;">dashboard_port = 15500</span></span>
<span class="line"><span style="color:#032F62;">token = \${</span><span style="color:#24292E;">token</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">dashboard_user = \${</span><span style="color:#24292E;">account</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">dashboard_pwd = \${</span><span style="color:#24292E;">passwd</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">max_pool_count = 15</span></span>
<span class="line"><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp1/frps.ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">[common]</span></span>
<span class="line"><span style="color:#032F62;">bind_port = 16000</span></span>
<span class="line"><span style="color:#032F62;">bind_udp_port = 16001</span></span>
<span class="line"><span style="color:#032F62;">kcp_bind_port = 16000</span></span>
<span class="line"><span style="color:#032F62;">dashboard_port = 16500</span></span>
<span class="line"><span style="color:#032F62;">token = \${</span><span style="color:#24292E;">token</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">dashboard_user = \${</span><span style="color:#24292E;">account</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">dashboard_pwd = \${</span><span style="color:#24292E;">passwd</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">max_pool_count = 15</span></span>
<span class="line"><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp2/frps.ini</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">[common]</span></span>
<span class="line"><span style="color:#032F62;">bind_port = 17000</span></span>
<span class="line"><span style="color:#032F62;">bind_udp_port = 17001</span></span>
<span class="line"><span style="color:#032F62;">kcp_bind_port = 17000</span></span>
<span class="line"><span style="color:#032F62;">dashboard_port = 17500</span></span>
<span class="line"><span style="color:#032F62;">token = \${</span><span style="color:#24292E;">token</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">dashboard_user = \${</span><span style="color:#24292E;">account</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">dashboard_pwd = \${</span><span style="color:#24292E;">passwd</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">max_pool_count = 15</span></span>
<span class="line"><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp3/frps.ini</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">[common]</span></span>
<span class="line"><span style="color:#032F62;">bind_port = 18000</span></span>
<span class="line"><span style="color:#032F62;">bind_udp_port = 18001</span></span>
<span class="line"><span style="color:#032F62;">kcp_bind_port = 18000</span></span>
<span class="line"><span style="color:#032F62;">dashboard_port = 18500</span></span>
<span class="line"><span style="color:#032F62;">token = \${</span><span style="color:#24292E;">token</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">dashboard_user = \${</span><span style="color:#24292E;">account</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">dashboard_pwd = \${</span><span style="color:#24292E;">passwd</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">max_pool_count = 15</span></span>
<span class="line"><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp4/frps.ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=FRP: The nginx HTTP and reverse proxy server</span></span>
<span class="line"><span style="color:#032F62;">After=network.target remote-fs.target nss-lookup.target</span></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">Type=simple</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=\${</span><span style="color:#24292E;">path</span><span style="color:#032F62;">}/frp1/frps -c \${</span><span style="color:#24292E;">path</span><span style="color:#032F62;">}/frp1/frps.ini</span></span>
<span class="line"><span style="color:#032F62;">KillSignal=SIGQUIT</span></span>
<span class="line"><span style="color:#032F62;">TimeoutStopSec=5</span></span>
<span class="line"><span style="color:#032F62;">KillMode=process</span></span>
<span class="line"><span style="color:#032F62;">PrivateTmp=true</span></span>
<span class="line"><span style="color:#032F62;">StandardOutput=syslog</span></span>
<span class="line"><span style="color:#032F62;">StandardError=inherit</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/lib/systemd/system/frp1.service</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=FRP: The nginx HTTP and reverse proxy server</span></span>
<span class="line"><span style="color:#032F62;">After=network.target remote-fs.target nss-lookup.target</span></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">Type=simple</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=\${</span><span style="color:#24292E;">path</span><span style="color:#032F62;">}/frp2/frps -c \${</span><span style="color:#24292E;">path</span><span style="color:#032F62;">}/frp2/frps.ini</span></span>
<span class="line"><span style="color:#032F62;">KillSignal=SIGQUIT</span></span>
<span class="line"><span style="color:#032F62;">TimeoutStopSec=5</span></span>
<span class="line"><span style="color:#032F62;">KillMode=process</span></span>
<span class="line"><span style="color:#032F62;">PrivateTmp=true</span></span>
<span class="line"><span style="color:#032F62;">StandardOutput=syslog</span></span>
<span class="line"><span style="color:#032F62;">StandardError=inherit</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/lib/systemd/system/frp2.service</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=FRP: The nginx HTTP and reverse proxy server</span></span>
<span class="line"><span style="color:#032F62;">After=network.target remote-fs.target nss-lookup.target</span></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">Type=simple</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=\${</span><span style="color:#24292E;">path</span><span style="color:#032F62;">}/frp3/frps -c \${</span><span style="color:#24292E;">path</span><span style="color:#032F62;">}/frp3/frps.ini</span></span>
<span class="line"><span style="color:#032F62;">KillSignal=SIGQUIT</span></span>
<span class="line"><span style="color:#032F62;">TimeoutStopSec=5</span></span>
<span class="line"><span style="color:#032F62;">KillMode=process</span></span>
<span class="line"><span style="color:#032F62;">PrivateTmp=true</span></span>
<span class="line"><span style="color:#032F62;">StandardOutput=syslog</span></span>
<span class="line"><span style="color:#032F62;">StandardError=inherit</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/lib/systemd/system/frp3.service</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=FRP: The nginx HTTP and reverse proxy server</span></span>
<span class="line"><span style="color:#032F62;">After=network.target remote-fs.target nss-lookup.target</span></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">Type=simple</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=\${</span><span style="color:#24292E;">path</span><span style="color:#032F62;">}/frp4/frps -c \${</span><span style="color:#24292E;">path</span><span style="color:#032F62;">}/frp4/frps.ini</span></span>
<span class="line"><span style="color:#032F62;">KillSignal=SIGQUIT</span></span>
<span class="line"><span style="color:#032F62;">TimeoutStopSec=5</span></span>
<span class="line"><span style="color:#032F62;">KillMode=process</span></span>
<span class="line"><span style="color:#032F62;">PrivateTmp=true</span></span>
<span class="line"><span style="color:#032F62;">StandardOutput=syslog</span></span>
<span class="line"><span style="color:#032F62;">StandardError=inherit</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/lib/systemd/system/frp4.service</span></span></code></pre></div><p>上面弄好之后设置开机启动</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/bin/sh</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp1</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp1</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp1</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp2</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp2</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp2</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp3</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp3</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp3</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp4</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp4</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp4</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/bin/sh</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp1</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp1</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp1</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp2</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp2</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp2</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp3</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp3</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp3</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp4</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp4</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp4</span></span></code></pre></div><p>重启</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp1</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp2</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp3</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp4</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp1</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp2</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp3</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp4</span></span></code></pre></div><p>查看情况</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp1</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp2</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp3</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp4</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp1</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp2</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp3</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp4</span></span></code></pre></div><p>删除</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/bin/sh</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp1</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">disable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp1</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp2</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">disable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp2</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp3</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">disable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp3</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp4</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">disable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp4</span></span>
<span class="line"><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/lib/systemd/system/frp1.service</span></span>
<span class="line"><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/lib/systemd/system/frp2.service</span></span>
<span class="line"><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/lib/systemd/system/frp3.service</span></span>
<span class="line"><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/lib/systemd/system/frp4.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp1</span></span>
<span class="line"><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp2</span></span>
<span class="line"><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp3</span></span>
<span class="line"><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">frp4</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/bin/sh</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp1</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">disable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp1</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp2</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">disable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp2</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp3</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">disable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp3</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp4</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">disable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp4</span></span>
<span class="line"><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/lib/systemd/system/frp1.service</span></span>
<span class="line"><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/lib/systemd/system/frp2.service</span></span>
<span class="line"><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/lib/systemd/system/frp3.service</span></span>
<span class="line"><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/lib/systemd/system/frp4.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp1</span></span>
<span class="line"><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp2</span></span>
<span class="line"><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp3</span></span>
<span class="line"><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">frp4</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span></code></pre></div><h2 id="实现一般程度上的高可用" tabindex="-1">实现一般程度上的高可用 <a class="header-anchor" href="#实现一般程度上的高可用" aria-label="Permalink to &quot;实现一般程度上的高可用&quot;">​</a></h2><p>在需要高可用服务的机器上，分别开启四个frpc的stcp服务分别连接上面四个frps。</p><p>完成之后试用haproxy开启四个端口的集群代理。</p><p>这样每次服务断开之后可以立即切换到另一个端口从而能实现一定程度的高可用。</p><p>我自己本人在windows上使用ha的配置文件如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#logging options</span></span>
<span class="line"><span style="color:#e1e4e8;">global</span></span>
<span class="line"><span style="color:#e1e4e8;">    log 127.0.0.1 local0 info</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxconn 1500</span></span>
<span class="line"><span style="color:#e1e4e8;">    daemon</span></span>
<span class="line"><span style="color:#e1e4e8;">    quiet</span></span>
<span class="line"><span style="color:#e1e4e8;">    nbproc 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">defaults</span></span>
<span class="line"><span style="color:#e1e4e8;">    log global</span></span>
<span class="line"><span style="color:#e1e4e8;">    #使用4层代理模式，”mode http”为7层代理模式</span></span>
<span class="line"><span style="color:#e1e4e8;">    mode tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">    #if you set mode to tcp,then you nust change tcplog into httplog</span></span>
<span class="line"><span style="color:#e1e4e8;">    option tcplog</span></span>
<span class="line"><span style="color:#e1e4e8;">    option dontlognull</span></span>
<span class="line"><span style="color:#e1e4e8;">    retries 3</span></span>
<span class="line"><span style="color:#e1e4e8;">    option redispatch</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxconn 2000</span></span>
<span class="line"><span style="color:#e1e4e8;">    timeout connect 10s</span></span>
<span class="line"><span style="color:#e1e4e8;">     ##客户端空闲超时时间为 60秒 则HA 发起重连机制</span></span>
<span class="line"><span style="color:#e1e4e8;">    timeout client 10s</span></span>
<span class="line"><span style="color:#e1e4e8;">     ##服务器端链接超时时间为 15秒 则HA 发起重连机制</span></span>
<span class="line"><span style="color:#e1e4e8;">    timeout server 10s </span></span>
<span class="line"><span style="color:#e1e4e8;">#front-end IP for consumers and producters</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">listen RDP</span></span>
<span class="line"><span style="color:#e1e4e8;">    bind 0.0.0.0:32000</span></span>
<span class="line"><span style="color:#e1e4e8;">    #配置TCP模式</span></span>
<span class="line"><span style="color:#e1e4e8;">    mode tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">    tcp-request inspect-delay 5s</span></span>
<span class="line"><span style="color:#e1e4e8;">    tcp-request content accept if RDP_COOKIE</span></span>
<span class="line"><span style="color:#e1e4e8;">    persist rdp-cookie</span></span>
<span class="line"><span style="color:#e1e4e8;">    balance leastconn</span></span>
<span class="line"><span style="color:#e1e4e8;">    option tcpka</span></span>
<span class="line"><span style="color:#e1e4e8;">    option tcplog</span></span>
<span class="line"><span style="color:#e1e4e8;">    server one30351	127.0.0.1:30351 check inter 5000 rise 2 fall 2</span></span>
<span class="line"><span style="color:#e1e4e8;">    server one30352	127.0.0.1:30352 check inter 5000 rise 2 fall 2</span></span>
<span class="line"><span style="color:#e1e4e8;">    server one30353	127.0.0.1:30353 check inter 5000 rise 2 fall 2</span></span>
<span class="line"><span style="color:#e1e4e8;">    server one30354	127.0.0.1:30354 check inter 5000 rise 2 fall 2</span></span>
<span class="line"><span style="color:#e1e4e8;">    option redispatch</span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">#配置haproxy web监控，查看统计信息</span></span>
<span class="line"><span style="color:#e1e4e8;">listen stats</span></span>
<span class="line"><span style="color:#e1e4e8;">    bind 127.0.0.1:8990</span></span>
<span class="line"><span style="color:#e1e4e8;">    mode http</span></span>
<span class="line"><span style="color:#e1e4e8;">    option httplog</span></span>
<span class="line"><span style="color:#e1e4e8;">    stats enable</span></span>
<span class="line"><span style="color:#e1e4e8;">    #设置haproxy监控地址为http://localhost:8990/frp-stats</span></span>
<span class="line"><span style="color:#e1e4e8;">    stats uri /frp-stats</span></span>
<span class="line"><span style="color:#e1e4e8;">    stats refresh 1s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#logging options</span></span>
<span class="line"><span style="color:#24292e;">global</span></span>
<span class="line"><span style="color:#24292e;">    log 127.0.0.1 local0 info</span></span>
<span class="line"><span style="color:#24292e;">    maxconn 1500</span></span>
<span class="line"><span style="color:#24292e;">    daemon</span></span>
<span class="line"><span style="color:#24292e;">    quiet</span></span>
<span class="line"><span style="color:#24292e;">    nbproc 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">defaults</span></span>
<span class="line"><span style="color:#24292e;">    log global</span></span>
<span class="line"><span style="color:#24292e;">    #使用4层代理模式，”mode http”为7层代理模式</span></span>
<span class="line"><span style="color:#24292e;">    mode tcp</span></span>
<span class="line"><span style="color:#24292e;">    #if you set mode to tcp,then you nust change tcplog into httplog</span></span>
<span class="line"><span style="color:#24292e;">    option tcplog</span></span>
<span class="line"><span style="color:#24292e;">    option dontlognull</span></span>
<span class="line"><span style="color:#24292e;">    retries 3</span></span>
<span class="line"><span style="color:#24292e;">    option redispatch</span></span>
<span class="line"><span style="color:#24292e;">    maxconn 2000</span></span>
<span class="line"><span style="color:#24292e;">    timeout connect 10s</span></span>
<span class="line"><span style="color:#24292e;">     ##客户端空闲超时时间为 60秒 则HA 发起重连机制</span></span>
<span class="line"><span style="color:#24292e;">    timeout client 10s</span></span>
<span class="line"><span style="color:#24292e;">     ##服务器端链接超时时间为 15秒 则HA 发起重连机制</span></span>
<span class="line"><span style="color:#24292e;">    timeout server 10s </span></span>
<span class="line"><span style="color:#24292e;">#front-end IP for consumers and producters</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">listen RDP</span></span>
<span class="line"><span style="color:#24292e;">    bind 0.0.0.0:32000</span></span>
<span class="line"><span style="color:#24292e;">    #配置TCP模式</span></span>
<span class="line"><span style="color:#24292e;">    mode tcp</span></span>
<span class="line"><span style="color:#24292e;">    tcp-request inspect-delay 5s</span></span>
<span class="line"><span style="color:#24292e;">    tcp-request content accept if RDP_COOKIE</span></span>
<span class="line"><span style="color:#24292e;">    persist rdp-cookie</span></span>
<span class="line"><span style="color:#24292e;">    balance leastconn</span></span>
<span class="line"><span style="color:#24292e;">    option tcpka</span></span>
<span class="line"><span style="color:#24292e;">    option tcplog</span></span>
<span class="line"><span style="color:#24292e;">    server one30351	127.0.0.1:30351 check inter 5000 rise 2 fall 2</span></span>
<span class="line"><span style="color:#24292e;">    server one30352	127.0.0.1:30352 check inter 5000 rise 2 fall 2</span></span>
<span class="line"><span style="color:#24292e;">    server one30353	127.0.0.1:30353 check inter 5000 rise 2 fall 2</span></span>
<span class="line"><span style="color:#24292e;">    server one30354	127.0.0.1:30354 check inter 5000 rise 2 fall 2</span></span>
<span class="line"><span style="color:#24292e;">    option redispatch</span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">#配置haproxy web监控，查看统计信息</span></span>
<span class="line"><span style="color:#24292e;">listen stats</span></span>
<span class="line"><span style="color:#24292e;">    bind 127.0.0.1:8990</span></span>
<span class="line"><span style="color:#24292e;">    mode http</span></span>
<span class="line"><span style="color:#24292e;">    option httplog</span></span>
<span class="line"><span style="color:#24292e;">    stats enable</span></span>
<span class="line"><span style="color:#24292e;">    #设置haproxy监控地址为http://localhost:8990/frp-stats</span></span>
<span class="line"><span style="color:#24292e;">    stats uri /frp-stats</span></span>
<span class="line"><span style="color:#24292e;">    stats refresh 1s</span></span></code></pre></div><p>可以参考一下</p>`,18),e=[o];function t(c,r,y,F,E,i){return n(),a("div",null,e)}const B=s(l,[["render",t]]);export{C as __pageData,B as default};
