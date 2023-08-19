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
        loading:false,
        error:null
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
            const newArrayImages = arrayImages.filter(img => image !== img)
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
        }
    },
    extraReducers:(builder) =>{
        builder
            .addCase(createBusiness.fulfilled, (state,action) =>{
            state.loading = false;

            })
            .addCase(createBusiness.rejected, (state,action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(createBusiness.pending, (state) =>{
                state.loading = true
                state.error = null
            })
    }
})
export const {saveLoaction,saveFormPreview,removeImageOfRedux,saveDataCloudinary} =Slice.actions