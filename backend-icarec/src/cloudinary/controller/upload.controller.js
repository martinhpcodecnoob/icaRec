const signature = require('../signuploadform')
require('../config')
const cloudinary = require('cloudinary').v2
const cloudName = cloudinary.config().cloud_name
const apiKey = cloudinary.config().api_key

const uploadSignature = async(req,res) => {
    // const {nameCloud} = req.params;
    try {
        const {nameCloud,nameComplete,bussinessFolder} = req.body
        const sig = signature.signuploadform(nameComplete,bussinessFolder)
        if (nameCloud === cloudName) {
            return res.json({
                signature: sig.signature,
                timestamp: sig.timestamp,
                cloudname: cloudName,
                apiKey: apiKey
            })    
            
        }
        return res.status(400).json({
            message:"El cloudName de lado del cliente no coincidi con el del servidor o esta vacio"
        })
    } catch (error) {
        return res.json({
            message:"Error",
            error
        })
    }
}

const uploadDestroy = async(req,res) => {
    const {publicId} = req.body
    cloudinary.uploader
        .destroy(`${publicId}`)
        .then( response =>{
            if (response.result==="ok") {
                return res.json({
                    message:"Exito al destruir la imagen",
                    response
                })
            }
            return res.status(400).json({
                message:"El archivo a eliminar no se encuentra",
                response
            })
        })
        .catch(error =>{
            return res.status(400).json({
                message:"Error al destruir la imagen",
                error
            })
        })
}

module.exports = {
    uploadSignature,
    uploadDestroy
}