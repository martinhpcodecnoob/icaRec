import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const createBusiness = createAsyncThunk(
    'preview/createBusiness',
    async(userId, newInput) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/business/createBusiness/${userId}`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    business_name: newInput.name_business,
                    business_location: newInput.geo_business,
                    location_coordinates:{
                        latitude: newInput.location.lat,
                        longitude: newInput.location.long
                    },
                    RUC: newInput.ruc, 
                    cellphone: newInput.cellphone, 
                    facebook: newInput.facebook,
                    website: newInput.name_web,
                    schedule: newInput.schedule,
                    services: newInput.list_service,
                    images: newInput.images
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

export const {saveLoaction,saveFormPreview,removeImageOfRedux} =Slice.actions