 const jwt = require('jsonwebtoken')
 const { Resend } = require('resend')

 const RESEND_API_KEY = process.env.RESEND_API_KEY
 const resend = new Resend(RESEND_API_KEY)

function generateAuthToken( userId, expires, secret ) {
    try {
        const payload = { sub: userId }
        const options = { expiresIn: expires }
        const token = jwt.sign(payload, secret, options)
        return {token}
      } catch (error) {
        console.error("Error al generar el token:", error)
        return { error: "No se pudo generar el token" }
      }
    }
    
async function sendEmailWithResend({ from, to, subject, html }) {
  try {
    await resend.emails.send({
      from: "Kuskana <Kuskana@kuskana.com>",
      to,
      subject,
      html
    })
  } catch (error) {
    throw new Error(`Error sending email with Resend: ${error.message}`)
  }
}

module.exports = {
    generateAuthToken,
    sendEmailWithResend,
}
