'use client'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import RegisterUser from '@/components/RegisterUser'
import { logPageView } from '../../../utils/utils'
import Head from 'next/head'

const Register = () => {
  const { data: session } = useSession()
  useEffect(() => {
      logPageView('register')
  }, [])
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