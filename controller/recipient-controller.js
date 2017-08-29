const Recipient = require('../model/models/recipientModel')
const _ = require('underscore')


module.exports = {
    list: (cb) => {
        Recipient.fetch(cb)
    },
    add: (recipientOptions, next) => {
        const _recipient = new Recipient(recipientOptions)
        _recipient.save(function (err, recipient) {
            if (err) {
                console.log(err)
            } else {
                console.log(recipient)
            }
        })
    },
    delete: (recipientOptions, next) => {

    }

}