'use client'

import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

const EmailInput = ({ control, errors }) => {

  return (
    <>
      <div className="mb-2 flex flex-col">
        <label className="text-gray-500 text-sm font-bold mb-2">Email</label>
        <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            className='border border-black rounded-full py-1 px-3 bg-white w-full'
            name='email'
          />
        )}
        />
      </div>
      {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
    </>
  )
}

export default EmailInput
