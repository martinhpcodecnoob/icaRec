import React from 'react'
import { IoIosRemoveCircle } from "react-icons/io";

export default function EtiquetasScroll({input,setInput}) {
    const handleRemoveService = (i) => {
        const selectService = input.list_service[i]
        const currentServices = input.list_service.filter(service => selectService !== service)
        setInput({
            ...input,
            ["list_service"]:currentServices
        })
    }

    return (
    <div className='w-[100%]'>
        <div className='flex flex-wrap'>
            {
            input.list_service.map((service, i) => (
                <div className='flex bg-slate-300 rounded-lg mb-1 mr-1' key={i}>
                    <div className='mx-2'>{service}</div>
                    <button type='button' onClick={() => handleRemoveService(i)}
                        className='text-red-600 text-[1.3rem]'
                    >
                        <IoIosRemoveCircle/>
                    </button>
                </div>
            ))
            }
        </div>
    </div>
    )
}
