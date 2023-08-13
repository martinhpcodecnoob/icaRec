'use client'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import RegisterUser from '@/components/RegisterUser'
import { logPageView } from '../../../utils/utils'

const Register = () => {
  const { data: session } = useSession()
  useEffect(() => {
      logPageView('register')
  }, [])
  return (
    <RegisterUser providerType={session?.user?.providerType}/>
  )
}

export default Register