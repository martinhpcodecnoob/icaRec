'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import RegisterUser from '@/components/RegisterUser'
import { logPageView } from '../../../utils/utils'
import Head from 'next/head'
import LoadingScreen from '@/components/LoadingScreen'

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
    <RegisterUser providerType={session?.user?.providerType}/>
    </>
  )
}

export default Register