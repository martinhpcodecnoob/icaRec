const express = require('express')
const authController = require('../controllers/auth.controller.js')
const { checkUserExistence } = require('../middlewares/middleware.js')

const authRouter = express.Router()

authRouter.post("/login", authController.login)
authRouter.post("/register", authController.register)
authRouter.post("/generateToken/:userId", checkUserExistence, authController.generateToken)

module.exports= authRouter