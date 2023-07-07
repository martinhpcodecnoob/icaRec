const express = require('express')
const UC = require('../controllers/user.controller')

const userRouter = express.Router();

userRouter.post("/createUser", UC.create_user)

userRouter.get("/getUser", UC.get_user)

module.exports= userRouter;
