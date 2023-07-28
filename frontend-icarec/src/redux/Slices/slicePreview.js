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
        },
        removeImageOfRedux:(state,action) => {
            const image=action.payload
            const arrayImages = state.inputForm.images
            const newArrayImages = arrayImages.filter(img => image !== img)
            state.inputForm.images=[...newArrayImages]
        }
    }
})

export const {saveLoaction,saveFormPreview,removeImageOfRedux} =Slice.actions