import { signIn } from 'next-auth/react'

const GoogleButton = () => {

  return (
    <div>
    <button className="w-full border border-gray-300 rounded px-3 py-2 mb-2 flex items-center" onClick={() => signIn('google')}>
      <img
        src="/googlelogo.png"
        alt="Google Logo"
        className="mr-2"
        style={{ width: '16px', height: '16px' }}
      />
      Continuar con Google
    </button>
  </div>
  )
}

export default GoogleButton