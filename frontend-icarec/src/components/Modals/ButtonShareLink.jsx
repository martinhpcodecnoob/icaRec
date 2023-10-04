'use client'
import { BsFillShareFill } from "react-icons/bs";
import { toast } from 'react-toastify';

export default function ButtonShareLink({idLinkBussiness}) {
    const handleCopyClic = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/myweb/${idLinkBussiness ? idLinkBussiness:'error'}`)
            .then((data) => {
                toast.info("Enlace copiado al portapapeles")
            })
            .catch((err) => {
                toast.error("No puedes copiar sin haber creado tu negocio")
                console.log("Error al copiar el enlace: ",err)
            })
    }
    return (
        <>
            {
                idLinkBussiness ? 
                    (<>
                        <button className={`px-2`} onClick={handleCopyClic}>
                            <BsFillShareFill className='text-[2rem]'/>
                        </button>
                    </>)
                    :
                    (<>
                        <button className={`px-2`}>
                            <BsFillShareFill className='text-[2rem]'/>
                        </button>
                    </>)
            }
        </>
    )
}
