const express = require('express')
const BC = require('../controllers/business.controller')
const { checkUserExistence,validateUserSchema, authenticateAndAuthorizeUser } = require('../middlewares/middleware')

const businessRouter = express.Router()

businessRouter.post("/createBusiness/:userId", authenticateAndAuthorizeUser, validateUserSchema, BC.create_business)
businessRouter.get("/getBusiness", BC.get_business)

businessRouter.get("/getBusinessByUser/:userId", authenticateAndAuthorizeUser, BC.getBusinessByUser)
businessRouter.get("/splitBusiness", BC.splitBusiness) //por el momento no se usa esta ruta
businessRouter.get("/getAllBusiness", BC.get_all_businesses)
businessRouter.get("/getAllBusinessServices", BC.get_all_business_services)
businessRouter.delete('/deleteBusiness/:userId',authenticateAndAuthorizeUser, BC.delete_business)
businessRouter.put('/updateBusiness/:userId',authenticateAndAuthorizeUser, validateUserSchema, BC.update_business)
/* businessRouter.put('/updateBusiness/:userId',checkUserExistence, BC.update_business) */
businessRouter.get('/getIdBusiness/:businessId', BC.get_id_business)
businessRouter.get('/getTotalIdsBusiness/',BC.get_all_Idsbusiness)
businessRouter.get('/getServiceForBusiness/:servicio',BC.getBusinessForServices)
module.exports= businessRouter
