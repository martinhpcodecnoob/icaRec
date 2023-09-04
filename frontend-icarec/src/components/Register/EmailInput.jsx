import React from 'react'
import { Controller } from 'react-hook-form'

const EmailInput = ({ control, errors }) => {
  return (
    <div className='w-full bg-green-300'>
      <span>
        Correo Electronico
      </span>
      <div>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            className='w-full bg-red-500'
            name='email'
          />
        )}
      />
      </div>
      {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
    </div>
  )
}

export default EmailInput