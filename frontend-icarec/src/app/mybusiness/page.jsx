import Form from '@/components/Formbussiness/Form'
import Image from 'next/image'
import React from 'react'


export default function createForm() {
    
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
        <div className='flex p-9'>
            <div className='w-1/3'>
                <Form/>
            </div>
            <div></div>
        </div>
    </div>
  )
}
