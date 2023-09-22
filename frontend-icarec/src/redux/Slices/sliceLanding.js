import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const uriBack = process.env.NEXT_PUBLIC_BACKEND_URI
export const getServices = createAsyncThunk(
    'getServices',
    async() => {
        try {
            const response = await fetch(`${uriBack}/api/business/getAllBusinessServices`)
            const dataBusiness = await response.json()
            return dataBusiness
        } catch (error) {
            console.log("Error en los  ",error);
            throw error
        }
    }
)

export const postCreateLiked = createAsyncThunk(
    'postLiked',
    async(idsInteractions) => {
        const {userId, businessId} = idsInteractions
        try {
            const response = await fetch(`${uriBack}/api//interaction/createInteraction/${userId}?=businessId=${businessId}`,{
                method:POST,
                headers:{
                    'Content-Type':'application/json'
                },
            })
            const interactionSingle = response.json()
            return interactionSingle
        } catch (error) {
            
        }
    }
)

export const Landing = createSlice({
    name:'slice_landing',
    initialState:{
        services:[],
        selectService:'',
        stateServices:{
            loading:false,
            error:null
        },
        bussiness:[],
        interaction:{
        },
        stateLikedPost:{
            loading:false,
            error:null
        }
    },
    reducers:{
        extractServices:(state,action) => {
            state.selectService = action.payload
        },
        extractAllBusiness:(state,action) => {
            state.bussiness = action.payload
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(getServices.fulfilled, (state,action) => {
                state.stateServices.loading = false;
                state.services = action.payload.services
            })
            .addCase(getServices.rejected, (state,action) => {
                state.stateServices.loading = false
            })
            .addCase(getServices.pending, (state,action) => {
                state.stateServices.loading = true
                state.stateServices.error = null
            })
        builder
            .addCase(postCreateLiked.fulfilled, (state,action) => {
                let data={}
                if (action.payload.details) {
                    data = action.payload.details
                    state.interaction = data
                }else{
                    state.interaction = action.payload
                }
            })
            .addCase(postCreateLiked.rejected, (state,action)=>{
                state.stateLikedPost.loading = false
            })
            .addCase(postCreateLiked.pending, (state,action) => {
                state.stateLikedPost.loading = true
                state.stateLikedPost.error = null
            })
    }
})

export const {extractServices,extractAllBusiness} = Landing.actions