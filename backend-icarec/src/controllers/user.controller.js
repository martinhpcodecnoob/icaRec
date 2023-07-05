const User = require("../models/User")

const get_user = async(req,res) => {
    try {
        const {first_name} = req.body
        const currentUser = await User.find({
            first_name
        })
        return res.status(200).json({
            found:true,
            currentUser
        })
    } catch (error) {
        return res.status(500).json({
            found:false,
            message:"User not found",
            error
        })
    }
}

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
    create_user
}