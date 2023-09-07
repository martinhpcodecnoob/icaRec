'use client'

import React from 'react'
import { useDispatch } from 'react-redux'

import Popup from './Popup'
import Title from './Title'
import GoogleButton from './GoogleButton'
import FacebookButton from './FacebookButton'
import EmailButton from './EmailButton'
import CustomCheckbox from './CustomCheckbox'

import { openModal3, openModal2} from '@/redux/Slices/popupSlice'


const ExternalLogin = ({ open, close }) => {
    const dispatch = useDispatch()
  
    const handleOpenModal3 = () => {
      dispatch(openModal3())
    }

    const handleOpenModal2 = () => {
      dispatch(openModal2())
    }

    return (
      <Popup isOpen={open} onClose={close} zIndex={50}>
        <div className="flex items-center justify-center h-full">
          <div className='flex flex-col'>
            <Title title={"Inicio Sesión"} />
            <GoogleButton content={"Continuar con Google"} />
            <FacebookButton content={"Continuar con Facebook"} />
            <EmailButton 
                content={"Continuar con mi cuenta"} 
                onOpenLogin={handleOpenModal3} 
            />
            <CustomCheckbox label={"Acepto los términos y condiciones de Kuskana.com y la Política de privacidad"} />
            <p className='text-center text-gray-500 text-sm'>¿Todavía no tienes una cuenta?</p>
            <button
              onClick={handleOpenModal2} 
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
