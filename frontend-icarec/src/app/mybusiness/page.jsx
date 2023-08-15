'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import BusinessSubComponent from '@/components/BusinessSubComponent'
import FileInput from '@/components/Formbussiness/Fileinput'
import Form from '@/components/Formbussiness/Form'
import detodologo from '../../../public/detodologo.png'
import detodologo2 from '../../../public/detodologo2.png'
import { logPageView } from '../../../utils/utils'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { PiShieldWarningFill } from "react-icons/pi";
import LoadingScreen from '@/components/LoadingScreen'

export default function CreateForm() {
    const router = useRouter()
    const inputForm = useSelector(state => state.preview.inputForm)
    
    useEffect(() => {
        logPageView('business_form')
      }, [])
  
    const {status} = useSession();

if (status === "loading") {
    return <LoadingScreen />
}

if (status === "unauthenticated") {
    return(
        <div className="flex items-center justify-center h-[90vh]">
            <div className="flex flex-col items-center">
                <span className="text-[1.2rem] md:text-[1.5rem] xl:text-[2vw] text-center mx-3">
                    Oops!!, No puedes entrar a esta ruta sin Autenticarte
                </span>
                <PiShieldWarningFill className="text-[10rem] text-gray-500"/>
                <button 
                    type="button" 
                    className="text-white text-[1.5rem]
                                bg-gradient-to-r from-red-400 via-red-500 to-red-600 
                                hover:bg-gradient-to-br focus:ring-4 
                                focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 
                                font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={()=> router.push("/")}
                >
                Volver
                </button>
            </div>
        </div>
    )
}
  
return (
    <div>
        <div className='hidden mdx:block sticky top-0 z-10'>
            <div className='flex items-center justify-center p-2 mb-2 bg-slate-500'>
                <Image alt='logo' src={detodologo2}
                    className='h-[40%] w-[40%]'/>
            </div>
        </div>
        <div className='hidden md:block'>
            <div className='flex p-6'>
                <div className='w-32 h-6 relative'>
                    <Image alt='logo' src={detodologo}
                        className='h-full w-full'/>
                </div>
                <div className='flex justify-center w-full'>
                    <div className='flex items-center text-[21px]'>
                        ¡Descubre un mundo de oportunidades con un click!
                    </div>
                    <div className='w-10 relative'>
                        <Image alt='click' src={'/manoclick.png'} fill/>
                    </div>
                </div>
                <div>
                    <button type="button" className="text-[1rem] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Enviar
                    </button>
                </div>
            </div>
        </div>

        <div className='flex justify-evenly px-6 smartphone:flex-col smartphone:h-[100%] sm:h-[85vh]'>
            <div className='px-2 smartphone:w-[100%] lg:w-[20rem] overflow-auto scrolbar sm:w-[60%]'>
                <Form/>
            </div>
            <div className='flex items-center justify-center w-[70%] sm:relative smartphone:relative smartphone:w-full smartphone:mt-7'>
                <div className='lg:h-full lg:w-[100%] lg:bottom-0 lg:relative mr-1 rounded-lg sm:absolute sm:w-[70%] sm:h-[20vh] 
                sm:bottom-[1.5rem] smartphone:absolute smartphone:h-[20vh] smartphone:w-[70%] smartphone:bottom-[4rem]'>
                    <FileInput images={inputForm.images}/>
                </div>
                <div className='flex h-full smartphone:w-[100%] smartphone:h-[85vh] smartphone:mb-[2rem] lg:max-w-[430px] md:w-full 
                sm:w-[85%] ml-1'>
                    <BusinessSubComponent
                        inputForm={inputForm}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
