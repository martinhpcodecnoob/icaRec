import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isModal1Open: false,
  isModal2Open: false,
  isModal3Open: false,
  isModal4Open: false,
}

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openModal1: (state) => {
      state.isModal1Open = true
    },
    closeModal1: (state) => {
      state.isModal1Open = false
    },
    openModal2: (state) => {
      state.isModal2Open = true
    },
    closeModal2: (state) => {
      state.isModal2Open = false
    },
    openModal3: (state) => {
      state.isModal3Open = true
    },
    closeModal3: (state) => {
      state.isModal3Open = false
    },
    openModal4: (state) => {
      state.isModal4Open = true
    },
    closeModal4: (state) => {
      state.isModal4Open = false
    },
  },
})

export const {
  openModal1,
  closeModal1,
  openModal2,
  closeModal2,
  openModal3,
  closeModal3,
  openModal4,
  closeModal4,
} = popupSlice.actions
