# docker-compose设置拉取策略

```yaml
services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    pull_policy: always # always
```
