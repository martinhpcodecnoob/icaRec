'use client'

import React, {useState, useEffect} from 'react'
import { Controller } from 'react-hook-form'
import { fetchCountries } from '../../../utils/apiServices'

const PhoneSection = ({control, errors, setValue, getValues}) => {

  const [showPhoneInput, setshowPhoneInput] = useState(false)
  const [countries, setCountries] = useState([])
  const [countryCode, setCountryCode] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  const countriesOptions = (
    <>
     <option value="">Selecciona un país</option>
    {countries.map((country) => (
      <option key={country.code} value={country.code}>
        {country.name}
      </option>
    ))}
    </>
  )

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
      setshowPhoneInput(true)
    } 
  }

  return (
    <div className='bg-blue-500 w-full'>
      <div className='grid grid-cols-10'>
      { showPhoneInput ? (
        <>
          <div className='col-span-2'>
            <span>             
              Celular
            </span>
          </div>
          <div className='col-span-2 col-start-3'>
            <button onClick={() => {
              setshowPhoneInput(false)
              setValue('phoneNumber', '')
              }}
            >
              {countryCode}
            </button>
          </div>
          <div div className='col-span-6'>
          <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    name='phoneNumber'
                    className='w-full h-full bg-red-500'
                    placeholder="Ingresa tu número de celular"
                  />
                )}
              />
          </div>
          {errors.phoneNumber && showPhoneInput && (
            <p className='col-span-10 text-red-500'>{errors.phoneNumber.message}</p>
          )}
        </>
      ) : (
        <div className='col-span-10'>
          <Controller 
            name='phoneNumber'
            control={control}
            defaultValue=''
            render={({field}) => (
              <select 
                {...field}
                name='phoneNumber'
                className='w-full'
                onChange={(e) => {
                  handleCountryChange(e)
                }}
              >
                {countriesOptions}
              </select>
            )}
            />
        </div>
        )
      }
      </div>
    </div>
  )
}

export default PhoneSection