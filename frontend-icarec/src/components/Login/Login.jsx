'use client'

import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import Popup from './Popup'
import BackButton from './BackButton'
import EmailInput from './EmailInput'
import Title from './Title'
import PasswordInput from './PasswordInput'
import CustomCheckbox from './CustomCheckbox'

import { closeLogin, openRegister, openForgotPassword, closeAllPopups } from '@/redux/Slices/popupSlice'
import { validationLogin } from '../../../utils/utils'

const Login = ({open, close}) => {
  const dispatch = useDispatch()

  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(validationLogin),
  })
  
  const onSubmit = async(data) => {

    setIsSubmitting(true)

    try {
      
    } catch (error) {
     
    }finally {

      setIsSubmitting(false)

    }
  }

  const handleOpenRegister = () => {
    dispatch(openRegister())
    close()
  }

  const handleOpenForgotPassword = () => {
    dispatch(openForgotPassword())
    close()
  }

  const handleCloseLogin = () => {
    dispatch(closeLogin())
    close()
  }

  const handleCloseAllPopups = () => {
    dispatch(closeAllPopups());
  }

  return (
    <Popup isOpen={open} onClose={handleCloseLogin} onCloseAll={handleCloseAllPopups} zIndex={51}>
      <BackButton onClick={handleCloseLogin}/>
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center h-full">
        <div className='flex flex-col items-center justify-center w-full'>
          <Title/>
          <EmailInput control={control} errors={errors} name="loginEmail"/> 
          <PasswordInput />
          <CustomCheckbox label={"Mantener sesion iniciada"}/>
          <button 
            className='border rounded-full py-1 px-3 bg-[#f3ba1a] text-white w-3/4 mb-2' 
            type='submit'
          >
            Inicio Sesion
          </button>
          <button
             onClick={handleOpenForgotPassword} 
            className='text-[#100e80] font-semibold'
            type="button"
          >
            He olvidado mi contraseña
          </button>
          <p className='text-center text-gray-500 text-sm'>¿Todavia no tienes cuenta?</p>
          <button 
            onClick={handleOpenRegister}
            className='text-[#100e80] font-semibold mb-2'
            type="button"
          >
            Registrate
          </button>
        </div>
      </form>
    </Popup>
  )
}

export default Login