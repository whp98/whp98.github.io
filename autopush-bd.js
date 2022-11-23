const Axios = require('axios');
const FileSystem = require('fs');
const { type } = require('os');
const path = require("path");

const config = {
    postDirLinux: 'docs\.vitepress\dist',
    postDirWin: 'docs/.vitepress/dist',
    basePostUrl: 'https://blog.jsfr.work',
    targetHost: 'http://data.zz.baidu.com/urls?site=https://blog.jsfr.work&token=hvnE5Z5hOYPIKkyo',
    fixedUrls: [
        'https://blog.jsfr.work'
    ]
};

function collectUrls() {
    let baseDir = path.join(config.postDirWin,'')
    const posts = listFile(baseDir,config.postDirWin);
    return posts.map(post => `${config.basePostUrl}${post}`).concat(config.fixedUrls);
}

function listFile(baseDir,dir,list=[]){
	let arr = FileSystem.readdirSync(dir);
	arr.forEach(function(item){
		let fullpath = path.join(dir,item);
		let stats = FileSystem.statSync(fullpath);
		if(stats.isDirectory()){
			listFile(baseDir,fullpath,list);
		}else{
            list.push(fullpath.replace(baseDir,'').replace(new RegExp("\\\\", "g"),'/'))
		}
	});
	return list;
}



function concatUrls(urls) {
    let result = '';
    urls.forEach(url => { result += encodeURI(`${url}`) +'\n'; });
    return result;
}

async function commitData(data) {
    try {
        const result = await Axios({
            url: config.targetHost,
            method: 'post',
            headers: {
              'Content-Type': 'plain/text'
            },
            method: 'post',
            data: data
        });
        const ret = result.data;
        console.log('commit success');
        console.log(`- success: ${ret.success}`);
        console.log(`- remain: ${ret.remain}`);
    } catch(e) {
        console.log('failed to commit');
    }
}

(async function() {
    const urls = collectUrls();
    const data = concatUrls(urls);
    console.log(data)
    await commitData(data);
})();