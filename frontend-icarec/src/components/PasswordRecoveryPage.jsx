import React, { useState } from 'react'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { changePassword } from '../../utils/apiBackend'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../utils/utils';

const PasswordRecoveryPage = ({userId}) => {

  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data) => {

    try {
      const result = await changePassword(userId, data.password)

      if (result.success) {
        await signInAndRedirect(result.userRedirect)
      } else {
        console.error('Error al cambiar la contraseña:', result.error)
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error)
    }
  }

  const signInAndRedirect = async (userRedirectData) => {
    try {
      const { userEmail, password } = userRedirectData
      console.log("Email:", userEmail)
      console.log("Password:", password)
      const result = await signIn('credentials', {
        email: userEmail,
        password,
        redirect: false,
      })

      if (result.error === 'CredentialsSignin') {
        console.error('Error login credentials:', result.error)
      } else {
        console.log("Aca se redirije")
        //AL USAR EL PUSH.ROUTER SE CRASHEA
        window.location.replace('/')
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error)
    }
  };

  return (
    <div className="bg-red-200 w-full max-w-sm mx-auto p-6 ">
      <h2 className="text-2xl font-semibold mb-4">Recuperación de Contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1" htmlFor="password">
            Nueva Contraseña:
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        {errors.password && <p key="passwordError" className="text-red-500">{errors.password.message}</p>}
        <div>
          <label className="block font-medium mb-1" htmlFor="confirmPassword">
            Confirmar Nueva Contraseña:
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        {errors.confirmPassword && <p key="confirmPasswordError" className="text-red-500">{errors.confirmPassword.message}</p>}
        <button
          type="submit"
          className="w-full bg-red-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition duration-300"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  )
}

export default PasswordRecoveryPage