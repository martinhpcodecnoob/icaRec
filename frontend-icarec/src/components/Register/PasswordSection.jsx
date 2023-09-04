import React from 'react'
import { Controller } from 'react-hook-form'

const PasswordSection = ({control, errors}) => {
  return (
    <div className='w-full bg-sky-400'>
      <div>
        <span>
          Contraseña
        </span>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              className='w-full bg-red-500'
              type='password'
              name='password'
            />
          )}
        />
      </div>
      <div>
        <span>
          Confirma tu contraseña
        </span>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              className='w-full bg-red-500'
              type='password'
              name='confirmPassword'
            />
          )}
        />
      </div>
      {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
      {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
    </div>
  )
}

export default PasswordSection