import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uriBack } from "./sliceLandingTwo";
export const deleteBusiness = createAsyncThunk(
    'deleteBusiness',
    async({businessId,userId,accessToken,typeBusinessORecomend}) => {
        try {
            const endpoints = {
                business: `${uriBack}/api/business/deleteBusiness/${userId}?businessId=${businessId}`,
                saveds: `${uriBack}/api/savedbusiness/deleteSavedBusiness/${userId}?businessId=${businessId}`
            };
        
            if (!endpoints[typeBusinessORecomend]) {
                throw Error('Tipo de negocio no válido');
            }
        
            const response = await fetch(endpoints[typeBusinessORecomend], {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`
                }
            });
        
            const data = await response.json();
        
            if ([200, 304].includes(response.status)) {
                return {
                    status: response.status,
                    data
                };
            }
        
            if (data.message) {
                throw Error(data.message);
            }
        
            throw Error('Error en la petición');
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
            console.log("Probando el action delete: ",action);
            
            state.deleteBussinessByUser.userIdDeleteSelect = action.payload
        },
        changeTypeBusinessORecomend:(state,action) => {
            if (['recomend', 'business', 'saveds'].includes(action.payload)) {
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