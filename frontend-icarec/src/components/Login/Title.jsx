import React from 'react'

const Title = ({ title }) => {
  return (
    <div className="text-center w-full">
      <div className="mb-6">
        <img
          src="/kuskana_amarillo.svg"
          alt="Logo Kuskana Amarillo"
          className="mx-auto bg"
          style={{ maxWidth: '200px' }} 
        />
      </div>
      {title && (
        <div className="text-black font-semibold mb-6">
          {title}
        </div>
      )}
    </div>
  )
}

export default Title






