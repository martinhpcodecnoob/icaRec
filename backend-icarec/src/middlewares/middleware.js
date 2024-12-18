const jwt = require('jsonwebtoken')

const User = require("../models/User")
const Business = require('../models/Business')
const Interaction = require("../models/Interaction")
const SavedBusiness = require("../models/SavedBusiness")

const checkUserExistence = async (req, res, next) => {
  const userId = req.params.userId
  if (!userId) {
    return res.status(400).json({
      message: 'Missing userId parameter'
    })
  }
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Server Error',
      error
    })
  }
}

const checkBusinessExistence = async (req, res, next) => {
  const businessId = req.query.businessId
  if (!businessId) {
    return res.status(400).json({
      message: 'Missing businessId query parameter'
    })
  }
  try {
    const business = await Business.findById(businessId)
    if (!business) {
      return res.status(404).json({
        message: 'Business not found'
      })
    }
    req.business = business
    next()
  } catch (error) {
    console.log("checkBusinessExistence: ", error)
    return res.status(500).json({
      message: 'Server Error',
      error
    })
  }
}

const checkExistingInteraction = async (req, res, next) => {
  try {
    const user = req.user
    const business = req.business

    const existingInteraction = await Interaction.findOne({
      user: user._id,
      business: business._id,
    });

    if (existingInteraction) {
      return res.status(201).json({
        message: "An interaction already exists for this user and business.",
        details: {
          idInteraction: existingInteraction._id,
          liked: existingInteraction.liked
        }
      });
    }
    next()
  } catch (error) {
    return res.status(500).json({
      message: "Error checking for existing interaction.",
      error,
    })
  }
}

const checkExistingSaveds = async(req,res,next) => {
  try {
    const user = req.user
    const business = req.business

    const existingSaved = await SavedBusiness.findOne({
      user:user._id,
      business:business._id
    })
    
    //aqui en este caso verificamos si el guardado esta habilitado si o no
    if (existingSaved) {
      return res.status(201).json({
        message:"An saved already exists for this user and business.",
        details:{
          idSaved: existingSaved._id,
          saved: existingSaved.saved
        }
      })
    }
    //creamos una condicion que muestre si no existe un registro de guardado de ese negocio
    //entonces solo devoilvemos false pero sin el id ya que no existe

    // if (!existingSaved) {
    //   return res.status(201).json({
    //     message:"There is no related save between the user and the business",
    //     details:{
    //       saved: false
    //     }
    //   })
    // }

    req.existingSaved = existingSaved
    next()

  } catch (error) {
    return res.status(500).json({
      message:"Error checking for existing Saved.",
      error
    })
  }
}

const reponseNotExistingSave = (req, res) => {
  const existingSaved = req.existingSaved
  if (!existingSaved) {
      return res.status(201).json({
        message:"There is no related save between the user and the business",
        details:{
          saved: false
        }
      })
    }
}

const validateUserSchema = (req, res, next) => {
  const userValidationErrors = req.user.validateSync()

  if (userValidationErrors) {
    return res.status(400).json({
      message: "User validation failed",
      errors: userValidationErrors.errors
    })
  }

  next()
}

const authenticateAndAuthorizeUser = (req, res, next) => {
  const sessionToken = req.headers.authorization

  if (!sessionToken) {
    return res.status(401).json({ message: 'Token de sesión no proporcionado' })
  }

  jwt.verify(sessionToken, process.env.SECRET, async (err, decodedToken) => {
    if (err) {
      console.log("Error de token")
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token de sesión expirado' })
      } else {
        return res.status(401).json({ message: 'Token de sesión inválido' })
      }
    }

    // Verifica la existencia del usuario
    try {
      const user = await User.findById(decodedToken.sub)
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      // Almacena el usuario en req.user
      req.user = user

      // Verifica si el userId coincide con el token
      if (decodedToken.sub !== req.params.userId) {
        console.log("No coinciden usuarios")
        return res.status(401).json({ message: 'No tienes permiso para acceder a esta ruta' })
      }

      next()
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Error del servidor', error })
    }
  })
}


const verifyAdminRole = (req, res, next) => {
  const user = req.user
  if (!user) {
    return res.status(401).json({ message: 'Usuario no autenticado.' })
  }
  const roles = user.role
  console.log("Los roles son los siguientes: ", roles)
  const isAdmin = roles.includes('admin')
  if (!isAdmin) {
    return res.status(403).json({ message: 'Solo los administradores pueden acceder a este recurso.' })
  }
  next()
}

module.exports = {
  checkUserExistence,
  checkBusinessExistence,
  checkExistingInteraction,
  validateUserSchema,
  authenticateAndAuthorizeUser,
  verifyAdminRole,
  checkExistingSaveds,
  reponseNotExistingSave
}
