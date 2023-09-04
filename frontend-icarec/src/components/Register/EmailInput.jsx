import React from 'react'
import { Controller } from 'react-hook-form'

const EmailInput = ({ control, errors }) => {
  return (
    <div className='w-full'>
      <span className='text-[#100e80] font-semibold'>
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
            className='border rounded-full py-1 px-3 placeholder-white text-white bg-[#f3ba1a] w-full'
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