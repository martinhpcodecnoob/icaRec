'use client'

import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useRouter } from "next/navigation"
import { useDispatch } from 'react-redux'

import Popup from './Popup'
import Title from './Title'
import EmailInput from './EmailInput'

import { openModal3, closeModal4 } from '@/redux/Slices/popupSlice'
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

    const handleCloseModal4 = () => {
      dispatch(closeModal4())
      close()
    }
  
    const handleOpenModal3 = () => {
      dispatch(openModal3())
    }
  
    return (
      <Popup isOpen={open} onClose={handleCloseModal4} zIndex={54}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center h-full">
          <div className='flex flex-col'>
            <button onClick={handleCloseModal4}>Atras</button>
            <Title title={"Restablecer tu contraseña"} />
            <EmailInput control={control} errors={errors} name="email"/>
            <button
              onClick={handleOpenModal3}
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