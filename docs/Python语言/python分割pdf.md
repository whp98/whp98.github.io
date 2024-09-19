# python分割pdf

```shell
pip install PyPDF2
```
以下代码适应于 PyPDF2 3.0.0 以上版本
```python
from PyPDF2 import PdfReader,  PdfWriter
import os

def split_pdf(pdf,output_dir):
    real_dir = os.path.join(output_dir, os.path.basename(pdf))
    with open(pdf, 'rb') as f:
        pdf_reader = PdfReader(f)
        # Get the number of pages in the PDF
        num_pages = len(pdf_reader.pages)
        # Split the PDF into individual pages
        
        if not os.path.exists(real_dir):
            os.makedirs(real_dir)
        step  = 100
        for i in range(0, num_pages, step):
            page_obj_list = pdf_reader.pages[i:i+step]
            new_file = PdfWriter()
            for page1 in page_obj_list:
                new_file.add_page(page1)
            with open(os.path.join(real_dir, f"{i+1}_{i+step}.pdf"), "wb") as output_pdf:
                new_file.write(output_pdf)
    return real_dir
if __name__ == "__main__":
    split_pdf('sss.pdf','output1')
```