# rust语言支持中文变量吗

支持

示例代码如下


```rust
use std::io;
use rand::Rng;
fn main() {
    println!("Guass the number!");
    println!("请输入出猜测的数字: ");
    let mut guess = String::new();
    let 密码 = rand::thread_rng().gen_range(1..=100);
    println!("密码是{}",密码);
    let count = io::stdin()
        .read_line(&mut guess)
        .expect("failed to read line");
    println!("你输入的是: {}", guess);
    println!("你输入了{}个字符", count);
    let x = 5;
    let y = 10;
    println!("x = {x} and y + 2 = {}", y + 2);
}
```
