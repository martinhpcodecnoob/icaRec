import React from 'react'

const Title = ({ title }) => {
  return (
    <div className="text-center">
      <div className="mb-2">
        <img
          src="/next.svg"
          alt="Logo Kuskana Amarillo"
          className="mx-auto bg"
          style={{ maxWidth: '150px' }} // Ajusta el tamaño del logo según tus necesidades
        />
      </div>
      {title && (
        <div className="text-gray-800 mb-2">{title}</div>
      )}
    </div>
  )
}

export default Title






