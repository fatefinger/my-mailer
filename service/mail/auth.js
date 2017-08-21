/**
 * Auth Class
 * @date 2017-08-21
 * @author yangfan<yangfan@kedacom.com>
 */
'use strict'
const Auth = function () {
    this.hostOptions = {
        host: '',
        secureConnection: false, // use SSL
        auth: {
            user: '',
            pass: ''
        }
    }
}
/**
 * init method
 * @param obj
 * @returns {*}
 */
Auth.prototype.init = function (obj) {
    return Object.assign(this.hostOptions,obj)
}.bind(this)
/**
 * get Auth.hostOptions
 * @returns {Auth.hostOptions|*}
 */
Auth.prototype.hostOptions = function () {
    return this.hostOptions
}.bind(this)
/**
 * set Auth item on value
 * @param item
 * @param value
 * @returns {boolean}
 */
Auth.prototype.setHostOptions = function (item, value) {
    if (this.hostOptions[item]){
        this.hostOptions[item] = value
        return true
    } else {
        return false
    }
}.bind(this)

module.exports = new Auth()