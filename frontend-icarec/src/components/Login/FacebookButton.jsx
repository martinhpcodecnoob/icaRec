import React from 'react'
import { signIn } from 'next-auth/react'

const FacebookButton = ({content, disabled }) => {
  return (
    <div className='flex justify-center items-center w-full'>
      <button
          className="flex justify-center items-center border border-black rounded-full py-1 px-3 text-gray-500 w-3/4 mb-4" 
          onClick={() => signIn('facebook')}
          disabled={disabled}
      >
          <img
            src="/facebooklogo.png"
            alt="Facebook Logo"
            className="mr-2"
            style={{ width: '18px', height: '18px' }}
          />
          <span className='w-full'>
            {content}
          </span>
      </button>
    </div>
  )
}

export default FacebookButton