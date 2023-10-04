'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'

import RegisterScreen from '@/components/Screens/RegisterScreen'

/*import RegisterWC from '@/components/Register/RegisterWC' */
/* 
const RegisterScreen = dynamic(() => import('@/components/Screens/RegisterScreen'), {
  loading: () => <></>, 
}) */

const RegisterWC = dynamic(() => import('@/components/Register/RegisterWC'), {
  loading: () => <RegisterScreen />, 
})

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    let timer;

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

/* const IndexPage = () => {
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
} */

export default IndexPage