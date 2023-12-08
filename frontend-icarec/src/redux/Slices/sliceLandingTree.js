import { createSlice } from "@reduxjs/toolkit";

export const LandingTree = createSlice({
    name:'slice_landing_tree',
    initialState:{
        deleteBussinessByUser:{
            userIdDeleteSelect:null,
            fulfilled:null,
            loading:false,
            error:null
        }
    },
    reducers:{
        catchDeleteBussiness:(state,action) => {
            state.deleteBussinessByUser.userIdDeleteSelect = action.payload
        }
    }
})

export const {
    catchDeleteBussiness
} = LandingTree.actions