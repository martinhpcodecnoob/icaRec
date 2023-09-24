import { configureStore } from "@reduxjs/toolkit";
import { Slice } from "./Slices/slicePreview";
import { popupSlice } from "./Slices/popupSlice";
import { Landing } from './Slices/sliceLanding'
import { LandingTwo } from "./Slices/sliceLandingTwo";


export default configureStore({
    reducer:{
        preview:Slice.reducer,
        popup:popupSlice.reducer,
        landing:Landing.reducer,
        landingTwo:LandingTwo.reducer
    }
})