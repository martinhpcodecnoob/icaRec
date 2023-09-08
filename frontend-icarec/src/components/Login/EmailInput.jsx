'use client'

import React from 'react'
import { Controller } from 'react-hook-form'

const EmailInput = ({ control, errors, name }) => {

  return (
    <>
      <div className="flex flex-col w-full items-center">
        <div className="flex w-3/4">
        <label className="text-gray-500 text-sm font-bold mb-2 text-start">Email</label>
        </div>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              className='border border-black rounded-full py-1 px-3 bg-white w-3/4 mb-2'
              name={name}
            />
          )}
        />
        
      </div>
      {errors && errors.email && <p className='text-red-500'>{errors.email.message}</p>}
    </>
  )
}

export default EmailInput
