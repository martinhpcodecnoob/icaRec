'use client'
import { destroyCloudinary, removeImageOfRedux } from "@/redux/Slices/slicePreview";
import Image from "next/image"
import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import defaultImage from '../../../public/no_image.svg'
import { RxDotFilled } from 'react-icons/rx';
import { BsSuitHeartFill } from "react-icons/bs";

export default function CarouselSingle({imageSlides,imagesPublicId,hidden,visibleLiked,dataLiked}) {
    const arrayimages = []
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
            setImagesChanges(imageSlides)
    }, [imageSlides])

    const isCloudinaryURL = (url) => {
        if (!url.includes("cloudinary.com")) {
            return false;
        }
        if (
            !url.includes("res.cloudinary.com") ||
            !url.includes("/image/upload/")
        ) {
        return false;
        }
        return true;
    }
    const [imagesChanges, setImagesChanges] = useState(arrayimages)
    const dispatch = useDispatch()
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? imagesChanges.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    
    const nextSlide = () => {
        const isLastSlide = currentIndex === imagesChanges.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };
    const removeImage = (imageSelect) => {
        if (isCloudinaryURL(imageSelect)) {
            const objPublicId = imagesPublicId.filter((objImage) => {
                if (objImage.url_cloudinary === imageSelect) {
                    return objImage
                }
            })
            // dispatch(destroyCloudinary('dkjfbkljdsfhn'))
            dispatch(destroyCloudinary(objPublicId[0].public_id))
                .then((action) => {
                    const {errorBolean,message} = action.payload
                    if (!errorBolean) {
                        console.log(message);
                        dispatch(removeImageOfRedux(imageSelect))
                        return
                    }
                    console.log(message);
                    return
                })
                .catch(err => console.log("Error desde dispatch destroy: ",err))
        }else{
            dispatch(removeImageOfRedux(imageSelect))
        }
        setCurrentIndex(imagesChanges.length-2)
    }
    return (
        <div className='w-full px-4 sm:px-0 smartphone:px-0 sm:h-full relative group'>
                {
                    imagesChanges.length > 0 ? (
                        <div className="w-full h-full relative">
                            <Image
                                src={imagesChanges[currentIndex]===undefined ? defaultImage: imagesChanges[currentIndex]}
                                alt={`imageSlide${currentIndex}`}
                                width={1000}
                                height={1000}
                                className={`w-full lg:max-h-[85vh] lg:h-full sm:h-[22vh] smartphone:h-[27vh] rounded-2xl object-center object-contain duration-500`}
                                />
                            <div className={`absolute inset-0 flex left-3 top-2 ${visibleLiked?'lg:hidden':'hidden'}`}>
                                <div className="flex items-center h-7 bg-[#F3BA1A] rounded-[1rem] px-2 py-1">
                                    <div className="mx-1">{dataLiked === undefined ? 'N':dataLiked.toLocaleString('en-US')}</div>
                                    <div><BsSuitHeartFill className="text-[1.4rem] mx-1"/></div>
                                </div>
                            </div>
                            <div className='absolute inset-0 flex justify-center items-end py-0'>
                                <div className="flex">
                                    {imageSlides.map((slide, slideIndex) => (
                                    <div
                                        key={slideIndex}
                                        onClick={() => goToSlide(slideIndex)}
                                        className='cursor-pointer'
                                    >
                                        <RxDotFilled className={`${slideIndex === currentIndex ? 'text-[#F3BA1A]':'text-[#100E80] '} text-[3rem]`}/>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            <button className={`bg-gray-700 absolute top-2 left-7 rounded-3xl p-2 ${hidden}`}
                onClick={() => removeImage(imagesChanges[currentIndex])}
            >
                <RiDeleteBin6Fill className={`text-[2rem] text-red-500`}/>
            </button>
            {/* Left Arrow */}
            <button className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-[#F3BA1A]/60 text-[#100E80] cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </button>
            {/* Right Arrow */}
            <button className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-[#F3BA1A]/60 text-[#100E80] cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </button>
        </div>
    );
}

