'use client'

import React from 'react'
import { Controller } from 'react-hook-form'

const PasswordInput = ({ control, errors, name }) => {

  return (
    <>
    <div className='flex flex-col w-full items-center mb-2'>
      <div className="flex w-3/4">
        <label className="text-gray-400 text-sm font-bold text-start mb-2">Password</label>
      </div>
      <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              className='border border-black rounded-full py-1 px-3 bg-white w-3/4 mb-2'
              type='password'
              name={name}
            />
          )}
        />
    </div>
    {errors && errors.password && <p className='text-red-500'>{errors.password.message}</p>}
    </>
  )
}

export default PasswordInput
