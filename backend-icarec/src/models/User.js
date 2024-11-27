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
        required: false,
        default:'no dni',
        set: function(value) {
            return value === '' ? 'no dni' : value;
        }
    },
    email: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return ['hombre', 'mujer'].includes(value.toLowerCase());
            },
            message: 'El sexo debe ser "hombre" o "mujer".'
        }
    },
    role: {
        type: [String],
        required: false,
        default: ['user']
    },
    userCreationDate: {
        type: Date,
        default: Date.now
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