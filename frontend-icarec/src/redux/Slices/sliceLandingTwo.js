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
            console.log(error);
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
        bussinessIdEdition:{}
    },
    reducers:{
        resetCollectionService:(state,action) => {
            state.collectionService = []
        },
        addBusinessIdEdition:(state,action) => {
            state.bussinessIdEdition = action.payload
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
    }
})

export const {resetCollectionService} = LandingTwo.actions