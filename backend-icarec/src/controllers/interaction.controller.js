const Interaction = require("../models/Interaction")
const Business = require("../models/Business")

const create_interaction = async (req, res) => {
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
      created: false,
      message: "Interaction not created",
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

    if (liked === undefined || liked === null || (liked !== true && liked !== false)) {
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

const get_recommended_businesses = async (req, res) => {
  try {
    const userId = req.user.id

    const interactionsFound = await Interaction.find({
      user: userId,
      liked: true,
    }).populate('business')

    if (!interactionsFound) {
      return res.status(404).json({ message: "No se han encontrado interacciones" });
    }

    const allRecommendedBusinesses = await Business.aggregate([
      {
        $lookup: {
          from: "interactions",
          localField: "_id",
          foreignField: "business",
          as: "interactions",
        },
      },
      {
        $match: {
          "interactions.liked": true,
        },
      },
      {
        $addFields: {
          totalLikes: {
            $size: "$interactions",
          },
        },
      },
      {
        $project: {
          interactions: 0,
        },
      },
    ])   

    const recommendedBusinessesMap = new Map(
      allRecommendedBusinesses.map((business) => [business._id.toString(), business])
    )
    // console.log('recommendedBusinessesMap: ',recommendedBusinessesMap);
    let businessesWithLikes = interactionsFound?.map((interaction) => {
      const business = interaction.business;
      if (!business || !business._id) {
        // console.warn('Interacción con negocio nulo o sin _id:', interaction);
        // return {
        //   interactionId: interaction._id,
        //   message: "Este negocio no tiene un ID asignado",
        //   ...business ? business.toObject() : {},  // Incluir otros campos del negocio si existen
        //   totalLikes: 0,
        //   images:[],
        //   business:null
        // };
        return
      }
      const businessId = interaction.business._id.toString()
      // console.log('businessId: ',businessId);
      const totalLikes = recommendedBusinessesMap.has(businessId)
        ? recommendedBusinessesMap.get(businessId).totalLikes
        : 0

      return {
        interactionId: interaction._id,
        ...interaction.business.toObject(),
        totalLikes,
      }
    })
    // console.log('businessesWithLikes: ',businessesWithLikes);
    businessesWithLikes = businessesWithLikes.filter((ele) => {
      return ele !== undefined
    })
    return res.status(200).json({
      found: true,
      message: "Negocios recomendados encontrados",
      businessesWithLikes,
    })
  } catch (error) {
    // console.error('ERROR >>>>>>>>>> ', error);
    return res.status(500).json({
      found: false,
      message: "No se han encontrado interacciones por el servidor",
      error,
    })
  }
}

const delete_recommended_business = async (req, res) => {
  try {
    const userId = req.user.id;
    const businessIdToDelete = req.query.businessId;
    
    const result = await Interaction.deleteOne({
      user: userId,
      business: businessIdToDelete,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No se encontró la interacción para eliminar" });
    }

    return res.status(200).json({ deleted: true, message: "Negocio recomendado eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({
      deleted: false,
      message: "Error al intentar eliminar el negocio recomendado",
      error,
    });
  }
};

module.exports = {
  create_interaction,
  update_interaction,
  get_recommended_businesses,
  delete_recommended_business
}