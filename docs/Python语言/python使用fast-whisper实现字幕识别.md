# python使用fast-whisper实现字幕识保存


## 具体代码实现

[wisper请参考](./python语音识别fast-whisper.md)

```python
import pysubs2
import wisper
import os
from tqdm import tqdm
def subtitle(file_name,segments,info):
    """
    使用片段生成subtitle
    """
    results= []
    timestamps = 0.0  # for progress bar
    with tqdm(total=info.duration, unit=" audio seconds") as pbar:
        for i, segment in enumerate(segments, start=1):
            segment_dict = {'start':segment.start,'end':segment.end,'text':segment.text}
            results.append(segment_dict)
            pbar.update(segment.end - timestamps)
            timestamps = segment.end
        if timestamps < info.duration: # silence at the end of the audio
            pbar.update(info.duration - timestamps)
    subs = pysubs2.load_from_whisper(results)
    #save srt file
    subs.save(file_name+'.srt')
    #save ass file
    subs.save(file_name+'.ass')
    #save vtt file
    subs.save(file_name+'.vtt')

def subtitle_generate(audio_path,subdir,subname):
    """
    使用whisper生成subtitle
    """
    segments,info =  wisper.wisper_generate(audio_path)
    if os.path.exists(subdir) == False:
        os.makedirs(subdir)
    subtitle(os.path.join(subdir,subname),segments,info)

if __name__ == '__main__':
    subtitle_generate('test-cn.mp3','output','subtitles')
```