const express = require('express')
const authController = require('../controllers/auth.controller.js')
const { checkUserExistence } = require('../middlewares/middleware.js')

const authRouter = express.Router()

authRouter.get("/verifyUserExistsWithoutCredentials", authController.verifyUserExistsWithoutCredentials)
authRouter.post("/login", authController.login)
authRouter.post("/register", authController.register)
authRouter.put("/registerWithoutCredentials", authController.registerWithoutCredentials)
authRouter.post("/generateToken/:userId", checkUserExistence, authController.generateToken)
authRouter.post("/generateRecovery", authController.generateRecoveryToken)
authRouter.post("/verifyRecoveryToken", authController.verifyRecoveryToken)
authRouter.post("/changePassword", authController.changePassword)

module.exports= authRouter