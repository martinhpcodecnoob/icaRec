const SavedBusiness = require('../models/SavedBusiness')
const Business = require('../models/Business')

const create_savedBusiness = async(req,res) =>{
    try {
        const user = req.user
        const business = req.business
        const newSavedBusiness = new SavedBusiness({
            saved: true,
            business: business._id,
            user: user._id
        })
        await newSavedBusiness.save()
        return res.status(200).json(newSavedBusiness)

    } catch (error) {
        return res.status(500).json({
            created:false,
            message:'Guardados not created',
            error
        })
    }
}

const update_saved = async(req,res) => {
    try {
        const {savedId, saved} = req.body

        if (!savedId) {
            return res.status(400).json({ updated:false, message:"Saved ID is required"})
        }

        if (saved == null || typeof saved !== 'boolean') {
            return res.status(400).json({updated:false, message:'The value of the "saved" parameter must be true or false.'})
        }

        const existingSaved = await SavedBusiness.findById(savedId)
        if (!existingSaved) {
            return res.status(404).json({ message:"Saved not found" })
        }

        const updatedSaved = await SavedBusiness.findByIdAndUpdate(
            savedId,
            { saved },
            { new: true }
        )

        return res.status(200).json({ updated: true, message: "Saved updated successfully.", updatedSaved })
    } catch (error) {
        return res.status(500).json({
            updated: false,
            message: "Saved not updated",
            error,
        })
    }
}

const get_saved_business = async(req,res) => {
    try {
        const userId = req.user._id
        
        const savedBusinessFound = await SavedBusiness.find({
            user:userId,
            saved:true
        }).populate('business')

        if (!savedBusinessFound) {
            return res.status(404).json({
                message: 'No se ha encontrado guardados'
            })
        }

        const allSavedsBusiness = await Business.aggregate([
            {
                $lookup: {
                    from: "savedbusinesses",
                    localField:"_id",
                    foreignField:"business",
                    as:"savedbusinesses"
                }
            },
            {
                $match: {
                    "savedbusinesses.saved":true,
                }
            },
            {
                $addFields: {
                    totalSaved:{
                        $size:{
                            $ifNull: ["$savedbusinesses", []] // Si el array no existe, reemplazarlo con un array vacío
                        }
                    }
                }
            },
            {
                $project:{
                    savedBusiness:0,
                }
            }
        ])
        
        const savedBusinessMap = new Map(
            allSavedsBusiness.map((business) => [business._id.toString(), business])
        )
        let businessWithSaved = savedBusinessFound?.map((saved) => {
            const business = saved.business
            if (!business || !business._id) {
                return
            }
            const businessId = saved.business._id.toString()
            const totalSaved = savedBusinessMap.has(businessId)
                ? savedBusinessMap.get(businessId).totalSaved
                : 0

            return {
                savedId: saved._id,
                ...saved.business.toObject(),
                totalSaved,
            }
        })

        businessWithSaved = businessWithSaved.filter((ele) => {
            return ele !== undefined
        })
        
        return res.status(200).json({
            found: true,
            message: "Negocios guardados encontrados",
            businessWithSaved,
        })

    } catch (error) {
        console.log('Error: ',error);
        
        return res.status(500).json({
            found:false,
            message:"No se encontraron negocios guardados o hay un error en el servidor"
        })
    }
}

const delete_saved_business = async (req,res) => {
    try {
        const userId = req.user.id
        const bussinessIdtoDelete = req.query.businessId

        const result = await SavedBusiness.deleteOne({
            user: userId,
            business: bussinessIdtoDelete
        })

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No se encontro el guardado para eliminar"})
        }

        return res.status(200).json({ deleted:true, message:"Negocio guardado eliminado correctamente"})
    } catch (error) {
        return res.status(500).json({
            deleted:true,
            message:"Error al intentar eliminar el negocio guardado",
            error,
        })
    }
}
module.exports = {
    create_savedBusiness,
    get_saved_business,
    update_saved,
    delete_saved_business
}