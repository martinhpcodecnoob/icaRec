'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { logPageView } from '../../../utils/utils'
import Head from 'next/head'
import LoadingScreen from '@/components/LoadingScreen'
import RegisterUser from '@/components/Register/Register'

const Register = () => {

  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      setIsLoading(false)
      logPageView('register')
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
    <Head>
      <title>Tiendas é Registro</title>
      <meta name="description" content="Registro de las tiendas é" />
    </Head>
      <RegisterUser />
    </>
  )
}

export default Register