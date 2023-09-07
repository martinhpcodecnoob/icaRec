'use client'

import React from 'react'
import { useRouter } from "next/navigation"

import Popup from './Popup'
import Title from './Title'
import GoogleButton from './GoogleButton'
import FacebookButton from './FacebookButton'
import EmailButton from './EmailButton'
import Login from './Login'
import { closeModal2, openModal3 } from '@/redux/Slices/popupSlice'
import { useDispatch } from 'react-redux';


const Register = ({ open, close }) => {
    const router = useRouter()
    const dispatch = useDispatch()
  
    const handleCloseModal2 = () => {
      dispatch(closeModal2()); // Cierra el modal 2 (Register)
      close(); // Cierra el modal actual
    };
  
    const handleCreateAccount = () => {
      router.push('/register')
    }

    const handleOpenModal3 = () => {
      dispatch(openModal3())
    }
  
    return (
      <Popup isOpen={open} onClose={handleCloseModal2}>
        <div className="flex items-center justify-center h-full">
          <div className='flex flex-col'>
            <button onClick={handleCloseModal2}>Atras</button>
            <Title title={"Regístrate"} />
            <GoogleButton content={"Registrate con Google"} />
            <FacebookButton content={"Registrate con Facebook"} />
            <EmailButton 
              content={"Crear mi cuenta"} 
              onOpenLogin={handleCreateAccount} // Abre el modal 3 (Login)
            />
            <p className='text-center block text-gray-500 text-sm'>¿Ya tienes una cuenta?</p>
            <button
              onClick={handleOpenModal3} // Abre el modal 3 (Login)
              className='text-[#100e80] font-semibold mb-2'
            >
              Inicia sesión
            </button>
          </div>
        </div>
        <Login /> {/* Renderiza el modal 3 (Login) */}
      </Popup>
    );
  };
export default Register