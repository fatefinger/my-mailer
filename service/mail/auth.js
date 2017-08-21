/**
 * Auth Class
 * @date 2017-08-21
 * @author yangfan<yangfan@kedacom.com>
 */
'use strict'
const AuthClass = function () {
    this.hostOption = {
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
AuthClass.prototype.init = function (obj) {
    return this.hostOption = Object.assign({},this.hostOption,obj)
}
/**
 * get Auth.hostOptions
 * @returns {Auth.hostOptions|*}
 */
AuthClass.prototype.hostOptions = function () {
    return this.hostOption
}
/**
 * set Auth item on value
 * @param item
 * @param value
 * @returns {boolean}
 */
AuthClass.prototype.setHostOptions = function (item, value) {
    if (this.hostOption[item]){
        this.hostOption[item] = value
        return true
    } else {
        return false
    }
}

module.exports = new AuthClass()