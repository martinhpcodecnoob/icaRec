'use client'

import React from 'react'
import { useRouter } from "next/navigation"
import { useDispatch } from 'react-redux'

import Popup from './Popup'
import Title from './Title'
import GoogleButton from './GoogleButton'
import FacebookButton from './FacebookButton'
import EmailButton from './EmailButton'

import { closeModal2, openModal3 } from '@/redux/Slices/popupSlice'


const Register = ({ open, close }) => {
    const router = useRouter()
    const dispatch = useDispatch()
  
    const handleCloseModal2 = () => {
      dispatch(closeModal2())
      close()
    }
  
    const handleCreateAccount = () => {
      router.push('/register')
    }

    const handleOpenModal3 = () => {
      dispatch(openModal3())
    }
  
    return (
      <Popup isOpen={open} onClose={handleCloseModal2} zIndex={52}>
        <div className="flex items-center justify-center h-full">
          <div className='flex flex-col'>
            <button onClick={handleCloseModal2}>Atras</button>
            <Title title={"Regístrate"} />
            <GoogleButton content={"Registrate con Google"} />
            <FacebookButton content={"Registrate con Facebook"} />
            <EmailButton 
              content={"Crear mi cuenta"} 
              onOpenLogin={handleCreateAccount}
            />
            <p className='text-center block text-gray-500 text-sm'>¿Ya tienes una cuenta?</p>
            <button
              onClick={handleOpenModal3}
              className='text-[#100e80] font-semibold mb-2'
            >
              Inicia sesión
            </button>
          </div>
        </div>
      </Popup>
    );
  };
export default Register