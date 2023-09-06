'use client'

import React from 'react'
import { Controller } from 'react-hook-form'

const SexCheckBoxes = ({ control, errors }) => {
  return (
    <div className='flex flex-col w-full justify-center mb-2'>
      <div className='flex flex-row w-full justify-around'>
        <div className='flex flex-row items-center'>
          <label className='text-[#100e80] font-semibold' htmlFor='Hombre'>
            Hombre
          </label>
          <Controller
            name="sex"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <div className='relative w-8 h-8 bg-[#f3ba1a] rounded-md ml-3'>
                  <input
                    {...field}
                    name='sex'
                    type="radio"
                    value="Hombre"
                    className='opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    checked={field.value === "Hombre"}
                  />
                  {field.value === "Hombre" && (
                    <i className="text-[#100e80] text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">✓</i>
                  )}
                </div>
              </>
            )}
          />
        </div>
        <div className='flex flex-row items-center'>
          <label className='text-[#100e80] font-semibold' htmlFor='Mujer'>
            Mujer
          </label>
          <Controller
            name="sex"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <div className='relative w-8 h-8 bg-[#f3ba1a] rounded-md ml-3'>
                  <input
                    {...field}
                    name='sex'
                    type="radio"
                    value="Mujer"
                    className='opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    checked={field.value === "Mujer"}
                  />
                  {field.value === "Mujer" && (
                    <i className="text-[#100e80] text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">✓</i>
                  )}
                </div>
              </>
            )}
          />
        </div>
      </div>
      {errors.sex && <p className='text-red-500'>{errors.sex.message}</p>}
    </div>
  )
}

export default SexCheckBoxes
