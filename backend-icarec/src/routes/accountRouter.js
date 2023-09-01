const express = require('express')
const accountController = require('../controllers/account.controllers.js')

const accountRouter = express.Router()

accountRouter.put("/updateAccount", accountController.update_account_by_user)

module.exports= accountRouter