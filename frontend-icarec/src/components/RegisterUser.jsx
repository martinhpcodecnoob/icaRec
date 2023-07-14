'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from 'flowbite-react'
import { fetchCountries } from '../../utils/apiServices'
import { getContainerClasses, getHalfContainerClasses, getSelectClasses, getInputClasses } from '../../utils/responsiveUtils'
import { validationSchema } from '../../utils/utils'

const RegisterUser = () => {

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("")
  const [countryCode, setCountryCode] = useState("")
  
  const [showPhoneInput, setShowPhoneInput] = useState(false)
  const [phone, setPhone] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [password1, setPassword1] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password2, setPassword2] = useState('')
  const [documentType, setdocumentType] = useState('default')

  const containerClasses = getContainerClasses()
  const halfContainerClasses = getHalfContainerClasses()
  const selectClasses = getSelectClasses()
  const inputClasses = getInputClasses()

  useEffect(() => {
    fetchCountries()
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error))
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handlePasswordChange = (e) => {
    setPassword1(e.target.value)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleConfirmPasswordChange = (e) => {
    setPassword2(e.target.value)
  }

 /*  const handleSubmit = (e) => {
    e.preventDefault()
    const { password, confirmPassword } = e.target.elements
    console.log(password.value)
    console.log(confirmPassword.value)
  } */

  const onSubmit = (data) => {
    console.log(data)
  }

  const isPasswordMismatch = (password1 !== password2 ) 

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
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
            className="w-full border border-gray-300 rounded p-2 text-center"
            placeholder="Ingresa tu nombre y apellidos"
            onChange={(e) => {
              register('nombreApellidos').onChange(e)
            }}
            required
          />
          {errors.nombreApellidos && <p className="error">{errors.nombreApellidos.message}</p>}
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
              required
            >
              <option value="default">Selecciona un tipo</option>
              <option value="DNI">DNI</option>
              {/* Agregar más opciones aquí */}
            </select>
            {errors.tipoDocumento && <p className="error">{errors.tipoDocumento.message}</p>}
          </div>
          <div className={halfContainerClasses}>
            <label htmlFor="celular" className="block font-bold mb-2">
                  Celular
            </label>
            {showPhoneInput ? (
              <div className="relative">
                <input
                  type="text"
                  id="numeroCelular"
                  className={inputClasses}
                  placeholder="Ingresa tu número de celular"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    register('celular').onChange(e)
                  }}
                  required
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
                  required
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
                {errors.celular && <p className="error">{errors.celular.message}</p>}
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
              className={inputClasses}
              placeholder={documentType === "default" ? `Ingresa el tipo de documento primero` : `Ingresa tu ${documentType} aquí`}
              disabled={documentType === "default"}
              required
              {...register('numeroDocumento')}
            />
            {errors.numeroDocumento && <p className="error">{errors.numeroDocumento.message}</p>}
          </div>
          <div className={halfContainerClasses}>
            <label htmlFor="correoElectronico" className="block font-bold mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              id="correoElectronico"
              className={inputClasses}
              placeholder="Ingresa tu correo electrónico"
              onChange={(e) => {
                register('correoElectronico').onChange(e); // Actualizar el valor en el registro
              }}
              required
            />
            {errors.correoElectronico && <p className="error">{errors.correoElectronico.message}</p>}
          </div>
        </div>
        <div className={containerClasses}>
          <div className={halfContainerClasses}>
            <label htmlFor="password" className="block font-bold mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={inputClasses}
                placeholder="Ingresa tu contraseña"
                value={password1}
                onChange={(e) => {
                  handlePasswordChange(e)
                  register('password').onChange(e)
                }}
                required
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
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
          </div>
          <div className={halfContainerClasses}>
            <label htmlFor="confirmPassword" className="block font-bold mb-2">
              Confirma tu contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className={inputClasses}
                placeholder="Confirma tu contraseña"
                value={password2}
                onChange={(e) => {
                  handleConfirmPasswordChange(e)
                  register('confirmPassword').onChange(e)
                }}
                required
              />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
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
          </div>
        </div>
        {isPasswordMismatch && 
          <Alert
            color="failure"
            className="bg-red-400"
          >
            <span>
              <p>
                <span className="font-medium">
                  Alerta!
                </span>
                Las contraseñas deben ser iguales
              </p>
            </span>
          </Alert>
          }
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
        <div className="mb-4">
          <input
            type="checkbox"
            id="terminosCondiciones"
            className="mr-2"
            required
            {...register('terminosCondiciones')}
          />
          <label htmlFor="terminosCondiciones">
            Acepto los términos y condiciones de "detodo.com" y autorizo la política de privacidad
          </label>
          {errors.terminosCondiciones && <p className="error">{errors.terminosCondiciones.message}</p>}
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


