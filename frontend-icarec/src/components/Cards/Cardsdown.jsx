import { FaAngleDown } from "react-icons/fa";
import { Link as LinkScroll } from 'react-scroll';
import { useEffect } from "react";

import CardSingle from "./CardSingle";

export default function Cardsdown({hidden, setHidden, bussinessAll}) {
    // const createNumberArray = (num) =>{
    //     const numberArray=[]
    //     for (let i = 1; i <= num; i++) {
    //         numberArray.push(i)
    //     }
    //     return numberArray
    // }
    // const resultTestCards = createNumberArray(30)

    const visualModal = () => {
        if (hidden === 'hidden') {
            setHidden('')
        }else{
            setHidden('hidden')
        }
    }    

    return (
        <div className='flex flex-col justify-center items-center'>
            <LinkScroll activeClass="active" to="down" spy={true} smooth={true} offset={-30} duration={500}>
                <FaAngleDown className='text-3xl text-[#F3BA1A]'/>
            </LinkScroll>
            <div className='grid gap-5 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2' id='down'>
                
                {
                    bussinessAll?.map((e,i) =>(
                        <CardSingle 
                            key={i} 
                            elementBusiness={e} 
                        />
                    ))  
                }
            </div>
        </div>
    )
}
