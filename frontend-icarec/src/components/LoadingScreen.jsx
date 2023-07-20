'use client'
import React, { useEffect, useState } from 'react'

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000)

    return () => clearTimeout(timer);
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-red-100 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <img
        src="/detodologo.png" 
        alt="Logo"
        className="w-auto h-auto" 
      />
    </div>
  )
}

export default LoadingScreen