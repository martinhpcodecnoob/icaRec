'use client'
import React, { useEffect, useState } from 'react'

const ErrorScreen = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-red-100 transition-opacity duration-600 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <img
        src="/404.png"
        alt="Error"
        className="w-1/4 h-1/4"
      />
      <h1 className="text-3xl mt-4">Upss ... Ocurrió un problema</h1>
    </div>
  )
}

export default ErrorScreen
