const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb')

const User = require('../models/User')
const Account = require('../models/Account')
const Business = require("../models/Business");

const { generateAuthToken, sendEmailWithResend } = require("../utils/utils")
const { EmailPasswordRecoveryHTML, newRecoveryPasswordHTML } = require("../utils/templates");

const {SECRET, REFRESH_SECRET} = process.env
const ACCESS_TOKEN_EXPIRATION = '15m'
const REFRESH_TOKEN_EXPIRATION = '1w'

async function generateAccessAndRefreshTokens(req, res){
  try {
    const user = req.user
    const userId = user._id.toString()
    const generateAccessToken = generateAuthToken(userId, ACCESS_TOKEN_EXPIRATION, SECRET)
    const generateRefreshToken = generateAuthToken(userId, REFRESH_TOKEN_EXPIRATION, REFRESH_SECRET)

    if (generateAccessToken.error || generateRefreshToken.error) {
      return res.status(500).json({ error: "Error al generar el token." })
    }

    const accessToken = generateAccessToken.token
    const refreshToken = generateRefreshToken.token

    const updatedAccount = await Account.findOneAndUpdate(
      { userId: userId },
      { refreshToken: refreshToken },
      { new: true } 
    )

    if (!updatedAccount) {
      return res.status(500).json({ error: "No se pudo actualizar el token de actualizacion de la cuenta." })
    }

    res.status(200).json({ message: "Tokens creados", accessToken })
  } catch (error) {
    console.error("Error en el generateToken:", error)
    res.status(500).json({ error: "Error al generar el token." })
  }
}

async function renewAccessToken(req, res){
  try {
    const { accessToken } = req.body

    const decodedAccessToken = jwt.verify(accessToken, SECRET)
    if (!decodedAccessToken || !decodedAccessToken.sub) {
      return res.status(401).json({ error: "Token de acceso inválido o expirado." })
    }

    const userId = decodedAccessToken.sub

    const account = await Account.findOne({ userId })

    if (!account || !account.refreshToken) {
      return res.status(401).json({ error: "No se encontró una cuenta válida para el usuario." })
    }

    const decodedRefreshToken = jwt.verify(account.refreshToken, REFRESH_SECRET)

    if (!decodedRefreshToken || decodedRefreshToken.sub !== userId) {
      return res.status(401).json({ error: "Token de actualización inválido." })
    }

    const newAccessToken = jwt.sign({ sub: userId }, SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION })

    res.status(200).json({ accessToken: newAccessToken })
  } catch (error) {
    res.status(500).json({ error: "Error al renovar el token de acceso." })
  }
}

async function register(req, res) {
  try {
    const { name, cellphone, dni, email, password, sex } = req.body

    const user = await User.findOne({ email })

    if (user) {
      return res.status(409).json({ error: "El correo electrónico ya está registrado." })
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10)

    const newUser = new User({
      name, 
      cellphone, 
      dni,
      email,
      sex
    })

    const newAccount = new Account({
      userId: newUser,
      password: hashedPassword,
      newAccount: true,
      isRegistered: true
    })

    await newUser.save()
    await newAccount.save()

    res.status(200).json({ message: "Usuario registrado exitosamente." })
  } catch (error) {
    console.error("Error al intentar registrar al usuario:", error)
    res.status(500).json({ error: "Error al intentar registrar al usuario." })
  }
}

async function registerWithoutCredentials(req, res) {
  try {
    const { email, providerType, name, cellphone, dni } = req.body

    const usersWithEmail = await User.find({ email })

    if (!usersWithEmail) {
      return res.status(404).json({ error: "Usuario no encontrado." })
    }

    const matchingUsers = []

    for (const user of usersWithEmail) {
      const account = await Account.findOne({ userId: user._id, provider: providerType })

      if (account) {
        matchingUsers.push(user)
      }
    }

    if (matchingUsers.length === 0) {
      return res.status(404).json({ error: "Cuenta no encontrada." })
    }

    const userToUpdate = matchingUsers[0]

    userToUpdate.name = name
    userToUpdate.cellphone = cellphone
    userToUpdate.dni = dni
    await userToUpdate.save()

    res.status(200).json({ message: "Usuario registrado por terceros exitosamente." })
  } catch (error) {
    console.error("Error al intentar registrar por terceros al usuario:", error)
    res.status(500).json({ error: "Error al intentar registrar por terceros al usuario." })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." })
    }

    const account = await Account.findOne({ userId: user._id, provider: 'credentials' })

    if (!account) {
      return res.status(404).json({ error: "La cuenta del usuario no fue encontrada." })
    }

    const passwordMatch = bcrypt.compareSync(password, account.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas." })
    }

    res.status(200).json({ message: "Inicio de sesión exitoso.", user })
  } catch (error) {
    console.error("Error en el inicio de sesión:", error)
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
      })

      if (account) {
        userWithCredentials = user;
        accountToUpdate = account;
        break
      }
    }

    if (!userWithCredentials || !accountToUpdate) {
      return res.status(404).json({ error: "Usuario o cuenta no encontrados." })
    }

    const token = generateAuthToken( userWithCredentials._id, '1h', SECRET )
    accountToUpdate.passwordResetToken = token.token
    await accountToUpdate.save()

    const recoveryLink = `${process.env.FRONT_URL}/recover-password?token=${token.token}`
    const emailOptions = {
      from: 'tiendasE@resend.dev',
      to: userWithCredentials.email,
      subject: 'Kuskana - Recuperación de Contraseña',
      html: newRecoveryPasswordHTML(userWithCredentials.name, recoveryLink)
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
      return res.status(404).json({ error: "Usuario no encontrado." })
    }

    const matchingUsersAccounts = []

    for (const user of usersWithEmail) {
      const account = await Account.findOne({ userId: user._id, provider: providerType })

      if (account) {
        matchingUsersAccounts.push(account)
      }
    }

    if (matchingUsersAccounts.length === 0) {
      return res.status(404).json({ found: false, error: "Cuenta no encontrada." })
    }

    const userAccount = matchingUsersAccounts[0]._doc
    const responseObj = { found: true, userId: userAccount.userId, role: usersWithEmail[0].role[0] }

    if ('newAccount' in userAccount) {
      responseObj.newAccount = userAccount.newAccount
    }
    if ('isRegistered' in userAccount) {
      responseObj.isRegistered = userAccount.isRegistered
    }
    return res.status(200).json(responseObj)
  } catch (error) {
    console.error("Error al buscar la cuenta del usuario:", error)
    res.status(500).json({ found: false, error: "Error al buscar la cuenta del usuario." })
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

async function deleteAccountAndUser(req, res) {
  try {
    const currentUser = req.user

    await Business.deleteMany({ owner: currentUser._id.toString() })

    const deletedUser = await User.findByIdAndDelete(currentUser._id.toString())

    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado." })
    }

    const deletedUserId = deletedUser._id.toString()

    const deletedAccount = await Account.findOneAndDelete({ userId: deletedUserId })

    if (!deletedAccount) {
      return res.status(404).json({ error: "Cuenta no encontrada." })
    }

    res.status(200).json({ message: "Usuario y cuenta eliminados correctamente." })
  } catch (error) {
    console.error("Error al eliminar usuario y cuenta:", error)
    res.status(500).json({ error: "Error al eliminar usuario y cuenta." })
  }
}


module.exports = {
  register,
  registerWithoutCredentials,
  login,
  generateAccessAndRefreshTokens,
  renewAccessToken,
  generateRecoveryToken,
  verifyRecoveryToken,
  verifyUserExistsWithoutCredentials,
  changePassword,
  deleteAccountAndUser,
}
