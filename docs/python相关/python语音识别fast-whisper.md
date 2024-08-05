# python语音识别fast-whisper


## 语音识别模型下载

```shell
git clone https://huggingface.co/Systran/faster-whisper-large-v3
```


## 相关使用代码如下


```python
from faster_whisper import WhisperModel

def wisper_generate(audio_path):
    path = "./faster-whisper-medium"
    model = WhisperModel(model_size_or_path=path, device="auto", compute_type="int8",
                         cpu_threads=12)
    segments, info = model.transcribe(audio=audio_path,
                                   vad_filter=True,
                                   vad_parameters=dict(min_silence_duration_ms=1000))
    print("Detected language '%s' with probability %f" % (info.language, info.language_probability))
    return segments,info
if __name__ == "__main__":
    wisper_generate('./test-cn.mp3')
    wisper_generate('./test-en.mp3')
    wisper_generate('./test-ja.wav')
```