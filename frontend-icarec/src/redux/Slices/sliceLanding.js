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

export const verifieldInteraction = createAsyncThunk(
    'verifieldInteraction',
    async(idsInteractions) => {
        const {userId, businessId} = idsInteractions
        try {
            const response = await fetch(`${uriBack}/api/interaction/verifieldInteraction/${userId}?businessId=${businessId}`)
            const dataVerifield = await response.json()
            if (dataVerifield.details === undefined) {
                throw Error("no existe la interaccion")
            }
            return dataVerifield.details
        } catch (error) {
            // console.log("Error en los  ",error);
            throw error
        }
    }
)

export const postCreateLiked = createAsyncThunk(
    'postCreateLiked',
    async(idsInteractions) => {
        const {userId, businessId} = idsInteractions
        try {
            const response = await fetch(`${uriBack}/api/interaction/createInteraction/${userId}?businessId=${businessId}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
            })
            const interactionSingle = await response.json()
            if (interactionSingle.details) {
                const {idInteraction,liked} = interactionSingle.details
                let changeLiked = liked
                if (changeLiked) {
                    changeLiked=false
                }else{
                    changeLiked=true
                }
                const responseUpdate = await fetch(`${uriBack}/api/interaction/updateInteraction`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        interactionId:idInteraction,
                        liked:changeLiked
                    })
                })
                const dataUpdate = await responseUpdate.json()
                return dataUpdate.updatedInteraction
            }
            return interactionSingle
        } catch (error) {
            throw error
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
        },
        addAllServices:(state,action) => {
            state.services = action.payload
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
                    state.stateLikedPost.loading = false
                }else{
                    state.interaction = action.payload
                    state.stateLikedPost.loading = false
                }
            })
            .addCase(postCreateLiked.rejected, (state,action)=>{
                state.stateLikedPost.loading = false
                state.stateLikedPost.error = true
            })
            .addCase(postCreateLiked.pending, (state,action) => {
                state.stateLikedPost.loading = true
                state.stateLikedPost.error = null
            })
        builder
            .addCase(verifieldInteraction.fulfilled, (state,action) => {
                let data={}
                if (action.payload.details) {
                    data = action.payload.details
                    state.interaction = data
                    state.stateLikedPost.loading = false
                }else{
                    state.interaction = action.payload
                    state.stateLikedPost.loading = false
                }
            })
            .addCase(verifieldInteraction.rejected, (state,action)=>{
                state.stateLikedPost.loading = false
                state.stateLikedPost.error = true
            })
            .addCase(verifieldInteraction.pending, (state,action) => {
                state.stateLikedPost.loading = true
                state.stateLikedPost.error = null
            })
    }
})

export const {extractServices,extractAllBusiness,addAllServices} = Landing.actions