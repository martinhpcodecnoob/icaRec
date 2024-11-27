const express = require('express')
const SBC = require('../controllers/savedbusiness.controllers')
const { checkUserExistence, checkBusinessExistence, 
        checkExistingInteraction, authenticateAndAuthorizeUser,
        checkExistingSaveds,reponseNotExistingSave
        } = require('../middlewares/middleware.js')

const savedbusinessRouter = express.Router()

savedbusinessRouter.post('/createSavedBusiness/:userId', checkUserExistence, checkBusinessExistence,checkExistingSaveds, SBC.create_savedBusiness)
savedbusinessRouter.get('/getSavedBusiness/:userId', authenticateAndAuthorizeUser, SBC.get_saved_business)
savedbusinessRouter.get('/verifieldSaveds/:userId', checkUserExistence, checkBusinessExistence, checkExistingSaveds,reponseNotExistingSave)
savedbusinessRouter.put("/updateSaved", SBC.update_saved)
savedbusinessRouter.delete("/deleteSavedBusiness/:userId", authenticateAndAuthorizeUser, SBC.delete_saved_business)

module.exports = savedbusinessRouter