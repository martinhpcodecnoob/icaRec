'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import LoadingScreen from '@/components/LoadingScreen'
import ProtectedRoute from '@/components/Guards/ProtectedRoute'
/* import RegisterForm from '@/components/Register/Register' */

const RegisterForm = dynamic(() => import('@/components/Register/Register'));

const Register = () => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      setIsLoading(false)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }
 
  return (
    <>
    <Head>
      <title>Kuskana Registro</title>
      <meta name="description" content="Registro de Kuskana" />
    </Head>
    <ProtectedRoute>
      <RegisterForm /> 
    </ProtectedRoute>
    </>
  )
}

export default Register