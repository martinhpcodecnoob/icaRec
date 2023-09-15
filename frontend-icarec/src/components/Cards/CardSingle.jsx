'use client'
import CardEmotic from './CardEmotic';
import Image from "next/image"
import imageDefault from '../../../public/no_image.svg'
import ModalHome from '../Modals/ModalHome';
import { useState } from 'react';
export default function CardSingle({elementBusiness}) {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <ModalHome 
                activated={visible} 
                closeVisualModal={()=> setVisible(false)}
                images={elementBusiness.images}
                inputForm={elementBusiness}
            >
                <div 
                    key={elementBusiness._id} 
                    className='relative w-[11.25rem] md:w-60 h-[7.5rem] md:h-40 bg-[#FAE3A3] rounded-lg hover:rotate-6 duration-700 hover:shadow-2xl hover:shadow-[#100E80]'
                    
                >
                    <Image
                        onClick={() => setVisible(true)}
                        src={elementBusiness.images[0]?.url_cloudinary ? elementBusiness.images[0]?.url_cloudinary : imageDefault}
                        alt={elementBusiness._id}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-center object-cover rounded-lg"
                    />
                    <div className='absolute md:left-[187px] left-2 md:top-[5px] top-2'>
                        <CardEmotic initialNumber={0} increment={100}/>
                    </div>
                </div>
            </ModalHome >
        </>
    )
}
