const express = require('express')
const {uploadSignature,uploadDestroy} = require('../cloudinary/controller/upload.controller')

const cloudinaryRouter = express.Router()

cloudinaryRouter.post('/signuploadform', uploadSignature)
cloudinaryRouter.delete('/destroy',uploadDestroy)

module.exports = cloudinaryRouter