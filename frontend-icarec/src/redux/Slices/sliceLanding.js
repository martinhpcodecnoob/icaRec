import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const getServices = createAsyncThunk(
    'getServices',
    async() => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/business/getAllBusinessServices`)
            const dataBusiness = await response.json()
            return dataBusiness
        } catch (error) {
            console.log("Error en los  ",error);
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
        bussiness:[]
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
    }
})

export const {extractServices,extractAllBusiness} = Landing.actions