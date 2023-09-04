'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import SexCheckBoxes from './SexCheckBoxes'
import FullNameInput from './FullNameInput'
import DocumentSection from './DocumentSection'
import PhoneSection from './PhoneSection'
import EmailInput from './EmailInput'
import PasswordSection from './PasswordSection'
import PasswordRules from './PasswordRules'

import { validationSchema } from '../../../utils/utils'

const Register = () => {
    
    useEffect(() => {
        handleSubmit(onSubmit)()
      }, [])

    const { handleSubmit, control, formState: { errors }, setValue, getValues } = useForm({
        resolver: yupResolver(validationSchema),
    })
    
    const onSubmit = (data) => {
        console.log(data)
    }

    return (
      <div className='flex flex-col justify-center items-center h-screen'>
        <form className='flex flex-col justify-center items-center w-1/4' onSubmit={handleSubmit(onSubmit)}>
          <h1>
            Register
          </h1>
          <span>
              Estos datos solo seran utilizados para crear y verificar la autenticidad de la cuenta, mas no será de uso publico o comercial.
          </span>
          <SexCheckBoxes control={control} errors={errors} setValue={setValue} getValues={getValues} />
          <FullNameInput control={control} errors={errors} />
          <DocumentSection control={control} errors={errors} setValue={setValue} getValues={getValues} />
          <PhoneSection control={control} errors={errors} setValue={setValue} getValues={getValues} />
          <EmailInput control={control} errors={errors}/>
          <PasswordSection control={control} errors={errors} />
          <PasswordRules />
          <button type="submit">
            Registrarse
          </button>
        </form>        
      </div>
    )
}

export default Register