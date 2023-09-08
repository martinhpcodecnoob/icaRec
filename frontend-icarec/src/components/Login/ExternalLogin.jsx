'use client'

import React from 'react'
import { useDispatch } from 'react-redux'

import Popup from './Popup'
import BackButton from './BackButton'
import Title from './Title'
import GoogleButton from './GoogleButton'
import FacebookButton from './FacebookButton'
import EmailButton from './EmailButton'
import CustomCheckbox from './CustomCheckbox'

import { openLogin, openRegister, closeExternalLogin, closeAllPopups} from '@/redux/Slices/popupSlice'


const ExternalLogin = ({ open, close }) => {
    const dispatch = useDispatch()
  
    const handleOpenLogin = () => {
      dispatch(openLogin())
    }

    const handleOpenRegister = () => {
      dispatch(openRegister())
    }

    const handleCloseExternalLogin = () => {
      dispatch(closeExternalLogin())
    }

    const handleCloseAllPopups = () => {
      dispatch(closeAllPopups());
    }

    return (
      <Popup isOpen={open} onClose={handleCloseExternalLogin} onCloseAll={handleCloseAllPopups} zIndex={50}>
        <BackButton onClick={handleCloseExternalLogin}/>
        <div className="flex items-center justify-center h-full">
          <div className='flex flex-col'>
            <Title title={"Inicio Sesión"} />
            <GoogleButton content={"Continuar con Google"} />
            <FacebookButton content={"Continuar con Facebook"} />
            <EmailButton 
                content={"Continuar con mi cuenta"} 
                onOpenLogin={handleOpenLogin} 
            />
            <CustomCheckbox label={"Acepto los términos y condiciones de Kuskana.com y la Política de privacidad"} />
            <p className='text-center text-gray-500 text-sm'>¿Todavía no tienes una cuenta?</p>
            <button
              onClick={handleOpenRegister} 
              className='text-[#100e80] font-semibold mb-2'
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </Popup>
    )
  }

export default ExternalLogin
