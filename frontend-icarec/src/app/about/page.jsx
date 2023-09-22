'use client'

import React from 'react'
import RegisterScreen from '@/components/Screens/RegisterScreen'
import AboutBusiness from '@/components/Formbussiness/AboutBusiness'
import ButtonRecomend from '@/components/Modals/ButtonRecomend'
import { useSession } from "next-auth/react"
import { useEffect } from 'react'

const IndexPage = () => {
  const params = '6504bb8e30fc45678afe157d'
  return (
    // <RegisterScreen />
    <div className=''>
      paginas de pruebas
      {/* <AboutBusiness/> */}
      <ButtonRecomend paramsIdBusiness={params}/>
    </div>
  )
}

export default IndexPage