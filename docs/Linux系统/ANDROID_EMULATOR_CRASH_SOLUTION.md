# Android Studio 模拟器启动崩溃（Exit Code 139 / SIGSEGV）排查与解决方案
> 本文排查主要由 gemini4 Argon生成
## 一、 故障现象

在 Linux（Ubuntu 24.04，双显卡：AMD Radeon 核显 + NVIDIA GeForce RTX 4060 Ti 独显）环境下，从 Android Studio 启动 Android 模拟器（如 `Pixel_6a`，Android Emulator 版本 `37.1.11.0`）时，模拟器窗口短暂初始化后立即闪退。

Android Studio 日志（`~/.cache/Google/AndroidStudio2026.2.1/log/idea.log`）报错如下：

```text
INFO - Emulator: Pixel 6a - Selecting Vulkan device: NVIDIA GeForce RTX 4060 Ti, Version: 1.4.312
INFO - Emulator: Pixel 6a - Initializing VkEmulation features:
INFO - Emulator: Pixel 6a -     glInteropSupported: false
INFO - Emulator: Pixel 6a - Graphics Adapter Vendor Google (AMD)
INFO - Emulator: Pixel 6a - Graphics Adapter Android Emulator OpenGL ES Translator (AMD Radeon Graphics (radeonsi, renoir, ACO, DRM 3.61, 6.11.0-29-generic))
INFO - Emulator: Pixel 6a - Graphics API Version OpenGL ES 3.0 (4.6 (Core Profile) Mesa 25.2.8-0ubuntu0.24.04.4)
...
INFO - Emulator: Pixel 6a - Process finished with exit code 139 (interrupted by signal 11:SIGSEGV)
WARN - Emulator: Pixel 6a - Emulator terminated with exit code 139
```

---

## 二、 根本原因分析

通过解析模拟器 Crashpad 生成的核心转储文件（`/tmp/android-w/emu-crash-37.1.11.db/completed/*.dmp`）并反汇编调用栈，定位到崩溃是由**双显卡/多驱动动态加载耗尽 glibc 动态 TLS 槽位**与 **Android Emulator 自带 `libtcmalloc_minimal.so.4` 的 TLS 编译缺陷**共同触发的**无限递归栈溢出（Stack Overflow）**。

### 1. 直接崩溃点还原

- **崩溃线程**：在 `dlopen` 加载 `libGLX_mesa.so.0` 与 `libgallium-25.2.8-0ubuntu0.24.04.4.so` 后首次执行 `operator new` 的线程。
- **崩溃指令 (`RIP`)**：`/home/w/Android/Sdk/emulator/lib64/libtcmalloc_minimal.so.4 + 0x3986b`（`__libc_realloc` / `tc_realloc` 函数入口压栈指令 `mov %rdi, -0x4d0(%rbp)`）。
- **崩溃地址 (`exc_addr`)**：`0xda3007ffe90`，越过该线程 2MB 栈空间下界 `0xda300800000`，触发栈保护页缺页异常（`SIGSEGV`）。
- **死循环调用链**（每次递归消耗 `0x700` = 1792 字节栈空间，重复上千次直至栈耗尽）：

```text
operator new()                                     (libtcmalloc_minimal.so.4 + 0x38223)
  -> tcmalloc::allocate_full_cpp_throw_oom()       (libtcmalloc_minimal.so.4 + 0x3babd)
    -> tcmalloc::ThreadCache::GetCache()           (libtcmalloc_minimal.so.4 + 0x1d031)
      -> tcmalloc::ThreadCache::CreateCacheIfNecessary() (libtcmalloc_minimal.so.4 + 0x2ec03)
        -> __tls_get_addr()                        (ld-linux-x86-64.so.2 + 0x1785c)
          -> _dl_update_slotinfo()                 (ld-linux-x86-64.so.2 + 0x14ac4)
            -> _dl_resize_dtv()                    (ld-linux-x86-64.so.2 + 0x13cb7)
              -> realloc() / __libc_realloc()      (libtcmalloc_minimal.so.4 + 0x3a6fc)
                -> tcmalloc::ThreadCache::GetCache() (libtcmalloc_minimal.so.4 + 0x1d031)
                  -> tcmalloc::ThreadCache::CreateCacheIfNecessary() (无限递归)
```

### 2. 触发条件一：双显卡驱动与多 Vulkan ICD 动态加载超出 `DTV_SURPLUS`（14）上限

