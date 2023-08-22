'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { fetchCountries } from '../../utils/apiServices'
import { getContainerClasses, getHalfContainerClasses, getSelectClasses, getInputClasses } from '../../utils/responsiveUtils'
import { validationSchema } from '../../utils/utils'
import ErrorScreen from './ErrorScreen'
import LoadingScreen from './LoadingScreen'

const RegisterUser = ({ providerType }) => {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("")
  const [countryCode, setCountryCode] = useState("")
  
  const [showPhoneInput, setShowPhoneInput] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isEmailRegistered, setIsEmailRegistered] = useState(false)
  const [documentType, setdocumentType] = useState('default')

  const containerClasses = getContainerClasses()
  const halfContainerClasses = getHalfContainerClasses()
  const selectClasses = getSelectClasses()
  const inputClasses = getInputClasses()

  useEffect(() => {
    fetchCountries()
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error))
      //Hacer que los campos se requieran al inicio, cambiar esto en el futuro
      handleSubmit(onSubmit)()
      setIsLoading(false)
  }, [])

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

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  })
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/register`, {
       method: 'POST',
       headers: {
         'Content-Type':'application/json'
       },
       body: JSON.stringify({
         name: data.nombreApellidos, 
         cellphone: data.celular,
         dni: data.numeroDocumento, 
         email: data.correoElectronico, 
         password: data.password,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        if (res.status === 409 && errorData.error === "El correo electrónico ya está registrado.") {
          setIsEmailRegistered(true)
          return
        } else {
          throw new Error(errorData.error)
        }
      }
      router.push("/")
    } catch (error) {
      console.error("Error en la solicitud fetch:", error)
      return <ErrorScreen />
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="bg-orange-100 min-h-screen flex items-center justify-center">
      <form className="bg-red-200 rounded p-4 md:p-8" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-white text-4xl font-bold mb-8 w-full">
          <span className="bg-red-500 py-2 px-4 rounded">Regístrate</span>
        </h1>
        <div className="mb-4">
          <label htmlFor="nombreApellidos" className="block font-bold mb-2">
            Nombre y Apellidos
          </label>
          <input
            type="text"
            id="nombreApellidos"
            className={`
                    ${
                      "w-full border border-gray-300 rounded p-2 text-center"
                    } 
                    ${errors.nombreApellidos ? "border-red-500" : ""} 
                    ${
                      !errors.nombreApellidos && "border-green-500"
                    }
                  `}
            placeholder="Ingresa tu nombre y apellidos"
            {...register('nombreApellidos')}
          />
          {errors.nombreApellidos && <p key="nombreApellidosError" className="text-red-500">{errors.nombreApellidos.message}</p>}
        </div>
        <div className={containerClasses}>
          <div className={halfContainerClasses}>
            <label htmlFor="tipoDocumento" className="block font-bold mb-2">
              Tipo de documento
            </label>
            <select
              id="tipoDocumento"
              className={selectClasses}
              value={documentType}
              onChange={(e) => {
                setdocumentType(e.target.value)
                register('tipoDocumento').onChange(e)    
              }}
            >
              <option value="default">Selecciona un tipo</option>
              <option value="DNI">DNI</option>
            </select>
            {errors.tipoDocumento && <p key="tipoDocumentoError" className="text-red-500">{errors.tipoDocumento.message}</p>}
          </div>
          <div className={halfContainerClasses}>
            <label htmlFor="celular" className="block font-bold mb-2">
                  Celular
            </label>
            {showPhoneInput ? (
              <div className="relative">
                <input
                  type="text"
                  id="celular"
                  className={`
                    ${
                      inputClasses
                    } 
                    ${errors.celular ? "border-red-500" : ""} 
                    ${
                      !errors.celular && "border-green-500"
                    }
                  `}
                  placeholder="Ingresa tu número de celular"
                  {...register('celular')}
                />
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <span className="text-gray-500" >{countryCode}</span>
                </div>
              </div>
            ) : (
              <div className="relative">
                <select
                  id="celular"
                  className={selectClasses}
                  value={selectedCountry}
                  onChange={(e) => {
                    handleCountryChange(e)
                    register('celular').onChange(e)
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
             {errors.celular && <p key="celularError" className="text-red-500">{errors.celular.message}</p>} 
          </div>
        </div>
        <div className={containerClasses}>
          <div className={halfContainerClasses}>
            <label htmlFor="numeroDocumento" className="block font-bold mb-2">
              Numero de documento
            </label>
            <input
              type="text"
              id="numeroDocumento"
              className={`
                    ${
                      inputClasses
                    } 
                    ${errors.numeroDocumento ? "border-red-500" : ""} 
                    ${
                      !errors.numeroDocumento && "border-green-500"
                    }
                  `}
              placeholder={documentType === "default" ? `Ingresa el tipo de documento primero` : `Ingresa tu ${documentType} aquí`}
              disabled={documentType === "default"}
              {...register('numeroDocumento')}
            />
            {errors.numeroDocumento && <p key="numeroDocumentoError" className="text-red-500">{errors.numeroDocumento.message}</p>}
          </div>
          <div className={halfContainerClasses}>
            <label htmlFor="correoElectronico" className="block font-bold mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              id="correoElectronico"
              className={`
                    ${
                      inputClasses
                    } 
                    ${errors.correoElectronico ? "border-red-500" : ""} 
                    ${
                      !errors.correoElectronico && "border-green-500"
                    }
                  `}
              placeholder="Ingresa tu correo electrónico"
              {...register('correoElectronico')}
            />
            {errors.correoElectronico && <p key="correoElectronicoError" className="text-red-500">{errors.correoElectronico.message}</p>}
            {isEmailRegistered && (
              //Puede ser una notificacion
              <p className="text-red-500">El correo electrónico ya está registrado.</p>
            )}
          </div>
        </div>
        {providerType === undefined ? (
          <>
        <div className={containerClasses}>
          <div className={halfContainerClasses}>
            <label htmlFor="password" className="block font-bold mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`
                    ${
                      inputClasses
                    } 
                    ${errors.password ? "border-red-500" : ""} 
                    ${
                      !errors.password && "border-green-500"
                    }
                  `}
                placeholder="Ingresa tu contraseña"
                {...register('password')}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center focus:outline-none"
                onClick={togglePasswordVisibility}
                >
                {showPassword ? (
                  <img
                  src="/eye-open.png"
                  alt="Ocultar contraseña"
                  className="w-6 h-6"
                  />
                  ) : (
                    <img
                    src="/eye-closed.png"
                    alt="Mostrar contraseña"
                    className="w-10 h-10"
                    />
                    )}
              </button>
            </div>
            {errors.password && <p key="passwordError" className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className={halfContainerClasses}>
            <label htmlFor="confirmPassword" className="block font-bold mb-2">
              Confirma tu contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className={`
                ${
                  inputClasses
                } 
                ${errors.confirmPassword ? "border-red-500" : ""} 
                ${
                  !errors.confirmPassword && "border-green-500"
                }
                `}
                placeholder="Confirma tu contraseña"
                {...register('confirmPassword')}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center focus:outline-none"
                onClick={toggleConfirmPasswordVisibility}
                >
                {showConfirmPassword ? (
                  <img
                  src="/eye-open.png"
                  alt="Ocultar contraseña"
                  className="w-6 h-6"
                  />
                  ) : (
                  <img
                    src="/eye-closed.png"
                    alt="Mostrar contraseña"
                    className="w-10 h-10"
                    />
                    )}
              </button>
            </div>
            {errors.confirmPassword && <p key="confirmPasswordError" className="text-red-500 ">{errors.confirmPassword.message}</p>}
          </div>
        </div>

       <div className="flex justify-center">
        <div className="w-max">
          <p className="font-bold">Debe usar al menos:</p>
        </div>
        <div className="w-5/6">
          <ul className="flex flex-wrap md:flex-no-wrap md:flex-wrap md:justify-between list-disc">
            <li className="w-full md:w-1/2">Minimo 8 caracteres</li>
            <li className="w-full md:w-1/2">1 mayuscula</li>
            <li className="w-full md:w-1/2">1 minuscula</li>
            <li className="w-full md:w-1/2">1 numero</li>
            <li className="w-full md:w-1/2">Ningun espacio</li>
          </ul>
        </div>
      </div>
      </>
      ) : (
      null
      )}
        <div className="mb-4">
          <input
            type="checkbox"
            id="terminosCondiciones"
            className="mr-2"
            required
            {...register('terminosCondiciones')}
          />
          <label htmlFor="terminosCondiciones">
            Acepto los términos y condiciones de &quot;detodo.com&quot; y autorizo la política de privacidad
          </label>
          {errors.terminosCondiciones && <p key="terminosCondicionesError" className="text-red-500">{errors.terminosCondiciones.message}</p>}
        </div>
        <div className='flex justify-center'>
        <button
          type="submit"
          className="w-3/4 bg-red-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        >
          Registrarme
        </button>
        </div>
      <p className="text-center mt-4">
        ¿Ya tienes cuenta?{" "}
        <a href="/" className="text-red-500">
          Inicia sesión
        </a>
      </p>
      </form>
    </div>
  )
}

export default RegisterUser


