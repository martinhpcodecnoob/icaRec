'use client'
import React, { useState } from 'react'
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

const IndexPage = () => {
  const router = useRouter()
  const [isLoginOpen, setLoginOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  console.log("Data de la session: ", session)
  const handleOpenLogin = () => {
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
    router.push('/createBusiness')
  } 

   if (status === "loading" || isLoading) {
    return <LoadingScreen />
  }
 
  return (
    <div>
      <div className='flex justify-between'>
        <Image
          src={'/detodologo.png'}
          width={100}
          height={70}
          alt='logo'
        />
        <div className='flex justify-center items-center'><p>Descubre un mundo de oportunidades con un clic!</p></div>
        <div className='flex justify-center items-center'>
          {!session && (
            <Button color="failure" onClick={handleOpenLogin}>
              Login
            </Button>
          )}
          {session && (
          <div className='flex space-x-6 px-4 items-center'>
            <p className='justify-center'>Bienvenido! {session.user.email}</p>
            <Button color="failure" onClick={handleCreateBusiness}>
                Crear Negocio
              </Button>
            <Button color="failure" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
          )}
          {isLoginOpen && <Login1 onClose={handleCloseLogin} />}
        </div>
      </div>
      <div>
        <DefaultCarousels/>
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