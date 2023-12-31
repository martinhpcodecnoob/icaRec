const express = require('express')
const authController = require('../controllers/auth.controller.js')
const { checkUserExistence, authenticateAndAuthorizeUser } = require('../middlewares/middleware.js')

const authRouter = express.Router()

authRouter.get("/verifyUserExistsWithoutCredentials", authController.verifyUserExistsWithoutCredentials)
authRouter.post("/login", authController.login)
authRouter.post("/register", authController.register)
authRouter.put("/registerWithoutCredentials", authController.registerWithoutCredentials)
authRouter.post("/generateAccessAndRefreshTokens/:userId", checkUserExistence, authController.generateAccessAndRefreshTokens)
authRouter.post("/renewAccessToken", authController.renewAccessToken)
authRouter.post("/generateRecovery", authController.generateRecoveryToken)
authRouter.post("/verifyRecoveryToken", authController.verifyRecoveryToken)
authRouter.post("/changePassword", authController.changePassword)
authRouter.delete("/deleteAccountAndUser/:userId", authenticateAndAuthorizeUser, authController.deleteAccountAndUser)

module.exports= authRouter