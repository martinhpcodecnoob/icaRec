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

export const getBusinessByUser = createAsyncThunk(
    'getBusinessByUser',
    async({userId, accessToken}) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/business/getBusinessByUser/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`
                },
            })
            const data = await response.json()
            if (response.status === 200 || response.status === 304) {
                return {
                    status: response.status,
                    data: data,
                    } 
                }
            throw Error(data.message)
            } catch (error) {
                console.error("Error del servidor al extraer los negocios de los usuarios", error)
                throw error
            }
    }
)

export const getRecommendedBusinesses = createAsyncThunk(
    'getRecommendedBusinesses',
    async({userId, accessToken}) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/interaction/getRecommendedBusinesses/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`
                },
            })
        
            const data = await response.json()
            if (response.status === 200 || response.status === 304) {
                return {
                    status: response.status,
                    data: data,
                    }
                
                }
            throw Error(data.message)
            } catch (error) {
                console.error("Error del servidor al extraer los negocios recomendados por los usuarios", error)
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
        },
        updateStateRecomendUser:{
            fulfilled:false,
            loading:false,
            error:null
        },
        updateStateBusinessUser:{
            fulfilled:false,
            loading:false,
            error:null
        },
        stateShowRecomendUser:false,
        stateShowBusinessUser:false
    },
    reducers:{
        resetCollectionService:(state,action) => {
            state.collectionService = []
        },
        changeStateRecomend:(state,action) => {
            if (action.payload === true || action.payload === false) {
                state.stateShowRecomendUser = action.payload
            }
        },
        changeStateBusinessUser:(state,action) => {
            if (action.payload === true || action.payload === false) {
                state.stateShowBusinessUser = action.payload
            }
        }
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
        builder
            .addCase(getBusinessByUser.fulfilled, (state,action) => {
                state.updateStateBusinessUser.fulfilled = action.payload
                state.updateStateBusinessUser.loading = false
            })
            .addCase(getBusinessByUser.rejected, (state,action) => {
                state.updateStateBusinessUser.error = action.error.message
                state.updateStateBusinessUser.loading = false
            })
            .addCase(getBusinessByUser.pending, (state,action) => {
                state.updateStateBusinessUser.loading = true
                state.updateStateBusinessUser.error = null
            })
        builder
            .addCase(getRecommendedBusinesses.fulfilled, (state,action) => {
                state.updateStateRecomendUser.fulfilled = action.payload
                state.updateStateRecomendUser.loading = false
            })
            .addCase(getRecommendedBusinesses.rejected, (state,action) => {
                state.updateStateRecomendUser.error = action.error.message
                state.updateStateRecomendUser.loading = false
            })
            .addCase(getRecommendedBusinesses.pending, (state,action) => {
                state.updateStateRecomendUser.loading = true
                state.updateStateRecomendUser.error = null
            })
    }
})

export const {resetCollectionService,changeStateRecomend,changeStateBusinessUser} = LandingTwo.actions