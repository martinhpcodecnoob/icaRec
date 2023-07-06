'use client'
import React, { useState } from 'react'
import Login1 from '../components/Login1'

const IndexPage = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleOpenLogin = () => {
    setLoginOpen(true)
  }

  const handleCloseLogin = () => {
    setLoginOpen(false)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <button
        className="bg-red-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg mt-4 transition-colors duration-300"
        onClick={handleOpenLogin}
      >
        Iniciar Sesión (Abrir Login)
      </button>
      {isLoginOpen && <Login1 onClose={handleCloseLogin} />}
    </div>
  )
}

export default IndexPage