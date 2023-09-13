'use client'

import React, { useState, useEffect } from 'react'
import RegisterWC from '@/components/Register/RegisterWC'
import RegisterScreen from '@/components/Screens/RegisterScreen'

const IndexPage = () => {
    
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [])
  
    if (isLoading) {
        return <RegisterScreen />
    }

    return (
        <RegisterWC />
    )
}

export default IndexPage