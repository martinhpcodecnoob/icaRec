const Interaction = require("../models/Interaction")

const create_interaction = async(req,res) =>{
    try {
        const user = req.user
        const business = req.business
        const newInteraction = new Interaction({
            liked: true,
            business: business._id,
            user: user._id,
        })
        await newInteraction.save()
        return res.status(200).json(newInteraction)
    } catch (error) {
        return res.status(500).json({
            created:false,
            message:"Interaction not created",
            error
        })
    }
}

const update_interaction = async (req, res) => {
    try {
        const { interactionId, liked } = req.body

      if (!interactionId) {
        return res.status(400).json({ updated: false, message: 'Interaction ID is required.' })
      }
  
      if(liked === undefined || liked === null || (liked !== true && liked !== false)){
        return res.status(400).json({ updated: false, message: 'The value of the "liked" parameter must be true or false.' })
      } 

      const existingInteraction = await Interaction.findById(interactionId)
      if (!existingInteraction) {
        return res.status(404).json({ message: "Interaction not found" })
      }
  
      const updatedInteraction = await Interaction.findByIdAndUpdate(
        interactionId,
        { liked },
        { new: true } // Devuelve la interacción actualizada en la respuesta en vez de usar el .save()
      )
  
      return res.status(200).json({ updated: true, message: "Interaction updated successfully.", updatedInteraction })
    } catch (error) {
      return res.status(500).json({
        updated: false,
        message: "Interaction not updated",
        error,
      })
    }
  }

module.exports = {
    create_interaction,
    update_interaction,
}