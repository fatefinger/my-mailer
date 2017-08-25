const mongoose = require('mongoose')

const RecipientSchema= new mongoose.Schema({
    name:{type: String,required: true},   //define an attribution name of typing String
    address: {type: String,required: true},
    time:Date,
    images:[{file:String,path:String,url:String}]
}, {safe: true})

RecipientSchema.statics = {
    fetch: function (cb) {
        return this.find({})
            .sort('meta.createAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this.findOne({_id: id})
            .sort('meta.createAt')
            .exec(cb)
    },
    findByName: function (name, cb) {
        return this.findOne({name: name})
            .sort('meta.createAt')
            .exec(cb)
    }
}

module.exports = RecipientSchema