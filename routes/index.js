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
    // fileList赋值
    const setFileList = (value) =>{
        return fileList = value
    }
    // 创建html图片内容模板
    const createHtmlTemplate = (i, html) => {
        html += '<img src="cid:0000000' + i + '"/>'
        return html
    }
    // 创建附件列表
    const createAttachmentList = (i, filelist, path) => {
        let item = {
            filename: '',
            path: '',
            cid: ''
        }
        item.filename = filelist[i - 1]
        item.path = path + filelist[i - 1]
        item.cid = '0000000' + i
        return item
    }
    // 创建邮件传输
    const mailTransport = (hostOptions) => {
        nodemailer.createTransport(hostOptions)
    }
    // 文件目录读取
    const readdir = (path) => {
        return new Promise(function (resolve, reject) {
            fs.readdir(path, function (err, files) {
                if (err) reject(err)
                resolve(files)
            })
        })
    }
    // 遍历生成
    const insertImage = (arr) => {
        let i = 0
        while (arr[i]) {
            i++
            options.html = createHtmlTemplate(i, htmlTemplate)
            options.attachments.push(createAttachmentList(i, fileList, 'public/images/'))
        }
    }
    // 暂存html模板
    const saveTemplate = () => {
        templateSaved = options.html
        htmlTemplate = options.html
    }
    // 发送邮件
    const sendMail = () => {
        return new Promise(function (resolve, reject) {
            mailTransport.sendMail(options, function (err, msg) {
                if (err) {
                    console.log(err);
                    reject()
                }
                else {
                    console.log(msg);
                }
                options.attachments = []
                options.html = templateSaved
                resolve()
            })
        })
    }
    return (rule) => {
            schedule.scheduleJob(rule, function () {
                saveTemplate()
                mailTransport()
                readdir('public/images/')
                    .then(setFileList(value))
                    .then(insertImage(fileList))
                    .then(sendMail())
                    .then(console.log('邮件发送成功'))
            })
        }
}

// 创建定时发送任务
mailTask(rule)

/* GET home page. */
// 配置页预留
router.get('/', function (req, res, next) {
    res.sendfile('views\\index.html')
})

module.exports = router;
