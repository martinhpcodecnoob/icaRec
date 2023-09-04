import React from 'react'

const PasswordRules = () => {
  return (
    <div className='justify-start w-full'>
      <span className="text-gray-500 text-sm">
        Debe usar al menos
      </span>
      <ul className="list-disc pl-5 text-gray-400 text-xs">
        <li> Mínimo 8 caracteres</li>
        <li> 1 mayúscula</li>
        <li> 1 minúscula</li>
        <li> 1 número</li>
        <li> Ningún espacio</li>
      </ul>
    </div>
  )
}

export default PasswordRules