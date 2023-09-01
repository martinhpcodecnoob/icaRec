const Account = require("../models/Account")
const User = require("../models/User")

const get_user = async(req,res) => {
    try {
        const {name} = req.query
        if (!name) {
          return res.status(400).json({
              found: false,
              message: "Missing 'name' query parameter"
          })
        }
        const currentUser = await User.findOne({ name }).populate('businesses')
        return res.status(200).json({
            found:true,
            currentUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            found:false,
            message:"User not found",
            error
        })
    }
}

const get_user_by_id = async (req, res) => {
    try {
      const { userId } = req.params
      const currentUser = await User.findById(userId).populate('businesses')
      console.log(userId)
      if (!currentUser) {
        return res.status(404).json({
          found: false,
          message: 'User not found',
        })
      }
      return res.status(200).json({
        found: true,
        currentUser,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        found: false,
        message: 'An error occurred while fetching the user',
        error,
      })
    }
  }

/*   const get_provider_by_user_id = async (req, res) => {
    try {
      const { userId } = req.params
      const currentUser = await User.findById(userId).populate({
        path: 'accounts',
        options: { strictPopulate: false }, // Agregar esta opción
      });
      console.log(userId)
      if (!currentUser) {
        return res.status(404).json({
          found: false,
          message: 'User not found',
        })
      }
      return res.status(200).json({
        found: true,
        currentUser,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        found: false,
        message: 'An error occurred while fetching the user',
        error,
      })
    }
  } 
 */
const create_user = async(req,res) =>{
    try {
        const { 
            first_name, 
            last_name, 
            age, 
            city, 
            password,
            cellphone,
            dni,
            email,
            role,
        } = req.body
        const newUser = new User({
            first_name, 
            last_name, 
            age, 
            city, 
            password,
            cellphone,
            dni,
            email,
            role,
            userCreationDate: new Date()
        })
        newUser.save()
        return res.status(200).json(newUser)
    } catch (error) {
        return res.status(500).json({
            created:false,
            message:"User not created",
            error
        })
    }
}

const update_user_by_account = async (req, res) => {
  try {
    const { accountId, cellphone, dni } = req.body

    if (!accountId) {
      return res.status(400).json({ updated: false, message: 'Account ID is required.' })
    }

    if (cellphone !== undefined && typeof cellphone !== 'sting') {
      return res.status(400).json({ updated: false, message: 'The value of "cellphone" must be true or false.' })
    }

    if (dni !== undefined && typeof dni !== 'string') {
      return res.status(400).json({ updated: false, message: 'The value of "dni" must be true or false.' })
    }

    const existingAccount = await Account.findById(accountId)
    if (!existingAccount) {
      return res.status(404).json({ message: "Account not found" })
    }
    const userId = existingAccount._doc.userId
    const updateData = {}

    if (cellphone !== undefined) {
      updateData.cellphone = cellphone
    }
    
    if (dni !== undefined) {
      updateData.dni = dni
    }

    await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true } // Devuelve la interacción actualizada en la respuesta en vez de usar el .save()
    )

    return res.status(200).json({ updated: true, message: "User updated successfully." })
  } catch (error) {
    return res.status(500).json({
      updated: false,
      message: "Error updating user",
      error
    })
  }
}

const update_user = async (req, res) => {
  try {
    const { userId, cellphone, dni } = req.body
    
    if (!userId) {
      return res.status(400).json({ updated: false, message: 'User ID is required.' })
    }

    if (cellphone === undefined ) {
      return res.status(400).json({ updated: false, message: 'The value of "cellphone" must be a string' })
    }

    if (dni === undefined ) {
      return res.status(400).json({ updated: false, message: 'The value of "dni" must be a string' })
    }

    const existingUser = await User.findById(userId)
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" })
    }
    const updateData = {}

    if (cellphone !== undefined) {
      updateData.cellphone = cellphone
    }
    
    if (dni !== undefined) {
      updateData.dni = dni
    }

    await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true } // Devuelve la interacción actualizada en la respuesta en vez de usar el .save()
    )

    return res.status(200).json({ updated: true, message: "User updated successfully." })
  } catch (error) {
    console.log("Update user error: ". error)
    return res.status(500).json({
      updated: false,
      message: "Error updating user",
      error
    })
  }
}

module.exports = {
    get_user,
    create_user,
    get_user_by_id,
    update_user,
    update_user_by_account,
}