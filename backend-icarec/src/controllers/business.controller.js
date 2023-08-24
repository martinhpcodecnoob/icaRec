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
 
const get_all_businesses = async (req, res) => {
  try {
    const selectedFields = 
    [
      "business_name", 
      "business_location", 
      "location_coordinates",
      "RUC",
      "cellphone",
      "facebook",
      "website",
      "services",
      "images",
    ]
    const allBusinesses = await Business.find({}, selectedFields)
    return res.status(200).json({ businesses: allBusinesses })
  } catch (error) {
    return res.status(500).json({
      error: "Error retrieving businesses",
    })
  }
}

const create_business = async(req,res) =>{
    try {
        const {
            business_name, 
            business_location, 
            location_coordinates,
            RUC, 
            cellphone, 
            facebook,
            website,
            schedule,
            services,
            images
        } = req.body
        const user = req.user
        const newBusiness = new Business({
            business_name, 
            business_location, 
            location_coordinates,
            RUC, 
            cellphone,
            facebook,
            website,
            schedule,
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
 
const delete_business = async (req, res) => {
    try {
      const { businessId } = req.params
      const user = req.user
  
      const deletedBusiness = await Business.findOneAndDelete({
        _id: businessId,
        owner: user._id
      })
  
      if (!deletedBusiness) {
        return res.status(404).json({
          deleted: false,
          message: "Business not found or you are not authorized to delete it"
        })
      }
  
      user.businesses = user.businesses.filter(
        (business) => business._id.toString() !== businessId
      );
      await user.save()
  
      return res.status(200).json({
        deleted: true,
        business: deletedBusiness
      });
    } catch (error) {
      return res.status(500).json({
        deleted: false,
        message: "Error deleting business",
        error
      })
    }
  }

  const update_business = async (req, res) => {
    try {
      const { businessId } = req.params
      const user = req.user
      const updates = req.body
  
      const updatedBusiness = await Business.findOneAndUpdate(
        {
          _id: businessId,
          owner: user._id
        },
        updates,
        { new: true }
      )
  
      if (!updatedBusiness) {
        return res.status(404).json({
          updated: false,
          message: "Business not found or you are not authorized to update it"
        })
      }
  
      return res.status(200).json({
        updated: true,
        business: updatedBusiness
      })
    } catch (error) {
      return res.status(500).json({
        updated: false,
        message: "Error updating business",
        error
      })
    }
  }

  const get_all_business_services = async (req, res) => {
    try {
        const result = await Business.aggregate([
            {
                $unwind: "$services"
            },
            {
                $group: {
                    _id: null,
                    allServices: { $addToSet: { $toLower: "$services" } }
                }
            },
            {
                $project: {
                    _id: 0,
                    services: "$allServices"
                }
            }
        ])

        if (result.length > 0) {
            return res.status(200).json({services: result[0].services}) 
        } else {
          return res.status(400).json({services: []}) 
        }
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }

module.exports = {
    get_business,
    get_all_businesses,
    create_business,
    get_all_business_services,
    update_business,
}