const jwt = require('jsonwebtoken')

const User = require("../models/User")
const Business = require('../models/Business')
const Interaction = require("../models/Interaction")

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
        return res.status(409).json({
          message: "An interaction already exists for this user and business.",
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

   const verifyTokenExpiration = (req, res, next) => {
    const sessionToken = req.headers.authorization
  
    if (!sessionToken) {
      return res.status(401).json({ message: 'Token de sesión no proporcionado' })
    }

    jwt.verify(sessionToken, process.env.SECRET, (err, decodedToken) => {
      console.log("error: ", err)
      if (err) {
        // Si hay un error al verificar el token, significa que es inválido o ha expirado
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token de sesión expirado' })
        } else {
          return res.status(401).json({ message: 'Token de sesión inválido' })
        }
      }
  
      req.userId = decodedToken.userId
      next()
    })
  } 
  
  module.exports = {
    checkUserExistence,
    checkBusinessExistence,
    checkExistingInteraction,
    validateUserSchema,
    verifyTokenExpiration,
}
  