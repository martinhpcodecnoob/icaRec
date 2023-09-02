import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const createBusiness = createAsyncThunk(
    'createBusiness',
    async(userForm) => {
        try {
            console.log("Estes el el input: ",userForm);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/business/createBusiness/${userForm.userId}`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    business_name: userForm.business.name_business,
                    business_location: userForm.business.geo_business,
                    location_coordinates:{
                        latitude: userForm.business.location.lat,
                        longitude: userForm.business.location.long
                    },
                    RUC: userForm.business.ruc, 
                    cellphone: userForm.business.cellphone, 
                    facebook: userForm.business.facebook,
                    website: userForm.business.name_web,
                    schedule: userForm.business.schedule,
                    services: userForm.business.list_service,
                    images: userForm.business.images.map(imagesCloudinary => {
                        return {
                            url_cloudinary:imagesCloudinary.url_cloudinary,
                            public_id:imagesCloudinary.public_id
                        }
                    })
                })
            })
            const data= await response.json()
            if (data.errors) {
                throw Error(`Error al crear: ${data.message}`)
            }
            return data
        } catch (error) {
            throw error
        }
    }
)

export const destroyCloudinary = createAsyncThunk(
    'destroyCloudinary',
    async(publicId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/cloudinary/destroy`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    publicId
                })
            })

            const data = await response.json()
            if (data.errorBolean) {
                throw Error(`Error :${data.message}`)
            }
            return data
        } catch (error) {
            throw error
        }
    }
)

export const Slice = createSlice({
    name:"preview_values",
    initialState:{
        latCurrent:"",
        logCurrent:"",
        inputForm:{},
        stateCreate:{
            loading:false,
            error:null
        },
        stateDestroy:{
            fulfilled:'',
            loading:false,
            error:null
        },
        fileLimit:""
    },
    reducers:{
        saveLoaction:(state, action) => {
            const {latitude,longitude}=action.payload
            state.latCurrent=latitude
            state.logCurrent=longitude
        },
        saveFormPreview:(state,action) => {
            const input = action.payload
            state.inputForm = { ...input };
            state.inputForm.list_service = [...input.list_service];
            state.inputForm.images=[
                ...input.images,
            ]
            const location={
                lat:state.latCurrent,
                long:state.logCurrent
            }
            state.inputForm.location={...location}
        },
        removeImageOfRedux:(state,action) => {
            const image=action.payload
            const arrayImages = state.inputForm.images
            const newArrayImages = arrayImages.filter(img => {
                if (img.url_cloudinary !== "") {
                    return image !== img.url_cloudinary
                }
                return image !== img.fileURL
            })
            state.inputForm.images=[...newArrayImages]
        },
        saveDataCloudinary:(state,action) => {
            const {url_cloudinary,public_id,fileURL} = action.payload
            const newArrayImages = state.inputForm.images.map(objImage => {
                if (objImage.fileURL === fileURL) {
                    return {
                        ...objImage,
                        url_cloudinary,
                        public_id
                    }
                }
                return objImage
            })
            state.inputForm.images=[...newArrayImages]
        },
        saveLimitMessage:(state,action) => {
            const message = action.payload
            state.fileLimit=message
        }
    },
    extraReducers:(builder) =>{
        builder
            .addCase(createBusiness.fulfilled, (state,action) =>{
                state.stateCreate.loading = false;
            })
            .addCase(createBusiness.rejected, (state,action) => {
                state.stateCreate.loading = false;
                state.stateCreate.error = action.error.message
            })
            .addCase(createBusiness.pending, (state) =>{
                state.stateCreate.loading = true
                state.stateCreate.error = null
            })
        builder
            .addCase(destroyCloudinary.fulfilled, (state,action) =>{
                state.stateDestroy.loading = false;
                state.stateDestroy.fulfilled = action.payload.message
            })
            .addCase(destroyCloudinary.rejected, (state,action) => {
                state.stateDestroy.loading = false
                state.stateDestroy.error = action.error.message
            })
            .addCase(destroyCloudinary.pending, (state) => {
                state.stateDestroy.loading = true
                state.stateDestroy.error = null
                state.stateDestroy.fulfilled = null
            })
    }
})
export const {
    saveLoaction,saveFormPreview,
    removeImageOfRedux,saveDataCloudinary,
    saveLimitMessage
} = Slice.actions