'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import Popup from './Popup'
import BackButton from './BackButton'
import EmailInput from './EmailInput'
import Title from './Title'
import PasswordInput from './PasswordInput'
import CustomCheckbox from './CustomCheckbox'
import LoginButton from './LoginButton'

import { closeLogin, openRegister, openForgotPassword, closeAllPopups } from '@/redux/Slices/popupSlice'
import { validationLogin } from '../../../utils/utils'

const Login = ({open, close}) => {

  const dispatch = useDispatch()
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(validationLogin),
  })
  
  const onSubmit = async(data) => {
    setIsSubmitting(true)
    try {
      const signInResponse = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, 
      })
      if(signInResponse.error){
        if(signInResponse.error === "CredentialsSignin") {
          setError("Usuario o contraseña inválidos")
        } else {
          setError("Error de inicio de sesión:")
        }
      }else{
        router.push("/")
      }
    } catch (error) {
      //Probablemente tenga que poner una pantalla de error aqui
      setError(error.message)
      console.error("Error de inicio de sesión:", error)
    }finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenRegister = () => {
    dispatch(openRegister())
    close()
  }

  const handleOpenForgotPassword = () => {
    dispatch(openForgotPassword())
    close()
  }

  const handleCloseLogin = () => {
    dispatch(closeLogin())
    close()
  }

  const handleCloseAllPopups = () => {
    dispatch(closeAllPopups());
  }

  return (
    <Popup isOpen={open} onClose={handleCloseLogin} onCloseAll={handleCloseAllPopups} zIndex={51}>
      <BackButton onClick={handleCloseLogin}/>
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center h-full">
        <div className='flex flex-col items-center justify-center w-full'>
          <Title/>
          <EmailInput control={control} errors={errors} name="email"/>
          {error && (
            <div className="text-red-500 text-sm text-center mb-2">{error}</div>
          )} 
          <PasswordInput control={control} errors={errors} name="password"/>
          <CustomCheckbox label={"Mantener sesion iniciada"}/>
          <LoginButton isSubmitting={isSubmitting}/>
          <button
            onClick={handleOpenForgotPassword} 
            className='text-[#100e80] font-semibold mb-4'
            type="button"
          >
            He olvidado mi contraseña
          </button>
          <p className='text-center text-gray-400 text-sm'>¿Todavia no tienes cuenta?</p>
          <button 
            onClick={handleOpenRegister}
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