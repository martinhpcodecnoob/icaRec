import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const uriBack = process.env.NEXT_PUBLIC_BACKEND_URI
export const collectionSelectService = createAsyncThunk(
    'collectionSelectService',
    async(serviceSelect) => {
        try {
            const response = await fetch(`${uriBack}/api/business/getServiceForBusiness/${serviceSelect}`)
            const dataCollection = response.json()
            if (dataCollection.mensaje) {
                throw Error(dataCollection.mensaje)
            }
            return dataCollection
        } catch (error) {
            // console.log(error);
            throw error
        }
    }
)

export const businessIdUpdates = createAsyncThunk(
    'businessIdUpdates',
    async({businessId,updates,userId, accessToken}) => {
        try {
            const response = await fetch(`${uriBack}/api/business/updateBusiness/${userId}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `${accessToken}`
                },
                body:JSON.stringify({
                    businessId,
                    updates:{
                        business_name: updates.name_business,
                        business_location: updates.geo_business,
                        location_coordinates:{
                            latitude: updates.location.lat,
                            longitude: updates.location.long
                        },
                        description: updates.description, 
                        cellphone: updates.cellphone, 
                        facebook: updates.facebook,
                        website: updates.name_web,
                        schedule: updates.schedule,
                        services: updates.list_service,
                        images: updates.images.map(imagesCloudinary => {
                            return {
                                url_cloudinary:imagesCloudinary.url_cloudinary,
                                public_id:imagesCloudinary.public_id
                            }
                        })
                    }
                })
            })
            const dataUpdates = await response.json()
            if (dataUpdates.updated) {
                return dataUpdates
            }
            throw Error("Error en la actualizacion")
        } catch (error) {
            throw error
        }
    }
)

export const LandingTwo = createSlice({
    name:'slice_landing_two',
    initialState:{
        collectionService:[],
        stateCollectionService:{
            loading:false,
            error:null
        },
        updateState:{
            fulfilled:false,
            loading:false,
            error:null
        }
    },
    reducers:{
        resetCollectionService:(state,action) => {
            state.collectionService = []
        },
    },
    extraReducers:(builder) => {
        builder
            .addCase(collectionSelectService.fulfilled, (state,action) => {
                state.collectionService = action.payload
                state.stateCollectionService.loading = false
            })
            .addCase(collectionSelectService.rejected, ( state,action) => {
                state.stateCollectionService.error = action.error.message
                state.stateCollectionService.loading = false
            })
            .addCase(collectionSelectService.pending, (state,action) => {
                state.stateCollectionService.loading = true
                state.stateCollectionService.error = null
            })
        builder
            .addCase(businessIdUpdates.fulfilled, (state,action) => {
                state.updateState.fulfilled = true
                state.updateState.loading = false
            })
            .addCase(businessIdUpdates.rejected, ( state,action) => {
                state.updateState.error = action.error.message
                state.updateState.loading = false
            })
            .addCase(businessIdUpdates.pending, (state,action) => {
                state.updateState.loading = true
                state.updateState.error = null
            })
    }
})

export const {resetCollectionService} = LandingTwo.actions