'use client'
import CardEmotic from './CardEmotic';
import Image from "next/image"
import imageDefault from '../../../public/no_image.svg'
import ModalHome from '../Modals/ModalHome';
import { useEffect, useRef, useState } from 'react';
export default function CardSingle({elementBusiness}) {
    const [visible, setVisible] = useState(false)
    const bodyRef = useRef(document.body)
    const handleCloseModal = () => {
        // bodyRef.current.classList.remove('overflow-hidden')
        setVisible(false)
        // bodyRef.current = document.body;
    }
    
    const handleShowModal = () => {
        // bodyRef.current.classList.add('overflow-hidden')
        setVisible(true)
        // setChangeBody(changeBody.classList.add('overflow-hiddden'))
    }
    
    return (
        <>
            <ModalHome 
                activated={visible} 
                closeVisualModal={handleCloseModal}
                images={elementBusiness.images}
                inputForm={elementBusiness}
            >
                <div 
                    key={elementBusiness._id} 
                    className='relative w-[11.25rem] md:w-60 h-[7.5rem] md:h-40 bg-[#FAE3A3] rounded-lg hover:rotate-6 duration-700 hover:shadow-2xl hover:shadow-[#100E80]'
                    
                >
                    <Image
                        onClick={handleShowModal}
                        src={elementBusiness.images.length > 0 ? elementBusiness.images[0]?.url_cloudinary : imageDefault}
                        alt={elementBusiness._id}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-center object-cover rounded-lg"
                    />
                    <div className='absolute left-2 md:top-[5px] top-2'>
                        <CardEmotic totalLikes={elementBusiness.totalLikes}/>
                    </div>
                </div>
            </ModalHome >
        </>
    )
}
