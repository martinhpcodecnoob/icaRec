const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name:{
        type:String,
        required:false
    },
    last_name: {
        type: String,
        required: false
    },
    age:{
        type:Number,
        required:false
    },
    city: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    cellphone: {
        type: String,
        required: false
    },
    dni: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    role: {
        type: [String],
        required: false
    },

    business: {
        type: Schema.Types.ObjectId,
        ref: 'Business'
    }
})

module.exports = mongoose.model("User",userSchema)