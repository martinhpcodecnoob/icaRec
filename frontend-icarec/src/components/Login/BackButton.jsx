import React from 'react'

const BackButton = ({ onClick }) => {
  return (
    <button className='p-2' onClick={onClick}>
      Atrás
    </button>
  )
}

export default BackButton;