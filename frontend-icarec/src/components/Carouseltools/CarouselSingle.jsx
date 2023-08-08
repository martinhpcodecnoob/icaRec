'use client'
import { removeImageOfRedux } from "@/redux/Slices/slicePreview";
import Image from "next/image"
import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";

export default function CarouselSingle({imageSlides}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const dispatch = useDispatch()
    
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? imageSlides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    
    const nextSlide = () => {
        const isLastSlide = currentIndex === imageSlides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const removeImage = (imageSelect) => {
        dispatch(removeImageOfRedux(imageSelect))
        setCurrentIndex(imageSlides.length-2)
    }
    return (
        <div className='w-full px-4 relative group'>
            <Image
                src={imageSlides[currentIndex]}
                alt={`imageSlide${currentIndex}`}
                width={1000}
                height={1000}
                className="w-full lg:h-[84.2vh] sm:h-[20vh] smartphone:h-[20vh] rounded-2xl object-center object-cover duration-500"
            />
            <button className="bg-gray-700 absolute top-2 left-7 rounded-3xl p-2"
                onClick={() => removeImage(imageSlides[currentIndex])}
            >
                <RiDeleteBin6Fill className="text-[2rem] text-red-500"/>
            </button>
            {/* Left Arrow */}
            <button className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </button>
            {/* Right Arrow */}
            <button className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </button>
        
        </div>
    );
}

