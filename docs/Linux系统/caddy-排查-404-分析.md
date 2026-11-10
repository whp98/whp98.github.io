# 记一次 Caddy 反向代理“偶尔 404”诡异故障排查与底层原理剖析

## 1. 背景与现象

在现代轻量化运维中，很多团队和个人开发者喜欢使用 Docker Compose 部署 Caddy 作为主网关，反向代理后端的多个微服务（如密码管理服务 Vaultwarden、个人网盘、面板工具等）。

在一次常规维护后，一个非常诡异的现象出现了：
- 访问特定子域名（例如 `https://xxx.sss.example.com`）时，**偶尔能正常打开（HTTP 200），偶尔却直接报错 404 Not Found**。
- 同一台电脑上，在无痕模式打开可能正常，普通窗口报错；或者刷新几次之后忽然变好，过一会儿又变成 404。
- 后端服务运行平稳，无任何崩溃或重启记录。

这种“薛定谔的 404”往往最令人头疼。它既不是完全不通，也不像常规的后端宕机。

---

## 2. 排查定位过程

### 2.1 确认后端容器健康状态

首先直连后端容器暴露的端口，或者进入 Caddy 容器内部直接探测后端：

```bash
# 从网关容器内部探测后端服务
curl -s -I http://host.docker.internal:9445
```

返回完全正常的 `HTTP/1.1 200 OK`，且页面 HTML 完整返回。这说明：**后端应用本身完全健康，问题必然出在反向代理（Caddy）层**。

---

### 2.2 抓取 404 响应详情

在服务器上通过命令行直接请求出现故障的域名：

```bash
curl -ik https://xxx.sss.example.com
```

响应头和响应体如下：

```http
HTTP/2 404 
alt-svc: h3=":443"; ma=2592000
content-type: text/plain; charset=utf-8
server: Caddy
content-length: 13
date: Tue, 10 Nov 2026 01:37:10 GMT

404 not found
```

注意到关键细节：
1. `server: Caddy` —— 404 并不是后端应用返回的，而是 **Caddy 直接生成的**。
2. 响应体内容是纯文本 `404 not found`。

---

### 2.3 查看 Caddyfile 配置结构

回看 Caddyfile 中的配置，发现存在一条用于未匹配域名的**泛域名兜底规则**：

```caddy
# 泛域名兜底 404
*.sss.example.com {
    tls {
        dns cloudflare {env.CF_API_TOKEN}
    }
    encode gzip zstd
    bind 0.0.0.0
    respond * "404 not found" 404
}

# 其它应用站点
xx1.sss.example.com {
    bind 0.0.0.0
    ...
    reverse_proxy host.docker.internal:58881
}

# 密码管理站点
xxx.sss.example.com {
    encode zstd gzip
    tls {
        dns cloudflare {env.CF_API_TOKEN}
    }
    header {
        ...
    }
    reverse_proxy host.docker.internal:9445
}
```

从 Caddy 的设计规范来看，在同一个上下文中，**具体域名（如 `xxx.sss.example.com`）的优先级必然高于通配符泛域名（`*.s.example.com`）**。
为什么这次泛域名规则会把具体的 `xxx` 拦截掉，而且还是“间歇性拦截”？

---

### 2.4 查看 Caddy 内部的配置转换（JSON 视角）

Caddyfile 最终会被适配编译为底层 JSON 配置。执行配置校验并观察内部生成的服务器配置：

```bash
caddy validate --config /etc/caddy/Caddyfile
```

在输出的底层 JSON 中发现了蛛丝马迹：

```json
{
  "http": {
    "servers": {
      "srv1": {
        "listen": ["0.0.0.0:443"],
        "routes": [
          /* 包含了所有的业务子域名，以及 *.s.example.com (兜底404) */
        ]
      },
      "srv2": {
        "listen": [":443"],
        "routes": [
          /* 只有 xxx.s.example.com */
        ]
      }
    }
  }
}
```

注意两者的 `listen` 字段：
- `srv1` 监听的是 `0.0.0.0:443`。
- `srv2` 监听的是 `:443`。

仔细比对配置才发现：**整个 Caddyfile 中，其他几十个域名全部写了 `bind 0.0.0.0`，唯独 `xxx.sss.example.com` 漏写了这一行！**

---

## 3. 底层原理解析：为什么漏写 `bind` 会导致“偶尔正常”？

这里涉及到两个核心机制的交织作用：**Caddy 的虚拟主机聚合策略**与 **Linux 内核的 `SO_REUSEPORT` 套接字端口复用机制**。

### 3.1 Caddy 的 Server 聚合逻辑

Caddy 解析 Caddyfile 时，会按照**绑定的监听地址与端口**对站点进行分组：
- 指定了 `bind 0.0.0.0` 的站点（包含泛域名 `*.s.example.com`）被合并归纳到名为 `srv1` 的 HTTP Server 中。
- 漏写了 `bind` 的 `xxx` 采取默认监听（`:443`），被 Caddy 判定为不同的监听目标，因而单独创建了一个独立的 HTTP Server `srv2`。

---

### 3.2 Linux 内核 `SO_REUSEPORT` 负载均衡

Caddy 为了保证配置重载（Reload）时不掉连接，底层创建网络 Socket 监听时普遍启用了 `SO_REUSEPORT` / `SO_REUSEADDR` 标志。

在 Linux 网络子系统中：
- `srv1` 监听在 `0.0.0.0:443`。
- `srv2` 监听在 `[::]:443`。

