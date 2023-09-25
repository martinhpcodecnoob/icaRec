'use client'

import { saveLimitMessage } from "@/redux/Slices/slicePreview"
import { useDispatch } from "react-redux"

export default function WarningModal({message}) {
    const dispatch = useDispatch()
    let hidden=''
    if (message === "") {
        hidden='hidden'
    }else{
        hidden=''
        setTimeout(() => {
            dispatch(saveLimitMessage(""))
        }, 2500);
    }
return (
    <>
        <div tabIndex="-1" className={`${hidden} flex items-center justify-center fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full`}>
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="p-6 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
                        </div>
                    </div>
                </div>
                <div 
                    className='fixed inset-0 flex bg-slate-400 bg-opacity-50 items-center justify-center -z-10'
                >
                </div>
        </div>
    </>
)
}
