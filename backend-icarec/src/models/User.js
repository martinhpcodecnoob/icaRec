const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name:{
        type:String,
        required:false
    },
    last_name:{
        type:String,
        required:false
    },
    age:{
        type:Number,
        required:false
    },
    email:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model("User",userSchema)