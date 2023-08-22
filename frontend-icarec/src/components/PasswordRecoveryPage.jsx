import React, { useState } from 'react'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { changePassword } from '../../utils/apiBackend'

const PasswordRecoveryPage = ({userId}) => {

  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, verifica.')
      return
    }

    try {
      const result = await changePassword(userId, password)

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
    <div className="w-full max-w-sm mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Recuperación de Contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1" htmlFor="password">
            Nueva Contraseña:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1" htmlFor="confirmPassword">
            Confirmar Nueva Contraseña:
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
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