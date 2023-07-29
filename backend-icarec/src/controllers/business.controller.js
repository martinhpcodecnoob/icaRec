const Business = require("../models/Business")

const get_business = async(req,res) => {
    try {
        const {business_name} = req.body
        const currentBusiness = await Business.find({
            business_name
        })
        return res.status(200).json({
            found:true,
            business:currentBusiness
        })
    } catch (error) {
        return res.status(500).json({
            found:false,
            message:"Business not found",
            error
        })
    }
}
 
const create_business = async(req,res) =>{
    try {
        const {
            business_name, 
            business_location, 
            RUC, 
            cellphone, 
            website,
            services,
            images
        } = req.body
        const user = req.user
        const newBusiness = new Business({
            business_name, 
            business_location, 
            RUC, 
            cellphone, 
            website,
            services,
            images,
            owner: user._id,
        })
        await newBusiness.save()
        user.businesses.push(newBusiness)
        await user.save()
        return res.status(200).json(newBusiness)
    } catch (error) {
        return res.status(500).json({
            created:false,
            message:"Business not created",
            error
        })
    }
}
 
module.exports = {
    get_business,
    create_business,
}