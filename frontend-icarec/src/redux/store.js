import { configureStore } from "@reduxjs/toolkit";
import { Slice } from "./Slices/slicePreview";
import { popupSlice } from "./Slices/popupSlice";
import { Landing } from './Slices/sliceLanding'


export default configureStore({
    reducer:{
        preview:Slice.reducer,
        popup:popupSlice.reducer,
        landing:Landing.reducer
    }
})