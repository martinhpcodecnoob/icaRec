import { configureStore } from "@reduxjs/toolkit";
import { Slice } from "./Slices/slicePreview";
import { popupSlice } from "./Slices/popupSlice";


export default configureStore({
    reducer:{
        preview:Slice.reducer,
        popup:popupSlice.reducer,
    }
})