在 `glibc`（`ld-linux-x86-64.so.2`）中，每个线程的动态线程向量（DTV, Dynamic Thread Vector）初始容量为：
$$\text{初始 TLS 模块数} + \text{DTV\_SURPLUS (默认固定为 14)}$$

1. 模拟器启动时，进程初始链接了 **15 个**包含 `PT_TLS` 段的动态库，因此线程 DTV 初始容量为 $15 + 14 = 29$。
2. 随后，Vulkan Loader 扫描 `/usr/share/vulkan/icd.d/` 下的全部 9 个 ICD 配置文件，通过 `dlopen` 依次加载了 `libvulkan_gfxstream.so`、`libvulkan_asahi.so`、`libLLVM.so.20.1`、`libnvidia-tls.so`、`libnvidia-gpucomp.so`、`libvulkan_radeon.so`、`libnvidia-glvkspirv.so`、`libnvidia-rtcore.so` 等带 `PT_TLS` 段的驱动库，并选中 **NVIDIA GeForce RTX 4060 Ti** 作为 Vulkan 设备。
3. 接着初始化 OpenGL 时，由于桌面 X11（`DISPLAY=:1`）跑在 AMD 核显上，`libGL.so.1` 又通过 `dlopen` 加载了 `libGLX_mesa.so.0`（第 29 个 TLS 模块，占满最后一个预留槽位）和 **`libgallium-25.2.8-0ubuntu0.24.04.4.so`（第 30 个 TLS 模块，即第 15 个动态加载的 TLS 模块）**。
4. 这不仅导致 **Vulkan 跑在 NVIDIA 独显、OpenGL 跑在 AMD 核显（`glInteropSupported: false`）**，而且使进程动态加载的 `PT_TLS` 库数量突破了 `DTV_SURPLUS = 14` 的上限，迫使 `glibc` 在下次调用 `__tls_get_addr` 时必须调用 `_dl_resize_dtv` -> `realloc()` 扩容 DTV 数组。

### 3. 触发条件二：Android Emulator 自带 `libtcmalloc_minimal.so.4` 的 TLS 模型编译缺陷

反汇编 `/home/w/Android/Sdk/emulator/lib64/libtcmalloc_minimal.so.4` 的 `tcmalloc::ThreadCache::CreateCacheIfNecessary()` 可见：

```asm
2ebf7: 48 8d 3d 7a 81 21 00  lea    0x21817a(%rip),%rdi        # 246d78 (R_X86_64_DTPMOD64)
2ebfe: e8 bd 65 fe ff        call   151c0 <__tls_get_addr@plt>
2ec03: 48 8b 80 18 00 00 00  mov    0x18(%rax),%rax
```

- `tcmalloc` 为了防止 `CreateCacheIfNecessary()` 在初始化线程缓存时发生递归分配，定义了函数内的局部线程变量 `static __thread ThreadCache** current_heap_p`（位于 `.tbss + 0x18`）。
- 然而 Google 在编译该库时，只给 `threadlocal_data_`（位于 `.tbss + 0x0`）标记了 `initial-exec` TLS 模型（GOT `0x246e80` 处已有 `R_X86_64_TPOFF64` 静态偏移），却**漏掉了 `current_heap_p` 的 `initial-exec` 属性**，导致编译器生成了调用 `__tls_get_addr@plt` 的 `local-dynamic` 代码。
- 当线程首次分配内存进入 `CreateCacheIfNecessary()` 时，在设置防递归指针 `current_heap_p = &heap`（`0x2ec43`）**之前**，先在 `0x2ebfe` 调用了 `__tls_get_addr@plt`；而此时 `glibc` 因 DTV 槽位不足调用 `realloc()`，请求再次回到 `tcmalloc` 的 `tc_realloc` -> `CreateCacheIfNecessary()`，从而形成 100% 必现的无限递归。

---

## 三、 解决方案

推荐同时或任选执行以下**方案一**与**方案二**。

### 方案一：为模拟器配置 NVIDIA 独显与指定 Vulkan ICD 包装脚本（推荐）（实测成功）

通过环境变量指定仅加载 NVIDIA Vulkan ICD 并启用 NVIDIA PRIME OpenGL 卸载：
1. 避免 `libvulkan` 和 `libGL` 动态加载无关的 `asahi`、`radeon`、`lvp`、`gfxstream`、`libGLX_mesa`、`libgallium` 等驱动，使动态 `PT_TLS` 模块数远低于 14，不触发 DTV 扩容。
2. 使 Vulkan 与 OpenGL ES 统一运行在 **NVIDIA GeForce RTX 4060 Ti** 独显上，解决 `glInteropSupported: false` 的跨显卡割裂问题。

