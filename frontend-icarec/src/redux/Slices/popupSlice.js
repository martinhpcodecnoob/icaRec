import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isExternalLoginOpen: false,
  isRegisterOpen: false,
  isLoginOpen: false,
  isForgotPasswordOpen: false,
}

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    //External Login
    openExternalLogin: (state) => {
      state.isExternalLoginOpen = true
    },
    closeExternalLogin: (state) => {
      state.isExternalLoginOpen = false
    },
    //Register
    openRegister: (state) => {
      state.isRegisterOpen = true
    },
    closeRegister: (state) => {
      state.isRegisterOpen = false
    },
    //Login
    openLogin: (state) => {
      state.isLoginOpen = true
    },
    closeLogin: (state) => {
      state.isLoginOpen = false
    },
    //Forgot Password
    openForgotPassword: (state) => {
      state.isForgotPasswordOpen = true
    },
    closeForgotPassword: (state) => {
      state.isForgotPasswordOpen = false
    },

    closeAllPopups: (state) => {
      state.isExternalLoginOpen = false
      state.isRegisterOpen = false
      state.isLoginOpen = false
      state.isForgotPasswordOpen = false
    }
  },
})

export const {

  openExternalLogin,
  closeExternalLogin,
  openRegister,
  closeRegister,
  openLogin,
  closeLogin,
  openForgotPassword,
  closeForgotPassword,
  closeAllPopups,
} = popupSlice.actions
