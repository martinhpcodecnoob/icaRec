const Business = require("../models/Business")
const mongoose = require('mongoose');

const get_business = async (req, res) => {
  try {
    const { business_name } = req.body
    const currentBusiness = await Business.find({
      business_name
    })
    return res.status(200).json({
      found: true,
      business: currentBusiness
    })
  } catch (error) {
    return res.status(500).json({
      found: false,
      message: "Business not found",
      error
    })
  }
}

const get_all_businesses = async (req, res) => {
  try {
    const businessesWithLikes = await Business.aggregate([
      {
        $lookup: {
          from: "interactions",
          localField: "_id",
          foreignField: "business",
          as: "interactions",
        },
      },
      {
        $addFields: {
          totalLikes: {
            $size: {
              $filter: {
                input: "$interactions",
                as: "interaction",
                cond: { $eq: ["$$interaction.liked", true] }
              }
            }
          }
        }
      },
      {
        $project: {
          interactions: 0
        }
      }
    ])
    return res.status(200).json({ businesses: businessesWithLikes })
  } catch (error) {
    return res.status(500).json({
      error: "Error retrieving businesses",
    })
  }
}

const create_business = async (req, res) => {
  try {
    const {
      business_name,
      business_location,
      location_coordinates,
      description,
      cellphone,
      facebook,
      website,
      schedule,
      services,
      images
    } = req.body
    const user = req.user
    const newBusiness = new Business({
      business_name,
      business_location,
      location_coordinates,
      description,
      cellphone,
      facebook,
      website,
      schedule,
      services,
      images,
      owner: user._id,
    })
    await newBusiness.save()
    user.businesses.push(newBusiness)
    await user.save()
    return res.status(200).json(newBusiness)
  } catch (error) {
    return res.status(500).json({
      created: false,
      message: "Business not created",
      error
    })
  }
}

const delete_business = async (req, res) => {
  try {
    const userId = req.user.id;
    const businessIdToDelete = req.query.businessId;

    const deletedBusiness = await Business.findOneAndDelete({
      _id: businessIdToDelete,
      owner: userId
    })

    if (!deletedBusiness) {
      return res.status(404).json({
        deleted: false,
        message: "Negocio no encontrado o no autorizado"
      })
    }

    return res.status(200).json({
      deleted: true,
    })

  } catch (error) {
    return res.status(500).json({
      deleted: false,
      message: "Error al intentar eliminar el negocio.",
      error
    })
  }
}