当外界客户端发起 TCP 握手到达 443 端口时，Linux 内核允许两个套接字共享同一个端口，并根据四元组 `(源IP, 源端口, 目的IP, 目的端口)` 进行哈希计算分发连接：

```
                    客户端请求 (TCP SYN)
                           │
                 四元组哈希 (Linux Kernel)
                     /           \
                    /             \
        [哈希落入 srv1]        [哈希落入 srv2]
       (监听 0.0.0.0:443)       (监听 :443)
              │                     │
       路由表中无具体 host    路由表中正好有
       命中 *.s.example.com   xxx 规则
              │                     │
          返回 404              返回 200 OK
```

1. **当连接被分配到 `srv2` 时**：
   - `srv2` 内部恰好只有 `xxx.s.example.com` 的路由，代理成功，**返回 200 OK**。
2. **当连接被分配到 `srv1` 时**：
   - `srv1` 的路由表中没有 `xxx`，但存在 `*.s.example.com` 泛域名规则。
   - 泛域名规则被成功匹配，触发 `respond * "404 not found" 404`，**返回 404**。

---

### 3.3 为什么客户端会感知到“偶发/间歇”？

- **HTTP/2 链路复用（Connection Reuse）**：一旦某个客户端连接落在了 `srv2` 上，HTTP/2 长连接复用机制会使得后续该域名的所有请求都走同一条 TCP 连接，此时一切正常；而一旦长连接超时断开，或者客户端建立了新的连接，重新哈希后落到 `srv1`，就会瞬间变成 404。
- **客户端源端口变化**：刷新页面如果复用了旧连接就一直正常，一旦重新打开无痕窗口、切换网络（Wi-Fi/移动数据）、更换设备，操作系统分配了新的客户端源端口，四元组哈希结果随之改变，故障再次复现。

---

## 4. 解决方案与最佳实践

### 4.1 治标方案：补齐缺失的配置

最直接的解决方式就是给漏掉的配置块加上 `bind 0.0.0.0`：

```diff
xxx.s.example.com {
+   bind 0.0.0.0
    encode zstd gzip
    ...
```

重启 Caddy 后，所有站点监听统一归并到 `srv1`。在同一个 Server 内部，精确域名匹配优先级高于泛域名匹配，404 彻底消失。

---

### 4.2 治本方案：使用 Caddy 代码块（Snippet）彻底杜绝配置漂移

手动在每个域名块中写 `bind 0.0.0.0`、`tls`、`encode`、`log` 极其容易漏写或产生配置漂移。
Caddy 提供了强大的 **Snippet（代码片段）与参数化引用机制**，可以通过抽取公共块实现极限精简。

#### 重构后的 Caddyfile

```caddy
# ==================== 1. 全局与公共代码块定义 ====================

# 基础公共块：绑定IP、启用压缩、DNS-01 泛域名TLS、统一控制台日志
(base) {
    bind 0.0.0.0
    encode zstd gzip
    tls {
        dns cloudflare {env.CF_API_TOKEN}
    }
    log {
        output stdout
        format console
    }
}

# 认证公共块：统一提取 Basic Auth
(auth_admin) {
    basic_auth {
        admin "$2b$12$...password_hash..."
    }
}

# 快捷反向代理块：引入基础块 + 动态参数代理到后端
(proxy) {
    import base
    reverse_proxy {args[0]}
}

# 快捷带认证反向代理块：引入基础块 + 认证 + 动态参数代理
(proxy_auth) {
    import base
    import auth_admin
    reverse_proxy {args[0]}
}

# ==================== 2. 特殊站点与基础服务 ====================

:80 {
    redir * https://{host}{uri} permanent
}

# 泛域名 404 兜底
*.s.example.com {
    import base
    respond * "404 not found" 404
}

# 静态资源博客
blog.example.com {
    import base
    root * /blog
    file_server
}

# 多域名共用同一规则
s.example.com, index.s.example.com {
    import base
    import auth_admin
    root * /html
    file_server
}

# ==================== 3. 业务服务反向代理 ====================

# 普通反代站点：一行即可搞定
openchatui.s.example.com {
    import proxy host.docker.internal:58881
}

portainer.s.example.com {
    import proxy host.docker.internal:58884
}

# 带鉴权的反代站点
comfyui.s.example.com {
    import proxy_auth host.docker.internal:58882
}

# 具备个性化安全响应头的站点
xxx.s.example.com {
    import base
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "same-origin"
        -Server
    }
    reverse_proxy host.docker.internal:9445
}
```

---

## 5. 总结与经验教训

1. **警惕隐式多 Server 割裂**：在 Caddy 中，任何监听属性（如 `bind`、端口协议等）的不一致，都会导致 Caddy 在底层生成不同的 Listener。不同 Listener 之间互不共享路由表，无法进行精准匹配覆盖。
2. **理解内核端口复用行为**：`SO_REUSEPORT` 虽然带来了平滑重启和多核并发收益，但当多个不同语义的 Server 同时监听同一端口时，内核层面的连接哈希分流会导致极难排查的“偶发性”故障。
3. **贯彻 DRY（Don't Repeat Yourself）原则**：在编写反代网关配置时，充分利用 Snippet 抽象共有逻辑（`bind`、`tls`、`log`），既能使配置文件行数缩减 40% 以上，也能从源头上防止复制粘贴造成的低级疏漏。
