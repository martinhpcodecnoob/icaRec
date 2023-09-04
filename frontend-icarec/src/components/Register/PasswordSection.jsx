import React from 'react'
import { Controller } from 'react-hook-form'

const PasswordSection = ({control, errors}) => {
  return (
    <div className='w-full'>
      <div>
        <span className='text-[#100e80] font-semibold'>
          Contraseña
        </span>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              className='border rounded-full py-1 px-3 text-white bg-[#f3ba1a] w-full'
              type='password'
              name='password'
            />
          )}
        />
      </div>
      {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
      <div>
        <span className='text-[#100e80] font-semibold'>
          Confirma tu contraseña
        </span>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              className='border rounded-full py-1 px-3 text-white bg-[#f3ba1a] w-full'
              type='password'
              name='confirmPassword'
            />
          )}
        />
      </div>
      {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
    </div>
  )
}

export default PasswordSection