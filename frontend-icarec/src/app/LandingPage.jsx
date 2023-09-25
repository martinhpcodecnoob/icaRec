'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from "next/navigation"
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import { Button } from 'flowbite-react'
import DefaultCarousels from '../components/Carousel'
import Searchbar from '../components/Searchbar'
import Cardsup from '@/components/Cards/Cardsup'
import Cardsdown from '@/components/Cards/Cardsdown'
import LoadingScreen from '@/components/LoadingScreen'
import detodologo2 from '../../public/kuskanalogo.svg'
import { logEvent } from '../../utils/utils'
import AdBanner from '@/components/AdBanner'
import { useDispatch, useSelector } from 'react-redux';
import { openExternalLogin } from '@/redux/Slices/popupSlice'
import PopupContainer from '@/components/Login/PopupContainer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Popbuttons from '@/components/Modals/Popbuttons'
import { extractAllBusiness, getServices } from '@/redux/Slices/sliceLanding'
import ExtractUsersButton from '@/components/ExtractUsersButton'
import { BiReset } from "react-icons/bi";
import { resetCollectionService } from '@/redux/Slices/sliceLandingTwo'

const LandingPage = ({dataBusiness}) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const businessAll = useSelector(state => state.landing.bussiness)
    const collectionService = useSelector(state => state.landingTwo.collectionService)

    const { data: session, status } = useSession()  

    const businessAll = useSelector(state => state.landing.bussiness)
    const [isLoading, setIsLoading] = useState(false)

    

  /*   if( session){
        console.log("sesion user", session)
    } */
    /* useEffect(() => {
        if (session && session.user.isRegistered === false && session.user.providerType !== 'credentials') {
          router.push('/newUser')
        }
      }, [session, router])
      
    useEffect(() => {
        dispatch(getServices())
        if (error === 'OAuthAccountNotLinked') {
          toast.error('Ya tienes una cuenta creada con ese correo.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          })
          router.replace('/')
        } else {
          window.scroll(0, 0)
          logPageView('landing_page')
        }
      }, [dispatch, error, router, session])
     */
    useEffect(() => {
        dispatch(extractAllBusiness(dataBusiness.businesses))
        if (error === 'OAuthAccountNotLinked') {
            toast.error('Ya tienes una cuenta creada con ese correo.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, 
            })
            router.replace('/')  
            }
    }, []) 

     useEffect(() => {
        if(status === 'unauthenticated'){
             dispatch(getServices())
             window.scroll(0, 0)
         }
        if(session && session.user.isRegistered === true){
            dispatch(getServices())
            window.scroll(0, 0)
        }
        if (session && session.user.isRegistered === false && session.user.providerType !== 'credentials') {
           router.push('/newUser')
        }
    }, [session]) 

    if (session?.user?.isRegistered === false && session.user.providerType !== 'credentials') {
        return null 
        /* return router.push('/newUser') */
    }

    const handleSignOut = () => {
        setIsLoading(true)
        signOut()
    } 

    const openLogin = () => {
        logEvent('press_login_button')
        dispatch(openExternalLogin())
    }

    const handleCreateBusiness = () => {
        router.push('/mybusiness')
        setIsLoading(true)
    } 

    if (status === "loading" || isLoading) {
        return <LoadingScreen />
    }

    return (
    <div>
        <ToastContainer/>
        <div className='flex justify-between items-center p-4'>
            <Image
                src={detodologo2}
                alt='logo'
                className='h-[3rem] w-[3rem]'
            />
            <div className='flex justify-center items-center lgx:hidden'>
                <p>Descubre un mundo de oportunidades con un clic!</p>
            </div>
            <div className='flex justify-center items-center'>
                {!session && (
                    <Button color="failure" onClick={openLogin}>
                        Login
                    </Button>
                )}
                {session && (
                    <div className='flex space-x-6 px-4 items-center'>
                    <div>
                        <p>Bienvenido! </p>
                        <p>{session.user.name}</p>
                    </div>
                    {session.user.providerType? (
                        <>
                        <Popbuttons viewPopover={true} creeateBusinness={handleCreateBusiness} closeSession={handleSignOut}/>
                        </>
                    ) : null
                    }
                    {session.user?.role.includes('admin') ? (
                        <ExtractUsersButton userId={session?.user?.userId} accessToken={session?.user?.token}/>
                    ) : null
                    } 
                    </div>
                )}
            </div>
        </div>
        <div>
            <DefaultCarousels/>
            <AdBanner
                data-ad-slot="2597718181"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
            <div className='flex justify-center items-center text-2xl pt-2'>¿En que te puedo ayudar?</div>
            <Searchbar/>
            <Cardsup/>
            <div id='cardDown'>
                <Cardsdown bussinessAll={collectionService.length > 0 ? collectionService : businessAll}/>
                {
                    collectionService.length > 0 ?
                        (
                        <div className='flex justify-center'>
                            <button
                                className='flex justify-center items-center'
                                onClick={() => dispatch(resetCollectionService())}
                            >
                                <BiReset className='text-[4rem] text-[#100E80]'/>
                                <div className='text-[1.5rem]'>Limpiar Busqueda</div>
                            </button>
                        </div>
                        )
                        :
                        null
                }
            </div>
        </div>
        <PopupContainer />
    </div>
    )
}

export default LandingPage