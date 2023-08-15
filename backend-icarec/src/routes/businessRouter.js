const express = require('express')
const BC = require('../controllers/business.controller')
const { checkUserExistence } = require('../middlewares/middleware')

const businessRouter = express.Router()

businessRouter.post("/createBusiness/:userId", checkUserExistence, BC.create_business)

businessRouter.get("/getBusiness", BC.get_business)

businessRouter.put('/updateBusiness/:userId/:businessId',checkUserExistence, BC.update_business)
module.exports= businessRouter