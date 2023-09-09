import React from 'react'

const BackButton = ({ onClick }) => {
  return (
    <button className='absolute font-semibold text-[#100e80] p-4' onClick={onClick}>
      Atrás
    </button>
  )
}

export default BackButton;