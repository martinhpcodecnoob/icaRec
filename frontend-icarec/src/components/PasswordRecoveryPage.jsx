import React, { useState } from 'react'
import { changePassword } from '../../utils/apiBackend'

const PasswordRecoveryPage = ({userId}) => {

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordChanged, setPasswordChanged] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, verifica.');
      return
    }

    try {
      const result = await changePassword(userId, password)

      if (result.success) {
        setPasswordChanged(true)
      } else {
        console.error('Error al cambiar la contraseña:', result.error)
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error)
    }
  }

  if (passwordChanged) {
    //redirijir
    return <div>Tu contraseña ha sido cambiada exitosamente.</div>
  }

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