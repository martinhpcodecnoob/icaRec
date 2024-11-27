const express = require('express')
const IC = require('../controllers/interaction.controller.js')
const { checkUserExistence, checkBusinessExistence, checkExistingInteraction, authenticateAndAuthorizeUser } = require('../middlewares/middleware.js')

const interactionRouter = express.Router()

interactionRouter.post("/createInteraction/:userId", checkUserExistence, checkBusinessExistence, checkExistingInteraction, IC.create_interaction)
interactionRouter.put("/updateInteraction", IC.update_interaction)
interactionRouter.get("/verifieldInteraction/:userId", checkUserExistence, checkBusinessExistence, checkExistingInteraction)
interactionRouter.get("/getRecommendedBusinesses/:userId", authenticateAndAuthorizeUser, IC.get_recommended_businesses)
interactionRouter.delete("/deleteRecommendedBusiness/:userId", authenticateAndAuthorizeUser, IC.delete_recommended_business)

module.exports= interactionRouter