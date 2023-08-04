'use client'
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import RegisterUser from './RegisterUser'
import { signIn } from 'next-auth/react'

const CreateAccount = ({ onClose }) => {

  const router = useRouter()

  const handleBack = () => {
    onClose()
  }

  const handleTermsClick = () => {
    console.log("Redirigiendo a los términos y servicios...")
  }

  const handleLoginClick = () => {
    console.log("Redirigiendo a la página de inicio de sesión...")
  }

  const [notificationsChecked, setNotificationsChecked] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false)

  const handleNotificationsChange = (event) => {
    setNotificationsChecked(event.target.checked)
  }

  const handleTermsChange = (event) => {
    setTermsChecked(event.target.checked)
  }

  const handleCreateAccount = () => {
    if (!notificationsChecked && !termsChecked) {
      alert("Debe aceptar los términos de uso y las notificaciones por correo electrónico.")
    } else if (!notificationsChecked) {
      alert("Debe aceptar las notificaciones por correo electrónico.")
    } else if (!termsChecked) {
      alert("Debe aceptar los términos de uso y la política de privacidad.")
    } else {
      // Lógica para crear la cuenta
      router.push("/register")
    }
  }

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
          <h2 className="text-2xl font-bold mb-4">Crear una cuenta</h2>
        </div>
        <div className="mb-4">
          <button
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 flex items-center"
            disabled={!notificationsChecked || !termsChecked}
            onClick={() => {signIn('google')}}
          >
            <img
              src="/googlelogo.png"
              alt="Google Logo"
              className="mr-2"
              style={{ width: '16px', height: '16px' }}
            />
            Iniciar con Google
          </button>
          <button
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 flex items-center"
            disabled={!notificationsChecked || !termsChecked}
            onClick={() => {signIn('facebook')}}
          >
            <img
              src="/facebooklogo.png"
              alt="Facebook Logo"
              className="mr-2"
              style={{ width: '16px', height: '16px' }}
            />
            Iniciar con Facebook
          </button>
          <button
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 flex items-center"
            disabled={!notificationsChecked || !termsChecked}
            onClick={handleCreateAccount}
          >
            <img
              src="/maillogo.png"
              alt="Account Logo"
              className="mr-2"
              style={{ width: '16px', height: '16px' }}
            />
            Crear cuenta con mi correo electrónico
          </button>
        </div>
        <div className="text-sm text-center">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={notificationsChecked}
              onChange={handleNotificationsChange}
            />
            <p className="text-xs">
              No quiero recibir notificaciones con promociones de Detodo Company por correo electrónico.
            </p>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={termsChecked}
              onChange={handleTermsChange}
            />
            <p className="text-xs">
              Aceptar{' '}
              <button
                className="text-black underline"
                onClick={handleTermsClick}
              >
                términos de uso y política de privacidad
              </button>
            </p>
          </div>
          <p className="mb-2">
            Si ya tienes una cuenta,{' '}
            <button className="text-red-500 underline" onClick={handleBack}>
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
