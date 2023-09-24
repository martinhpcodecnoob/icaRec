'use client'

import React, { useState, useEffect } from 'react'
import RegisterWC from '@/components/Register/RegisterWC'
import RegisterScreen from '@/components/Screens/RegisterScreen'
import { useSession } from 'next-auth/react'

const IndexPage = () => {
    const { data: session, status } = useSession()  
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [])
    
    if(session){
        console.log("data session info: ", session)
    }
    if (isLoading) {
        return <RegisterScreen />
    }
    return (
        <RegisterWC />
    )
}

export default IndexPage