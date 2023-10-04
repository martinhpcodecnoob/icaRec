'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { getTokenExpirationTime } from '../../utils/utils'
import { regenerateAccessToken } from '../../utils/apiBackend'

const TokenRenewal = () => {

    const INTERVAL_IN_SECONDS = (10) * 1000
    //El tiempo debe ser menor que la expiracion del token
    const TIME_BEFORE_EXPIRATION_IN_MINUTES = (1) * 60

     const { data: session, update } = useSession() 
    const [intervalDuration, setIntervalDuration] = useState(INTERVAL_IN_SECONDS)
    const [tokenExpiration, setTokenExpiration] = useState(0)
    const [isFirstRun, setIsFirstRun] = useState(true)
  
    useEffect(() => {
      const checkTokenExpiration = async () => {

        let accessToken = session?.user?.token
  
        if (accessToken) {
          if (isFirstRun) {
            const expiresIn = await getTokenExpirationTime(accessToken)
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
        if ( tokenExpiration <= TIME_BEFORE_EXPIRATION_IN_MINUTES && !isFirstRun ) {
          try {
            let regenerateAccessTokenResponse = await regenerateAccessToken(session.user.token) 
            if (regenerateAccessTokenResponse.status === 200) {
                const newToken = regenerateAccessTokenResponse.data.accessToken
                const newExpireTime = await getTokenExpirationTime(newToken)
                if (newExpireTime > TIME_BEFORE_EXPIRATION_IN_MINUTES) {
                    await update({...session, user: {...session?.user, newToken}})
                    setTokenExpiration(newExpireTime)
                    setIsFirstRun(false) 
                  }
            } else {
              //cerrar session
              console.error("Error al renovar el token")
              //redirecionar a la landing
              signOut()
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ session, tokenExpiration, intervalDuration, isFirstRun])
  
    return null
  }
  
  export default TokenRenewal

