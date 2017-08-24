const recipient = require('../model/model/recipientModel')

const init = function () {
    let recip = recipient({})
    console.log(recip)
}

module.exports = new init()