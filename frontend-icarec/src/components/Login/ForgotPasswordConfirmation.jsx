import React from 'react'

const ForgotPasswordConfirmation = ({content}) => {
  return (
    <div className='py-1 px-3 bg-white w-3/4 mb-2'>
        <span className='text-green-400 text-sm text-center'>
          {content}
        </span>
    </div>
  )
}

export default ForgotPasswordConfirmation