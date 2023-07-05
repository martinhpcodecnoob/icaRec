'use client'
import React, { useState } from 'react'
import Login from '../components/Login'

const IndexPage = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleOpenLogin = () => {
    setLoginOpen(true)
  }

  const handleCloseLogin = () => {
    setLoginOpen(false)
  }

  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <p>Welcome to my Next.js app.</p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4" onClick={handleOpenLogin}>
        Abrir Login
      </button>
      {isLoginOpen && <Login onClose={handleCloseLogin} />}
    </div>
  )
}

export default IndexPage