# 哔哩哔哩批量取关脚本


[原脚本来源](https://www.bilibili.com/read/cv6965091/)

```javascript
/**定时器控制*/
var interControl;
/**取关计数*/
let unfollowNumber = 0;
/**定时器开关*/
let runSw = 1;

//主方法
function mainFunction() {
    let time = (Math.random() * 1000) + 300;
    console.log(`每${time}毫秒运行一次`)
    interControl = setInterval(unfollowFunc, time);
}

//取消关注
function unfollowFunc() {
    //当前关注数量
    let followNum = parseInt($('#n-gz').text());
    if (followNum == 0) {
        console.log("关注人数为0!");
        clearInterval(interControl);
    }
    console.log(`输入'runSw=0'停止,当前已经取关人数:${unfollowNumber},剩余取关人数 ${followNum}`)
    if (runSw == 0) {
        console.log('用户主动关闭');
        clearInterval(interControl);
    }
    if (followNum <= 20 && followNum > 0) {
        $('#page-follows > div > div.follow-main > div.follow-header.follow-header-info > div > div > div').children()[1].click();
        $('#page-follows > div > div.follow-main > div.follow-header.follow-header-info > div > div > div').children()[0].click();
    }
    if ($("li.be-dropdown-item:contains('取消关注')").length > 0) {
        $("li.be-dropdown-item:contains('取消关注')")[0].click();
        if ($("i.modal-header-close.iconfont.icon-ic_close").length > 5) {
            alert('删关注技能CD了,已删关注' + unfollowNumber + '个');
            clearInterval(interControl);
        }
        unfollowNumber++;
    } else {
        //下一页按钮状态
        let nextDisBtnCount = $("li.be-pager-disabled.be-pager-next").length
        let nextEnableBtnCount = $("li.be-pager-next").length
        //切页按钮数量
        let pageBtnCount = $('li.be-pager-item').length
        if (pageBtnCount >= 2) {
            $('li.be-pager-item')[1].click()
            $('li.be-pager-item')[0].click()
        }
        console.log(`状态 下一页按钮关闭${nextDisBtnCount} 下一页按钮${nextEnableBtnCount}`)
        if (nextDisBtnCount == 1 && followNum < 1) {
            console.log(`所有人取关完毕！总人数 ${unfollowNumber}`)
            clearInterval(interControl);
        } else if (nextEnableBtnCount == 1) {
            $("li.be-pager-next")[0].click();
        } else {
            console.log("翻页失败!")
            clearInterval(interControl);
        }
    }
}

//运行主方法
mainFunction();
```