'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from "next/navigation"
import { useSession, signOut } from 'next-auth/react'
import Login1 from '../components/Login1'
import Image from 'next/image'
import { Button } from 'flowbite-react'
import DefaultCarousels from '../components/Carousel'
import Searchbar from '../components/Searchbar'
import Cardsup from '@/components/Cards/Cardsup'
import Cardsdown from '@/components/Cards/Cardsdown'
import LoadingScreen from '@/components/LoadingScreen'
import detodologo from '../../public/kuskanazul.svg'
import detodologo2 from '../../public/kuskanalogo.svg'
import { logPageView, logEvent } from '../../utils/utils'
import AdBanner from '@/components/AdBanner'
import ErrorRegisterScreen from '@/components/ErrorRegisterScreen'
import { useDispatch, useSelector } from 'react-redux';
import { openExternalLogin } from '@/redux/Slices/popupSlice'
import PopupContainer from '@/components/Login/PopupContainer'
import { ToastContainer, toast } from 'react-toastify'
import RegisterScreen from '@/components/Screens/RegisterScreen'

import 'react-toastify/dist/ReactToastify.css'
import Popbuttons from '@/components/Modals/Popbuttons'
import { extractAllBusiness, getServices } from '@/redux/Slices/sliceLanding'

const LandingPage = ({dataBusiness}) => {
    useEffect(() => {
        dispatch(extractAllBusiness(dataBusiness.businesses))
    }, [])
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useDispatch()
    const businessAll = useSelector(state => state.landing.bussiness)

    const { data: session, status } = useSession()  

    const error = searchParams.get('error')
    const [isLoginOpen, setLoginOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    if( session){
        console.log("sesion user", session)
    }
    useEffect(() => {
        dispatch(getServices())
        if (error === 'OAuthAccountNotLinked') {
        toast.error('Ya tienes una cuenta creada con ese correo.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, 
        })
        router.replace('/')  
        }

        window.scroll(0,0)

        if (session?.user?.isRegistered === false && session.user.providerType !== 'credentials') {
        router.push('/newUser')
        } else {
        logPageView('landing_page')
        }
        
    }, [])

    if (session?.user?.isRegistered === false && session.user.providerType !== 'credentials') {
        return router.push('/newUser')
    }  

    const handleOpenLogin = () => {
        logEvent('press_login_button')
        setLoginOpen(true)
    }

    const handleCloseLogin = () => {
        setLoginOpen(false)
    }

    const handleSignOut = () => {
        setIsLoading(true)
        signOut()
    } 

    const openLogin = () => {
        dispatch(openExternalLogin())
    }

    const handleCreateBusiness = () => {
        router.push('/mybusiness')
        setIsLoading(true)
    } 

    const handleUpdateUserAccount = () => {
        router.push('/register')
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
                </div>
                )}
                {isLoginOpen && <Login1 onClose={handleCloseLogin} />}
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
            <Cardsdown bussinessAll={businessAll}/>
            </div>
        </div>
        <PopupContainer />
        </div>
    )
}

export default LandingPage