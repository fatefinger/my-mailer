'use strict'

const fs = require('fs')
const path = require('path')
const schedule = require('node-schedule')
const nodemailer = require('nodemailer')
const conf = require('../../conf/conf')

const MailClass = function (option) {
    this.options = {
        mailOptions: {
            from: conf.MAIL_FROM,
            to: '',
            cc: conf.MAIL_CC,
            // bcc		: ''	//密送
            subject: conf.MAIL_SUBJECT,
            text: conf.MAIL_TEXT,
            html: '<h1>你好，这是一封来自my-mailer的邮件！</h1>',
            attachments: []
        },
        attachments:[]
    }
    this.options.mailOptions = Object.assign({}, this.options.mailOptions,option.mailOptions)
    this.options.attachments = Object.assign({}, this.options.attachments,option.attachments)

    // 邮件主机配置
    const hostOptions = {
        host: conf.SMTP_HOST,
        secureConnection:
        conf.SSL_STATE, // use SSL
        auth: {
            user: conf.AUTH_USER,
            pass: conf.AUTH_PWD
        }
    }
    // 获取主机配置
    const getHostOptions = () => {
        return hostOptions
    }
    // 邮件传输初始化
    const mailTransport = nodemailer.createTransport(getHostOptions())

    // 图片附件列表
    let fileList = []
    // set fileList
    const setFileList = (value) => {
        console.log('setFileList is beginning')
        return new Promise((resolve, reject) => {
            fileList = value
            console.log('setFileList is ending')
            resolve(fileList)
        })
    }

    // 模板存档
    let templateSaved = ''

    // 邮件内容选项
    // get Options
    const getOptions = () => {
        console.log(this.options.mailOptions)
        return this.options.mailOptions
    }
    // get options.html
    const getOptionsHtml = () => {
        return this.options.mailOptions.html
    }
    // set options.html
    const setOptionsHtml = (value) => {
        return this.options.mailOptions.html += value
    }
    // init options.html
    const initOptionsHtml = (value) => {
        return this.options.mailOptions.html = value
    }

    // push item options.attachments
    const pushOptionsAttachments = (item) => {
        return this.options.mailOptions.attachments.push(item)
    }
    // setOptionsAttachments
    const setOptionsAttachments = (value) => {
        return this.options.mailOptions.attachments = value
    }
    // get Attachments
    const getAttachments = () => {
        return new Promise((resolve,reject) =>{
            resolve(this.options.attachments)
        })
    }
    // 创建html图片内容模板
    const createHtmlTemplate = (i) => {
        return '<img src="cid:0000000' + i + '"/>'
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
    // 文件目录读取
    const readdir = (path) => {
        return new Promise(function (resolve, reject) {
            fs.readdir(path, function (err, files) {
                if (err) reject(err)
                resolve(files)
            })
        })
    }

    // 插入附件
    const insertImage = (arr) => {
        console.log('insertImage is beginning')
        let i = 0
        while (arr[i]) {
            i++
            setOptionsHtml(createHtmlTemplate(i))
            pushOptionsAttachments(createAttachmentList(i, fileList, conf.IMAGE_PATH))
        }
        console.log('insertImage is ending')
    }
    // 暂存html模板
    const saveTemplate = () => {
        templateSaved = getOptionsHtml()
    }
    // 发送邮件
    const sendMail = () => {
        console.log('sendMail is beginning')
        mailTransport.sendMail(getOptions(), function (err, msg) {
            if (err) {
                console.log('sendMail is err')
                console.log(getOptions())
                console.log(err)
            }
            else {
                console.log(msg)
                console.log('sendMail is msg')
                //邮件内容与附件列表还原
            }
        })
    }
    // 还原
    const initForm = () => {
        setOptionsAttachments([])
        initOptionsHtml(templateSaved)
        console.log(this.options)
    }
    return {
        sendAll: () => {
            const rule = new schedule.RecurrenceRule()
            conf.MODE === 'test' ? (rule.second = conf.SECOND_TO_SEND) : (rule.hour = conf.HOUR_TO_SEND)
            schedule.scheduleJob(rule, function () {
                saveTemplate()
                readdir(conf.IMAGE_PATH)
                    .then(_ => setFileList(_))
                    .then(_ => insertImage(_))
                    .then(() => sendMail())
                    .then(() => initForm())
                    .then(() => {
                        console.log('邮件发送成功')
                    }, (err) => {
                        console.log('邮件发送失败' + err)
                    })
            })
        },
        send: () =>{
            const rule = new schedule.RecurrenceRule()
            conf.MODE === 'test' ? (rule.second = conf.SECOND_TO_SEND) : (rule.hour = conf.HOUR_TO_SEND)
            schedule.scheduleJob(rule,() =>{
                saveTemplate()
                getAttachments()
                    .then(_ => setFileList(_))
                    .then(_ => insertImage(_))
                    .then(() => sendMail())
                    .then(() => initForm())
                    .then(() => {
                        console.log('邮件发送成功')
                    }, (err) => {
                        console.log('邮件发送失败' + err)
                    })
            })
        }
    }
}

module.exports = MailClass