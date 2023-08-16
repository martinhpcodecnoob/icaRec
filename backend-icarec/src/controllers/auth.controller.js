const bcrypt = require("bcryptjs")
const { ObjectId } = require('mongodb')

const User = require('../models/User')
const Account = require('../models/Account')

const { generateAuthToken, sendEmailWithResend } = require("../utils/utils")
const { EmailPasswordRecoveryHTML } = require("../utils/templates")

async function generateToken(req, res){
  try {
    const user = req.user
    const result = generateAuthToken(user._id.toString())
    if (result.error) {
      return res.status(500).json({ error: result.error })
    }
    const token = result.token
    res.status(200).json({ message: "Token Creado", token })
  } catch (error) {
    console.error("Error en el generate Token:", error)
    res.status(500).json({ error: "Error al generar el token." })
  }
}

async function register(req, res) {
  try {
    const { name, cellphone, dni, email, password } = req.body

    const credentialsAccounts = await Account.find({provider: 'credentials'})

    let isExistingUser = false
    for (const account of credentialsAccounts) {
      const user = await User.findById(account.userId)
      if (user && user.email === email) {
        isExistingUser = true
        break
      }
    }

    if (isExistingUser) {
      return res.status(409).json({ error: "El correo electrónico ya está registrado." })
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10)

    const newUser = new User({
      name, 
      cellphone, 
      dni,
      email,
    })

    const newAccount = new Account({
      userId: newUser,
      password: hashedPassword,
    })


    await newUser.save()
    await newAccount.save()

    res.status(200).json({ message: "Usuario registrado exitosamente." })
  } catch (error) {
    console.error("Error en el registro:", error)
    res.status(500).json({ error: "Error en el registro." })
  }
}


async function login(req, res) {
  try {
    const { email, password } = req.body

    const credentialsAccounts = await Account.find({ provider: 'credentials' })

    const userAccounts = await Promise.all(credentialsAccounts.map(async (account) => {
      const user = await User.findById(account.userId)
      return { user, account }
    }))

    const matchedAccount = userAccounts.find(({ user }) => user.email === email)
    if (!matchedAccount) {
      return res.status(404).json({ error: "Usuario no encontrado." })
    }

    const passwordMatch = await bcrypt.compare(password, matchedAccount.account.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas." })
    }

    res.status(200).json({ message: "Inicio de sesión exitoso.", user: matchedAccount.user })
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ error: "Error en el inicio de sesión." })
  }
}

async function generateRecoveryToken(req, res) {
  try {
    const { email } = req.body

    const users = await User.find({ email })

    if (users.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." })
    }
    
    let userWithCredentials
    for (const user of users) {
      const account = await Account.findOne({
        provider: 'credentials',
        userId: user._id
      })
    
      if (account) {
        userWithCredentials = user;
        break
      }
    }
    
    if (!userWithCredentials) {
      return res.status(404).json({ error: "Cuenta de usuario no encontrada." })
    }

    const recoveryToken = await bcrypt.genSalt(10)

    userWithCredentials.passwordResetToken = recoveryToken
    userWithCredentials.passwordResetExpiration = new Date(Date.now() + (60 * (60 * 1000)))
    await userWithCredentials.save()
    const recoveryLink = `${process.env.FRONT_URL}/recuperar-contrasena?token=${recoveryToken}`
    const emailOptions = {
      from: 'tiendasE@resend.dev',
      to: userWithCredentials.email,
      subject: 'Recuperación de Contraseña(Tienda é)',
      html: EmailPasswordRecoveryHTML(userWithCredentials.name, recoveryLink)
    }

    await sendEmailWithResend(emailOptions)

    res.status(200).json({ message: "Token de recuperación generado exitosamente." })
  } catch (error) {
    console.error("Error al generar el token de recuperación:", error)
    res.status(500).json({ error: "Error al generar el token de recuperación." })
  }
}

module.exports = {
  register,
  login,
  generateToken,
  generateRecoveryToken,
}
