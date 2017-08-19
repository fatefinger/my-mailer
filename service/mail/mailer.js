
const Mailer = function () {
    this.option = {
        from: '',
        to: '',
        cc: '',
        // bcc		: ''	//密送
        subject: '',
        text: '',
        html: '<h1>你好，这是一封来自my-mailer的邮件！</h1>',
        attachments: []
    }
}
/**
 * init Mailer.option
 */
Mailer.prototype.init = function (obj) {
    return Object.assign(this.option,obj)
}
/**
 * get Mailer.option
 * @return {Object}
 * @public
 */
Mailer.prototype.option = function () {
    return this.option
}.bind(this)
/**
 * get Mailer.option.html
 * @return {String}
 * @public
 */
Mailer.prototype.html = function () {
    return this.html
}.bind(this.option())
/**
 * get Mailer.option.attachments
 * @public
 * @return {Array}
 */
Mailer.prototype.attachments = function () {
    return this.attachments
}.bind(this.option())
/**
 * Accumulate on html
 * @param {String}
 * @public
 * @return {String}
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


module.exports = Mailer