import React from 'react'

const Login = ({ onClose }) => {
  const handleBack = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-10">
      <div className="bg-white p-10 rounded shadow-md w-80 h-100 relative">
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
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="flex items-center mb-4">
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember">Mantener sesión iniciada</label>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full mb-4">
          Inicio de sesión
        </button>
        <div className="text-sm text-center">
          <p className="mb-2">
            <button className="text-red-500 underline">
              He olvidado mi contraseña
            </button>
          </p>
          <p>
            ¿Todavía no tienes una cuenta?{' '}
            <button className="text-red-500 underline">Regístrate</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
