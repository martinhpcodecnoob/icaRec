import React from 'react'

const BackButton = ({ onClick }) => {
  return (
    <button className='absolute p-4' onClick={onClick}>
      Atrás
    </button>
  )
}

export default BackButton;