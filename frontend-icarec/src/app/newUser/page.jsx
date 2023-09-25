'use client'

import React, { useState, useEffect } from 'react'
import RegisterWC from '@/components/Register/RegisterWC'
import RegisterScreen from '@/components/Screens/RegisterScreen'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const IndexPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { data: session } = useSession()
  const router = useRouter()
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

    useEffect(() => {
      if (session?.user?.isRegistered === true) {
        router.push("/")
      }
    }, [session, router])

    if (session?.user?.isRegistered === true) {
      return null
    }
    
    return isLoading ? (
      <RegisterScreen />
    ) : (
        <RegisterWC />
    )
}

export default IndexPage