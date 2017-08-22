# nodejs_nodemailer

写给啸豪的邮件定时发送工具
# 准备
去nodejs官网下载安装nodejs 6.XX.XX版本即可，安装后

# 安装
 进入package.json所在目录下执行以下命令，等待安装成功
> npm install


# 运行

> node bin/www


# 配置

 conf/conf.js

# 测试

conf/conf.js 中MODE = 'test'时为测试模式

const test =  (data, callBack) => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange =  () => {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                let res = JSON.parse(xhr.responseText)
                callBack(res)
            } else {
                console.log('request is not successful : ' + xhr.status)
            }
        }
    }
    xhr.open('post', '/v1/mail', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(data)
}
const assert = (data) => {
    console.assert(typeof data.id === number, '返回值id不为数字')
    console.assert(data.status === 'success','返回值status不为success')
    console.log('测试结束')
}
let testData = {name: 'yangfan', address: '15601752941@163.com'}
test(JSON.stringify(testData), assert)