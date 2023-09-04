'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import RegistrationInfo from './RegistrationInfo'
import SexCheckBoxes from './SexCheckBoxes'
import FullNameInput from './FullNameInput'
import DocumentSection from './DocumentSection'
import PhoneSection from './PhoneSection'
import EmailInput from './EmailInput'
import PasswordSection from './PasswordSection'
import PasswordRules from './PasswordRules'
import RegistrationButton from './RegistrationButton'

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
      <div className='flex flex-col justify-center items-center h-screen m-4'>
        <form className='flex flex-col justify-center items-center sm:w-1/2 md:w-1/4 m-4' onSubmit={handleSubmit(onSubmit)}>
          <RegistrationInfo title={"Regístrate"}/>
          <SexCheckBoxes control={control} errors={errors} setValue={setValue} getValues={getValues} />
          <FullNameInput control={control} errors={errors} />
          <DocumentSection control={control} errors={errors} setValue={setValue} getValues={getValues} />
          <PhoneSection control={control} errors={errors} setValue={setValue} />
          <EmailInput control={control} errors={errors}/>
          <PasswordSection control={control} errors={errors} />
          <PasswordRules/>
          <RegistrationButton />
        </form>        
      </div>
    )
}

export default Register