import Map from './Map'
import Skeleton from './Formbussiness/Skeleton'
import FileInput from './Formbussiness/Fileinput'
import Link from 'next/link'
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { TfiWorld } from "react-icons/tfi";
import Popover from './Formbussiness/Popover';
import AboutBusiness from './Formbussiness/AboutBusiness';
import ButtonRedirect from './Modals/ButtonRedirect';
import ButtonRecomend from './Modals/ButtonRecomend';
import ButtonShareLink from './Modals/ButtonShareLink';

const BusinessSubComponent = ({
                                inputForm,showButton=true,
                                showButtonPopover=false,hiddenRemove='',
                                aboutBusinessShow=false, heightMap='10.77rem',
                                showRecomend = true,visibleLiked=false,
                                dataLiked,
                                showRecomendInteraction = false
                              }) => {
  const website = inputForm.name_web?inputForm.name_web:inputForm.website
  const services = inputForm.list_service ? inputForm.list_service : inputForm.services
  return (
    <>
    {Object.keys(inputForm).length !== 0 ? (
    <div className="scrolbar w-full h-full bg-[#FFF8EE] p-3 lg:pt-10">
      <h2 className="text-center mb-4 font-bold text-[2rem] text-[#F3BA1A]">{inputForm.name_business ? inputForm.name_business:inputForm.business_name}</h2>
      <div className={`flex justify-center my-4 ${showRecomend?'':'hidden'}`}>
        {
          showRecomendInteraction ? 
            (
              <div className='lg:hidden'>
                <ButtonRecomend paramsIdBusiness={inputForm._id}/>
              </div>
            )
            :
            (
              <Link 
                href={`${process.env.NEXT_PUBLIC_URL}/myweb/${inputForm._id ? inputForm._id:'error'}`} 
                className={`bg-[#100E80] text-white py-1 px-4 rounded w-2/3 flex justify-center`}
              >
                Recomienda mi Negocio
              </Link>
            )

        }
      </div>
      <div className='lgx:hidden'>
        <Map heightMap={heightMap}
          latProp={
                  inputForm.location?.lat ? 
                    inputForm.location.lat 
                      : 
                    +inputForm.location_coordinates.latitude
              } 
          longProp={
                  inputForm.location?.long ?
                    inputForm.location.long
                      :
                    +inputForm.location_coordinates.longitude
          }
        />
      </div>
      <div className='sm:w-[100%] lg:hidden'>
        <FileInput images={inputForm.images} hiddenRemove={hiddenRemove} visibleLiked={visibleLiked} dataLiked={dataLiked}/>
      </div>
      <div className='my-2 flex items-center justify-center'>
        <p className='font-bold'>Ubicacion: </p>
        <p className='ml-2'>{inputForm.geo_business ? inputForm.geo_business:inputForm.business_location}</p>
      </div>
      <div className='flex justify-center items-center pb-2'>
        <Link className={`px-2 ${inputForm.facebook === "" ?'hidden':''}`} href={inputForm.facebook} target='_blank'>
          <FaFacebook className='text-blue-600 text-[2rem]'/>
        </Link>
        <Link className={`px-2 ${inputForm.cellphone === "" ?'hidden':''}`} href={`https://wa.me/51${inputForm.cellphone}`} target='_blank'>
          <IoLogoWhatsapp className='text-green-400 text-[2rem]'/>
        </Link>
        <a className={`px-2 ${inputForm.cellphone === "" ?'hidden':''}`} href={`tel:${inputForm.cellphone}`} target='_blank'>
          <BsFillTelephoneOutboundFill className='text-[2rem]'/>
        </a>
        <Link className={`px-2 ${website===undefined ?'hidden':''}`} href={`${inputForm.name_web}`} target='_blank'>
          <TfiWorld className='text-[2rem]'/>
        </Link>
        <ButtonShareLink idLinkBussiness={inputForm._id}/>
      </div>
      <div className={`${aboutBusinessShow?'':'hidden'} lg:hidden`}>
        <AboutBusiness description={inputForm.description}/>
      </div>
      <div className='flex-col items-center p-4 sm:max-h-[10rem] smartphone:max-h-[12rem] overflow-auto scrolbar'>
        <div className="grid grid-cols-2">
          <p className="font-bold">Horarios:</p>
          <p className={`bg-[#F3BA1A] flex justify-center text-center rounded-lg text-white ${inputForm.schedule === "" ?'hidden':''}`}>{inputForm.schedule}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="font-bold">Servicios:</p>
          <div className="col-span-1">
            <div className="w-full">
              {services.map((service, index) => (
                <p key={index} className="text-center inline-block bg-blue-800 rounded-lg text-white py-1 px-2 m-1">{service}</p>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className='lg:hidden'>
      <Map 
          latProp={
                  inputForm.location?.lat ? 
                    inputForm.location.lat 
                      : 
                    +inputForm.location_coordinates.latitude
              } 
          longProp={
                  inputForm.location?.long ?
                    inputForm.location.long
                      :
                    +inputForm.location_coordinates.longitude
          }
        />
      </div>
      <div className='flex items-center justify-center'>
        <ButtonRedirect inputForm={inputForm} showButton={showButton}/>
        <Popover 
          viewPopover={showButtonPopover ? true:false}
          titleButton={'Ver mas'}
          title={'Boton te redigira a su web personalizada despues de crear el Negocio (Descripcion)'}
          description={inputForm.description}
        />
      </div>
    </div>
    ) : <Skeleton />}
    </>
  )
}

export default BusinessSubComponent