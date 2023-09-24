'use client'

import React, {useState} from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useRouter } from "next/navigation"
import { useDispatch } from 'react-redux'

import Popup from './Popup'
import BackButton from './BackButton'
import Title from './Title'
import EmailInput from './EmailInput'
import ForgotPasswordButton from './ForgotPasswordButton'
import ForgotPasswordConfirmation from './ForgotPasswordConfirmation'

import { closeForgotPassword, closeAllPopups } from '@/redux/Slices/popupSlice'
import { validationForgotPassword } from '../../../utils/utils'
import { forgotMyPassword } from '../../../utils/apiBackend'

const ForgotPassword = ({ open, close }) => {

    const router = useRouter()
    const dispatch = useDispatch()
  
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [error, setError] = useState('')

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validationForgotPassword),
      })

    const onSubmit = async(data) => {
      setIsSubmitting(true)
      try {
        const { email } = data
        const forgotMyPasswordResponse = await forgotMyPassword(email)
        if(forgotMyPasswordResponse.status === 200){
          setIsSent(true)
        }else if(forgotMyPasswordResponse.status === 404){
          setError("Correo electronico no registrado.")
        }else{
          setError(forgotMyPasswordResponse.error)
        }
      } catch (error) {
      //Probablemente tenga que poner una pantalla de error aqui
        setError(error.message)
        console.error("Error de inicio de sesión:", error)
      }finally {
        setIsSubmitting(false)
      }
    }

    const handleCloseForgotPassword = () => {
      dispatch(closeForgotPassword())
      close()
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
                <p className='text-gray-400 text-sm'>
                    <span className="text-gray-600 font-semibold">Ingrese el correo electrónico</span> que utilizó
                </p>
                <p className=' text-gray-400 text-sm'>
                  al registrarse para recuperar su contraseña. 
                </p>
                <p className='text-gray-400 text-sm'>
                    Recibira un enlace de <span className="text-gray-600 font-semibold">restablecimiento de contraseña</span>
                </p>
            </div>
            {!isSent ? (
              <>
                <EmailInput control={control} errors={errors} name='email'/>
                {error && (
                  <div className="text-red-500 text-sm text-center mb-2">{error}</div>
                )} 
              </>
              ) : (
              <ForgotPasswordConfirmation content={"Correo con enlace de recuperación enviado."}/>
              )
            }
            <ForgotPasswordButton isSubmitting={isSubmitting} disable={isSent}/>
            <div className='text-center mb-2'>
              <p className=' text-gray-500 text-sm'>
                  Si necesitas ayuda
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