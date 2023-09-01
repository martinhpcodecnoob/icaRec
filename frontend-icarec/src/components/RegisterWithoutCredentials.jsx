'use client'

import React, { useEffect } from 'react'
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateAccount, updateUser } from '../../utils/apiBackend'
import { validationSchemaWithoutCredentials } from '../../utils/utils'
import { getSession, useSession } from 'next-auth/react'
import ErrorScreen from './ErrorScreen'

const RegisterWithoutCredentials = () => {

  const router = useRouter()
  const { data: session, status, update } = useSession()  

  if(session){
    console.log("Datos de la session: ", session)
  }

  useEffect(() => {
    handleSubmit(onSubmit)()
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchemaWithoutCredentials)
  })

  const onSubmit = async (data) => {
    try {
      if(session){
        const res = await updateUser(session.user.userId, data.phoneNumber, data.documentNumber)
        if (res.status === 200) { 
          await updateAccount( session.user.userId, session.user.newAccount, true)
          await update({...session, user: {...session?.user, isRegistered: true}})
          //await useSession({ session })
          router.push("/")
        } else {
          throw new Error(res.error)
        }
      }
    } catch (error) {
      console.error("Error en la solicitud fetch:", error)
      return <ErrorScreen />
    }
  }

    return (
        <div className="flex justify-center items-center h-screen">
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-6">Ya casi acabamos</h2>
            <p className="text-gray-500 mb-6">
              Estos datos solo serán utilizados para verificar la autenticidad de la cuenta, más no serán de uso público o comercial.
            </p>
            <div className="mb-6">
              <label className="text-blue-500 font-semibold" htmlFor="documentType">
                Tipo de documento:
              </label>
              <div className="grid grid-cols-4 gap-4 mt-1">
                <div className="col-span-1">
                  <select
                    id="documentType"
                    className="border rounded-full py-1 px-3 text-black bg-yellow-300 focus:outline-none focus:ring focus:border-yellow-400 block w-full mr-2"
                  >
                    <option value="DNI">DNI</option>
                    <option value="RUC">RUC</option>
                  </select>
                </div>
                <div className="col-span-3">
                  <input
                    id="documentNumber"
                    type="text"
                    className="border rounded-full py-1 px-3 placeholder-white bg-yellow-300 focus:outline-none focus:ring focus:border-yellow-400 w-full"
                    placeholder="Número de documento"
                    {...register('documentNumber')}
                  />
                </div>
              </div>
              {errors.documentNumber && <p key="documentNumber" className="text-red-500">{errors.documentNumber.message}</p>}
            </div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="col-span-1">
                <select
                  className="border rounded-full py-1 px-3 text-black bg-yellow-300 focus:outline-none focus:ring focus:border-yellow-400 w-full"
                >
                  <option value="+51">+51</option>
                </select>
              </div>
              <div className="col-span-3">
                <input
                  id="phoneNumber"
                  type="text"
                  className="border rounded-full py-1 px-3 placeholder-white bg-yellow-300 focus:outline-none focus:ring focus:border-yellow-400 w-full"
                  placeholder="Número de celular"
                  {...register('phoneNumber')}
                />
              </div>
            </div>
            {errors.phoneNumber && <p key="phoneNumber" className="text-red-500">{errors.phoneNumber.message}</p>}
            <div className="flex justify-center mb-6">
              <label className="flex items-center cursor-pointer mr-4">
                <input type="checkbox" className="rounded-md h-4 w-4 text-yellow-300 focus:ring focus:border-yellow-400" />
                <span className="ml-2">Mujer</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="rounded-md h-4 w-4 text-yellow-300 focus:ring focus:border-yellow-400" />
                <span className="ml-2">Hombre</span>
              </label>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-600 w-full"
            >
              Registrate
            </button>
          </div>
          </form>
        </div>
    )
}

export default RegisterWithoutCredentials