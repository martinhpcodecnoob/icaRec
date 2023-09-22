'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import errorImage from '../../public/404.png'

const ErrorScreen = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-[100%] h-[100%] flex flex-col items-center justify-center bg-red-100 transition-opacity duration-600 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Image
        src={errorImage}
        alt="Error"
        className="w-[100%] h-[50%] object-center object-contain"
      />
      <h1 className="text-3xl mt-4 text-center">Upss ... Ocurrió un problema</h1>
    </div>
  )
}

export default ErrorScreen
