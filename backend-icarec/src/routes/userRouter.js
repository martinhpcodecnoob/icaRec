const express = require('express')
const userController = require('../controllers/user.controller')

const userRouter = express.Router();

userRouter.post("/create",userController.create_user)

userRouter.get("/getuser",userController.get_user)

module.exports= userRouter;
