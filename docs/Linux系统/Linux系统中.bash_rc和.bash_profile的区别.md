# Linux系统中.bash_rc和.bash_profile的区别

`.bash_profile` 和 `.bashrc` 是两个用于配置 Bash shell 环境的文件，它们的区别在于何时以及如何被加载：

### .bash_profile
- **加载时机**：仅在登录 shell（login shell）启动时加载。
- **用途**：主要用于配置用户登录时的环境变量和初始化脚本。
- **典型位置**：`~/.bash_profile` 或 `~/.profile`。
- **示例**：
  ```bash
  # .bash_profile
  export PATH=$PATH:$HOME/bin
  export EDITOR=vim
  ```

### .bashrc
- **加载时机**：在非登录 shell（non-login shell）启动时加载，例如打开一个新的终端窗口。
- **用途**：主要用于配置交互式 shell 会话的环境变量和别名等。
- **典型位置**：`~/.bashrc`。
- **示例**：
  ```bash
  # .bashrc
  alias ll='ls -la'
  export PS1='[\u@\h \W]\$ '
  ```

### 结合使用
通常情况下，`~/.bash_profile` 会调用 `~/.bashrc`，这样无论是登录 shell 还是非登录 shell，都会加载 `~/.bashrc` 中的配置。例如：
```bash
# .bash_profile
if [ -f ~/.bashrc ]; then
  source ~/.bashrc
fi
```

### 总结
- **`.bash_profile`**：主要用于设置登录时的环境。
- **`.bashrc`**：主要用于设置交互式 shell 会话的环境。
  
通过这种方式，可以确保所有 shell 会话都具有一致的配置。