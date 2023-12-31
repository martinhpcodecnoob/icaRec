'use client'

import React, { useState, useEffect }from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'

/* import PasswordRecoveryPage from '@/components/PasswordRecoveryPage' */
import LoadingScreen from '@/components/LoadingScreen'

import { checkIfTokenIsValid } from '../../../utils/apiBackend'

const PasswordRecoveryPage = dynamic(() =>
  import('@/components/PasswordRecoveryPage')
)

const RecoverPassword = () => {

  const searchParams = useSearchParams()
  const [tokenValid, setTokenValid] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkTokenValidity() {
      const token = searchParams.get('token')
      
      const response = await checkIfTokenIsValid(token)
      setUser(response.userId)
      setTokenValid(response.isValid)
      setLoading(false)
    }
    
    checkTokenValidity()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <LoadingScreen />
  }
 
  if (!tokenValid) {
    return <div>El enlace de recuperación es inválido o ha expirado.</div>
  }

  return  <div className="flex justify-center items-center h-screen bg-[#FAE3A3]">
            <PasswordRecoveryPage userId={user} />
          </div>
}

export default RecoverPassword