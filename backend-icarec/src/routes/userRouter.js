const express = require('express')
const userController = require('../controllers/user.controller')

const userRouter = express.Router();

userRouter.post("/createUser",userController.create_user)

userRouter.get("/getUser",userController.get_user)

module.exports= userRouter;
