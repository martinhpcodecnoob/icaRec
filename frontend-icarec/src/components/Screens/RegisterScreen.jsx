'use client'

import React, { useEffect, useState } from 'react'

const RegisterScreen = () => {
    const [visible, setVisible] = useState(true)
  
    useEffect(() => {
        const handlePageLoad = () => {
            setVisible(false)
          }

          if (typeof window !== 'undefined') {
            window.onload = handlePageLoad
          }
    }, [])
  
    return (
      <div
        className={`fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[#100e80] transition-opacity duration-600 ${
          visible ? 'opacity-100' : 'opacity-0 animate-fade-out'
        }`}
      >
        <div className="flex flex-col items-center">
        <img
          src="/kuskana_amarillo.svg" 
          alt="Logo"
          className="w-1/2 h-1/2 mb-4" 
        />
        <div className="animate-spin rounded-full border-t-4 border-[#F3BA1A] border-solid h-16 w-16 m-2"></div>
        <h1 className="text-3xl m-6 text-center text-[#F3BA1A] font-semibold">
            ¡Preparando el registro! Por favor, espera un momento mientras te redirigimos al proceso de registro. ¡Gracias por unirte a nosotros!
        </h1>
      </div>
      </div>
    )
  }
  
  export default RegisterScreen