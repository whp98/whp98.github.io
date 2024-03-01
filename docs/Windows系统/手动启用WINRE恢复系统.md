# 手动启用WINRE恢复系统

本文参考 https://blog.xen.lol/2020/04/26/windows-recovery/


## 步骤

1. 压缩C盘2G并新建NTFS分区

使用Windows磁盘管理工具

压缩C盘 2048M

在空闲分区新建磁盘并格式化，这里盘符是G盘


2. 复制恢复镜像并注册
   
使用 如下的操作 
```cmd
Microsoft Windows [版本 10.0.19045.4123]
(c) Microsoft Corporation。保留所有权利。

C:\Windows\system32>mkdir G:\Recovery\WindowsRE

C:\Windows\system32>xcopy /h C:\Recovery\WindowsRE\winre.wim G:\Recovery\WindowsRE
C:\Recovery\WindowsRE\winre.wim
复制了 1 个文件

C:\Windows\system32>C:\Windows\System32\Reagentc /setreimage /path G:\Recovery\WindowsRE
目录设置为: \\?\GLOBALROOT\device\harddisk2\partition5\Recovery\WindowsRE

REAGENTC.EXE: 操作成功。

```

3. 取消挂载2G的恢复分区并启用winre

```powershell
PS C:\Windows\system32> reagentc /info
Windows Recovery Environment (Windows RE) and system reset configuration
Information:

    Windows RE status:         Disabled
    Windows RE location:
    Boot Configuration Data (BCD) identifier: 3b8d20ae-532c-11ec-974d-da6acdd4c584
    Recovery image location:
    Recovery image index:      0
    Custom image location:
    Custom image index:        0

REAGENTC.EXE: Operation Successful.

PS C:\Windows\system32> diskpart

Microsoft DiskPart version 10.0.19041.3636

Copyright (C) Microsoft Corporation.
On computer: ABCX-PC

DISKPART> select disk 2

Disk 2 is now the selected disk.

DISKPART> list disk

  Disk ###  Status         Size     Free     Dyn  Gpt
  --------  -------------  -------  -------  ---  ---
  Disk 0    Online         1863 GB      0 B        *
  Disk 1    Online         1863 GB      0 B        *
* Disk 2    Online          953 GB  2048 KB        *

DISKPART> list partition

  Partition ###  Type              Size     Offset
  -------------  ----------------  -------  -------
  Partition 1    Reserved            16 MB  1024 KB
  Partition 2    System             350 MB    17 MB
  Partition 3    Primary            253 GB   367 MB
  Partition 5    Primary           2047 MB   254 GB
  Partition 4    Primary            697 GB   256 GB

DISKPART> select partition 5

Partition 5 is now the selected partition.

DISKPART> remove

DiskPart successfully removed the drive letter or mount point.

DISKPART> set id=de94bba4-06d1-4d40-a16a-bfd50179d6ac

DiskPart successfully set the partition ID.

DISKPART> gpt attributes=0x8000000000000001

DiskPart successfully assigned the attributes to the selected GPT partition.

DISKPART> exit

Leaving DiskPart...
PS C:\Windows\system32> C:\Windows\System32\Reagentc /info
Windows Recovery Environment (Windows RE) and system reset configuration
Information:

    Windows RE status:         Disabled
    Windows RE location:
    Boot Configuration Data (BCD) identifier: 3b8d20ae-532c-11ec-974d-da6acdd4c584
    Recovery image location:
    Recovery image index:      0
    Custom image location:
    Custom image index:        0

REAGENTC.EXE: Operation Successful.

PS C:\Windows\system32>
PS C:\Windows\system32> C:\Windows\System32\Reagentc /enable
REAGENTC.EXE: Operation Successful.

PS C:\Windows\system32>
```