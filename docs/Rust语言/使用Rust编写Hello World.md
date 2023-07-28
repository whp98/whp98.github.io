# 使用Rust编写Hello World

使用Rust编写一个打印"Hello World!"的程序helloworld.rs非常简单:

\`\`\`rust
fn main() {
    println!("Hello World!"); 
}
\`\`\`

让我来解释下:

- \`fn main()\` 声明了一个主函数(program entry point)
- \`println!\` 是一个宏(macro),会将参数打印到标准输出
- \`"Hello World!"\`是一个字面量(literal),会被打印出来

为了编译这个程序,我们需要:

1. 创建文件helloworld.rs

2. 安装Rust编译器rustc

3. 在命令行运行:

    \`\`\`
    rustc helloworld.rs
    \`\`\`
    
    这会生成一个可执行文件helloworld(或者helloworld.exe在Windows)
    
4. 然后执行:

    \`\`\`
    ./helloworld
    \`\`\`
    
    就可以在终端看到打印出的 "Hello World!" 了。
    
对于一个最简单的Rust程序来说,编写main函数,并使用println宏来打印输出就是全部了。

Rust的编译器会进行必要的类型检查、借用检查等来保证程序的内存安全。

这就是使用Rust编写一个简单的打印文本程序的方法。