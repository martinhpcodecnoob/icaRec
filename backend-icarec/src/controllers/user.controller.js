const Account = require("../models/Account")
const User = require("../models/User")

const get_user = async(req,res) => {
    try {
        const {name} = req.body
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

const get_users= async (req, res) => {
  try {
    const users = await User.find()
    if (!users) {
      return res.status(404).json({
        found: false,
        message: 'Usuarios no encontrados.',
      })
    }
    return res.status(200).json({
      found: true,
      users,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      found: false,
      message: 'No se pudieron extraer a los usuarios.',
      error,
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

const update_user = async (req, res) => {
  try {
    const { userId, cellphone, dni, sex } = req.body
    // console.log('DNI: ',dni);
    
    if (!userId) {
      return res.status(400).json({ updated: false, message: 'User ID is required.' })
    }

    if (cellphone === undefined ) {
      return res.status(400).json({ updated: false, message: 'The value of "cellphone" must be a string' })
    }

    // if (dni === undefined ) {
    //   console.log('Error en el DNI');
      
    //   return res.status(400).json({ updated: false, message: 'The value of "dni" must be a string' })
    // }

    if (sex === undefined ) {
      return res.status(400).json({ updated: false, message: 'The value of "sex" must be a string' })
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

    if (sex !== undefined) {
      updateData.sex = sex
    }

    await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true } 
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
    get_users,
    create_user,
    get_user_by_id,
    update_user,
}