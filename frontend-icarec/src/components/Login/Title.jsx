import React from 'react'

const Title = ({ title }) => {
  return (
    <div className="text-center">
      <div className="mb-6">
        <img
          src="/next.svg"
          alt="Logo Kuskana Amarillo"
          className="mx-auto bg"
          style={{ maxWidth: '150px' }} 
        />
      </div>
      {title && (
        <div className="text-black font-semibold mb-2">
          {title}
        </div>
      )}
    </div>
  )
}

export default Title






