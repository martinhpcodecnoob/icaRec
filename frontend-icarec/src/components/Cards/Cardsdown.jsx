import React from 'react'
import { FaAngleDown } from "react-icons/fa";
import Card from './CardEmotic';
import { Link as LinkScroll } from 'react-scroll';

export default function Cardsdown() {
    const createNumberArray = (num) =>{
        const numberArray=[]
        for (let i = 1; i <= num; i++) {
            numberArray.push(i)
        }
        return numberArray
    }
    const resultTestCards = createNumberArray(30)

    return (
        <div className='flex flex-col justify-center items-center'>
            <LinkScroll activeClass="active" to="down" spy={true} smooth={true} offset={-30} duration={500}>
                <FaAngleDown className='text-3xl text-red-600'/>
            </LinkScroll>
            <div className='grid gap-5 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2' id='down'>
                {
                    resultTestCards.map((e,i) =>(
                        <div key={i} className='relative w-60 h-40 bg-red-400 rounded-lg shadow-red hover:rotate-6 duration-700 hover:shadow-xl'>
                            <div className='absolute left-[187px] top-[5px]'>
                                <Card initialNumber={0} increment={100}/>
                            </div>
                        </div>
                    ))  
                }
            </div>
        </div>
    )
}
