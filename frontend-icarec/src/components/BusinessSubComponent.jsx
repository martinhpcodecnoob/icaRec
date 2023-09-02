import Map from './Map'
import Skeleton from './Formbussiness/Skeleton'
import FileInput from './Formbussiness/Fileinput'
import Link from 'next/link'
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook,FaShareAlt } from "react-icons/fa";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { TfiWorld } from "react-icons/tfi";

const BusinessSubComponent = ({inputForm}) => {
  
  return (
    <>
    {Object.keys(inputForm).length !== 0 ? (
    <div className="scrolbar w-full h-full bg-red-100 p-3 rounded-lg border-4 border-gray-400 lg:pt-10">
      <h2 className="text-center mb-4 font-bold text-[2rem]">{inputForm.name_business}</h2>
      <div className="flex justify-center my-4">
        <button className="bg-red-500 text-white py-2 px-4 rounded w-2/3">
          Recomiendame
        </button>
      </div>
      <div className='lgx:hidden'>
        <Map latProp={inputForm.location.lat} longProp={inputForm.location.long}/>
      </div>
      <div className='sm:w-[100%] lg:hidden'>
        <FileInput images={inputForm.images}/>
      </div>
      <div className='my-2 flex items-center justify-center'>
        <p className='font-bold'>Ubicacion: </p>
        <p className='ml-2'>{inputForm.geo_business}</p>
      </div>
      <div className='flex justify-center items-center pb-2'>
        <Link className='px-2' href={inputForm.facebook} target='_blank'>
          <FaFacebook className='text-blue-600 text-[2rem]'/>
        </Link>
        <Link className='px-2' href={`https://wa.me/51${inputForm.cellphone}`} target='_blank'>
          <IoLogoWhatsapp className='text-green-400 text-[2rem]'/>
        </Link>
        <a className='px-2' href={`tel:${inputForm.cellphone}`} target='_blank'>
          <BsFillTelephoneOutboundFill className='text-[2rem]'/>
        </a>
        <Link className='px-2' href={`${inputForm.name_web}`} target='_blank'>
          <TfiWorld className='text-[2rem]'/>
        </Link>
        <Link className='px-2' href={''}>
          <FaShareAlt className='text-[2rem]'/>
        </Link>
      </div>
      <div className='flex-col items-center p-4 sm:h-[25%] smartphone:h-[12rem] overflow-auto scrolbar'>
        <div className="grid grid-cols-2">
          <p className="font-bold">Horarios:</p>
          <p>{inputForm.schedule}</p>
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
      <div className='lg:hidden'>
        <Map latProp={inputForm.location.lat} longProp={inputForm.location.long}/>
      </div>
    </div>
    ) : <Skeleton />}
    </>
  )
}

export default BusinessSubComponent