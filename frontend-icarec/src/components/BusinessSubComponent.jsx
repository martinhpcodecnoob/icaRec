import Map from './Map'
import Skeleton from './Formbussiness/Skeleton'
import FileInput from './Formbussiness/Fileinput'

const BusinessSubComponent = ({inputForm}) => {
  
  return (
    <>
    {Object.keys(inputForm).length !== 0 ? (
      <div className="scrolbar w-full h-full bg-red-100 p-3 rounded-lg border-4 border-gray-400">
      <h2 className="text-center mb-4 font-bold text-[2rem]">{inputForm.name_business}</h2>
      <div className="flex justify-center mt-4">
        <button className="bg-red-500 text-white py-2 px-4 rounded w-2/3">
          Recomiendame
        </button>
      </div>
      <div className='my-2 flex items-center justify-center'>
        <p className='font-bold'>Ubicacion: </p>
        <p className='ml-2'>{inputForm.geo_business}</p>
      </div>
      <Map latProp={inputForm.location.lat} longProp={inputForm.location.long}/>
      <div className='flex-col items-center p-4 lg:h-full sm:h-[15rem] smartphone:h-[12rem] overflow-auto scrolbar'>
        <div className="grid grid-cols-2">
          <p className="font-bold">Whatsapp:</p>
          <p>{inputForm.cellphone}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="font-bold">Horarios:</p>
          <p>{inputForm.schedule}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="font-bold">Pagina Web:</p>
          <p>{inputForm.name_web}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="font-bold">Facebook:</p>
          <p>{inputForm.facebook}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="font-bold">Servicios:</p>
          <div className="col-span-1">
            <div className="w-full">
              {inputForm.list_service.map((service, index) => (
                <p key={index} className="inline-block bg-gray-500 rounded-lg text-white py-1 px-2 m-1">{service}</p>
              ))}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2'>
          <p className="font-bold">RUC:</p>
          <p>{inputForm.ruc}</p>
        </div>
      </div>
      <div className='sm:w-[100%]'>
        <FileInput images={inputForm.images}/>
      </div>
    </div>
    ) : <Skeleton />}
    </>
  )
}

export default BusinessSubComponent