**操作步骤**：

将 `/home/w/Android/Sdk/emulator/emulator` 包装为带环境变量启动的脚本：

```bash
cd /home/w/Android/Sdk/emulator
mv emulator emulator.real

cat << 'EOF' > emulator
#!/usr/bin/env bash
export __NV_PRIME_RENDER_OFFLOAD=1
export __GLX_VENDOR_LIBRARY_NAME=nvidia
export VK_DRIVER_FILES=/usr/share/vulkan/icd.d/nvidia_icd.json
export VK_ICD_FILENAMES=/usr/share/vulkan/icd.d/nvidia_icd.json
exec "$(dirname "$0")/emulator.real" "$@"
EOF

chmod +x emulator
```

*(注：若希望统一使用 AMD 核显而非 NVIDIA 独显，则只需将 `VK_DRIVER_FILES` 设为 `/usr/share/vulkan/icd.d/radeon_icd.json`，无需设置 `__NV_PRIME_RENDER_OFFLOAD` 和 `__GLX_VENDOR_LIBRARY_NAME`。)*

---

### 方案二：原地修复 `libtcmalloc_minimal.so.4` 的 `__tls_get_addr` 递归缺陷（根治）

由于 `/home/w/Android/Sdk/emulator/lib64/libtcmalloc_minimal.so.4` 带有 `STATIC_TLS` 标志，且其 GOT 表 `0x246e80` 处已经由动态链接器重定位了 `.tbss` 段首地址相对于 `%fs:0` 的静态偏移（`R_X86_64_TPOFF64`），而整个库中仅有 `CreateCacheIfNecessary()` 内的 4 处指令调用了 `0x151c0 <__tls_get_addr@plt>`。

因此，可以直接将 PLT 桩函数 `0x151c0`（16 字节）替换为直接读取 `%fs:0 + *(int64_t*)0x246e80` 并返回（共 14 字节指令），彻底消除对 `glibc` `__tls_get_addr` 的调用：

**替换后的汇编逻辑（位于文件偏移 `0x151c0`）**：
```asm
151c0: 48 8b 05 b9 1c 23 00  mov    0x231cb9(%rip), %rax   # 读取 0x246e80 处的静态 TLS 偏移 (TPOFF64)
151c7: 31 ff                 xor    %edi, %edi             # %rdi = 0
151c9: 64 48 03 07           add    %fs:(%rdi), %rax       # 加上 %fs:0 线程控制块线性基址
151cd: c3                    ret                           # 返回 .tbss 基址
151ce: 66 90                 xchg   %ax, %ax               # nop 填充对齐至 16 字节
```

**一键备份并修复脚本**：

```bash
cp /home/w/Android/Sdk/emulator/lib64/libtcmalloc_minimal.so.4 \
   /home/w/Android/Sdk/emulator/lib64/libtcmalloc_minimal.so.4.bak

python3 -c '
path = "/home/w/Android/Sdk/emulator/lib64/libtcmalloc_minimal.so.4"
with open(path, "rb") as f:
    data = bytearray(f.read())

# 验证 0x151c0 原始 PLT 指令: jmp *0x232442(%rip); push $0xbe; jmp 0x145d0
expected = bytes.fromhex("ff254224230068be000000e900f4ffff")
assert data[0x151c0:0x151d0] == expected, "Unexpected bytes at 0x151c0"

# 写入静态 TLS 寻址指令: mov 0x231cb9(%rip), %rax; xor %edi, %edi; add %fs:(%rdi), %rax; ret; nop
patch = bytes.fromhex("488b05b91c230031ff64480307c36690")
data[0x151c0:0x151d0] = patch

with open(path, "wb") as f:
    f.write(data)
print("Successfully patched libtcmalloc_minimal.so.4")
'
```

---

### 方案三：修改 AVD 虚拟机的渲染模式（临时规避，不推荐长期使用）

如果不想修改 SDK 目录文件，也可以编辑对应虚拟机的配置文件（如 `~/.android/avd/Pixel_6a.avd/config.ini`），将硬件加速模式从 `auto` 改为软件渲染：

```ini
hw.gpu.enabled=yes
hw.gpu.mode=swiftshader_indirect
```

*(缺点：放弃硬件 GPU 加速后模拟器帧率与图形性能会明显下降，且通过 Android Studio 更新/重建 AVD 时需要重新设置。)*
