import React from 'react'

const EmailButton = ({content, onOpenLogin }) => {
    return (
        <>
        <button
            className="flex items-center border border-black rounded-full py-1 px-3 text-gray-500 w-full mb-2" 
            onClick={onOpenLogin}
        >
            <img
              src="/maillogo.png"
              className='mr-2'
              alt="Mail Logo"
              
              style={{ width: '16px', height: '16px' }}
            />
            {content}
        </button>
        </>
      )
}

export default EmailButton