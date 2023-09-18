import React from 'react'

export default function AboutBusiness({description}) {
    return (
        <>
            <div className=' bg-white rounded-[2rem] py-3 pl-3 pr-1 border-[#F3BA1A] border-[4px] w-full h-full'>
                <div className='text-[#100E80] font-bold text-[1.2rem]'>Sobre el Negocio</div>
                <div className='text-[#100E80]'>
                    {
                        description === "" || description === undefined ?
                            '(No existe por el momento una descripcion)' :
                            description
                    }
                </div>
            </div>
        </>
    )
}
