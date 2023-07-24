import React from 'react'
import Map from './Map'
import ErrorScreen from './ErrorScreen'

const BusinessSubComponent = ({ componentType, businessName, whatsappNumber, schedule, webMedia, services, ruc }) => {

  function getMediaNameContent(mediaName) {
    if (mediaName === "webPage") {
      return "Pagina web"
    } else if (mediaName === "Facebook") {
      return "Facebook"
    } else {
      return mediaName
    }
  }

  return (
    <>
    {componentType === 'edit' ? (
    <div className="max-w-md mx-auto bg-red-100 p-4 rounded-lg border-4 border-gray-400">
      <h2 className="text-center mb-4 font-bold">{businessName}</h2>
      <Map />
      <div className='flex-col items-center p-6'>
        <div className="grid grid-cols-2">
          <p className="font-bold">Whatsapp:</p>
          <p>{whatsappNumber}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="font-bold">Horario:</p>
          <p>{schedule}</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-2 justify-around">
            {Object.entries(webMedia).map(([mediaName, mediaInfo], index) => (
              <div key={index} className='flex justify-between'>
                <p className="font-bold">{getMediaNameContent(mediaName)}:</p>
                {mediaInfo.map((info, infoIndex) => (
                <p key={infoIndex}>{info}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <p className="font-bold">Servicios:</p>
          <div className="col-span-1">
            {services.map((service, index) => (
              <p key={index}>- {service}</p>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-2'>
          <p className="font-bold">RUC:</p>
          <p>{ruc}</p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-red-500 text-white py-2 px-4 rounded w-2/3">
          Crear Negocio
        </button>
      </div>
    </div>
    ) : componentType === 'view' ? (
      <div className="max-w-md mx-auto bg-red-100 p-4 rounded-lg border-4 border-gray-400">
      <h2 className="text-center mb-4 font-bold">{businessName}</h2>
      <div className="flex justify-center mt-4">
        <button className="bg-red-500 text-white py-2 px-4 rounded w-2/3">
          Recomiendame
        </button>
      </div>
      <Map />
      <div className='flex-col items-center p-6'>
        <div className="grid grid-cols-2">
          <p className="font-bold">Whatsapp:</p>
          <p>{whatsappNumber}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="font-bold">Horario:</p>
          <p>{schedule}</p>
        </div>

            {Object.entries(webMedia).map(([mediaName, mediaInfo], index) => (
              <div key={index} className='grid grid-cols-2'>
                <p className="font-bold">{getMediaNameContent(mediaName)}:</p>
                {mediaInfo.map((info, infoIndex) => (
                <p key={infoIndex}>{info}</p>
                ))}
              </div>
            ))}


        <div className="grid grid-cols-2">
          <p className="font-bold">Servicios:</p>
          <div className="col-span-1">
            <div className="w-full">
              {services.map((service, index) => (
                <p key={index} className="inline-block bg-gray-500 rounded-lg text-white py-1 px-2 m-1">- {service}</p>
              ))}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2'>
          <p className="font-bold">RUC:</p>
          <p>{ruc}</p>
        </div>
      </div>
    </div>
    ) : <ErrorScreen />}
    </>
  )
}

export default BusinessSubComponent