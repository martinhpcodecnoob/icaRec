import Image from 'next/image'
import React from 'react'

const EmailButton = ({content, onOpenLogin, disabled }) => {
    return (
        <div className='flex justify-center items-center w-full'>
          <button
              className="flex justify-center items-center border border-black rounded-full py-1 px-3 text-gray-500 w-3/4 mb-4" 
              onClick={onOpenLogin}
              disabled={disabled}
          >
            <Image
              src="/maillogo.png"
              alt="Mail Logo"
              className='mr-2'
              width={18}
              height={18}
          />
            <span className='w-full'>
              {content}
            </span>
          </button>
        </div>
        
      )
}

export default EmailButton