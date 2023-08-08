'use client'
import React, {useState} from 'react'
import Login1 from './Login1'
import CreateAccount from './CreateAccount'
import ResetPassword from './ResetPassword'
import { signIn } from "next-auth/react"

const Login2 = ({ onClose }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showLogin1, setShowLogin1] = useState(false)
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)

  const handleBack = () => {
    onClose()
  }

  const handleLogin = async () => {
   
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, 
    })
  
    try {
      if (result.error) {
        if (result.error === "CredentialsSignin") {
          setError("Usuario o contraseña inválidos")
        } else {
          console.error("Error de inicio de sesión:", result.error)
        }
      } else {
        onClose()
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
    
  }

  const handleLogin1Close = () => {
    setShowLogin1(false)
  }
  const handleCreateAccountClick = () => {
    setShowCreateAccount(true)
  }
  const handleResetPasswordClick = () => {
    setShowResetPassword(true)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember">Mantener sesión iniciada</label>
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full mb-4" onClick={handleLogin}>
          Inicio de sesión
        </button>
        <div className="text-sm text-center">
          <p className="mb-2">
            <button className="text-red-500 underline" onClick={handleResetPasswordClick}>
              He olvidado mi contraseña
            </button>
          </p>
          <p>
            ¿Todavía no tienes una cuenta?{' '}
            <button className="text-red-500 underline" onClick={handleCreateAccountClick}>Regístrate</button>
          </p>
        </div>
      </div>
      {showLogin1 && <Login1 onClose={handleLogin1Close}  />}
      {showCreateAccount && <CreateAccount onClose={() => setShowCreateAccount(false)} />}
      {showResetPassword && <ResetPassword onClose={() => setShowResetPassword(false)} />}
    </div>
  )
}

export default Login2
