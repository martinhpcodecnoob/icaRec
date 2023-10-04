'use client'
import { Carousel } from 'flowbite-react';
import { useState, useEffect } from "react";
import CardEmotic from './CardEmotic';
import Image from 'next/image';

const Cardsup = () => {

    const [sizeScreen, setSizeScreen] = useState({width:0, height:0})
    
    useEffect(() => {
        const handleResize = () =>{
            setSizeScreen({
                width:window.innerWidth,
                height:window.innerHeight
            })
        }
        handleResize()
        window.addEventListener('resize',handleResize)

        return () =>{
            window.removeEventListener('resize',handleResize)
        }
    }, [])

    if (sizeScreen.width < 768 && sizeScreen.width > 0 ) {
        return(
            <div className="flex items-center my-2">
            <div className="py-4 px-4 mx-auto bg-[#100E80] rounded-lg flex items-center justify-evenly">      
                <div className="w-72 h-48 z-0">
                    <Carousel leftControl="L" rightControl="R">
                        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                           {/*  <img src="https://wallpapers.com/images/featured/business-jzw8ax93flqonkce.jpg" alt="ola" /> */}
                            <Image
                                src="https://wallpapers.com/images/featured/business-jzw8ax93flqonkce.jpg" 
                                alt="Image1"
                                width={72}
                                height={48}
                            />
                        </div>
                        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                            Slide 2
                        </div>
                        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                            Slide 3
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
        )
    }

    if (sizeScreen.width >= 768 && sizeScreen.width > 0 ) {
        return (
            <div className="flex items-center my-2">
                <div className="py-4 px-4 mx-auto bg-[#100E80] rounded-lg flex items-center justify-evenly">      
                            <div className="grid gap-5 xl:grid-cols-4 md:grid-cols-2">
                                <div className="w-72 h-48 bg-stone-50 relative rounded-lg">
                                    {/* <img 
                                    src='https://wallpapers.com/images/featured/business-jzw8ax93flqonkce.jpg'
                                    alt='Img1'
                                    /> */}
                                    <Image
                                        src='https://wallpapers.com/images/featured/business-jzw8ax93flqonkce.jpg'
                                        alt='Img1'
                                        width={72}
                                        height={48}
                                    />
                                    <div className={`absolute left-[237px] top-[4px]`}>
                                        <CardEmotic initialNumber={0} increment={100}/>
                                    </div>
                                </div>
                                <div className="w-72 h-48 bg-stone-50 relative rounded-lg">
                                    {/* <img
                                    src='https://cdn.wallpapersafari.com/83/54/b9KGv4.jpg'
                                    alt='Img2'
                                    /> */}
                                    <Image
                                        src='https://cdn.wallpapersafari.com/83/54/b9KGv4.jpg'
                                        alt='Img2'
                                        width={72}
                                        height={48}
                                    />
                                    <div className={`absolute left-[237px] top-[4px]`}>
                                        <CardEmotic initialNumber={0} increment={100}/>
                                    </div>
                                </div>
                                <div className="w-72 h-48 bg-stone-50 relative rounded-lg">
                                    {/* <img 
                                    src="https://img.freepik.com/free-photo/business-partners-handshake-global-corporate-with-technology-concept_53876-102615.jpg?w=2000" 
                                    alt="Img3" 
                                    /> */}
                                    <Image
                                       src="https://img.freepik.com/free-photo/business-partners-handshake-global-corporate-with-technology-concept_53876-102615.jpg?w=2000" 
                                       alt="Img3"
                                        width={72}
                                        height={48}
                                    />
                                    <div className={`absolute left-[237px] top-[4px]`}>
                                        <CardEmotic initialNumber={0} increment={100}/>
                                    </div>
                                </div>
                                <div className="w-72 h-48 bg-stone-50 relative rounded-lg">
                                    {/* <img 
                                    src="https://www.pixelstalk.net/wp-content/uploads/images6/Business-Wallpaper-Free-Download.jpg" 
                                    alt="Img4" /> */}
                                    <Image
                                        src="https://www.pixelstalk.net/wp-content/uploads/images6/Business-Wallpaper-Free-Download.jpg" 
                                        alt="Img4"
                                        width={72}
                                        height={48}
                                    />
                                    <div className={`absolute left-[237px] top-[4px]`}>
                                        <CardEmotic initialNumber={0} increment={100}/>
                                    </div>
                                </div>
                            </div>
                        
                </div>
            </div>
        );
    }

}
export default Cardsup;