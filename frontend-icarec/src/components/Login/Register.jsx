'use client'

import React, {useState} from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { useDispatch } from 'react-redux'

import Popup from './Popup'
import BackButton from './BackButton'
import Title from './Title'
import GoogleButton from './GoogleButton'
import FacebookButton from './FacebookButton'
import EmailButton from './EmailButton'

import { closeRegister, openLogin, closeAllPopups } from '@/redux/Slices/popupSlice'
import CustomCheckbox from './CustomCheckbox'

const Register = ({ open, close }) => {
    const router = useRouter()
    const dispatch = useDispatch()  
    const [isChecked, setIsChecked] = useState(false)

    const handleCloseRegister = () => {
      dispatch(closeRegister())
      close()
    }

    const handleCreateAccount = () => {
      router.push('/register')
      dispatch(closeAllPopups())
    } 
    const handleOpenLogin = () => {
      dispatch(openLogin())
    } 
    const handleCloseAllPopups = () => {
      dispatch(closeAllPopups())
    } 
    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked)
    }
  
    return (
      <Popup isOpen={open} onClose={handleCloseRegister} onCloseAll={handleCloseAllPopups} zIndex={52}>
        <BackButton onClick={handleCloseRegister}/>
        <div className="flex flex-col items-center justify-center h-full">
          <div className='flex flex-col w-full'>
            <Title title={"Regístrate"} />
            <GoogleButton 
              content={"Registrate con Google"}
              disabled={!isChecked}
            />
            <FacebookButton 
              content={"Registrate con Facebook"}
              disabled={!isChecked}
            />
            <EmailButton 
              content={"Crear mi cuenta"} 
              onOpenLogin={handleCreateAccount}
              disabled={!isChecked}
            />
            <CustomCheckbox 
              label={
                <div>
                  Acepto los términos y condiciones de{' '}
                  <span className="font-bold cursor-pointer text-gray-500 hover:underline">
                    <Link href="/">Kuskana.com</Link>
                  </span>{' '}
                  y la{' '}
                  <span className="font-bold cursor-pointer text-gray-500 hover:underline">
                    <Link href="/politicadeprivacidad">Política de privacidad</Link>
                  </span>
                </div>
              } 
              isChecked={isChecked}
              onChange={handleCheckboxChange}
            />
            <p className='text-center block text-gray-400 text-sm mt-4'>¿Ya tienes una cuenta?</p>
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