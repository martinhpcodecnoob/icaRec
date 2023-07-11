import { Carousel } from 'flowbite-react';
import { useState, useEffect } from "react";
import CardEmotic from './CardEmotic';
import Image from 'next/image';

const Cardsup = () => {

    const [sizeScreen, setSizeScreen] = useState({width:0, height:0})
    
    useEffect(() => {
        console.log(window.innerWidth);
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

    return (
        <div className="flex items-center my-2">
            <div className="py-4 px-4 mx-auto bg-stone-300 rounded-lg flex items-center justify-evenly">
                {
                    sizeScreen.width < 768 ? (
                        <div className="w-72 h-48 z-0">
                            <Carousel leftControl="L" rightControl="R">
                            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                                <img src="https://wallpapers.com/images/featured/business-jzw8ax93flqonkce.jpg" alt="ola" />
                            </div>
                            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                                Slide 2
                            </div>
                            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                                Slide 3
                            </div>
                            </Carousel>
                        </div>
                    ) : (
                        <div className="grid gap-5 2xl:grid-cols-4  xl:grid-cols-3 md:grid-cols-2">
                            <div className="w-72 h-48 bg-stone-50 relative rounded-lg">
                                <img 
                                src='https://wallpapers.com/images/featured/business-jzw8ax93flqonkce.jpg'
                                alt='Img1'
                                />
                                <div className={`absolute left-[237px] top-[4px]`}>
                                    <CardEmotic initialNumber={0} increment={100}/>
                                </div>
                            </div>
                            <div className="w-72 h-48 bg-stone-50 relative rounded-lg">
                                <img
                                src='https://cdn.wallpapersafari.com/83/54/b9KGv4.jpg'
                                alt='Img2'
                                />
                                <div className={`absolute left-[237px] top-[4px]`}>
                                    <CardEmotic initialNumber={0} increment={100}/>
                                </div>
                            </div>
                            <div className="w-72 h-48 bg-stone-50 relative rounded-lg">
                                <img 
                                src="https://img.freepik.com/free-photo/business-partners-handshake-global-corporate-with-technology-concept_53876-102615.jpg?w=2000" 
                                alt="Img3" 
                                />
                                <div className={`absolute left-[237px] top-[4px]`}>
                                    <CardEmotic initialNumber={0} increment={100}/>
                                </div>
                            </div>
                            <div className="w-72 h-48 bg-stone-50 relative rounded-lg">
                                <img 
                                src="https://www.pixelstalk.net/wp-content/uploads/images6/Business-Wallpaper-Free-Download.jpg" 
                                alt="Img4" />
                                <div className={`absolute left-[237px] top-[4px]`}>
                                    <CardEmotic initialNumber={0} increment={100}/>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
export default Cardsup;