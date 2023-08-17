import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const PasswordRecoveryPage = () => {
  const [tokenValid, setTokenValid] = useState(true)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordChanged, setPasswordChanged] = useState(false)

  useEffect(() => {
    // Aquí verifica si el token es válido y aún no ha expirado
    // Puedes hacer esto en el componente de montaje usando la información en "location"
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

  }

  if (!tokenValid) {
    return <div>El enlace de recuperación es inválido o ha expirado.</div>;
  }

  if (passwordChanged) {
    return <div>Tu contraseña ha sido cambiada exitosamente.</div>;
  }

  return (
    <div>
      <h2>Recuperación de Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nueva Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirmar Nueva Contraseña:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="submit">Cambiar Contraseña</button>
      </form>
    </div>
  )
}

export default PasswordRecoveryPage