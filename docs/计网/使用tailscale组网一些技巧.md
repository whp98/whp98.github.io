# 使用tailscale组网一些技巧

## 分布式部署系统

A电脑部署数据库，
B电脑部署程序后端，
只需要将打包的程序的数据库链接字段的ip替换成hostname即可完成组网

## exitnode 模式
设置节点为exitnode模式，即可让节点直接通过exitnode访问外网

## subnet路由
可以直接使用这个子网路由支持persec的连接
被控端为192.168.234.0/24

使用这个命令暴露子网路由，并去网页勾选这个子网路由
```powershell
 tailscale up --advertise-routes=192.168.234.0/24
```

就可以使用persec直接控制了

## 自建derp中继
使用这个命令开启纯http服务
```shell
./derper --hostname=你的域名 --stun -http-port -1 -a :18181 --verify-clients=true
```
nginx 配置域名加上https
```text
server {
    # 服务器端口使用443，开启ssl, 这里ssl就是上面安装的ssl模块
    listen  443 ssl;
    # 域名，多个以空格分开
    server_name  你的域名;
    
    # ssl证书地址
    ssl_certificate     证书.pem;  # pem文件的路径
    ssl_certificate_key  证书.key; # key文件的路径
    
    location / {
        proxy_redirect off;
        proxy_pass http://127.0.0.1:18181; # port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
https://login.tailscale.com/admin/acls/file

ACL配置节点
```json
{
	"derpMap": {
		"OmitDefaultRegions": true,
		"Regions": {
			"900": {
				"RegionID":   900,
				"RegionCode": "xxx",
				"RegionName": "xxx",
				"Nodes": [
					{
						"Name":             "1",
						"RegionID":         900,
						"HostName":         "你的域名",
						"DERPPort":         443,
						"IPv4":             "你的服务器ip",
						"STUNPort":         3478,
						"InsecureForTests": true,
					},
				],
			},
		},
	},
}
```
