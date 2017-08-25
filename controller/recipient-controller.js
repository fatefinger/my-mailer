const Recipient = require('../model/models/recipientModel')
const _ = require('underscore')

module.exports = {
    list: () => {
        Recipient.fetch(
            (err, recipients) => {
                let resultRecipients = _.map(recipients, function (recipient) {
                        if (err) {
                            console.log(err)
                        } else {

                        }
                    }
                )
                return resultRecipients
            })
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
    }

}