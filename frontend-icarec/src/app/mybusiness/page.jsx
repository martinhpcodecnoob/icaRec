import BusinessSubComponent from '@/components/BusinessSubComponent'
import FileInput from '@/components/Formbussiness/Fileinput'
import Form from '@/components/Formbussiness/Form'
import Image from 'next/image'
import React from 'react'


export default function createForm() {

    const pruebaDatos={
        title:'Título del componente',
        whatsapp:'123456789',
        horario:'Lunes a Viernes, 9AM-5PM',
        webMedia:{"webPage": ["pagina web"], "Facebook": ["pagina de facebook"]},
        servicios:['S1', 'Sv2', 'ci3', 'Sevi4', 'Sevico5', 'Servicio 6'],
        ruc:'1234567890'
    }
    
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
        <div className='flex justify-between px-6'>
            <div className='smartphone:w-[100%] lg:w-[20rem]'>
                <Form/>
            </div>
            <div className='lg:w-[50%]'>
                <FileInput/>
            </div>
            <div className='flex'>
                <BusinessSubComponent
                    componentType="view"
                    businessName={pruebaDatos.title}
                    whatsappNumber={pruebaDatos.whatsapp}
                    schedule={pruebaDatos.horario}
                    webMedia={pruebaDatos.webMedia}
                    services={pruebaDatos.servicios}
                    ruc={pruebaDatos.ruc}
                />
            </div>
        </div>
    </div>
  )
}
