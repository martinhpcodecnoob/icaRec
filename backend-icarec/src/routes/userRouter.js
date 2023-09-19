const express = require('express')
const UC = require('../controllers/user.controller')
const { authenticateAndAuthorizeUser, verifyAdminRole } = require('../middlewares/middleware')

const userRouter = express.Router()

userRouter.post("/createUser", UC.create_user)
userRouter.get("/getUsers/:userId", authenticateAndAuthorizeUser, verifyAdminRole, UC.get_users)
userRouter.post("/getUser", UC.get_user)
userRouter.put("/updateUser", UC.update_user)
userRouter.get("/getUserById/:userId", UC.get_user_by_id)


module.exports= userRouter
