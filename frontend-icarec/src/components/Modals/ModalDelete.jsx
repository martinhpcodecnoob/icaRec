import { catchDeleteBussiness, deleteBusiness, resetdeleteBussinessByUser } from '@/redux/Slices/sliceLandingTree';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { BiSolidLike,BiSolidDislike } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'flowbite-react';
import { getBusinessByUser } from '@/redux/Slices/sliceLandingTwo';

export default function ModalDelete({activated = false}) {
    const dispatch = useDispatch()
    const { data: session, status } = useSession() 
    const userIdDeleteSelectBusiness = useSelector(
        (state) => state.landingTree.deleteBussinessByUser.userIdDeleteSelect
    )
    const loadDeleteBusiness = useSelector(
        (state) => state.landingTree.deleteBussinessByUser.loading
    )
    const fulfilledDeleteBusiness = useSelector(
        (state) => state.landingTree.deleteBussinessByUser.fulfilled
    )
    const typeBusinessORecomend = useSelector(
        (state) => state.landingTree.deleteBussinessByUser.typeBusinessORecomend
    )
    const userIdDeleteSelect = useSelector(
        (state) => state.landingTree.deleteBussinessByUser.userIdDeleteSelect
    )
    useEffect(() => {
        if (loadDeleteBusiness === false && fulfilledDeleteBusiness && userIdDeleteSelect) {
            dispatch(catchDeleteBussiness(null))
            dispatch(resetdeleteBussinessByUser())
            if (typeBusinessORecomend === 'business') {
                if (session?.user) {
                    const {userId,token} = session?.user
                    dispatch(getBusinessByUser({
                        userId,
                        accessToken:token
                    }))
                }
            }
        }
    }, [loadDeleteBusiness])
    
    return (
        <>
            <div
                tabIndex="-1" 
                className={`flex items-center justify-center fixed top-0 left-0 right-0 z-50 ${activated ? "":"hidden"} w-full p-2 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full`}
            >
                <div className="relative w-full max-w-[20rem] max-h-full">
                    {
                        loadDeleteBusiness ?
                        (
                            <div>
                                <Spinner
                                    aria-label="Info spinner example"
                                    color="warning"
                                    size={''}
                                />
                            </div>
                        ) : (
                            <>
                                <div className="relative py-1 bg-[#F3BA1A] shadow flex justify-center">
                                    <h3 className="text-xl text-center text-[#100E80] font-bold">
                                        Vas a eliminar un Negocio
                                    </h3>
                                </div>
                                <div className='flex justify-center text-xl text-[#100E80] my-3'>
                                    ¿Estas seguro?
                                </div>
                                <div className='flex justify-center'>
                                    <button className='mr-4'
                                        onClick={() => {
                                            if (session?.user && userIdDeleteSelectBusiness) {
                                                const {userId,token} = session?.user
                                                dispatch(deleteBusiness({
                                                    businessId:userIdDeleteSelectBusiness,
                                                    userId,
                                                    accessToken:token
                                                }))
                                            }
                                        }}
                                    >
                                        <div className=''>
                                            <BiSolidLike className='bg-[#100E80] text-[#F3BA1A] w-[3rem] h-[3rem] p-2 rounded-[2rem]'/>
                                        </div>
                                        <div className='text-[#100E80] font-bold'>
                                            Si
                                        </div>
                                    </button>
                                    <button className='ml-4'
                                        onClick={() => dispatch(catchDeleteBussiness(null))}    
                                    >
                                        <div>
                                            <BiSolidDislike className='bg-[#100E80] text-[#F3BA1A] w-[3rem] h-[3rem] p-2 rounded-[2rem]'/>
                                        </div>
                                        <div className='text-[#100E80] font-bold'>
                                            No
                                        </div>
                                    </button>
                                </div>
                            </>
                        )
                    }
                </div>
                <div
                    className='fixed inset-0 flex bg-white bg-opacity-50 items-center justify-center -z-10 backdrop-blur-sm'
                ></div>
            </div>
        </>
    )
}
