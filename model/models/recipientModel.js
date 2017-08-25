const RecipientSchema = require('../schema/recipientSchema')
const mongoose = require('mongoose')

const Recipient = mongoose.model('Recipient', RecipientSchema)

module.exports = Recipient