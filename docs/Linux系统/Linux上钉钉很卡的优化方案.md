# Linux上钉钉很卡的优化方案

参考资料gemini

编辑文件

`code /opt/apps/com.alibabainc.dingtalk/files/Elevator.sh`


找到最后部分

```bash
# preload_libs 
echo preload_libs=${preload_libs}
if [ ! -z "${preload_libs}" ]; then
    LD_PRELOAD="${preload_libs}" ./com.alibabainc.dingtalk $1 --enable-gpu-rasterization --enable-zero-copy --ignore-gpu-blocklist --disable-gpu-driver-bug-workarounds
else
    ./com.alibabainc.dingtalk $1
fi

```

主要增加了这些 `--enable-gpu-rasterization --enable-zero-copy --ignore-gpu-blocklist --disable-gpu-driver-bug-workarounds`

启用这些硬件加速参数之后明显变快了.
