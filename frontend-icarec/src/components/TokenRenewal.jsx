'use client'

import { useEffect, useState } from 'react'
import { getTokenExpirationTime } from '../../utils/utils'
import { useSession } from 'next-auth/react'

const TokenRenewal = () => {
    const { data: session } = useSession()
    const [intervalDuration, setIntervalDuration] = useState(10000)
    const [tokenExpiration, setTokenExpiration] = useState(0)
    const [isFirstRun, setIsFirstRun] = useState(true)
  
    useEffect(() => {
      const checkTokenExpiration = async () => {
        const accessToken = session?.user?.token
  
        if (accessToken) {
          if (isFirstRun) {
            const expiresIn = await getTokenExpirationTime(accessToken)
            console.log("First Expires In: ", expiresIn)
            if (expiresIn > 0) {
              setTokenExpiration(expiresIn)
              setIsFirstRun(false)
            }
          } else {
            setTokenExpiration(prevExpiration => prevExpiration - intervalDuration / 1000)
          }
        }
      }
  
      const renewTokenIfNeeded = async () => {
        console.log("Expiracion: ", tokenExpiration)
        if (tokenExpiration <= 0 && !isFirstRun) {
          // Realiza la lógica para renovar el token aquí y actualiza el token en la sesión
          try {
            // Llama al backend para obtener el nuevo token de acceso
            /* const response = await renewToken() */
            if (true) {
              // Actualiza el token en la sesión de NextAuth
              // Por ejemplo, session.jwt es el nuevo token de acceso
              // session.jwt = response.nuevoToken
              console.log("Token renovado exitosamente")
              // Actualiza tokenExpiration después de la renovación
              setTokenExpiration(prevExpiration => prevExpiration + intervalDuration / 1000)
            } else {
              console.error("Error al renovar el token")
            }
          } catch (error) {
            console.error("Error de red u otro error al renovar el token")
          }
        }
      }
  
      // Inicia el intervalo de verificación inicial
      const intervalId = setInterval(() => {
        checkTokenExpiration()
        renewTokenIfNeeded()
      }, intervalDuration)
  
      return () => clearInterval(intervalId)
    }, [session, tokenExpiration, intervalDuration, isFirstRun])
  
    return null
  }
  
  export default TokenRenewal

/* const TokenRenewal = () => {
    const { data: session } = useSession()
    const [intervalDuration, setIntervalDuration] = useState(10000) 
    const [tokenExpiration, setTokenExpiration] = useState(0)
    const [isFirstRun, setIsFirstRun] = useState(true)
  
    useEffect(() => {
      const checkTokenExpiration = async () => {
        const accessToken = session?.user?.token
  
        if (accessToken) {
          if (isFirstRun) {
      
            const expiresIn = await getTokenExpirationTime(accessToken)
            console.log("First Expires In: ", expiresIn)
            if (expiresIn>0) {
                setTokenExpiration(prevExpiration => prevExpiration + expiresIn)
                setIsFirstRun(false)
            }
          } else {

            setTokenExpiration(prevExpiration => prevExpiration - intervalDuration / 1000)
          }
  

          console.log("token Expiration:", tokenExpiration)
          if (tokenExpiration>=0 &&!isFirstRun) {

            try {

              if (true) {

                console.log("Token renovado exitosamente")
              } else {
                console.error("Error al renovar el token")
              }
            } catch (error) {
              console.error("Error de red u otro error al renovar el token")
            }

          }
        }
      }

      const intervalId = setInterval(checkTokenExpiration, intervalDuration)
  
      return () => clearInterval(intervalId)
    }, [session, tokenExpiration, intervalDuration, isFirstRun])
  
    return null
  }
  
  export default TokenRenewal
 */
