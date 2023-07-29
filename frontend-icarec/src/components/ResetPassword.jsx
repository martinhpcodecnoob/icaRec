import React, { useState, useEffect } from 'react'

const ResetPassword = ({ onClose }) => {
  const [email, setEmail] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleBack = () => {
    onClose()
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSendLink = () => {
    setIsSending(true)

    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
    }, 3000)
  };

  useEffect(() => {
    if (isSent) {
      const timer = setInterval(() => {
      }, 1000)

      return () => {
        clearInterval(timer)
      }
    }
  }, [isSent])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
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
          <h2 className="text-2xl font-bold mb-4">Restablecer contraseña</h2>
          <p className="text-center mb-4">
            Ingrese el correo electrónico que utilizó al registrarse para recuperar su contraseña.
            Recibirá un enlace de restablecimiento de contraseña.
          </p>
        </div>
        {!isSent ? (
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
              disabled={isSending}
              onClick={handleSendLink}
            >
              {isSending ? 'Enviando...' : 'Enviar enlace'}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center mb-4">
            <div className="loader"></div>
            <span className="ml-2">Enviando enlace...</span>
          </div>
        )}
        <div className="text-sm text-center">
          <p className="mb-2">
            Si necesitas ayuda, contacta con nuestro equipo de soporte.
            <button className="text-red-500 underline">Contactar equipo de soporte</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
