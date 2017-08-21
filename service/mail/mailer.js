/**
 * Mailer Class
 * @date 2017-08-21
 * @author yangfan<yangfan@kedacom.com>
 */
'use strict'

const MailerClass = function (obj) {
    this.options = Object.assign({
        from: '',
        to: '',
        cc: '',
        // bcc		: ''	//密送
        subject: '',
        text: '',
        html: '<h1>你好，这是一封来自my-mailer的邮件！</h1>',
        attachments: []
    }, obj)
}
/**
 * get Mailer.option
 * @returns {Object}
 * @public
 */
MailerClass.prototype.option = () => {
    return this.options
}
/**
 * init Mailer.option
 * @params {Object}
 * @returns {Object}
 */
MailerClass.prototype.init = (obj) => {
    return this.options = Object.assign({},this.options, obj)
}
/**
 * get Mailer.option.html
 * @returns {String}
 * @public
 */
MailerClass.prototype.html = () => {
    return this.options.html
}
/**
 * get Mailer.option.attachments
 * @public
 * @returns {Array}
 */
MailerClass.prototype.attachments = () => {
    return this.options.attachments
}
/**
 * Accumulate on html
 * @param {String} value
 * @public
 * @returns {String}
 */
MailerClass.prototype.superHtml = (value) => {
    return this.options.html += value
}
/**
 * This method init Mailer.option.html
 * @public
 */
MailerClass.prototype.initHtml = (value) => {
    return this.options.html = value
}
/**
 * This method push item to Mailer.option.attachments
 * @param {Object} item
 * @public
 */
MailerClass.prototype.pushAttachment = (item) => {
    return this.options.attachments.push(item)
}
/**
 * This method init Mailer.option.attachment
 * @public
 */
MailerClass.prototype.initAttachment = () => {
    return this.options.attachments = []
}
/**
 * set this.attachments on value
 * @param {Array} value
 * @returns {Array} this.attachments
 * @public
 */
MailerClass.prototype.setAttachment = (value) => {
    return this.options.attachments = value
}

module.exports = new MailerClass()