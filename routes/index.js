const express = require('express')
const fs = require('fs')
const path = require('path')
const schedule = require('node-schedule')
const router = express.Router()
const nodemailer = require('nodemailer')
const conf = require('../conf/conf')

const rule = new schedule.RecurrenceRule()
rule.second = conf.SECOND_TO_SEND //测试用
// rule.hour = conf.HOUR_TO_SEND //正式用

// 邮件任务模块
const mailTask = function () {
    // 图片附件列表
    let fileList = []
    // 模板
    let htmlTemplate = ''
    // 模板存档
    let templateSaved = ''
    // 邮件内容选项
    const options = {
        from: conf.MAIL_FROM,
        to: conf.MAIL_TO,
        cc: conf.MAIL_CC,
        // bcc		: ''	//密送
        subject: conf.MAIL_SUBJECT,
        text: conf.MAIL_TEXT,
        html: '<h1>你好，这是一封来自NodeMailer的邮件！</h1>',
        attachments: []
    }
    // 邮件主机配置
    const hostOptions = {
        host: conf.SMTP_HOST,
        secureConnection:
        conf.SSL_STATE, // use SSL
        auth: {
            user: conf.AUTH_USER,
            pass:
            conf.AUTH_PWD
        }
    }
    // 创建html图片内容模板
    const createHtmlTemplate = (i, html) => {
        html += '<img src="cid:0000000' + i + '"/>'
        return html
    }
    // 创建附件列表
    const createAttachmentList = (i, filelist) => {
        let item = {
            filename: '',
            path: '',
            cid: ''
        }
        item.filename = filelist[i - 1]
        item.path = 'public/images/' + filelist[i - 1]
        item.cid = '0000000' + i
        return item
    }
    // 创建邮件传输
    const mailTransport = (hostOptions) => {
        nodemailer.createTransport(hostOptions)
    }
    // 文件目录读取
    const readdir = (path) =>{
        fs.readdir(path,function (err, files) {
            if (err) console.log(err)
            return files
        })
    }
    // 遍历生成
    const insertImage = (arr) => {
        let i = 0
        while (arr[i]){
           i++
            options.html = createHtmlTemplate(i,htmlTemplate)
            options.attachments.push(createAttachmentList(i,fileList))
        }
    }
    // 暂存html模板
    const saveTemplate = () =>{
        templateSaved = options.html
        htmlTemplate = options.html
    }
    // 发送邮件
    const sendMail = () => {
       mailTransport.sendMail(options,function (err,msg) {
           if (err) {
               console.log(err);
           }
           else {
               console.log(msg);
           }
           options.attachments = []
           options.html = templateSaved
       })
    }
    return {
    //   创建定时发送任务
        createMailTask: (rule) =>{
            schedule.scheduleJob(rule,function () {
                saveTemplate()

            })
        }
    }
}

// 附件初始化
const initFileList = function (oriHtml) {
    let testHtml = oriHtml
    // 读取 ./public/images 下的图片文件列表
    fs.readdir('./public/images', function (err, files) {
        if (err) console.log(err)
        fileList = files
        // 生成邮件正文字符串模板及附件列表
        let i = 0
        while (fileList[i]) {
            i++
            options.html = createHtmlTemplate(i, testHtml)
            options.attachments.push(createAttachmentList(i, fileList))
        }
        //发送邮件
        mailTransport.sendMail(options, function (err, msg) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(msg);
            }
            options.attachments = []
            options.html = oriHtml
        })
    })
}

// 创建定时发送任务
let sendTask = schedule.scheduleJob(rule, function () {
    let optHtml = options.html
    initFileList(optHtml)
    console.log('邮件已发送');
})

/* GET home page. */
// 配置页预留
router.get('/', function (req, res, next) {
    res.sendfile('views\\index.html')
})

module.exports = router;
