'use client'

import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useRouter } from "next/navigation"
import { useDispatch } from 'react-redux'

import Popup from './Popup'
import BackButton from './BackButton'
import Title from './Title'
import EmailInput from './EmailInput'

import { openLogin, closeForgotPassword, closeAllPopups } from '@/redux/Slices/popupSlice'
import { validationForgotPassword } from '../../../utils/utils'

const ForgotPassword = ({ open, close }) => {

    const router = useRouter()
    const dispatch = useDispatch()
  
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validationForgotPassword),
      })

    const onSubmit = async(data) => {
      try {
        
      } catch (error) {
       
      }finally {

      }
    }

    const handleCloseForgotPassword = () => {
      dispatch(closeForgotPassword())
      close()
    }
  
    const handleOpenLogin = () => {
      dispatch(openLogin())
    }

    const handleCloseAllPopups = () => {
        dispatch(closeAllPopups());
      }
  
    return (
      <Popup isOpen={open} onClose={handleCloseForgotPassword} onCloseAll={handleCloseAllPopups} zIndex={54}>
        <BackButton onClick={handleCloseForgotPassword}/>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center h-full">
          <div className='flex flex-col'>
            <Title title={"Restablecer tu contraseña"} />
            <EmailInput control={control} errors={errors} name="email"/>
            <button
              onClick={handleOpenLogin}
              className='text-[#100e80] font-semibold mb-2'
            >
              Enviar Enlace
            </button>
            <p className='text-center block text-gray-500 text-sm'>¿Si necesitas ayuda?</p>
            <p className='text-center block text-blue-500 text-sm'>contacta con nuestro equipo de soporte</p>
          </div>
        </form>
      </Popup>
    )
  }

export default ForgotPassword