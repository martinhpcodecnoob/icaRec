'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import LoadingScreen from '../LoadingScreen'
export default function ButtonRedirect({showButton,inputForm}) {
    useEffect(() => {
        setIsLoading(false)
    }, [])
    const [isLoading, setIsLoading] = useState(false)
    const bodyRefTwo = useRef()
    const handleCloseModal = () => {
        bodyRefTwo.current=document.body
        bodyRefTwo.current.classList.remove('overflow-hidden')
        setIsLoading(true)
    }
    if (isLoading) {
        return <LoadingScreen/>
    }
    return (
        <>
        <Link
            onClick={handleCloseModal}
            href={`${process.env.NEXT_PUBLIC_URL}/myweb/${inputForm._id ? inputForm._id:'error'}`}
            className={`${showButton ? '':'hidden'} text-[1rem] focus:outline-none text-[#100E80]  bg-[#f3ba1a] hover:bg-[#FAE3A3] focus:ring-4 focus:ring-blue-400 font-bold rounded-lg text-sm px-5 py-2.5 mt-4`}
        >
            Ver mas
        </Link>
        </>
    )
}
