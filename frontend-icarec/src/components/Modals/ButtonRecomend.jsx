'use client'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { BsSuitHeartFill } from "react-icons/bs";
import { postCreateLiked, verifieldInteraction } from "@/redux/Slices/sliceLanding";
import { useEffect } from "react";
import { useSession } from "next-auth/react"
import { Spinner } from 'flowbite-react';

export default function ButtonRecomend({paramsIdBusiness}) {
    const [recomend, setRecomend] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const { data:session,status } = useSession()
    // const interactionStateRedux = useSelector(state => state.landing.stateLikedPost)

    useEffect(() => {
        console.log("este ees el loading ",isLoading);
        if (session && paramsIdBusiness) {
            // console.log("session.user la", session.user.userId);
            // console.log("el id bussiness ", paramsIdBusiness);
            setIsLoading(true)
            dispatch(verifieldInteraction({userId:session.user.userId,businessId:paramsIdBusiness}))
                .then(data => {
                    if (data.payload.liked) {
                        setRecomend(true)
                    }else{
                        setRecomend(false)
                    }
                    setIsLoading(false)
                })
                .catch(error => console.log("Este es la error",error))
        }
    }, [session])
    const handleLiked = () => {
        console.log(session.user.userId);
        setIsLoading(true)
        dispatch(postCreateLiked({userId:session.user.userId,businessId:paramsIdBusiness}))
            .then(data => {
                if (data.payload.liked) {
                    setRecomend(true)
                }else{
                    setRecomend(false)
                }
                setIsLoading(false)
            })
            .catch(error => console.log("Este es la error",error))
    }

    return (
        <>
            <button 
                className={`flex bg-[#100E80] ${recomend?'text-[#F3BA1A]':'text-white '} py-1 px-4 rounded-[1rem]`}
                onClick={handleLiked}
            >
                {   isLoading ?
                        (<>
                            <Spinner
                                aria-label="Warning spinner example"
                                color="warning"
                            />
                        </>)
                        :
                        recomend ?
                            (<>
                                Recomendado por ti 
                                <BsSuitHeartFill className="text-[1.4rem] ml-3"/>
                            </>) 
                            :
                            (<>
                                Recomiendame
                            </>)
                }
            </button>
        </>
    )
}
