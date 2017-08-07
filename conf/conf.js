//邮件发送时间
const sendSec = 20 // 每分钟的第20秒 测试用
const sendHour = 5 // 每日凌晨五点
// 邮件发送信息
const smtpHost = 'smtp.kedacom.com' // SMTP服务器
const ssl = false // 非SSL方式发送
const user = 'yangfan@kedacom.com' // 邮件发送人
const pwd = 'keda%yf' // 邮件发送人授权码
// 邮件内容信息
const mailFrom = '"杨帆" <yangfan@kedacom.com>' // 邮件发送人
const mailTo = '"杨帆" <15601752941@163.com>' // 邮件收件人（多个收件人请用,隔开，例:'"杨帆"<15601752941@163.com>,"杨帆"<yangfan@kedacom.com>'）
const cc = '' // 邮件抄送对象
const subject = '一封测试用的邮件' // 邮件标题
const text = '一封测试用的邮件aaa' // 邮件正文

module.exports = {
    SECOND_TO_SEND: sendSec,
    HOUR_TO_SEND: sendHour,
    SMTP_HOST: smtpHost,
    SSL_STATE: ssl,
    AUTH_USER: user,
    AUTH_PWD: pwd,
    MAIL_FROM: mailFrom,
    MAIL_TO: mailTo,
    MAIL_CC: cc,
    MAIL_SUBJECT: subject,
    MAIL_TEXT: text
}