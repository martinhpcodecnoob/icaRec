'use client'
import React, { useState,useEffect } from 'react'

import Login1 from '../components/Login1'
import Image from 'next/image'
import { Button } from 'flowbite-react';
import DefaultCarousels from '../components/Carousel'
import Searchbar from '../components/Searchbar';
import Cardsup from '@/components/Cards/Cardsup';
import Cardsdown from '@/components/Cards/Cardsdown';


const IndexPage = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  // const sizeResolution = window.innerWidth
  // console.log("Esto es sizeResolution: ",sizeResolution);
  const handleOpenLogin = () => {
    setLoginOpen(true)
  }

  const handleCloseLogin = () => {
    setLoginOpen(false)
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
          <Button color="failure" onClick={handleOpenLogin}>
            Login
          </Button>
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