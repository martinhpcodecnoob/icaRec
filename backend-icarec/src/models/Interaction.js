const mongoose = require('mongoose')

const Schema = mongoose.Schema

const interactionSchema = new Schema({
    liked:{
        type: Boolean,
        required:false,
        default: false
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    business: { 
        type: Schema.Types.ObjectId, 
        ref: 'Business',
        required: true 
    },
    },
    {versionKey: false})

module.exports = mongoose.model( "Interaction", interactionSchema)