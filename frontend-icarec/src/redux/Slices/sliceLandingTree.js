import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uriBack } from "./sliceLandingTwo";
export const deleteBusiness = createAsyncThunk(
    'deleteBusiness',
    async({businessId,userId,accessToken}) => {
        try {
            const response = await fetch(`${uriBack}/api/business/deleteBusiness/${userId}?businessId=${businessId}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `${accessToken}`
                }
            })
            const data = await response.json()
            if (response.status === 200 || response.status === 304) {
                return{
                    status: response.status,
                    data
                }
            }
            throw Error(data.message)
        } catch (error) {
            console.error("Error del servidor al extraer los negocios de los usuarios", error)
            throw error
        }
    }
)

export const LandingTree = createSlice({
    name:'slice_landing_tree',
    initialState:{
        deleteBussinessByUser:{
            userIdDeleteSelect:null,
            fulfilled:null,
            loading:false,
            error:null,
            typeBusinessORecomend:null
        }
    },
    reducers:{
        catchDeleteBussiness:(state,action) => {
            state.deleteBussinessByUser.userIdDeleteSelect = action.payload
        },
        changeTypeBusinessORecomend:(state,action) => {
            if (action.payload === 'recomend' || action.payload === 'business') {
                state.deleteBussinessByUser.typeBusinessORecomend = action.payload
            }else{
                console.log("Debes poner de un tipo especifico");
            }
        },
        resetdeleteBussinessByUser:(state,action) => {
            state.deleteBussinessByUser.fulfilled = null
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(deleteBusiness.fulfilled, (state,action) => {
                state.deleteBussinessByUser.fulfilled = action.payload
                state.deleteBussinessByUser.loading = false
            })
            .addCase(deleteBusiness.rejected, (state,action) => {
                state.deleteBussinessByUser.error = action.error.message
                state.deleteBussinessByUser.loading = false
            })
            .addCase(deleteBusiness.pending, (state,action) => {
                state.deleteBussinessByUser.loading = true
                state.deleteBussinessByUser.error = null
            })
    }
})

export const {
    catchDeleteBussiness,
    changeTypeBusinessORecomend,
    resetdeleteBussinessByUser
} = LandingTree.actions