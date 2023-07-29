const mongoose = require('mongoose')

const Schema = mongoose.Schema

const accountSchema = new Schema({
    password: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
        default: 'credentials'
    },
    type: {
        type: String,
        required: true,
        default: 'oauth'
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    },
    {versionKey: false})

module.exports = mongoose.model("Account", accountSchema)