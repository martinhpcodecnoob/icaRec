'use client'

import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import Image from 'next/image'
import Link from 'next/link'

import BusinessSubComponent from '@/components/BusinessSubComponent'
import LoadFormBusiness from '@/components/Formbussiness/LoadFormBusiness'
import ValidationUser from '@/components/ValidationUser'
import LoadingScreen from '@/components/LoadingScreen'
import WarningModal from '@/components/Formbussiness/WarningModal'
import FileInput from '@/components/Formbussiness/Fileinput'
import Form from '@/components/Formbussiness/Form'

import { createBusiness, saveDataCloudinary, saveLimitMessage } from '@/redux/Slices/slicePreview'
import { addAllServices } from '@/redux/Slices/sliceLanding'
import { businessIdUpdates } from '@/redux/Slices/sliceLandingTwo'

import { convertURLtofile } from '../../../utils/converURLtofile'
import { signResponseCloudinary } from '../../../utils/apiCloudinary'
import detodologo from '../../../public/kuskanazul.svg'
import manoclick from '../../../public/manoclick.PNG'

export default function MyBusiness({servicess,formatDataIdBusiness=undefined,userIDBusiness,businessID}) {
    
    const router = useRouter()
    const inputForm = useSelector(state => state.preview.inputForm)
    const message = useSelector(state => state.preview.fileLimit)
    const dispatch = useDispatch()
    const servicesRedux = useSelector(state => state.landing.services)
    const {data,status} = useSession();
    const [activatedSubmitForm, setActivatedSubmitForm] = useState(false)
    const [progressBar, setProgressBar] = useState({percentage:0,modalProgress:false, message:''})
    const persBussines={
        nombre:data?.user?.name.split(' ').join(''),
        business:inputForm?.name_business
    }
    // console.log(data);
    useEffect(() => {
        if (servicesRedux.length === 0) {
            dispatch(addAllServices(servicess))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
        if (activatedSubmitForm) {
            finalSubmitback()
                .then((finareponse) => {
                    console.log(finareponse);
                    setTimeout(() => {
                        setProgressBar({
                            percentage:100,
                            modalProgress:true,
                            message:"Finalizo el envio"
                        })
                    }, 1000);
                })
                .catch((error) =>{
                    setProgressBar({
                        percentage:0,
                        modalProgress:false,
                        message:''
                    })
                    dispatch(saveLimitMessage(`${error.error}`))
                    // return error
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activatedSubmitForm])

    useEffect(() => {
        //Este cierra el progress bar al llegar al 100
        if (progressBar.percentage === 100) {
            setTimeout(() => {
                setProgressBar({
                    percentage:0,
                    modalProgress:false,
                    message:''
                })
                router.push('/')
            }, 1000);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progressBar])
    
     
    if (status === "loading") {
        return <LoadingScreen />
    }
 
    const finalSubmitback = async() => {
        // Ahora ejecutamos el segundo fetch
        let createBusinessVar
        try {
            setProgressBar({
                percentage:85,
                modalProgress:true,
                message:"Guardando formulario"
            })
            if (formatDataIdBusiness) {
                dispatch(businessIdUpdates({
                    businessId:businessID,
                    updates:inputForm,
                    userId:data?.user?.userId,
                    accessToken: data?.user?.token
                })).then(response => {
                    console.log("este es response al hacer update",response)
                })
            } else {
                createBusinessVar =await dispatch(createBusiness({userId:data?.user?.userId, business:inputForm, accessToken: data?.user?.token}))
                    .then(response => {
                        console.log(response);
                        if (response.error) {
                            throw Error(`${response.error.message}`)
                        }
                        return {create:true, error:null}
                    })
                    .catch(error => {
                        return {create: false, error:error.message}
                    })
                if (!createBusinessVar.create) {
                    throw createBusinessVar
                }
            }
            setActivatedSubmitForm(false)
            return createBusinessVar
        } catch (error) {
            setActivatedSubmitForm(false)
            throw error
        }
    }
    
    const handleSubmitBack = async () => {
        try {
            const imageURLarray = inputForm.images;
            const numberImages = imageURLarray.filter(image => {
                if (image.url_cloudinary === '') {
                    return image
                }
            })
            setProgressBar({
                percentage:60,
                modalProgress:true,
                message:`Subiendo ${numberImages.length} imagen${numberImages.length === 1 ? '':'es'}`
            })
    
            let data2 = {}
            if (status === "authenticated" && persBussines.nombre && persBussines.business) {
                data2 = await signResponseCloudinary(persBussines.nombre, persBussines.business)
            }
            // Usamos map para crear un array de Promesas
            const promises = imageURLarray.map(async (image,i) => {
                if (image.url_cloudinary === '') {
                    const file = await convertURLtofile(image.fileURL);
                    if (file) {
                        const formData = new FormData();
                        formData.append('file', file);
                        formData.append('api_key', data2.apiKey);
                        formData.append("timestamp", data2.timestamp);
                        formData.append("signature", data2.signature);
                        formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
                        formData.append("folder", `${persBussines.nombre}/${persBussines.business}`);
                        const response = await fetch(`https://api.cloudinary.com/v1_1/${data2.cloudname}/auto/upload`, {
                            method: "POST",
                            body: formData
                        });
                        if (response.status !== 200 && response.status !== 304) {
                            setProgressBar({
                                percentage:0,
                                modalProgress:false,
                                message:''
                            })
                            dispatch(saveLimitMessage(`Error al enviar las imagenes: Imagen ${i+1}`))
                            throw Error({error:true,message:"Error en imagenes"})
                        }
                        const data = await response.json();
                        dispatch(saveDataCloudinary({
                            url_cloudinary: data.url,
                            public_id: data.public_id,
                            fileURL: image.fileURL
                        }));
                    }
                }
            });
            
            // Esperamos a que todas las Promesas se resuelvan antes de continuar
            await Promise.all(promises).then(() => {
                setActivatedSubmitForm(true)
                setProgressBar({
                    percentage:62,
                    modalProgress:true,
                    message:'Fin de la subida de Image'
                })
            }); 
        } catch (error) {
            console.log(error);
            return error
        }
    };


if (status === "unauthenticated") {
    const message = 'Oops!!, No puedes entrar a esta ruta sin Autenticarte'
    return(
        <>
            <ValidationUser message={message}/>
        </>
    )
}
if (formatDataIdBusiness) {
    if (data?.user?.userId !== userIDBusiness) {
        const message2 = "No puedes editar un negocio que no te pertenece"
        return(
            <>
                <ValidationUser message={message2}/>
            </>
        )
    }
}
return (
    <div>
        <div className='hidden mdx:block sticky top-0 z-10'>
            <div className='flex items-center justify-around p-2 mb-2 bg-[#FFF8EE]'>
                <Image alt='logo' src={detodologo}
                    className='h-[30%] w-[30%] smartphone:h-[40%] smartphone:w-[40%]'/>

                <button 
                    type="button" 
                    className="flex text-[1rem] focus:outline-none text-[#100E80]  bg-[#f3ba1a] hover:bg-[#FAE3A3] focus:ring-4 focus:ring-blue-400 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSubmitBack}
                >
                    Guardar
                </button>
            </div>
        </div>
        <div className='hidden md:block'>
            <div className='flex items-center p-6'>
                <Link href={'/'} className='w-32 h-6 relative'>
                    <Image alt='logo' src={detodologo}
                        className='h-full w-full'/>
                </Link>
                <div className='flex justify-center w-full'>
                    <div className='flex items-center text-[21px]'>
                        ¡Descubre un mundo de oportunidades con un click!
                    </div>
                    <div className='w-10 relative'>
                        <Image alt='click' src={manoclick} width={50} height={50}/>
                    </div>
                </div>
                <div>
                    <button 
                        type="button" 
                        className="text-[1rem] focus:outline-none text-[#100E80]  bg-[#f3ba1a] hover:bg-[#FAE3A3] focus:ring-4 focus:ring-blue-400 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                        onClick={handleSubmitBack}
                        >
                        Guardar
                    </button>
                </div>
            </div>
        </div>

        <div className='flex justify-evenly px-6 smartphone:flex-col smartphone:h-[100%] sm:h-[85vh]'>
            <div className='px-2 smartphone:w-[100%] lg:w-[20rem] overflow-auto scrolbar sm:w-[60%]'>
                <Form formatDataIdBusiness={formatDataIdBusiness===undefined ? undefined:formatDataIdBusiness}/>
            </div>
            <div className='flex items-center justify-center w-[70%] sm:relative smartphone:relative smartphone:w-full smartphone:mt-7'>
                <div className='lg:h-full lg:w-[100%] lg:bottom-0 lg:relative mr-1 rounded-lg 
                hidden lg:block
                smartphone:absolute smartphone:h-[20vh] smartphone:w-[70%] smartphone:bottom-[4rem]'
                >
                    <FileInput images={inputForm.images}/>
                </div>
                <div className='flex h-full smartphone:w-[100%] smartphone:h-[100%] smartphone:mb-[2rem] lg:max-w-[430px] md:w-full 
                sm:w-[85%] ml-1'>
                    <BusinessSubComponent
                        inputForm={inputForm}
                        showButton={false}
                        showButtonPopover={true}
                        visibleLiked={false}
                        />
                </div>
            </div>
        </div>
        <WarningModal message={message}/>
        <LoadFormBusiness
            percentaje={progressBar.percentage}
            modal={progressBar.modalProgress}
            message={progressBar.message}
        />
        <div 
            className='fixed inset-0 flex bg-[#fff8ee] bg-opacity-50 items-center justify-center -z-50'
        >
        </div>
    </div>
)
}
