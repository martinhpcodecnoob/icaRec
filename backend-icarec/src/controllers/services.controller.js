const { RegistrationEmailHTML } = require('../utils/templates')
const { sendEmailWithResend } = require('../utils/utils')

const sendEmail = async  (req, res ) => {
    try {
        const user = req.user

        const emailOptions = {
            from: 'tiendasE@resend.dev',
            to: user.email,
            subject: 'Bienvenido a Tienda é',
            html: RegistrationEmailHTML(user.name)
          }
      
          await sendEmailWithResend(emailOptions)
      
          return res.status(200).json({
            success: true,
            message: 'Email sent successfully',
            user: user.name
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Error sending email',
            error: error.message
        })
    }
}

module.exports = {
    sendEmail
}