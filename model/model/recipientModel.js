const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost:27017/my-mailer')

const RecipientSchema= new mongoose.Schema({
    name:String,   //define an attribution name of typing String
    address:String,
    time:Date,
    images:[{file:String,path:String,url:String}]
}, {safe: true})

const RecipientModel = db.model('Recipient', RecipientSchema)

RecipientSchema.methods.getAll = () => {
    return this.model('Recipient').find()
}


const RecipientEntity = (options) => {
    return new RecipientModel(options)
}

module.exports = RecipientEntity
