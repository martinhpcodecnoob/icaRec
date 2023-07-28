const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    cellphone: {
        type: String,
        required: false
    },
    dni: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: [String],
        required: false,
        default: ['user']
    },
    businesses: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Business' 
        }
    ]
    },
    {versionKey: false})

module.exports = mongoose.model("User",userSchema)