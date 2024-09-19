# 使用mark-pdf转markdown

## 项目地址
https://github.com/VikParuchuri/marker

## 操作
```shell
pip install --upgrade  marker-pdf
```
```python
def convert_pdf_list(pdf_file_path_list, markdown_file_dir):
    for pdf_file_path in pdf_file_path_list:
        convert_pdf_to_markdown(pdf_file_path, markdown_file_dir)

def convert_pdf_to_markdown(pdf_file_path, markdown_file_dir):
    try:
        command = [
            'marker_single',
            pdf_file_path,
            markdown_file_dir,
            #'--parallel_factor 10',
            # '--max_pages 10 ',
            #'--batch_multiplier 2 ',
        ]
        print(" ".join(command))
        subprocess.run(command, check=True)
    except Exception as e:
        print(f"Error converting PDF to Markdown: {e}")

```