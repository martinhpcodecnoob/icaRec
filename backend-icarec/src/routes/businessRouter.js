const express = require('express')
const BC = require('../controllers/business.controller')
const { checkUserExistence,validateUserSchema, authenticateAndAuthorizeUser } = require('../middlewares/middleware')

const businessRouter = express.Router()

businessRouter.post("/createBusiness/:userId", authenticateAndAuthorizeUser, validateUserSchema, BC.create_business)
businessRouter.get("/getBusiness", BC.get_business)
businessRouter.get("/getAllBusiness", BC.get_all_businesses)
businessRouter.get("/getAllBusinessServices", BC.get_all_business_services)
businessRouter.delete('/deleteBusiness/:userId',checkUserExistence, BC.delete_business)
businessRouter.put('/updateBusiness/:userId',checkUserExistence, BC.update_business)
businessRouter.get('/getIdBusiness/:businessId', BC.get_id_business)
module.exports= businessRouter