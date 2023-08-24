const mongoose = require('mongoose')

const Schema = mongoose.Schema

const imageSchema = new Schema({
    url_cloudinary:{
        type:String,
        required: false
    },
    public_id:{
        type:String,
        required:false
    }
})

const businessSchema = new Schema({
    business_name: {
        type: String,
        required: false
    },
    business_location: {
        type: String,
        required: false
    },
    location_coordinates:{
        latitude:{
            type:String,
            required:false
        },
        longitude:{
            type:String,
            required:false
        }
    },
    RUC: {
        type: String,
        required: false
    },
    cellphone: {
        type: String,
        required: false
    },
    facebook:{
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    schedule:{
        type:String,
        required: false
    },
    services: {
        type: [String],
        required: false
    },
    images: {
        type: [imageSchema],
        required: false
    },
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },

})

module.exports = mongoose.model("Business", businessSchema)