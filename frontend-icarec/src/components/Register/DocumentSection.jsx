'use client'

import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

const DocumentSection = ({control, errors, setValue, getValues}) => {

  const [showDocumentTypeInput, setShowDocumentTypeInput] = useState(false)

  const documentTypeOptions = (
    <>
      <option value="default">Tipo de documento</option>
      <option value="DNI">DNI</option>
      <option value="RUC">RUC</option> 
    </>
  )

  const handleDocumentTypeChange = (e) => {
    const selectedValue = e.target.value

    if (selectedValue === 'default') {
      setValue('documentNumber', '')
    }
  }

  return (
    <div className='w-full bg-green-300 '>
      <span>Tipo de documento: </span>
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
                    className='w-full'
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
                    className='w-full h-full bg-red-500'
                    placeholder={
                      getValues('documentType') === 'default'
                        ? 'Ingrese primero el tipo de documento'
                        : `Número de ${getValues('documentType')}:`
                    }
                    disabled={getValues('documentType') === 'default'}
                  />
                )}
              />
            </div>
            {getValues('documentType') === 'default' && errors.documentType && (
                <p className='text-red-500'>{errors.documentType.message}</p>
              )}
            {errors.documentNumber && getValues('documentType') !== 'default' && (
              <p className='text-red-500'>{errors.documentNumber.message}</p>
            )}
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
                    className='w-full'
                    onChange={(e) => {
                      field.onChange(e);
                      setShowDocumentTypeInput(e.target.value !== 'default')
                      //setSelectedDocumentType(e.target.value)
                    }}
                  >
                    {documentTypeOptions}
                  </select>
                )}
              />
              {getValues('documentType') === 'default' && errors.documentType && (
                <p className='text-red-500'>{errors.documentType.message}</p>
              )}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default DocumentSection