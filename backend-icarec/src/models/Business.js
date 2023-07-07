const mongoose = require('mongoose')

const Schema = mongoose.Schema

const businessSchema = new Schema({
    business_name: {
        type: String,
        required: false
    },
    business_location: {
        type: String,
        required: false
    },
    RUC: {
        type: String,
        required: false
    },
    cellphone: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    services: {
        type: [String],
        required: false
    },
    images: {
        type: [String],
        required: false
    },
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

})

module.exports = mongoose.model("Business", businessSchema)