const cloudinary = require('cloudinary').v2
require('./config')

const apiSecret = cloudinary.config().api_secret
const signuploadform = (nameComplete,bussinessFolder) =>{
    const timestamp = Math.round((new Date).getTime()/1000)
    const signature = cloudinary.utils.api_sign_request({
        timestamp: timestamp,
        eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
        folder: `${nameComplete}/${bussinessFolder}`
    },apiSecret)

    return {timestamp,signature}
}

module.exports = {
    signuploadform
}