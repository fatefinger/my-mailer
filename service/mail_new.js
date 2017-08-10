'use strict'

const fs = require('fs')
const path = require('path')
const schedule = require('node-schedule')
const nodemailer = require('nodemailer')
const conf = require('../conf/conf')
// 私有方法声明
const getHostOptions = Symbol('getHostOptions')
const mailTransport = Symbol('mailTransport')
const setFileList = Symbol('setFileList')
const getOptions = Symbol('getOptions')
const getOptionsHtml = Symbol('getOptionsHtml')
const setOptionsHtml = Symbol('setOptionsHtml')
const pushOptionsAttachments = Symbol('pushOptionsAttachments')
const setOptionsAttachments = Symbol('setOptionsAttachments')
const createHtmlTemplate = Symbol('createHtmlTemplate')
const createAttachmentList = Symbol('createAttachmentList')
const readDir = Symbol('readDir')
const insertImage = Symbol('insertImage')
const saveTemplate = Symbol('saveTemplate')
const sendMail = Symbol('sendMail')
let hostOptions = Symbol('hostOptions')
let fileList = Symbol('fileList')
let templateSaved = Symbol('templateSaved')
// 主机配置
 hostOptions = {
    host: conf.SMTP_HOST,
    secureConnection:
    conf.SSL_STATE, // use SSL
    auth: {
        user: conf.AUTH_USER,
        pass:
        conf.AUTH_PWD
    }
}
 fileList = [] // 图片附件列表
 templateSaved = '' // 模板存档

class Mail {
    // constructor
    constructor(options) {
        this.options = Object.assign({
            from: conf.MAIL_FROM,
            to: conf.MAIL_TO,
            cc: conf.MAIL_CC,
            // bcc		: ''	//密送
            subject: conf.MAIL_SUBJECT,
            text: conf.MAIL_TEXT,
            html: '<h1>你好，这是一封来自my-mailer的邮件！</h1>',
            attachments: []
        }, options)
    }

//    private
    // 获取主机配置
    [getHostOptions](){
        return hostOptions
    }
    // 邮件传输初始化
    [mailTransport]() {
       return nodemailer.createTransport(this[getHostOptions])
    }
    // set fileList
    [setFileList](value){
        return new Promise((resolve, reject) => {
            fileList = value
            resolve(fileList)
        })
    }
    // 邮件内容选项
    // get Options
    [getOptions](){
        return this.options
    }
    // get options.html
    [getOptionsHtml](){
        return this.options.html
    }
    // set options.html
    [setOptionsHtml](value){
        return this.options.html += value
    }
    // push item options.attachments
    [pushOptionsAttachments](item){
        return this.options.attachments.push(item)
    }
    // setOptionsAttachments
    [setOptionsAttachments](value){
        return this.options.attachments = value
    }

    // 创建html图片内容模板
    [createHtmlTemplate](i){
        return '<img src="cid:0000000' + i + '"/>'
    }
    // 创建附件列表
    [createAttachmentList](i, filelist, path){
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
    [readDir](path){
        return new Promise(function (resolve, reject) {
            fs.readdir(path, function (err, files) {
                if (err) reject(err)
                resolve(files)
            })
        })
    }
    // 插入附件
    [insertImage](arr){
        let i = 0
        while (arr[i]) {
            i++
            this[setOptionsHtml](this[createHtmlTemplate](i))
            this[pushOptionsAttachments](this[createAttachmentList](i, fileList, conf.IMAGE_PATH))
        }
    }
    // 暂存html模板
    [saveTemplate](){
        templateSaved = this[getOptionsHtml]()
    }
    // 发送邮件
    [sendMail](){
        this[mailTransport]().sendMail(this[getOptions](), function (err, msg) {
            if (err) {
                console.log(err)
            }
            else {
                console.log(msg)
                //邮件内容与附件列表还原
                this[setOptionsAttachments]([])
                this[setOptionsHtml](templateSaved)
            }
        })
    }
//    public
    send() {
        const rule = new schedule.RecurrenceRule()
        conf.MODE === 'test' ? (rule.second = conf.SECOND_TO_SEND) : (rule.hour = conf.HOUR_TO_SEND)
        schedule.scheduleJob(rule, function () {
            this[saveTemplate]()
            this[readDir](conf.IMAGE_PATH)
                .then(_ => this[setFileList](_))
                .then(_ => this[insertImage](_))
                .then(() => this[sendMail]())
                .then(() => {
                    console.log('邮件发送成功')
                }, (err) => {
                    console.log('邮件发送失败' + err)
                })
        })
    }

}

module.exports = Mail