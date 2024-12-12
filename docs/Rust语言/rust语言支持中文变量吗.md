# rust语言支持中文变量吗

支持

示例代码如下

## 混有中文变量的猜数字游戏

```rust
use rand::Rng;
use std::cmp::Ordering;
use std::io;
fn main() {
    let 密码 = rand::thread_rng().gen_range(1..=100);
    //println!("密码是{}", 密码);
    loop {
        println!("请输入出猜测的数字: ");
        let mut guess = String::new();
        let count = io::stdin().read_line(&mut guess).expect("读取输入失败!");
        print!("你输入的是: {}", guess);
        println!("你输入了{}个字符", count);
        // 先判断是否输入 "exit" 或 "quit"
        if guess.trim() == "exit" || guess.trim() == "quit" {
            println!("退出游戏！");
            break;
        }
        //数据类型转换
        //数据类型判断，忽略非数字输入
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            //忽略非数字输入
            Err(_) => continue,
        };
        match guess.cmp(&密码) {
            Ordering::Less => println!("太小!"),
            Ordering::Greater => println!("太大!"),
            Ordering::Equal => {
                println!("你赢了!");
                break;
            }
        }
    }
}

```
