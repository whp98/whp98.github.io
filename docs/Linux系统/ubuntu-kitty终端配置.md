# ubuntu-kitty终端配置

## apt安装kitty包

```bash
sudo apt install kitty
```

## 安装字体
```bash
sudo apt install fonts-jetbrains-mono
```
## 配置输入法使用ibus

```bash
mkdir -p /home/w/.config/environment.d/
code /home/w/.config/environment.d/glfw.conf
```

输入

```conf
GLFW_IM_MODULE=ibus
```

## 修改配置

`code ~/.config/kitty/kitty.conf`


```conf
# ══════════════════════════════════════════════════════════════
#   Kitty Terminal Config —— 美观 + 实用
#   放置路径: ~/.config/kitty/kitty.conf
#   使用 Catppuccin Mocha 配色（深色、护眼、对比适中）
# ══════════════════════════════════════════════════════════════


# ─────────────────────────────
# 字体设置
# ─────────────────────────────
# 推荐先安装 Nerd Font（自带图标字形，配合 powerline/starship 更好看）:
#   sudo apt install fonts-jetbrains-mono
# 或手动下载 JetBrains Mono Bold 放入 ~/.local/share/fonts
font_family      JetBrains Mono Regular
bold_font        auto
italic_font      auto
bold_italic_font auto
font_size        8

# 中文/emoji 混排时字距更协调
disable_ligatures never
adjust_line_height  105%
adjust_column_width 0

# ─────────────────────────────
# 光标
# ─────────────────────────────
cursor_shape            beam
cursor_beam_thickness   1.5
cursor_blink_interval    0.5
cursor_stop_blinking_after 15.0

# ─────────────────────────────
# 窗口 & 布局
# ─────────────────────────────
window_padding_width      10
placement_strategy        center
hide_window_decorations   no
confirm_os_window_close    0

# 背景透明 + 毛玻璃质感（KDE/GNOME 支持合成时效果最佳）
background_opacity        0.92
background_blur           20
dynamic_background_opacity yes

initial_window_width   1000
initial_window_height  650

# 窗口间隔（多窗格分屏时）
window_margin_width    0
single_window_margin_width -1

# ─────────────────────────────
# 标签页（Tab Bar）
# ─────────────────────────────
tab_bar_edge            top
tab_bar_style           powerline
tab_powerline_style     slanted
tab_bar_min_tabs        1
tab_title_template       "{index}: {title}"
active_tab_font_style    bold-italic
inactive_tab_font_style  normal

# ─────────────────────────────
# 滚动 & 历史记录
# ─────────────────────────────
scrollback_lines          10000
scrollback_pager_history_size 50
wheel_scroll_multiplier    5.0
touch_scroll_multiplier    1.0

# ─────────────────────────────
# 鼠标 & URL
# ─────────────────────────────
mouse_hide_wait          3.0
url_style                curly
detect_urls               yes
copy_on_select            yes
strip_trailing_spaces     smart

# ─────────────────────────────
# 性能
# ─────────────────────────────
repaint_delay    10
input_delay      3
sync_to_monitor  yes

# ─────────────────────────────
# Shell 集成（推荐开启，支持跳转上一条命令/命令状态标记）
# ─────────────────────────────
shell_integration enabled

# ─────────────────────────────
# 键位绑定（实用向：分屏、标签、字号、剪贴板）
# ─────────────────────────────
map ctrl+shift+enter   new_window
map ctrl+shift+t       new_tab
map ctrl+shift+q       close_tab
map ctrl+shift+w       close_window
map ctrl+shift+right   next_tab
map ctrl+shift+left    previous_tab
map ctrl+shift+1       goto_tab 1
map ctrl+shift+2       goto_tab 2
map ctrl+shift+3       goto_tab 3
map ctrl+shift+4       goto_tab 4

# 窗格分屏（vim 式方向键）
map ctrl+shift+d       new_window_with_cwd
map ctrl+shift+]       next_window
map ctrl+shift+[       previous_window
map ctrl+shift+f       move_window_forward
map ctrl+shift+b       move_window_backward

# 字号调整
map ctrl+shift+equal   change_font_size all +1.0
map ctrl+shift+minus   change_font_size all -1.0
map ctrl+shift+0       change_font_size all 0

# 复制粘贴
map ctrl+shift+c       copy_to_clipboard
map ctrl+shift+v       paste_from_clipboard

# 快速清屏 & 重载配置
map ctrl+shift+k       clear_terminal scroll active
map ctrl+shift+r       load_config_file
map ctrl+shift+equal   increase_font_size

# 搜索历史输出（需要 kitten 支持，自带）
map ctrl+shift+h       show_scrollback

# ─────────────────────────────
# 配色方案：Catppuccin Mocha
# ─────────────────────────────
foreground              #CDD6F4
background              #1E1E2E
selection_foreground    #1E1E2E
selection_background    #F5E0DC

cursor                  #F5E0DC
cursor_text_color       #1E1E2E

url_color               #F5E0DC

active_border_color     #B4BEFE
inactive_border_color   #6C7086
bell_border_color       #F9E2AF

active_tab_background   #B4BEFE
active_tab_foreground   #11111B
inactive_tab_background #181825
inactive_tab_foreground #A6ADC8
tab_bar_background      #11111B

# 标准 16 色
color0  #45475A
color8  #585B70

color1  #F38BA8
color9  #F38BA8

color2  #A6E3A1
color10 #A6E3A1

color3  #F9E2AF
color11 #F9E2AF

color4  #89B4FA
color12 #89B4FA

color5  #F5C2E7
color13 #F5C2E7

color6  #94E2D5
color14 #94E2D5

color7  #BAC2DE
color15 #A6ADC8

# ─────────────────────────────
# 其他实用小项
# ─────────────────────────────
enable_audio_bell        no
visual_bell_duration      0.1
remember_window_size      yes
allow_remote_control      yes
update_check_interval     0
```