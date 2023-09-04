import React from 'react'
import { Controller } from 'react-hook-form'

const FullNameInput = ({ control, errors }) => {
  return (
    <div className='flex flex-col w-full'>
      <label className='text-[#100e80] font-semibold' htmlFor='fullName'>
        Nombre y Apellidos 
      </label>
      <Controller
        name='fullName'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <input
            {...field}
            className='border rounded-full py-1 px-3 placeholder-white bg-[#f3ba1a] w-full'
            name='fullName'
          />
        )}
      />
      {errors.fullName && <p className='text-red-500'>{errors.fullName.message}</p>}
    </div>
  )
}

export default FullNameInput