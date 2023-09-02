import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const ErrorRegisterScreen = () => {
    const [visible, setVisible] = useState(false)
    const router = useRouter()
  
    useEffect(() => {
      setVisible(true)
      setTimeout(() => {
        router.push('/newUser')
      }, 2000)
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
        <h1 className="text-3xl mt-4">
          Ha ocurrido un error con el registro. Serás redirigido...
        </h1>
      </div>
    )
  }
  
  export default ErrorRegisterScreen