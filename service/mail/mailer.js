/**
 * Mailer Class
 * @date 2017-08-21
 * @author yangfan<yangfan@kedacom.com>
 */
'use strict'

const Mailer = function (obj) {
    this.option = Object.assign({
        from: '',
        to: '',
        cc: '',
        // bcc		: ''	//密送
        subject: '',
        text: '',
        html: '<h1>你好，这是一封来自my-mailer的邮件！</h1>',
        attachments: []
    },obj)
}
/**
 * init Mailer.option
 * @params {Object}
 * @returns {Object}
 */
Mailer.prototype.init = function (obj) {
    return Object.assign(this.options,obj)
}
/**
 * get Mailer.option
 * @returns {Object}
 * @public
 */
Mailer.prototype.option = function () {
    return this.option
}.bind(this)
/**
 * get Mailer.option.html
 * @returns {String}
 * @public
 */
Mailer.prototype.html = function () {
    return this.html
}.bind(this.option())
/**
 * get Mailer.option.attachments
 * @public
 * @returns {Array}
 */
Mailer.prototype.attachments = function () {
    return this.attachments
}.bind(this.option())
/**
 * Accumulate on html
 * @param {String}
 * @public
 * @returns {String}
 */
Mailer.prototype.superHtml = function (value) {
    return this.html += value
}.bind(this.option())
/**
 * This method init Mailer.option.html
 * @public
 */
Mailer.prototype.initHtml = function (value) {
    return this.html = value
}.bind(this.option())
/**
 * This method push item to Mailer.option.attachments
 * @param {Object}
 * @public
 */
Mailer.prototype.pushAttachment = function (item) {
    return this.attachments().push(item)
}.bind(this)
/**
 * This method init Mailer.option.attachment
 * @public
 */
Mailer.prototype.initAttachment = function () {
    return this.attachments = []
}.bind(this.option())
/**
 * set this.attachments on value
 * @param {Array} value
 * @returns {Array} this.attachments
 * @public
 */
Mailer.prototype.setAttachment = function (value) {
    return this.attachments = value
}.bind(this.option())

module.exports = new Mailer()