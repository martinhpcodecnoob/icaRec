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

module.exports = {
    get_user,
    create_user,
    get_user_by_id,
}