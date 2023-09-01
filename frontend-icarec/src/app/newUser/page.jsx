'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import RegisterWithoutCredentials from '@/components/RegisterWithoutCredentials'
import ErrorScreen from '@/components/ErrorScreen'

const IndexPage = () => {

    const { data: session } = useSession()
    
    return (
      <div>
        <RegisterWithoutCredentials />
      </div>
    )
}

export default IndexPage