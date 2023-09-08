'use client'

import React from 'react'
import { useRouter } from "next/navigation"
import { useDispatch } from 'react-redux'

import Popup from './Popup'
import BackButton from './BackButton'
import Title from './Title'
import GoogleButton from './GoogleButton'
import FacebookButton from './FacebookButton'
import EmailButton from './EmailButton'

import { closeRegister, openLogin, closeAllPopups } from '@/redux/Slices/popupSlice'

const Register = ({ open, close }) => {
    const router = useRouter()
    const dispatch = useDispatch()
  
    const handleCloseRegister = () => {
      dispatch(closeRegister())
      close()
    }
  
    const handleCreateAccount = () => {
      router.push('/register')
    }

    const handleOpenLogin = () => {
      dispatch(openLogin())
    }

    const handleCloseAllPopups = () => {
      dispatch(closeAllPopups());
    }
  
    return (
      <Popup isOpen={open} onClose={handleCloseRegister} onCloseAll={handleCloseAllPopups} zIndex={52}>
        <BackButton onClick={handleCloseRegister}/>
        <div className="flex flex-col items-center justify-center h-full">
          <div className='flex flex-col w-full'>
            <Title title={"Regístrate"} />
            <GoogleButton content={"Registrate con Google"} />
            <FacebookButton content={"Registrate con Facebook"} />
            <EmailButton 
              content={"Crear mi cuenta"} 
              onOpenLogin={handleCreateAccount}
            />
            <p className='text-center block text-gray-500 text-sm mt-4'>¿Ya tienes una cuenta?</p>
            <button
              onClick={handleOpenLogin}
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