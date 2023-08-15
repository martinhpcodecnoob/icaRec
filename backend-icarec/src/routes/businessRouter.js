const express = require('express')
const BC = require('../controllers/business.controller')
const { checkUserExistence } = require('../middlewares/middleware')

const businessRouter = express.Router()

businessRouter.post("/createBusiness/:userId", checkUserExistence, BC.create_business)
businessRouter.get("/getAllBusinessServices", BC.get_all_business_services)
businessRouter.get("/getBusiness", BC.get_business)

module.exports= businessRouter