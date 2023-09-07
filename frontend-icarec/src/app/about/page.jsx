'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ExternalLogin from '@/components/Login/ExternalLogin'
import Login from '@/components/Login/Login'
import Register from '@/components/Login/Register'
import ForgotPassword from '@/components/Login/ForgotPassword'
import { openModal1,
  closeModal1,
  closeModal2,
  closeModal3,
  closeModal4
 } from '@/redux/Slices/popupSlice'

const IndexPage = () => {
  const dispatch = useDispatch()
  const isModal1Open = useSelector((state) => state.popup.isModal1Open)
  const isModal2Open = useSelector((state) => state.popup.isModal2Open)
  const isModal3Open = useSelector((state) => state.popup.isModal3Open)
  const isModal4Open = useSelector((state) => state.popup.isModal4Open)

  const handleOpenModal1 = () => {
    dispatch(openModal1())
  }

  const handleCloseModal1 = () => {
    dispatch(closeModal1())
  }

  const handleCloseModal2 = () => {
    dispatch(closeModal2())

  }
  const handleCloseModal3 = () => {
    dispatch(closeModal3())
  }

  const handleCloseModal4 = () => {
    dispatch(closeModal4())
  }

  return (
    <div>
      <ExternalLogin open={isModal1Open} close={handleCloseModal1} />
      <Register open={isModal2Open} close={handleCloseModal2} />
      <ForgotPassword open={isModal4Open} close={handleCloseModal4}/>
      <Login open={isModal3Open} close={handleCloseModal3} /> 
      <button onClick={handleOpenModal1}>Abrir Modal 1</button>
    </div>
  )
}

export default IndexPage