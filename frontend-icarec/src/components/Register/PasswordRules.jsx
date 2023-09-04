import React from 'react'

const PasswordRules = () => {
  return (
    <div>
        <span>
            La contraseña debe contoner al menos:
        </span>
        <ul>
            <li>Minimo 8 caracteres</li>
            <li>1 mayuscula</li>
            <li>1 minuscula</li>
            <li>1 numero</li>
            <li>Ningun espacio</li>
        </ul></div>
  )
}

export default PasswordRules