'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getTokenExpirationTime } from '../../utils/utils'
import { regenerateAccessToken } from '../../utils/apiBackend'

const TokenRenewal = () => {

    const INTERVAL_IN_SECONDS = (10) * 1000
    //El tiempo debe ser menor que la expiracion del token
    const TIME_BEFORE_EXPIRATION_IN_MINUTES = (5) * 60

    const { data: session, update } = useSession()
    const [intervalDuration, setIntervalDuration] = useState(INTERVAL_IN_SECONDS)
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
        console.log("tokenExpiration: ", tokenExpiration)
        if ( tokenExpiration <= TIME_BEFORE_EXPIRATION_IN_MINUTES && !isFirstRun ) {
          try {
            const regenerateAccessTokenResponse = await regenerateAccessToken(session.user.token) 
            if (regenerateAccessTokenResponse.status === 200) {
                const newToken = regenerateAccessTokenResponse.data.accessToken
                const newExpireTime = await getTokenExpirationTime(newToken)
                if (newExpireTime > TIME_BEFORE_EXPIRATION_IN_MINUTES) {
                    await update({...session, user: {...session?.user, token: newToken}})
                    setTokenExpiration(newExpireTime)
                    setIsFirstRun(false) 
                  }
            } else {
              console.error("Error al renovar el token")
              //cerrar session
            }
          } catch (error) {
            console.error("Error de red u otro error al renovar el token")
          }
        }
      }

      const intervalId = setInterval(() => {
        checkTokenExpiration()
        renewTokenIfNeeded()
      }, intervalDuration)
  
      return () => clearInterval(intervalId)
    }, [session, tokenExpiration, intervalDuration, isFirstRun])
  
    return null
  }
  
  export default TokenRenewal

