const jwt = require('jsonwebtoken')
const User = require("../models/User")

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
    validateUserSchema,
    verifyTokenExpiration,
}
  