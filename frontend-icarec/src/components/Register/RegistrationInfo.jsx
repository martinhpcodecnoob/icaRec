import React from 'react'

const RegistrationInfo = ({title}) => {
    return (
        <div className='flex flex-col w-full items-center'>
            <h1 className='text-gray-600 text-lg font-semibold'> 
                {title} 
            </h1>
            <span className='text-gray-400 text-sm'>
              Estos datos solo serán utilizados para crear y verificar la autenticidad de la cuenta, mas no serán de uso público o comercial.
            </span>
        </div>
      )
}

export default RegistrationInfo