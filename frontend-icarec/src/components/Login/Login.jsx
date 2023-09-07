'use client'

import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';

import Popup from './Popup'
import EmailInput from './EmailInput'
import Title from './Title'
import PasswordInput from './PasswordInput'
import CustomCheckbox from './CustomCheckbox'

import { closeModal3, openModal2, openModal4 } from '@/redux/Slices/popupSlice'
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

  const handleOpenModal2 = () => {
    dispatch(openModal2())
    close()
  }

  const handleOpenModal4 = () => {
    dispatch(openModal4())
    close()
  }

  const handleCloseModal3 = () => {
    dispatch(closeModal3())
    close()
  }

  return (
    <Popup isOpen={open} onClose={handleCloseModal3} zIndex={51}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center h-full">
        <div className='flex flex-col'>
          <Title />
          <EmailInput control={control} errors={errors} name="loginEmail"/> 
          <PasswordInput />
          <CustomCheckbox label={"Mantener sesion iniciada"}/>
          <button 
            className='border rounded-full py-1 px-3 bg-[#f3ba1a] text-white w-full mb-2' 
            type='submit'
          >
            Inicio Sesion
          </button>
          <button
             onClick={handleOpenModal4} 
            className='text-[#100e80] font-semibold'
            type="button"
          >
            He olvidado mi contraseña
          </button>
          <p className='text-center block text-gray-500 text-sm'>¿Todavia no tienes cuenta?</p>
          <button 
            onClick={handleOpenModal2}
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