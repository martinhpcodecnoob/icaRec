'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { useSession, signIn, signOut } from 'next-auth/react'
import Login1 from '../components/Login1'
import Image from 'next/image'
import { Button } from 'flowbite-react'
import DefaultCarousels from '../components/Carousel'
import Searchbar from '../components/Searchbar'
import Cardsup from '@/components/Cards/Cardsup'
import Cardsdown from '@/components/Cards/Cardsdown'
import LoadingScreen from '@/components/LoadingScreen'
import detodologo from '../../public/detodologo.png'
import detodologo2 from '../../public/detodologo2.png'
import { logPageView, logEvent } from '../../utils/utils'
import AdBanner from '@/components/AdBanner'
import ErrorRegisterScreen from '@/components/ErrorRegisterScreen'

const IndexPage = () => {
  const router = useRouter()
  const [isLoginOpen, setLoginOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()  

/*   if(session?.user?.newAccount){
    router.push('/newUser')
  } */
  if( session){
    console.log("sesion user", session)
  }
  useEffect(() => {
    if (session?.user?.isRegistered === false) {
      router.push('/newUser')
    } else {
      logPageView('landing_page')
    }
  }, [])

   if (session?.user?.isRegistered === false) {
    return <ErrorRegisterScreen />
  } 

  const handleOpenLogin = () => {
    logEvent('press_login_button')
    setLoginOpen(true)
  }

  const handleCloseLogin = () => {
    setLoginOpen(false)
  }

  const handleSignOut = () => {
    setIsLoading(true)
    signOut()
  } 

  const handleCreateBusiness = () => {
    router.push('/mybusiness')
  } 

  const handleUpdateUserAccount = () => {
    router.push('/register')
  } 

  if (status === "loading" || isLoading) {
    return <LoadingScreen />
  }

    return (
      <div>
        <div className='flex justify-between items-center p-4'>
          <Image
            src={detodologo}
            alt='logo'
            className='h-[1.7rem] w-[9rem]'
          />
          <div className='flex justify-center items-center lgx:hidden'>
            <p>Descubre un mundo de oportunidades con un clic!</p>
          </div>
          <div className='flex justify-center items-center'>
            {!session && (
              <Button color="failure" onClick={handleOpenLogin}>
                Login
              </Button>
            )}
            {session && (
            <div className='flex space-x-6 px-4 items-center'>
              <p className='justify-center'>Bienvenido! {session.user.name}</p>
              {session.user.providerType === "credentials" ? (
                <>
                  <Button color="failure" onClick={handleCreateBusiness}>
                    Crear Negocio
                  </Button>
                  <Button color="failure" onClick={handleSignOut}>
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                <Button color="failure" onClick={handleUpdateUserAccount}>
                  Rellenar Datos
                </Button>
                <Button color="failure" onClick={handleSignOut}>
                Sign out
              </Button>
              </>
              )}
            </div>
            )}
            {isLoginOpen && <Login1 onClose={handleCloseLogin} />}
          </div>
        </div>
        <div>
          <DefaultCarousels/>
          <AdBanner
            data-ad-slot="2597718181"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <div className='flex justify-center items-center text-2xl pt-2'>¿En que te puedo ayudar?</div>
          <Searchbar/>
          <Cardsup/>
          <div id='cardDown'>
            <Cardsdown/>
          </div>
        </div>
      </div>
    )
  
}

export default IndexPage