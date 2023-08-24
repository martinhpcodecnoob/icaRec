'use client'
import React, { useState } from 'react'
import CreateAccount from './CreateAccount'
import Login2 from './Login2'
import GoogleButton from './GoogleButton'
import { signIn } from 'next-auth/react'

const Login1 = ({ onClose }) => {
  const handleBack = () => {
    onClose()
  }
  
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [ShowLogin2, setShowLogin2] = useState(false)

  const handleCreateAccountClick = () => {
    setShowCreateAccount(true)
  }

  const handleShowLogin2Click = () => {
    setShowLogin2(true)
  }

  const handleLogin2Close = () => {
    setShowLogin2(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white p-8 rounded shadow-md w-80 h-100 relative">
        <button
          className="text-red-500 font-bold absolute left-4 top-4"
          onClick={handleBack}
        >
          Atras
        </button>
        <div className="flex flex-col items-center">
          <img
            src="/detodologo.png"
            alt="Default Image"
            className="mb-4 mx-auto"
            style={{ width: '70%', height: 'auto' }}
          />
          <h2 className="text-2xl font-bold mb-4">Inicio de sesión</h2>
        </div>
        <div className="mb-4">
          <GoogleButton />
          <button
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 flex items-center" onClick={() => signIn('facebook')}
          >
            <img
              src="/facebooklogo.png"
              alt="Facebook Logo"
              className="mr-2"
              style={{ width: '16px', height: '16px' }}
            />
            Continuar con Facebook
          </button>
          <button
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 flex items-center"
            onClick={handleShowLogin2Click}
          >
            <img
              src="/maillogo.png"
              alt="Account Logo"
              className="mr-2"
              style={{ width: '16px', height: '16px' }}
            />
            Continuar con mi cuenta
          </button>
        </div>
        <div className="text-sm text-center">
          <p className="mb-2">
            ¿Todavía no tienes una cuenta?{' '}
            <button className="text-red-500 underline" onClick={handleCreateAccountClick}>
              Crear cuenta
            </button>
          </p>
        </div>
      </div>
      {showCreateAccount && <CreateAccount onClose={() => setShowCreateAccount(false)} />}
      {/* {ShowLogin2 && <Login2 onClose={handleLogin2Close} />} */}
    {ShowLogin2 && (
      <Login2
        onClose={() => {
          setShowLogin2(false)
          onClose()
        }}
      />
    )}
      <div
        className='fixed inset-0 flex bg-slate-400 bg-opacity-50 items-center justify-center -z-10'
        onClick={onClose}
      >
      </div>
    </div>
  )
}


export default Login1
