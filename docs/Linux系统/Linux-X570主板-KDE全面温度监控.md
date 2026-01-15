# Linux-X570主板-KDE全面温度监控

## 编辑 GRUB 配置文件

编辑 GRUB 配置文件：`sudo nano /etc/default/grub`
找到 GRUB_CMDLINE_LINUX_DEFAULT 行，在引号内添加 `acpi_enforce_resources=lax`。
更新 GRUB 并重启：
Ubuntu/Debian: `sudo update-grub`
Fedora/Arch: `sudo grub-mkconfig -o /boot/grub/grub.cfg`

## 加载微星常用芯片组内核模块

`sudo modprobe nct6775`
永久生效
`echo "nct6775" | sudo tee -a /etc/module`

## 查看传感器读数
`sensor`


```text
nct6797-isa-0a20
Adapter: ISA adapter
in0:                     1.19 V  (min =  +0.00 V, max =  +1.74 V)
in1:                   968.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM
in2:                     3.33 V  (min =  +0.00 V, max =  +0.00 V)  ALARM
in3:                     3.25 V  (min =  +0.00 V, max =  +0.00 V)  ALARM
in4:                     1.01 V  (min =  +0.00 V, max =  +0.00 V)  ALARM
in5:                   144.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM
in6:                   792.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM
in7:                     3.33 V  (min =  +0.00 V, max =  +0.00 V)  ALARM
in8:                     3.23 V  (min =  +0.00 V, max =  +0.00 V)  ALARM
in9:                     1.78 V  (min =  +0.00 V, max =  +0.00 V)  ALARM
in10:                  912.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM
in11:                  712.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM
in12:                  840.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM
in13:                  600.00 mV (min =  +0.00 V, max =  +0.00 V)  ALARM
in14:                    1.50 V  (min =  +0.00 V, max =  +0.00 V)  ALARM
fan1:                     0 RPM  (min =    0 RPM)
fan2:                  1443 RPM  (min =    0 RPM)
fan3:                  1425 RPM  (min =    0 RPM)
fan4:                     0 RPM  (min =    0 RPM)
fan5:                     0 RPM  (min =    0 RPM)
fan6:                     0 RPM  (min =    0 RPM)
fan7:                  4340 RPM  (min =    0 RPM)
SYSTIN:                 +33.0°C  (high = +80.0°C, hyst = +75.0°C)  sensor = CPU diode
CPUTIN:                 +34.0°C  (high = +115.0°C, hyst = +90.0°C)  sensor = thermistor
AUXTIN0:                +37.5°C  (high = +115.0°C, hyst = +90.0°C)  sensor = thermistor
AUXTIN1:                +31.0°C    sensor = thermistor
AUXTIN2:                +42.0°C    sensor = thermistor
AUXTIN3:                 -1.0°C    sensor = thermistor
SMBUSMASTER 0:          +43.5°C  
PCH_CHIP_CPU_MAX_TEMP:   +0.0°C  
PCH_CHIP_TEMP:           +0.0°C  
PCH_CPU_TEMP:            +0.0°C  
PCH_MCH_TEMP:            +0.0°C  
Agent0 Dimm0:            +0.0°C  
TSI0_TEMP:              +43.8°C  
intrusion0:            ALARM
intrusion1:            ALARM
beep_enable:           disabled

```

然后重启就可以使用系统资源监视器使用这个传感器了。

