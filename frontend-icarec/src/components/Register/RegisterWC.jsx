'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify'

import RegistrationInfo from './RegistrationInfo'
import SexCheckBoxes from './SexCheckBoxes'
import DocumentSection from './DocumentSection'
import PhoneSection from './PhoneSection'
import RegistrationButton from './RegistrationButton'
import ErrorScreen from '../ErrorScreen'
import DeleteAccountButton from './DeleteAccountButton'

import { validationSchemaWithoutCredentials } from '../../../utils/utils'
import { updateAccount, updateUser } from '../../../utils/apiBackend'

import 'react-toastify/dist/ReactToastify.css'

//Registrer With Out Credentials => {google, facebook, ...}
const RegisterWC = () => {

  const router = useRouter()
  const { data: session, update } = useSession()  
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
      handleSubmit(onSubmit)()
    }, [])
  const { handleSubmit, control, formState: { errors }, setValue, getValues } = useForm({
      resolver: yupResolver(validationSchemaWithoutCredentials),
  })
  
  const onSubmit = async(data) => {

    setIsSubmitting(true)

    const {sex, documentNumber, phoneNumber, phoneCode} = data
    const fullPhoneNumber = `+${phoneCode} ${phoneNumber}`
    try {
      const updateUserResponse = await updateUser(session.user.userId, fullPhoneNumber, documentNumber, sex)
      if(updateUserResponse.status === 200){
        await updateAccount( session.user.userId, session.user.newAccount, true)
        await update({...session, user: {...session?.user, isRegistered: true}})
      
          toast.success('Registro exitoso, redirigiéndote a la página principal', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            onClose: () => { router.push("/") }
          })  
        
      }else{
        toast.error('Ocurrio un error, intentelo más tarde', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            onClose: () => { router.push("/") } 
        })
        throw new Error(updateUserResponse.error)
      }
    } catch (error) {
      console.error("Error en la solicitud updateUserResponse:", error)
      //Podria hacer que la pantallad error reciba un string de props para poder mostrar un mejor manejo de errores
      return <ErrorScreen />
    }finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <ToastContainer/>
      <form className='flex flex-col justify-center items-center sm:w-1/2 md:w-1/4' onSubmit={handleSubmit(onSubmit)}>
        <DeleteAccountButton userId={session?.user?.userId} accessToken={session?.user?.token}/>
        <RegistrationInfo title={"Ya casi terminamos"}/>
        <DocumentSection control={control} errors={errors} setValue={setValue} getValues={getValues} />
        <PhoneSection control={control} errors={errors} setValue={setValue} getValues={getValues}/>
        <SexCheckBoxes control={control} errors={errors} setValue={setValue} getValues={getValues} />
        <RegistrationButton isSubmitting={isSubmitting} />
      </form>        
    </div>
  )
}

export default RegisterWC