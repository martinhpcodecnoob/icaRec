const bcrypt = require("bcryptjs")
const { ObjectId } = require('mongodb')

const User = require('../models/User')
const Account = require('../models/Account')

const { generateAuthToken } = require("../utils/utils")

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

module.exports = {
  register,
  login,
  generateToken,
}



/* const jwt = require('jsonwebtoken')
const secretKey = 'tu_clave_secreta'

// Función para generar un token JWT al autenticar un usuario
function generateAuthToken(userId) {
  const payload = { sub: userId }
  const options = { expiresIn: '1h' }
  return jwt.sign(payload, secretKey, options)
}

// Middleware para verificar el token JWT en las rutas protegidas
function verifyAuthToken(req, res, next) {
  const token = req.headers.authorization
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' })

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) return res.status(401).json({ message: 'Token inválido' })
    req.userId = decodedToken.sub;
    next();
  });
}

// Ejemplo de uso en una ruta protegida
app.get('/ruta_protegida', verifyAuthToken, (req, res) => {
  // La autenticación fue exitosa, el usuario está autenticado
  // Puedes usar req.userId para obtener el ID del usuario autenticado
  res.json({ message: 'Ruta protegida, usuario autenticado' })
}); */