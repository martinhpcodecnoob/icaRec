const express = require('express')
const SC = require('../controllers/services.controller.js')
const { checkUserExistence } = require('../middlewares/middleware')

const servicesRouter = express.Router()

servicesRouter.post("/sendEmail/:userId", checkUserExistence, SC.sendEmail)

module.exports= servicesRouter