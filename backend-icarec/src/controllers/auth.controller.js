const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
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

async function registerWithoutCredentials(req, res) {
  try {
    const { email, providerType, name, cellphone, dni } = req.body

    const usersWithEmail = await User.find({ email })

    if (!usersWithEmail) {
      return res.status(404).json({ error: "User not found" })
    }

    const matchingUsers = []

    for (const user of usersWithEmail) {
      const account = await Account.findOne({ userId: user._id, provider: providerType })

      if (account) {
        matchingUsers.push(user)
      }
    }

    if (matchingUsers.length === 0) {
      return res.status(404).json({ error: "Account not found" })
    }

    const userToUpdate = matchingUsers[0]

    userToUpdate.name = name
    userToUpdate.cellphone = cellphone
    userToUpdate.dni = dni
    await userToUpdate.save()

    res.status(200).json({ message: "User registered successfully." })
  } catch (error) {
    console.error("Error in registration:", error)
    res.status(500).json({ error: "Error in registration." })
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
    let accountToUpdate

    for (const user of users) {
      const account = await Account.findOne({
        provider: 'credentials',
        userId: user._id
      });

      if (account) {
        userWithCredentials = user;
        accountToUpdate = account;
        break
      }
    }

    if (!userWithCredentials || !accountToUpdate) {
      return res.status(404).json({ error: "Usuario o cuenta no encontrados." })
    }

    const token = generateAuthToken(userWithCredentials._id).token
    console.log("Token de function: ", token)
    accountToUpdate.passwordResetToken = token
    await accountToUpdate.save()

    const recoveryLink = `${process.env.FRONT_URL}/recover-password?token=${token}`
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

async function verifyRecoveryToken(req, res) {
  try {
    const { token } = req.body
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const account = await Account.findOne({
      userId: decodedToken.sub,
      passwordResetToken: token,
    })
    if (!account) {
      return res.status(400).json({ error: "El token no es válido para este usuario." })
    }

    return res.status(200).json({ message: "El token es válido para este usuario.", userId: account.userId })
  } catch (error) {
    console.error("Error al verificar el token de recuperacion:", error)
    return res.status(500).json({ error: "Error al verificar el token." })
  }
}

async function verifyUserExistsWithoutCredentials(req, res) {
  try {
    const { email, providerType } = req.query

    const usersWithEmail = await User.find({ email })

    if (!usersWithEmail) {
      return res.status(404).json({ error: "User not found" })
    }

    const matchingUsersAccounts = []

    for (const user of usersWithEmail) {
      const account = await Account.findOne({ userId: user._id, provider: providerType })

      if (account) {
        matchingUsersAccounts.push(account)
      }
    }

    if (matchingUsersAccounts.length === 0) {
      return res.status(404).json({ found: false, error: "Account not found" })
    }

    const userAccount = matchingUsersAccounts[0]._doc
    //cuidadop
    const responseObj = { found: true, userId: userAccount.userId }

    if ('newAccount' in userAccount) {
      responseObj.newAccount = userAccount.newAccount
    }
    if ('isRegistered' in userAccount) {
      responseObj.isRegistered = userAccount.isRegistered
    }
    return res.status(200).json(responseObj)
  } catch (error) {
    console.error("Error searching user account:", error)
    res.status(500).json({ found: false, error: "Error searching user account" })
  }
}

async function changePassword(req, res) {
  try {
    const { userId, newPassword } = req.body

    const account = await Account.findOne({
      userId,
    })

    if (!account) {
      return res.status(400).json({ error: "El token no es válido para este usuario." })
    }

    const user = await User.findOne({_id: userId})
    console.log("Usuario del change")
    const userEmail = user.email

    const hashedPassword = await bcrypt.hash(newPassword.toString(), 10)
    account.password = hashedPassword
    await account.save()

    res.status(200).json({ message: "Contraseña cambiada exitosamente.", emailChanged: userEmail })
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error)
    res.status(500).json({ error: "Error al cambiar la contraseña." })
  }
}

module.exports = {
  register,
  registerWithoutCredentials,
  login,
  generateToken,
  generateRecoveryToken,
  verifyRecoveryToken,
  verifyUserExistsWithoutCredentials,
  changePassword,
}
