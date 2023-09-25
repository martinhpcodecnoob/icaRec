'use client'

import React, { useEffect, useState } from 'react'

const LoadingScreen = () => {
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
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#F3BA1A] transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center">
        <img
          src="/kuskanazul.svg" 
          alt="Logo"
          className="w-1/2 h-1/2 mb-4" 
        />
        <div className="animate-spin rounded-full border-t-4 border-[#100E80] border-solid h-16 w-16"></div>
      </div>
    </div>
  )
}

export default LoadingScreen
