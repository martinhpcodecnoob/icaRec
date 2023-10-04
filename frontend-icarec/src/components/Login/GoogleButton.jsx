import React from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from 'next-auth/react'
import { closeAllPopups } from '@/redux/Slices/popupSlice'
import Image from 'next/image'

const GoogleButton = ({content, disabled }) => {
    
    const dispatch = useDispatch()

    return (
        <div className='flex justify-center items-center w-full'>
            <button
                className="flex justify-center items-center border border-black rounded-full py-1 px-3 text-gray-500 mb-4 w-3/4" 
                onClick={async() => {
                    await signIn('google')
                    dispatch(closeAllPopups())
                }}
                disabled={disabled}
            >
                <Image
                    src="/googlelogo.png"
                    alt="Google Logo"
                    className= "mr-2"
                    width={18}
                    height={18}
                />
                <span className='w-full'>
                    {content}
                </span>
            </button> 
        </div>
    )
}

export default GoogleButton