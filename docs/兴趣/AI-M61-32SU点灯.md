# AI-M61-32SU点灯

## 下载驱动
 U8 编程器USB 转串口驱动（http://www.stcmcu.com/STCISP/CH341SER.exe ）

## 按照教程开始搞

https://bbs.ai-thinker.com/forum.php?mod=viewthread&tid=43775&extra=page%3D1


进入\AiPi-Open-Kits\AiPi-Eyes-DU，执行 make 进行编译

在开发板上按住 IO2 按键并按一下 EN 按键进入烧录模式

执行，COM4 为上面找到的 COM 口

```
make flash COMX=COM4
```
​
输出 SUCCESS 后再按一次 EN，板子成功点亮