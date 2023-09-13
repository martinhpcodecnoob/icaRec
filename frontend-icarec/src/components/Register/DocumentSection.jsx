'use client'

import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

const DocumentSection = ({control, errors, setValue, getValues}) => {

  const [showDocumentTypeInput, setShowDocumentTypeInput] = useState(false)

  const documentTypeOptions = (
    <>
      <option value="default">Tipo de documento</option>
      <option value="DNI">DNI</option>
    </>
  )

  const handleDocumentTypeChange = (e) => {
    const selectedValue = e.target.value

    if (selectedValue === 'default') {
      setValue('documentNumber', '')
    }
  }

  return (
    <div className='w-full mb-2'>
      <span className='text-[#100e80] font-semibold'>Tipo de documento: </span>
      <div className='grid grid-cols-4'>
        {showDocumentTypeInput ? (
          //Cuando el showDocumentTypeInput es true:
          <>
            <div className='col-span-1'>
              <Controller 
                name='documentType'
                control={control}
                defaultValue='default'
                render={({field}) => (
                  <select 
                    {...field}
                    name='documentType'
                    className='border rounded-full py-1 px-3 bg-[#f3ba1a] text-[#100e80] font-semibold text-center w-full'
                    onChange={(e) => {
                      field.onChange(e)
                      handleDocumentTypeChange(e)
                    }}
                  >
                    {documentTypeOptions}
                  </select>
                )}
              />
              
            </div>
            <div className='col-span-3'>
              <Controller
                name="documentNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    name='documentNumber'
                    className='border rounded-full py-1 px-3 placeholder-white bg-[#f3ba1a] w-full ml-1'
                    placeholder={
                      getValues('documentType') === 'default'
                        ? 'Ingrese primero el tipo de documento'
                        : `Número de ${getValues('documentType')}`
                    }
                    disabled={getValues('documentType') === 'default'}
                  />
                )}
              />
            </div>
            
          </>
          ) : (
            <div className='col-span-4'>
              <Controller 
                name='documentType'
                control={control}
                defaultValue='default'
                render={({field}) => (
                  <select 
                    {...field}
                    name='documentType'
                    className='border rounded-full py-1 px-3 bg-[#f3ba1a] text-[#100e80] font-semibold w-full'
                    onChange={(e) => {
                      field.onChange(e)
                      setShowDocumentTypeInput(e.target.value !== 'default')
                      //setSelectedDocumentType(e.target.value)
                    }}
                  >
                    {documentTypeOptions}
                  </select>
                )}
              />
            </div>
          )
        }
      </div>
      {getValues('documentType') === 'default' && errors.documentType && (
              <p className='text-red-500'>{errors.documentType.message}</p>
            )}
      {errors.documentNumber && getValues('documentType') !== 'default' && (
              <p className='text-red-500'>{errors.documentNumber.message}</p>
            )}
    </div>
  )
}

export default DocumentSection