const update_business = async (req, res) => {
  try {
    const user = req.user
    const { businessId, updates } = req.body

    const updatedBusiness = await Business.findOneAndUpdate(
      {
        _id: businessId,
        owner: user._id
      },
      updates,
      { new: true }
    )

    if (!updatedBusiness) {
      return res.status(404).json({
        updated: false,
        message: "Business not found or you are not authorized to update it"
      })
    }

    return res.status(200).json({
      updated: true,
      business: updatedBusiness
    })
  } catch (error) {
    return res.status(500).json({
      updated: false,
      message: "Error updating business",
      error
    })
  }
}
const getBusinessByUser = async (req, res) => {
  try {
    const userId = req.user.id

    const businesses = await Business.find({ owner: userId })

    if (!businesses) {
      return res.status(404).json({ message: 'No se encontraron negocios para este usuario.' })
    }

    res.status(200).json({ businesses })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los negocios del usuario.' })
  }
}
const get_all_business_services = async (req, res) => {
  try {
    const result = await Business.aggregate([
      {
        $unwind: "$services"
      },
      {
        $group: {
          _id: null,
          allServices: { $addToSet: { $toLower: "$services" } }
        }
      },
      {
        $project: {
          _id: 0,
          services: "$allServices"
        }
      }
    ])

    if (result.length > 0) {
      return res.status(200).json({ services: result[0].services })
    } else {
      return res.status(400).json({ services: [] })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const splitBusiness = async (req, res) => {
  try {
    const splitValue = parseInt(req.query.split)
    const pageValue = parseInt(req.query.page)

    if (isNaN(splitValue) || splitValue <= 0 || isNaN(pageValue) || pageValue <= 0) {
      res.status(400).send('Los parámetros "split" y "page" deben ser números válidos y mayores que cero.')
      return
    }

    const skipValue = (pageValue - 1) * splitValue

    const pipeline = [
      {
        $lookup: {
          from: "interactions",
          localField: "_id",
          foreignField: "business",
          as: "interactions",
        },
      },
      {
        $addFields: {
          totalLikes: {
            $size: {
              $filter: {
                input: "$interactions",
                as: "interaction",
                cond: { $eq: ["$$interaction.liked", true] },
              },
            },
          },
        },
      },
      {
        $project: {
          interactions: 0,
        },
      },
      {
        $skip: skipValue,
      },
      {
        $limit: splitValue,
      },
    ]

    const business = await Business.aggregate(pipeline)

    const totalResults = await Business.countDocuments()

    const totalPages = Math.ceil(totalResults / splitValue)

    return res.status(200).json({
      page: pageValue,
      result: business,
      total_pages: totalPages,
      total_results: totalResults,
    })
  } catch (error) {
    return res.status(500).json({
      error: "Error al intentar dividir los negocios.",
    })
  }
}

const get_id_business = async (req, res) => {
  const { businessId } = req.params;
  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(businessId)
    if (!isValidObjectId) {
      return res.status(404).json({ error: "ID de Negocio invalido" })
    }
    const businessesIdWithLikes = await Business.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(businessId) }
      },
      {
        $lookup: {
          from: "interactions",
          localField: "_id",
          foreignField: "business",
          as: "interactions",
        },
      },
      {
        $addFields: {
          totalLikes: {
            $size: {
              $filter: {
                input: "$interactions",
                as: "interaction",
                cond: { $eq: ["$$interaction.liked", true] }
              }
            }
          }
        }
      },
      {
        $project: {
          interactions: 0
        }
      }
    ]);
    if (businessesIdWithLikes.length === 0) {
      return res.status(404).json({ error: "Negocio no encontrado" })
    }

    return res.status(200).json({ business: businessesIdWithLikes[0] })
  } catch (error) {
    console.log("Error: ", error)
    return res.status(500).json({
      error: "Error al recuperar el",
    })
  }
}

const get_all_Idsbusiness = async (req, res) => {
  try {
    const businessIds = await Business.find({}, '_id')
    const businessIdsArray = businessIds.map(business => business.id)
    return res.status(200).json({
      totalIds: businessIdsArray.length,
      idsBusiness: businessIdsArray
    })
  } catch (error) {

  }
}

const getBusinessForServices = async (req, res) => {
  try {
    const { servicio } = req.params;

    // Utiliza la función `aggregate` de Mongoose para buscar negocios que contengan el servicio en el array 'services'
    const businessesWithLikes = await Business.aggregate([
      {
        $match: {
          services: {
            $regex: new RegExp(servicio, 'i'), // 'i' indica insensibilidad a mayúsculas y minúsculas
          },
        },
      },
      {
        $lookup: {
          from: "interactions",
          localField: "_id",
          foreignField: "business",
          as: "interactions",
        },
      },
      {
        $addFields: {
          totalLikes: {
            $size: {
              $filter: {
                input: "$interactions",
                as: "interaction",
                cond: { $eq: ["$$interaction.liked", true] },
              },
            },
          },
        },
      },
      {
        $project: {
          interactions: 0,
        },
      },
    ]);

    if (businessesWithLikes.length === 0) {
      return res
        .status(404)
        .json({ mensaje: 'No se encontraron negocios para el servicio proporcionado.' });
    }

    return res.status(200).json(businessesWithLikes);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error en el servidor', error: error });
  }
}

module.exports = {
  get_business,
  getBusinessByUser,
  get_all_businesses,
  create_business,
  get_all_business_services,
  delete_business,
  update_business,
  splitBusiness,
  get_id_business,
  get_all_Idsbusiness,
  getBusinessForServices
}