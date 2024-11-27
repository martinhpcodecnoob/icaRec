'use client'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { BsSuitHeartFill } from "react-icons/bs";
import { IoSave } from "react-icons/io5";
import { postCreateLiked, postCreateSaved, verifieldInteraction, verifieldSaveds } from "@/redux/Slices/sliceLanding";
import { useEffect } from "react";
import { useSession } from "next-auth/react"
import { Spinner } from 'flowbite-react';
import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';

export default function ButtonSaved({paramsIdBusiness}) {
    // const router = useRouter();
    const [saved, setSaved] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const { data:session,status } = useSession()
    const StyleButtonsSaved = 'text-center flex justify-center w-full'

    useEffect(() => {
        if (!session) {
            setIsLoading(false)
            setSaved(false)
        }
        if (session && status === 'authenticated') {
            setIsLoading(true)
            dispatch(verifieldSaveds({userId:session.user.userId,businessId:paramsIdBusiness}))
                .then(data => {
                    if (!data.payload) {
                        setIsLoading(false)
                        return setSaved(false)
                    }else{
                        if (data.payload.saved) {
                            setSaved(true)
                        }else{
                            setSaved(false)
                        }
                        setIsLoading(false)
                    }
                })
                .catch(error => console.log("Este es la error",error))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    const handleSaved = () => {
        if (!session) {
            toast.error("Registrate primero para savedar")
            // router.push('/newUser');
        }
        if (session && status === 'authenticated') {
            setIsLoading(true)
            if (!saved) {
                dispatch(postCreateSaved({userId:session.user.userId,businessId:paramsIdBusiness}))
                    .then(data => {
                        console.log('data: ',data);
                        setSaved(data.payload.saved)
                        setIsLoading(false)
                    })
                    .catch(error => console.log("Este es la error",error))
            }else{
                setIsLoading(false)
            }
            
        }
    }

    return (
        <>
            <button 
                className={`flex bg-[#100E80] ${saved?'text-[#F3BA1A]':'text-white '} py-1 px-4 rounded-[1rem]`}
                onClick={handleSaved}
                disabled={isLoading ? true : false}
            >
                {   isLoading ?
                        (<div className={StyleButtonsSaved}>
                            <Spinner
                                aria-label="Warning spinner example"
                                color="warning"
                            />
                        </div>)
                        :
                        saved ?
                            (<div className={StyleButtonsSaved}>
                                Guardado
                                <IoSave className="text-[1.4rem] ml-3"/>
                            </div>) 
                            :
                            (<div className={StyleButtonsSaved}>
                                Guardar
                            </div>)
                }
            </button>
        </>
    )
}
