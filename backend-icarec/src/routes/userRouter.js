const express = require('express')
const UC = require('../controllers/user.controller')
const { verifyTokenExpiration } = require('../middlewares/middleware')


const userRouter = express.Router()

userRouter.post("/createUser", UC.create_user)
userRouter.get("/getUser", verifyTokenExpiration, UC.get_user)
userRouter.get("/getUserById/:userId", UC.get_user_by_id)


module.exports= userRouter
