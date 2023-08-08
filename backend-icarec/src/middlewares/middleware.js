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

/*   async function decodeJWE(jweToken, sharedSecret) {
    try {
      // Decodificar el JWE usando la clave secreta
      const decodedToken = await jwt.verify(jweToken, sharedSecret);
  
      // Devolver el contenido del JWT desencriptado (si la verificación fue exitosa)
      return decodedToken;
    } catch (error) {
      // En caso de error, devolver null o manejar el error según tus necesidades
      console.error('Error al desencriptar el JWE:', error.message);
      return null;
    }
  }

  const verifyTokenExpiration = (req, res, next) => {
    const sessionToken = req.headers.authorization;
    console.log("token: ", sessionToken);
  
    if (!sessionToken) {
      return res.status(401).json({ message: 'Token de sesión no proporcionado' });
    }
  
    try {
      // Intenta verificar el JWT utilizando el algoritmo 'RS256'
      const decodedToken = jwt.verify(sessionToken, 'secret123', { algorithms: ['RS256'] });
  
      // Si no hay errores, significa que el JWT es válido y aún no ha expirado
      req.userId = decodedToken.userId;
      return next();
    } catch (err) {
      // Si ocurre un error al verificar el JWT, asumimos que es un JWE y tratamos de desencriptarlo
      try {
        const decodedToken = decodeJWE(sessionToken, 'secret123');
  
        // Si no hay errores al desencriptar el JWE, significa que el JWT es válido y aún no ha expirado
        req.userId = decodedToken.userId;
        return next();
      } catch (err) {
        // Si ocurre un error al desencriptar el JWE o si el JWT ha expirado, devolvemos una respuesta de error
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token de sesión expirado' });
        } else {
          return res.status(401).json({ message: 'Token de sesión inválido' });
        }
      }
    }
  }; */
  
  module.exports = {
    checkUserExistence,
    verifyTokenExpiration,
}
  