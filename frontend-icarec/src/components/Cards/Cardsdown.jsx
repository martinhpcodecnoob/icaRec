import { FaAngleDown } from "react-icons/fa";
import { Link as LinkScroll } from 'react-scroll';

import CardSingle from "./CardSingle";

export default function Cardsdown({bussinessAll}) {
    // console.log('bussinessAll: >>>>>>>>>: ',bussinessAll);
    return (
        <div className='flex flex-col justify-center items-center mb-6'>
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
