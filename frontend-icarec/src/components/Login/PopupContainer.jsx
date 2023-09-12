'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ExternalLogin from './ExternalLogin'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import { closeExternalLogin, closeForgotPassword, closeLogin, closeRegister } from '@/redux/Slices/popupSlice'

const PopupContainer = () => {

  const dispatch = useDispatch()

  const isExternalLoginOpen = useSelector((state) => state.popup.isExternalLoginOpen)
  const isRegisterOpen = useSelector((state) => state.popup.isRegisterOpen)
  const isLoginOpen = useSelector((state) => state.popup.isLoginOpen)
  const isForgotPasswordOpen = useSelector((state) => state.popup.isForgotPasswordOpen)

  const handleCloseExternalLogin = () => {
    dispatch(closeExternalLogin())
  }

  const handleCloseRegister = () => {
    dispatch(closeRegister())
  }

  const handleCloseLogin = () => {
    dispatch(closeLogin())
  }

  const handleCloseForgotPassword = () => {
    dispatch(closeForgotPassword())
  }

  return (
    <div>
      <ExternalLogin open={isExternalLoginOpen} close={handleCloseExternalLogin} />
      <Register open={isRegisterOpen} close={handleCloseRegister} />
      <Login open={isLoginOpen} close={handleCloseLogin} />
      <ForgotPassword open={isForgotPasswordOpen} close={handleCloseForgotPassword} />
    </div>
  )
}

export default PopupContainer
