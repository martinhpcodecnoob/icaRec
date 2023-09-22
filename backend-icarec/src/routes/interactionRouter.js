const express = require('express')
const IC = require('../controllers/interaction.controller.js')
const { checkUserExistence, checkBusinessExistence, checkExistingInteraction } = require('../middlewares/middleware.js')

const interactionRouter = express.Router()

interactionRouter.post("/createInteraction/:userId", checkUserExistence, checkBusinessExistence, checkExistingInteraction, IC.create_interaction)
interactionRouter.put("/updateInteraction", IC.update_interaction)
interactionRouter.get("/verifieldInteraction/:userId", checkUserExistence, checkBusinessExistence, checkExistingInteraction)

module.exports= interactionRouter