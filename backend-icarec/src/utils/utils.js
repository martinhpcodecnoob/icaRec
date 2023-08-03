 const jwt = require('jsonwebtoken')

function generateAuthToken(userId) {
    try {
        const payload = { sub: userId }
        const options = { expiresIn: '1h' }
        const token = jwt.sign(payload, process.env.SECRET, options)
        return {token}
      } catch (error) {
        console.error("Error al generar el token:", error)
        return { error: "No se pudo generar el token" }
      }
}

module.exports = {
    generateAuthToken,
}
