# rsync的使用

rsync是linux的数据同步工具

有如下有优点:
1. 快速
2. 可以增量同步
3. 压缩传输
4. 保留权限
5. 保留软连接


## 用途1:部署应用

### 举例:部署一个前端
```shell
 rsync -avz --delete --chmod=ugo+rwX web/dist/ root@$DEPLOY_HOST:/usr/share/nginx/html/
```

###  gitlab ci 部署使用的镜像
docker pull instrumentisto/rsync-ssh

## 用途2:同步或备份数据

将远程的目录`/root`同步到本地的./备份

```shell
rsync -avz -e "ssh -i ./ssh.key" root@$HOST:/root/  ./备份/
```

## 用途3:本地数据迁移

本地/home 迁移到新的硬盘/mnt/new_home
```shell
sudo rsync -av /home/ /mnt/new_home
```