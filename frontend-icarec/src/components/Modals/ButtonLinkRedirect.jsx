'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';

export default function ButtonLinkRedirect({idBusiness, idUserBusiness}) {
    const {data,status} = useSession();
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (data) {
            setIsLoading(false)
            return
        }
    }, [data])
    
    console.log("Este es el usuario desde button de link edit site: ", data);
    return (
        <>
            {
                isLoading ?
                    (<>
                        <Spinner
                            aria-label="Warning spinner example"
                            color="warning"
                        />
                    </>)
                    :
                    data.user.userId === idUserBusiness ?
                        (<Link
                            
                            href={`${process.env.NEXT_PUBLIC_URL}/mybusiness/${idBusiness ? idBusiness:'error'}`}
                            className="bg-[#100E80] px-4 rounded-[1rem] text-white"
                        >
                            Editar mi sitio
                        </Link>)
                        :
                        null
            }
        </>
    )
}
