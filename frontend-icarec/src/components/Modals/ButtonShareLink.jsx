'use client'
import {FaLink } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function ButtonShareLink({idLinkBussiness}) {
    const handleCopyClic = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/myweb/${idLinkBussiness ? idLinkBussiness:'error'}`)
            .then(() => {
                toast.info("Enlace copiado al portapapeles")
            })
            .catch((err) => {
                console.log("Error al copiar el enlace: ",err)
            })
    }
    return (
        <>
            <button className={`px-2`} onClick={handleCopyClic}>
                <FaLink className='text-[2rem]'/>
            </button>
        </>
    )
}
