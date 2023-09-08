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
        dispatch(closeAllPopups())
      }
  
    return (
      <Popup isOpen={open} onClose={handleCloseForgotPassword} onCloseAll={handleCloseAllPopups} zIndex={54}>
        <BackButton onClick={handleCloseForgotPassword}/>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center h-full">
          <div className='flex flex-col items-center'>
            <Title title={"Restablecer tu contraseña"} />
            <div className='text-center mb-2'>
                <p className='text-gray-500 text-sm'>
                    <span className="text-black font-semibold">Ingrese el correo electrónico</span> que utilizó
                </p>
                <p className=' text-gray-500 text-sm'>
                  al registrarse para recuperar su contraseña. 
                </p>
                <p className='text-gray-500 text-sm'>
                    Recibira un enlace de <span className="text-black font-semibold">restablecimiento de contraseña</span>
                </p>
            </div>
            <EmailInput control={control} errors={errors} name="email"/>
            <button
              onClick={handleOpenLogin}
              className='border rounded-full py-1 px-3 bg-[#100e80] text-white w-3/4 mb-2'
            >
              Enviar Enlace
            </button>
            <div className='text-center mb-2'>
                <p className=' text-gray-500 text-sm'>
                    ¿Si necesitas ayuda? 
                </p>
                <p className='text-gray-500 text-sm'>
                    <span className="text-[#100e80] font-semibold">contacta con nuestro equipo de soporte</span>
                </p>
            </div>
          </div>
        </form>
      </Popup>
    )
  }

export default ForgotPassword