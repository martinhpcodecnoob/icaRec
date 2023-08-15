const { Resend } = require('resend')
const { RegistrationEmailHTML } = require('../utils/templates')

const RESEND_API_KEY = process.env.RESEND_API_KEY
const resend = new Resend(RESEND_API_KEY)

const sendEmail = async  (req, res ) => {
    try {
        const user = req.user
        const emailContent = RegistrationEmailHTML(user.name)
        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: user.email,
            subject: 'Bienvenido a Tienda é',
            html: emailContent
          })

          return res.status(200).json({
            success: true,
            message: 'Email sent successfully',
            user: user
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