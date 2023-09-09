import React from 'react'

const EmailButton = ({content, onOpenLogin, disabled }) => {
    return (
        <div className='flex justify-center items-center w-full'>
          <button
              className="flex justify-center items-center border border-black rounded-full py-1 px-3 text-gray-500 w-3/4 mb-4" 
              onClick={onOpenLogin}
              disabled={disabled}
          >
            <img
              src="/maillogo.png"
              className='mr-2'
              alt="Mail Logo"

              style={{ width: '18px', height: '18px' }}
            />
            <span className='w-full'>
              {content}
            </span>
          </button>
        </div>
        
      )
}

export default EmailButton