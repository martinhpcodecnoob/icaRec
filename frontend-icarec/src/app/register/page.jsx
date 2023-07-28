'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import RegisterUser from '@/components/RegisterUser'

const Register = () => {
  const { data: session } = useSession()
  console.log("Componente Register:", session?.user?.providerType)
  return (
    <RegisterUser providerType={session?.user?.providerType}/>
  )
}

export default Register