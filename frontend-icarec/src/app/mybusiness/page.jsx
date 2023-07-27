'use client'
import BusinessSubComponent from '@/components/BusinessSubComponent'
import FileInput from '@/components/Formbussiness/Fileinput'
import Form from '@/components/Formbussiness/Form'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'


export default function createForm() {
    const inputForm = useSelector(state => state.preview.inputForm)
    
return (
    <div>
        <div className='flex p-6'>
            <div className='w-28 h-7 relative'>
                <Image alt='logo' src={'/detodologo2.png'}
                    fill/>
            </div>
            <div className='flex justify-center w-full'>
                <div className='flex items-center text-[21px]'>
                    ¡Descubre un mundo de oportunidades con un click!
                </div>
                <div className='w-10 relative'>
                    <Image alt='click' src={'/manoclick.png'} fill/>
                </div>
            </div>
        </div>
        <div className='flex justify-around px-6'>
            <div className='smartphone:w-[100%] lg:w-[20rem]'>
                <Form/>
            </div>
            <div className='lg:w-[50%] relative'>
                <FileInput images={inputForm.images}/>
            </div>
            <div className='flex xl:w-[30%]'>
                <BusinessSubComponent
                    inputForm={inputForm}
                />
            </div>
        </div>
    </div>
  )
}
