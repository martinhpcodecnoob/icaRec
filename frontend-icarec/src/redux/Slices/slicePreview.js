import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
    name:"preview_values",
    initialState:{
        latCurrent:"",
        logCurrent:"",
        inputForm:{}
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
            state.inputForm.images=[...input.images]
            const location={
                lat:state.latCurrent,
                long:state.logCurrent
            }
            state.inputForm.location={...location}
        }
    }
})

export const {saveLoaction,saveFormPreview} =Slice.actions