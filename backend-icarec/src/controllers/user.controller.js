const User = require("../models/User")

const get_user = async(req,res) => {
    try {
        const {name} = req.body
        const userA = await User.find({
            first_name:name
        })
        return res.status(200).json({
            found:true,
            userA
        })
    } catch (error) {
        return res.status(500).json({
            found:false,
            message:"No encontrado",
            error
        })
    }
}

const create_user = async(req,res) =>{
    try {
        const {nombre, apellido,edad, correo} = req.body
        const newUser = new User({
            first_name:nombre,
            last_name:apellido,
            age:edad,
            email:correo
        })

        newUser.save()
        return res.status(200).json(newUser)
    } catch (error) {
        
    }
}

module.exports = {
    get_user,
    create_user
}