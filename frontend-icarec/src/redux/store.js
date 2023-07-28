import { configureStore } from "@reduxjs/toolkit";
import { Slice } from "./Slices/slicePreview";

export default configureStore({
    reducer:{
        preview:Slice.reducer
    }
})