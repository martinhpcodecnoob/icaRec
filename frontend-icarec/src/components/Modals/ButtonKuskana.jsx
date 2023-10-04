'use client'
import Link from 'next/link'
import Kuskana from '../../../public/kuskana_azul.svg'
import Image from 'next/image'
import { useState } from 'react'
import LoadingScreen from '../LoadingScreen'
export default function ButtonKuskana() {
    const [isLoading, setIsLoading] = useState(false)
    const handleCloseModal = () => {
        setIsLoading(true)
    }
   if (isLoading) {
        return <LoadingScreen/>
    } 
    return (
        <>
            <Link onClick={handleCloseModal} href={'/'} className="w-32 h-8">
                <Image
                    alt="Kuskasna"
                    src={Kuskana}
                    className="w-full h-full"
                />
            </Link>
        </>
    )
}
