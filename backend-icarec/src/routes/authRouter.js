const express = require('express')
const authController = require('../controllers/auth.controller.js')

const authRouter = express.Router()

authRouter.post("/login", authController.login)
authRouter.post("/register", authController.register)
authRouter.post("/test", authController.test)

module.exports= authRouter