import React from 'react'
import { signIn } from 'next-auth/react'

const FacebookButton = ({content}) => {
  return (
    <button
        className="flex items-center border border-black rounded-full py-1 px-3 text-gray-500 w-full mb-2" 
        onClick={() => signIn('facebook')}
    >
        <img
          src="/facebooklogo.png"
          alt="Facebook Logo"
          className="mr-2"
          style={{ width: '16px', height: '16px' }}
        />
        {content}
    </button>
  )
}

export default FacebookButton