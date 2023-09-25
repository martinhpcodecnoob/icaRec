'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import LoadingScreen from "../LoadingScreen"
export default function ButtonRecomendLink({inputForm}) {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(false)
    }, [])
    const handleCloseModal = () => {
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
                className={`bg-[#100E80] text-white py-1 px-4 rounded w-2/3 flex justify-center`}
            >
                Recomienda mi Negocio
            </Link>
        </>
    )
}
