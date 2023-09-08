'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ExternalLogin from '@/components/Login/ExternalLogin'
import Login from '@/components/Login/Login'
import Register from '@/components/Login/Register'
import ForgotPassword from '@/components/Login/ForgotPassword'
import { openExternalLogin,
  closeExternalLogin,
  closeRegister,
  closeLogin,
  closeForgotPassword,
 } from '@/redux/Slices/popupSlice'

const IndexPage = () => {

  const dispatch = useDispatch()

  const isExternalLoginOpen = useSelector((state) => state.popup.isExternalLoginOpen)
  const isRegisterOpen = useSelector((state) => state.popup.isRegisterOpen)
  const isLoginOpen = useSelector((state) => state.popup.isLoginOpen)
  const isForgotPasswordOpen = useSelector((state) => state.popup.isForgotPasswordOpen)

  const handleOpenExternalLogin = () => {
    dispatch(openExternalLogin())
  }

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
      <ForgotPassword open={isForgotPasswordOpen} close={handleCloseForgotPassword}/>
      <button onClick={handleOpenExternalLogin}>Abrir Login Externo</button>
    </div>
  )
}

export default IndexPage