'use client'

import React, { useState, useEffect } from 'react'
import RegisterWC from '@/components/Register/RegisterWC'
import RegisterScreen from '@/components/Screens/RegisterScreen'

const IndexPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      let timer

      const loadContent = () => {
        timer = setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }

      loadContent()

      return () => clearTimeout(timer)
    }, [])

    return isLoading ? <RegisterScreen /> : <RegisterWC />
}

export default IndexPage