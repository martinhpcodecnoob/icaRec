'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateAccount, updateUser } from '../../utils/apiBackend'
import { validationSchemaWithoutCredentials } from '../../utils/utils'
import { useSession } from 'next-auth/react'
import ErrorScreen from './ErrorScreen'
import { fetchCountries } from '../../utils/apiServices'

const RegisterWithoutCredentials = () => {

  const router = useRouter()
  //borre el status, para probar si todo el flujo esta bien
  const { data: session, update } = useSession()  

  const [countries, setCountries] = useState([])
  const [countryCode, setCountryCode] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [showPhoneInput, setShowPhoneInput] = useState(false)
  const [documentType, setdocumentType] = useState('default')
  const [showdocumentTypeInput, setshowdocumentTypeInput] = useState(false)
  
  useEffect(() => {
    fetchCountries()
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error))
     handleSubmit(onSubmit)() 
  }, [])

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    resolver: yupResolver(validationSchemaWithoutCredentials),
  })

  const documentTypeOptions = (
    <>
      <option value="default">Tipo de documento</option>
      <option value="DNI">DNI</option>
      <option value="RUC">RUC</option> 
    </>
  )

  const handleCountryChange = (e) => {
    const selectedCode = e.target.value
    const countryName = selectedCode
    const selectedCountry = countries.find((country) => country.name === countryName)
    if (selectedCountry) {
      setSelectedCountry(selectedCode)
      setCountryCode(`+${selectedCountry.callingCodes[0]}`)
      setShowPhoneInput(true)
    } 
  }

  const onSubmit = async (data) => {
    try {
      if(session){
        const res = await updateUser(session.user.userId, data.phoneNumber, data.documentNumber, data.sex)
        if (res.status === 200) { 
          await updateAccount( session.user.userId, session.user.newAccount, true)
          await update({...session, user: {...session?.user, isRegistered: true}})
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
              <label className="text-[#100e80] font-semibold" htmlFor="documentType">
                Tipo de documento:
              </label>
              <div className="grid grid-cols-4 gap-4 mt-1">
                { showdocumentTypeInput ? (
                  <>
                  <div className='col-span-1'>
                  <select
                    id='documentType'
                    className='border rounded-full py-1 px-3 text-[#100e80] bg-[#f3ba1a] block w-full mr-2'
                    value={documentType}
                    onChange={(e) => {
                      setdocumentType(e.target.value)
                      if (e.target.value === 'default') {
                        setValue('documentNumber', '')
                      }
                      register('documentType').onChange(e)    
                    }}
                  >
                  {documentTypeOptions}
                  </select>
                  </div>
                  <div className="col-span-3">
                  <input
                    id="documentNumber"
                    type="text"
                    className="border rounded-full py-1 px-3 placeholder-white bg-[#f3ba1a] w-full"
                    placeholder={documentType === 'default' ? 'Ingrese primero el tipo de documento' : `Número de ${documentType}:`}
                    disabled={documentType === 'default'}
                    {...register('documentNumber')}             
                    />
                  </div>
                  </>
                  ) : (
                  <div className="col-span-4">
                    <select
                      id="documentType"
                      className="border rounded-full py-1 px-3 text-[#100e80] bg-[#f3ba1a] block w-full mr-2"
                      value={documentType}
                      onChange={(e) => {
                        setdocumentType(e.target.value)
                        register('documentType').onChange(e)    
                        setshowdocumentTypeInput(true)
                      }}
                    >
                    {documentTypeOptions}
                    </select>
                  </div>
                  )
                } 
              </div>              
              {errors.documentNumber && <p key="documentNumber" className="text-red-500">{errors.documentNumber.message}</p>}
            </div>
            <div className="grid grid-cols-4 gap-4 mb-6">
            { showPhoneInput ? (
              <>
              <div className='col-span-1'>
                <span className='border rounded-full py-1 px-3 text-[#100e80] bg-[#f3ba1a] block w-full mr-2'>
                  {countryCode}
                </span>
              </div>
              <div className="col-span-3">
                <input
                  id="phoneNumber"
                  type="text"
                  className='border rounded-full py-1 px-3 text-[#100e80] bg-[#f3ba1a] block w-full mr-2'
                  placeholder="Ingresa tu número de celular"
                  {...register('phoneNumber')}
                />
              </div>
              </>
            ) : (
                <div className="col-span-4">
                <select
                  id="phoneNumber"
                  className='border rounded-full py-1 px-3 text-[#100e80] bg-[#f3ba1a] block w-full mr-2'
                  value={selectedCountry}
                  onChange={(e) => {
                    handleCountryChange(e)
                    register('phoneNumber').onChange(e)
                  }}
                >
                  <option value="">Selecciona un país</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                </div>
                )}
            </div>
            {errors.phoneNumber && <p key="phoneNumber" className="text-red-500">{errors.phoneNumber.message}</p>}
            <div className="flex justify-center mb-6">
              <label className="flex items-center cursor-pointer mr-4">
                <input
                  type="radio"
                  id="isFemale"
                  name="sex"
                  value="Mujer"
                  className="rounded-md h-4 w-4 text-[#f3ba1a]"
                  {...register('sex')}
                />
                <span className="ml-2 text-[#100e80]">Mujer</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  id="isMale"
                  name="sex"
                  value="Hombre"
                  className="rounded-md h-4 w-4 text-[#f3ba1a]"
                  {...register('sex')}
                />
                <span className="ml-2 text-[#100e80]">Hombre</span>
              </label>
            </div>
            {errors.sex && <p className="text-red-500">{errors.sex.message}</p>}
            <button
              className="bg-[#100e80] hover:bg-[#1d19e6] text-white font-semibold py-2 px-4 rounded-full w-full"
            >
              Registrate
            </button>
          </div>
          </form>
        </div>
    )
}

export default RegisterWithoutCredentials