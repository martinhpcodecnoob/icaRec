const express = require('express')
const businessController = require('../controllers/business.controller')

const businessRouter = express.Router();

businessRouter.post("/createBusiness",businessController.create_business)

businessRouter.get("/getBusiness",businessController.get_business)

module.exports= businessRouter;