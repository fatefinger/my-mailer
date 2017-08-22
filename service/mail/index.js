/**
 * Mail Class
 * @date 2017-08-21
 * @author yangfan<yangfan@kedacom.com>
 */

'use strict'

const fs = require('fs')
const path = require('path')
const schedule = require('node-schedule')
const nodemailer = require('nodemailer')
const conf = require('../../conf/conf')
const Mailer = require('./mailer')
const Auth = require('./auth')
/**
 *
 * @param {Object} mailer
 * @param {Array} attachments
 * @param {Object} auth
 * @returns {{sendAll: (function()), send: (function())}}
 * @constructor create a new Mail instance
 */
const MailClass = function (mailer, attachments, auth={}) {
    this.options = Object.assign({}, {
        from: conf.MAIL_FROM,
        to: conf.MAIL_TO,
        cc: '',
        // bcc		: ''	//密送
        subject: conf.MAIL_SUBJECT,
        text: conf.MAIL_TEXT,
        html: '<h1>你好，这是一封来自my-mailer的邮件！</h1>',
        attachments: []
    }, mailer)
    this.authOptions = Object.assign({}, {
        host: conf.SMTP_HOST,
        secureConnection: conf.SSL_STATE, // use SSL
        auth: {
            user: conf.AUTH_USER,
            pass: conf.AUTH_PWD
        }
    }, auth)
    this.attachments = attachments || []
    // 图片附件列表
    this.fileList = []
    this.Mailer = Mailer.init(this.options)
    this.Auth = Auth.init(this.authOptions)
    // 邮件传输初始化
    this.mailTransport = nodemailer.createTransport(Auth.hostOptions())
    // set fileList
    this.setFileList = (value) => {
        return new Promise((resolve, reject) => {
            this.fileList = value
            resolve(this.fileList)
        })
    }
    // 模板存档
    this.templateSaved = ''
    // 创建html图片内容模板
    this.createHtmlTemplate = (i) => {
        return '<img src="cid:0000000' + i + '"/>'
    }
    // 创建附件列表
    this.createAttachmentList = (i, filelist, path) => {
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
    // 插入附件
    this.insertImage = (arr) => {
        let i = 0
        while (arr[i]) {
            i++
            Mailer.superHtml(this.createHtmlTemplate(i))
            Mailer.pushAttachment(this.createAttachmentList(i, this.fileList, conf.IMAGE_PATH))
        }
    }
    // 暂存html模板
    this.saveTemplate = () => {
        return new Promise((resolve, reject) => {
            this.templateSaved = Mailer.html()
            resolve()
        })
    }
    // 发送邮件
    this.sendMail = () => {
        this.mailTransport.sendMail(Mailer.option(), function (err, msg) {
            if (err) {
                console.log(err)
            }
            else {
                console.log(msg)
                //邮件内容与附件列表还原
            }
        })
    }
    // 复原
    this.initForm = () => {
        Mailer.initAttachment()
        Mailer.initHtml(this.templateSaved)
        console.log(this.options)
    }
}
/**
 * mail send
 * this method set a new instance for send mail
 * @public
 */
MailClass.prototype.send = function () {
    const rule = new schedule.RecurrenceRule()
    conf.MODE === 'test' ? (rule.second = conf.SECOND_TO_SEND) : (rule.hour = conf.HOUR_TO_SEND)
    schedule.scheduleJob(rule, () => {
        this.saveTemplate()
            .then(() => Mailer.attachments())
            .then(_ => this.setFileList(_))
            .then(_ => this.insertImage(_))
            .then(() => this.sendMail())
            .then(() => this.initForm())
            .then(() => {
                console.log('邮件发送成功')
            }, (err) => {
                console.log('邮件发送失败' + err)
            })
    })
}


module.exports = MailClass