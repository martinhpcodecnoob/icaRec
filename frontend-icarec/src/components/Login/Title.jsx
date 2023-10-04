import React from 'react'
import Image from 'next/image'
import kuskanaAmarillo from '../../../public/kuskana_amarillo.svg'
const Title = ({ title }) => {
  return (
    <div className="text-center w-full">
      <div className="mb-6">
        <Image
          src={kuskanaAmarillo}
          alt="Logo Kuskana Amarillo"
          priority={true}
          className="mx-auto bg"
          width={200}
          height={200}
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






