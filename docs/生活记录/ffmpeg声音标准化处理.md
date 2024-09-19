# ffmpeg-normalize 声音标准化处理


## 安装ffmpeg-normalize
```shell
pip3 install ffmpeg-normalize
```
## 使用ffmpeg-normalize标准化声音到-14LUFS
```shell
ffmpeg-normalize ./output_temp.mp3 -o ./output.mp3 -ar 44100 --target -14 --loudness-range 50 --dual-mono -c:a libmp3lame -b:a 192k -pr --dynamic -f
```